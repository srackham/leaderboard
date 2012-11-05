// Leaderboard -- data model
// Loaded on both the client and the server.

declare var Meteor: any;

module Model {
  
  export var Players = new Meteor.Collection('players');

  Players.allow({
    // The user must be logged in to change the data.
    insert: userId => userId,
    update: userId => userId,
    remove: userId => userId
  });

  // Delete all existing documents then insert new ones.
  Players.reset_data = function (errback) {
    // Calls errback(err) if are any errors.
    var names = [
      'Ada Lovelace',
      'Grace Hopper',
      'Marie Curie',
      'Carl Friedrich Gauss',
      'Nikola Tesla',
      'Claude Shannon',
      'Issac Newton'
    ];
    function handleError(err) {
        if (errback)
          errback(err);
        else
          console.log(err.reason);
    };  
    Players.remove({}, function(err) {
      if (err) {
        handleError(err);
      } else {
        for (var i in names) {
          Players.insert({
              name: names[i],
              score: Math.floor(Math.random() * 10) * 5
            },
            function(err) { if (err) handleError(err); }
          );
        }
      }
    });
  }

}
