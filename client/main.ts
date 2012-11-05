// Leaderboard -- client

/// <reference path="../common/model.d.ts" />
/// <reference path="./lib/toast.d.ts" />

declare var Session: any;
declare var Template: any;
declare var $: any;
declare var _: any;
declare var bootbox: any;

module Client {

  var Players = Model.Players;

  Meteor.startup(function() {
    bootbox.animate(false);
    Toast.defaults.width = '400px';
    Toast.defaults.displayDuration = 1000;
  });

  Meteor.subscribe('players');

  Template.navbar.events = {
    'click .sort_by_name': function () {
      Session.set('sort_by_name', true);
    },

    'click .sort_by_score': function () {
      Session.set('sort_by_name', false);
    },

    'click .reset_data': function () {
      bootbox.confirm('Are you sure you want to reset the data?',
        'No',
        'Yes',
        function(yes) {
          if (yes) Players.reset_data((err) => Toast.error(err.reason));
        }
      );
    }
  };

  Template.leaderboard.players = function() {
    if (Session.get('sort_by_name'))
      return Players.find({}, {sort: {name: 1}});
    else
      return Players.find({}, {sort: {score: -1}});
  };

  Template.leaderboard.events = {
    'click #add_button, keyup #player_name': function(evt) {
      if (evt.type === 'keyup' && evt.which !== 13) {
        return;
      }
      var input = $('#player_name');
      if (input.val()) {
        Players.insert({
            name: input.val(),
            score: Math.floor(Math.random() * 10) * 5
          },
          (err) => { if (err) Toast.error(err.reason); }
        );
        input.val('');
      } else {
        Toast.warning('Enter New Player');
      }
    }
  };

  Template.player.events = {
    'click .increment': function () {
      Players.update(this._id,
        {$inc: {score: 5}},
        (err) => { if (err) Toast.error(err.reason); }
      );
    },

    'click .remove': function() {
      Players.remove(this._id,
        (err) => { if (err) Toast.error(err.reason); }
      );
    },

    'click': function() {
      // To prevent zombie tooltips from occuring when the corresponding DOM
      // elements are deleted or moved.
      $('.tooltip').remove();
    }
  };

  // Called to update tooltips each time the template is rendered. Execution is
  // deferred until the template has been rendered.
  Template.player.enable_tooltips = function() {
    _.defer(
      () => { $('[rel=tooltip]').tooltip(); }
    );
  };

}
