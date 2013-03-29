# Leaderboard -- data model
# Loaded on both the client and the server.

Players = new Meteor.Collection 'players'

Players.allow
# The user must be logged in to change the data.
  insert: (userId) -> userId
  update: (userId) -> userId
  remove: (userId) -> userId

_.extend Players,

  # Delete all existing documents then insert new ones.
  # Synchronous, server only.
  # Throws exception if on error.
  reset_data: ->
    names = [ 'Ada Lovelace',
              'Grace Hopper',
              'Marie Curie',
              'Carl Friedrich Gauss',
              'Nikola Tesla',
              'Claude Shannon',
              'Issac Newton',
    ]
    console.log 'Resetting data.'
    Players.remove {}
    for name in names
      Players.insert {
        name: name
        score: Math.floor(Math.random() * 10) * 5
      }
