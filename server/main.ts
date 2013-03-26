// Leaderboard -- server

/// <reference path="../common/model.d.ts" />

declare var Meteor: any;

module Server {

  var Players = Model.Players;

  Meteor.publish('players', function() {
    return Players.find();
  });

  Meteor.startup(function() {
    // Create some players if the database is empty.
    if (Players.find().count() === 0) {
      Players.reset_data();
    }
  });

  Meteor.methods({
    reset_data: function() {
      if (this.userId) {
        Players.reset_data();
      }
      else {
        console.log('Access denied.');
      }
    }
  });

}
