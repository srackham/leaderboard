{spawn} = require 'child_process'
path = require 'path'
fs = require 'fs'

EXEC_PRINT_OPTS = printStdout: true, printStderr: true

desc 'List Jake tasks.'
task 'default', -> jake.exec ['jake -T'], EXEC_PRINT_OPTS

desc 'Compile CoffeeScript and LESS source files.'
task 'build', ->
  jake.exec ['coffee -cb model.coffee',
             'coffee -cb ./client/client.coffee',
             'coffee -cb ./server/server.coffee',
             'lessc ./client/leaderboard.less ./client/leaderboard.css'],
             EXEC_PRINT_OPTS

desc 'Push project to github.'
task 'push', ->
  console.log 'pushing to github...'
  jake.exec ['git push --tags origin master'], EXEC_PRINT_OPTS
