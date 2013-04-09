# Leaderboard -- data model
# Loaded on both the client and the server.

Players = new Meteor.Collection 'players'
@Players = Players; # Fix Meteor 0.6.0 var scope incompatibility.
