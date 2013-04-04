# Leaderboard -- server

Meteor.publish 'players', -> Players.find()

# Create some players if the database is empty.
Meteor.startup ->
  Players.reset_data() if Players.find().count() is 0

Meteor.methods
  reset_data: ->
    if this.userId
      Players.reset_data()
    else
      throw new Meteor.Error 401, 'Access denied'

Players.allow
# The user must be logged in to change the data.
  insert: (userId) -> userId
  update: (userId) -> userId
  remove: (userId) -> userId

Players.reset_data = ->
# Delete all existing documents then insert new ones.
# Synchronous, server only.
# Throws exception if on error.
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
