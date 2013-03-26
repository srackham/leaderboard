# Leaderboard -- data model
# Loaded on both the client and the server.

Players = new Meteor.Collection 'players'

Players.allow
  # The user must be logged in to change the data.
  insert: (userId) -> userId
  update: (userId) -> userId
  remove: (userId) -> userId

_.extend Players,
  # Calls errback(err) if are any errors.
  reset_data: (errback) ->
    names = [ 'Ada Lovelace',
              'Grace Hopper',
              'Marie Curie',
              'Carl Friedrich Gauss',
              'Nikola Tesla',
              'Claude Shannon',
              'Issac Newton',
            ]
    console.log 'Resetting data.'
    Players.remove {},
      (err) ->
        if err
          if errback then errback(err) else console.log err.reason
        else
          for name in names
            Players.insert {
                name: name
                score: Math.floor(Math.random() * 10) * 5
              },
              (err) ->
                if err
                  if errback then errback(err) else console.log err.reason
