// this example requires a data model in wakanda called Person
// with attributes: firstName, lastName, email,
// and a calculate addtribute of fullName

function login(request, response){
  var googleOAuth2 = require('GoogleOAuth2/GoogleOAuth2').OAuth2;
  var OAuth2 = new googleOAuth2(
    "Your Google ClientID....apps.googleusercontent.com",
    "Your Google ClientSecret",
    "http://127.0.0.1:8081/",
    {scope:"email https://www.googleapis.com/auth/userinfo.profile",
     approval_prompt: "force"
    }
  )
  var theQuery = getURLQuery(request.url);
  var code = theQuery.code;
  if (code) {
    result = googleOAuth2Login(code,OAuth2);
    if (result) {
      response.statusCode = 307;
      response.headers.Location = "/";
    }else{
      response.contentType = 'text/html';
      response.body = '<html><body>sorry - login failed</body></html>';
    }
  }else{		
    response.contentType = 'text/html';
    response.body = '<html><body>Please <a href="';
    response.body = response.body + OAuth2.getAuthenticateURL();
    response.body = response.body + '">Login with Google</a>.</body></html>';
  }
}

function googleOAuth2Login(code, OAuth2){

  function getGoogleUserInfo( accessToken ){
    var xhr = new XMLHttpRequest();
    xhr.open('GET','https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + accessToken, false);
    xhr.send();
    return JSON.parse( xhr.responseText );
  }

  currentSession().promoteWith('Admin');
  var accessData, userInfo, person;
  accessData = OAuth2.getAccessData(code); 
  
  if (accessData.error) {
    return false;
  }

  userInfo = getGoogleUserInfo(accessData.access_token);

  if (userInfo && userInfo.error){
    return false;
  }
  person = ds.Person.find("ID = :1", userInfo.id);
    
  if (!person) {
    person = new ds.Person({ID:userInfo.id});
  }
  person.firstName= userInfo.given_name;
  person.lastName= userInfo.family_name;
  person.email= userInfo.email;

  if(userInfo.picture){
    person.picture = userInfo.picture;
  }

  person.save();

  createUserSession({
    ID: person.ID,
    name: person.email, 
    fullName: person.fullName, 
    belongsTo: ["User"]
  })


  currentSession().unPromote();

  return person;
}
