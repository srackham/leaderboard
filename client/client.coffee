# Leaderboard -- client

Meteor.subscribe 'players'

_.extend Template.navbar,
  events:
    'click .sort_by_name': -> Session.set 'sort_by_name', true
    'click .sort_by_score': -> Session.set 'sort_by_name', false
    'click .reset_data': -> reset_data()

_.extend Template.leaderboard,
  players: ->
    sort = if Session.get('sort_by_name') then name: 1 else score: -1
    Players.find {}, sort: sort

  events:
    'click #add_button, keyup #player_name': (evt) ->
      return if evt.type is 'keyup' and evt.which isnt 13 # Key is not Enter.
      input = $('#player_name')
      if input.val()
        Players.insert
          name: input.val()
          score: Math.floor(Math.random() * 10) * 5
        input.val ''

_.extend Template.player,
  events:
    'click .increment': -> Players.update @_id, $inc: {score: 5}
    'click .remove': -> Players.remove @_id
    'click': -> $('.tooltip').remove()  # To prevent zombie tooltips.

  enable_tooltips: ->
    # Update tooltips after the template has rendered.
    _.defer -> $('[rel=tooltip]').tooltip()
    ''
