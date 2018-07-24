let fs = require('fs');
let userData = require('../data/friends.js');

module.exports = function (app) {

    app.get('/api/friends', function (req, res) {
        //display a JSON of all possible friends
        fs.readFile("./app/data/friends.js", 'utf-8', function(err,data) {
            if(err) {
                return console.log(err);
            }
            res.send(userData.array);
        })
    });

    app.post('/api/friends', function (req, res) {
        let newUser = req.body;
        let usersDifference=[];
        let currentDiff=0;
        //nested for-loop that creates an array of the score difference between the new user and all previous users
        for (userIndex=0;userIndex<userData.array.length;userIndex++){
            for(scoreIndex=0;scoreIndex<newUser.scores.length;scoreIndex++){
              currentDiff += Math.abs(parseInt(newUser.scores[scoreIndex])-
              parseInt(userData.array[userIndex].scores[scoreIndex]))
            }
            usersDifference.push(currentDiff);
            currentDiff=0;
        }
        //determine index of closest match
        let index = 0;
        let value = usersDifference[0];
        for (i=1;i<usersDifference.length;i++){
            if (usersDifference[i]<value){
                value = usersDifference[i];
                index=i;
            }
        }
        userData.array.push(newUser);
        res.send(userData.array[index]);
        //add new user to the array after best match determined
    });
    //add additional routes here
}
