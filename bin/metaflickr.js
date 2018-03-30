'use strict'
var config = require("../config");
var auth = config.auth;
var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: auth.api_key,
      secret: auth.secret,
      access_token: auth.access_token,
      access_token_secret: auth.access_token_secret,
      nobrowser: true,
      progress: false

    };

Flickr.authenticate(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API objectA
    flickr.people.getPhotos({
        api_key: auth.api_key,
        user_id: auth.user_id,
        //authenticated: true,
        //extras: "OLYMPUS DIGITAL CAMERA",
        text: "OLYMPUS DIGITAL CAMERA",
        page: 1,
        per_page: 200
    }, function(err, result) {
        console.log("result", result);
        console.log("err", err);
        for( var i in result.photos.photo ) {
            console.log("I", i);
            var row = result.photos.photo[i];
            console.log("row", row);

            flickr.photos.getInfo({
                api_key: auth.api_key,
                photo_id: row.id

            }, function(meta_err, meta_result) {
                //console.log("meta_result", meta_result);
                console.log("title", meta_result.photo.title);
                console.log("description", meta_result.photo.description);
                
                flickr.photos.setMeta({
                    api_key: auth.api_key,
                    photo_id: meta_result.photo.id,
                    description: ""
                }, function(set_err, set_result) {
                    console.log("set_err", set_err);
                    console.log("set_result", set_result);


                });
                
                
            });


        }
        return;
      /*
        This will now give all public and private results,
        because we explicitly ran this as an authenticated call
      */
    });
});
