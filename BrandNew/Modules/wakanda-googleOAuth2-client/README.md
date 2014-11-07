#wakanda-googleOAuth2-client#

This JavaScript module provides OAuth2 client authentication using Google's API. It was written to be used with [wakandaDB](http://wakandaDB.org/) and was created for [GlassWakanda](https://github.com/lyle/GlassWakanda).

Google OAuth2
-------------

* [Google OAuth2 Docs](https://developers.google.com/accounts/docs/OAuth2)
* You will need to [Register your Application with Google](https://cloud.google.com/console) - this will give you the data you need to use this module.


To Install for use with Wakanda
-------------------------------

Put the GoogleOAuth2.js file into your Wakanda Project "Modules" folder - you can just clone this repo as a sumb module. Or just download the GoogleOAuth2.js file.

If you clone the project as a sumbmodule, from your git project root:

    git submodule add https://github.com/lyle/wakanda-googleOAuth2-client.git path/to/Modules/GoogleOAuth2

Then get the dependency "wakanda-querystring" into the Modules folder.
Simply go and grab the querystring.js file from https://github.com/anvivia/wakanda-querystring
And place that file in your Modules folder so that Wakanda finds it at init.

To Use in Wakanda
-----------------
Take a look at GoogleAuthExample.js file.
You will need to change these things:

- Put GoogleAuthExample.js in YourProject/Scripts
- Put your Google Application data into the GoogleAuthExample.js file
- Add an http request handler in your project's active [Bootstrap](http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3283.html#1014177) file

    addHttpRequestHandler("/login", "Scripts/GoogleAuthExample.js", "login");

- Run wakandaDB
