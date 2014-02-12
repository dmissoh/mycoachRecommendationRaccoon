
var express = require('express'),
    raccoon = require('raccoon').raccoon(),
    path = require('path'),
    starter = require('./sampleContent/starter.js').starter(),
    app = express(),
    cors = require('cors');

/**
 * CORS support.
 */
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/usersStats', function(req, res){
  var replyObj = {};
  raccoon.stat.dislikedBy(req.query.userId, function(dislikedBy){
    raccoon.stat.likedBy(req.query.userId, function(likedBy){
      raccoon.stat.leastSimilarUsers(req.query.userId, function(leastSimUsers){
        raccoon.stat.mostSimilarUsers(req.query.userId, function(mostSimUsers){
            replyObj = {
              mostSimilarUsers: mostSimUsers,
              leastSimilarUsers: leastSimUsers,
              likedBy: likedBy,
              dislikedBy: dislikedBy
            };
            console.log('replyObj', replyObj);
            res.send(replyObj);
        });
      });
    });
  });
});

app.get('/recipesStats', function(req, res){
  var replyObj = {};
  raccoon.stat.mostLiked(function(mostLiked){
    raccoon.stat.mostDisliked(function(mostDisliked){
        replyObj = {
          mostLikedRecipes: mostLiked,
          mostDislikedRecipes: mostDisliked
        };
        console.log('replyObj', replyObj);
        res.send(replyObj);
    });
  });
});

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
  // first flush the redis db
  client.flushdb();
  // then import from csv
  starter.importCSV(function(count){
    var replyObj = {};
    replyObj = {
        numberOfUsers: count
    };
    res.send(200, replyObj);
  });
});

app.listen(3000);
