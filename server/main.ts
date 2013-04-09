// Leaderboard -- server

/// <reference path="../common/model.d.ts" />

declare var Meteor: any;

module Server {

  var Players = Model.Players;

  Meteor.startup(function() {
    // Create some players if the database is empty.
    if (Players.find().count() === 0) {
      Players.reset_data();
    }
  });

  Meteor.publish('players', function() {
    return Players.find();
  });

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
    console.log('Resetting data.');
    this.remove({});
    for (var i in names) {
      this.insert(
          {
            name: names[i],
            score: Math.floor(Math.random() * 10) * 5
          }
      );
    }
  }

  Meteor.methods({
    reset_data: function() {
      if (this.userId) {
        Players.reset_data();
      }
      else {
        throw new Meteor.Error(401, 'Access denied');
      }
    }
  });

}
this.Server = Server; // Fix Meteor 0.6.0 var scope incompatibility.
