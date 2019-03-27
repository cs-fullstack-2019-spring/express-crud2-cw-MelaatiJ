var express = require('express');
var router = express.Router();
var dataCollection = require("../models/PostSchema");

/* GET home page. */
router.get('/', function(request, response, next) {

  dataCollection.find({}, (errors, results) => {
    if(errors){
      response.send(errors);
    }
    else{
      context ={
        title:"Posts Results",
        allPost:results,
      };

      response.render('index', context);
    }
  });

});

router.get("/create", (request, response) => {
  response.render("newPost")
});


router.get("/savePost", (request, response) => {
  dataCollection.create({userId:request.query.userId, id:request.query.id, title:request.query.title, body:request.query.body }, (errors) => {
    if(errors){
      response.send(errors)
    }
    else{
      response.redirect("/")
    }
  })
});
module.exports = router;
