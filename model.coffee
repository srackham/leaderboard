# Leaderboard -- data model
# Loaded on both the client and the server.

Players = new Meteor.Collection 'players'

Players.allow
  insert: (userId) -> userId   # The user must be logged in.
  update: (userId) -> userId   # The user must be logged in.
  remove: (userId) -> userId   # The user must be logged in.

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
