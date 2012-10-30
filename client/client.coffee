# Leaderboard -- client

Meteor.subscribe 'players'
bootbox.animate false

_.extend Template.navbar,
  events:
    'click .sort_by_name': -> Session.set 'sort_by_name', true
    'click .sort_by_score': -> Session.set 'sort_by_name', false
    #'click .reset_data': -> reset_data((err) -> Template.error.show(err.reason))
    'click .reset_data': ->
      bootbox.confirm 'Do you want to reset the data?', 'No', 'Yes',
        (confirmed) ->
          if confirmed
            Players.reset_data (err) -> Template.error.show(err.reason)

_.extend Template.leaderboard,
  players: ->
    sort = if Session.get('sort_by_name') then name: 1 else score: -1
    Players.find {}, sort: sort

  events:
    'click #add_button, keyup #player_name': (evt) ->
      return if evt.type is 'keyup' and evt.which isnt 13 # Key is not Enter.
      input = $('#player_name')
      if input.val()
        Players.insert {
            name: input.val()
            score: Math.floor(Math.random() * 10) * 5
          },
          (err) -> Template.error.show(err.reason) if err
        input.val ''

_.extend Template.player,
  events:
    'click .increment': ->
      Players.update @_id, $inc: {score: 5},
        (err) -> Template.error.show(err.reason) if err
    'click .remove': ->
      Players.remove @_id,
        (err) -> Template.error.show(err.reason) if err
    'click': ->
      $('.tooltip').remove()  # To prevent zombie tooltips.

  enable_tooltips: ->
    # Update tooltips after the template has rendered.
    _.defer -> $('[rel=tooltip]').tooltip()
    ''

_.extend Template.error,
  error: -> Session.get 'error'

  events:
    'click .close': -> Template.error.hide()

  show: (msg) ->
    $('#error').show('fast', -> Session.set('error', msg))

  hide: ->
    $('#error').hide('fast', -> Session.set('error', undefined))
