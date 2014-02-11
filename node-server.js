
var express = require('express'),
    raccoon = require('raccoon').raccoon(),
    path = require('path'),
    starter = require('./sampleContent/starter.js').starter(),
    app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/newRating', function(req, res){
  var replyObj = {};
  if (req.query.recipe.like === 'liked'){
    raccoon.input.liked(req.query.userId, req.query.recipe.id, function(){
      raccoon.stat.recommendFor(req.query.userId, 15, function(recs){
        console.log('recs liked', recs);
        raccoon.stat.mostSimilarUsers(req.query.userId, function(simUsers){
          raccoon.stat.bestRatedWithScores(9, function(bestRated){
            replyObj = {
              recommendations: recs,
              similarUsers: simUsers,
              bestScores: bestRated
            };
            console.log('replyObj', replyObj);
            res.send(replyObj);
          });
        });
      });
    });
  } else {
    raccoon.input.disliked(req.query.userId, req.query.recipe.id, function(){
      raccoon.stat.recommendFor(req.query.userId, 15, function(recs){
        console.log('recs disliked', recs);
        raccoon.stat.mostSimilarUsers(req.query.userId, function(simUsers){
          raccoon.stat.bestRatedWithScores(9, function(bestRated){
            replyObj = {
              recommendations: recs,
              similarUsers: simUsers,
              bestScores: bestRated
            };
            console.log('replyObj', replyObj);
            res.send(replyObj);
          });
        });
      });
    });
  }
});

app.get('/recommendFor', function(req, res){
  var replyObj = {};
  raccoon.stat.recommendFor(req.query.userId, 15, function(recs){
    replyObj = {
      recommendations: recs
    };
    console.log('replyObj', replyObj);
    res.send(replyObj);
  });
});

app.get('/recipiesLikes', function(req, res){
  var replyObj = {};
  raccoon.stat.likedBy(req.query.recipe.id, function(likes){
    raccoon.stat.dislikedBy(req.query.recipe.id, function(dislikes){
      replyObj = {
        likedBy: likes,
        dislikedBy: dislikes
      };
      res.send(replyObj);
    });
  });
});

app.get('/importRecipies', function(req, res){
  starter.importCSV();
  res.send('SUCCESS: recipes Imported');
});

app.listen(3000);
