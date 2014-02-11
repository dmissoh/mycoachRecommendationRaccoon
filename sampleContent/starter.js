exports.starter = function(){

  var csv = require('csv'),
  raccoon = require('raccoon').raccoon();

  var headers;

  var insertRow = function(row, headers){
    console.log("importing rating for the user '" + row[0] + "'");
    for (var j = 1; j < row.length; j++){
        if (row[j] > 0){
          insertUserRecipeLists(row[0], headers[j], row[j]);
        }
      }
  };

  var insertUserRecipeLists = function(userId, movieId, rating){
    if (rating > 3){
      raccoon.input.liked(userId, movieId, function(){});
    } else if (rating < 3) {
      raccoon.input.disliked(userId, movieId, function(){});
    } else {
      if (function(){return Math.floor(Math.random()*1.5)}===1){
        raccoon.input.liked(userId, movieId, function(){});
      } else {
        raccoon.input.disliked(userId, movieId, function(){});
      }
    }
  };

 return {
    importCSV:function(){
      csv()
      .from.path(__dirname+'/recipies.csv', { delimiter: ';', escape: '"' })
      .on('record', function(row,index){
        if (index === 0){
          for (var i = 1; i < row.length; i++){
            headers = row;
          }
        } else {
          insertRow(row, headers);
        }
      })
      .on('end', function(){
      })
      .on('error', function(error){
        console.log(error.message);
      });
    }
  };
};