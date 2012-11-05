# Leaderboard -- server

Meteor.publish 'players', -> Players.find()

# Create some players if the database is empty.
Meteor.startup ->
  Players.reset_data() if Players.find().count() is 0
