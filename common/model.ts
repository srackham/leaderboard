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
  // Synchronous, server only.
  // Throws exception if on error.
  Players.reset_data = function () {
    var names = [
      'Ada Lovelace',
      'Grace Hopper',
      'Marie Curie',
      'Carl Friedrich Gauss',
      'Nikola Tesla',
      'Claude Shannon',
      'Issac Newton'
    ];
    if (!Meteor.isServer) {
      throw new Meteor.Error('Server only');
    }
    console.log('Resetting data.');
    Players.remove({});
    for (var i in names) {
      Players.insert(
          {
            name: names[i],
            score: Math.floor(Math.random() * 10) * 5
          }
      );
    }
  }

}
