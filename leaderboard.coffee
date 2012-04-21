# Set up a collection to contain player information. On the server,
# it is backed by a MongoDB collection named 'players.'

Players = new Meteor.Collection 'players'

reset_data = ->
  Players.remove {}
  names = [ 'Ada Lovelace',
            'Grace Hopper',
            'Marie Curie',
            'Carl Friedrich Gauss',
            'Nikola Tesla',
            'Claude Shannon',
            'Issac Newton',
          ]
  for name in names
    Players.insert
      name: name
      score: Math.floor(Math.random() * 10) * 5

if Meteor.is_client

  $.extend Template.navbar,
    events:
      'click .sort_by_name': -> Session.set 'sort_by_name', false
      'click .sort_by_score': -> Session.set 'sort_by_name', true
      'click .reset_data': -> reset_data()

  $.extend Template.leaderboard,
    players: ->
      if Session.get('sort_by_name')
        sort = {score: -1, name: 1}
      else
        sort = {name: 1, score: -1}
      Players.find {}, sort: sort

    selected_name: ->
      Players.findOne(Session.get('selected_player'))?.name

    sort_next_name: ->
      if Session.get('sort_by_name') then 'Name' else 'Score'

    events:
      'click input.inc': ->
        Players.update Session.get('selected_player'), {$inc: {score: 5}}

      'click input.add': ->
        input = $('#add-item')
        if input.val()
          Players.insert
            name: input.val()
            score: Math.floor(Math.random() * 10) * 5
          input.val ''

  $.extend Template.player,
    selected: ->
      if Session.equals('selected_player', @_id) then 'selected' else ''

    events:
      'click': -> Session.set 'selected_player', @_id
      'click input.delete': -> Players.remove @_id
      'click .destroy': -> Players.remove @_id

# On server startup, create some players if the database is empty.
if Meteor.is_server
  Meteor.startup ->
    reset_data() if Players.find().count() is 0
