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
  var accessData, userInfo;
  accessData = OAuth2.getAccessData(code); 
  
  if (accessData.error) {
    return false;
  }

  userInfo = getGoogleUserInfo(accessData.access_token);

  if (userInfo && userInfo.error){
    return false;
  }

  createUserSession({
    ID: userInfo.id,
    name: userInfo.email, 
    fullName: userInfo.given_name + ' ' + userInfo.family_name, 
    belongsTo: ["User"]
  })


  currentSession().unPromote();

  return true;
}
