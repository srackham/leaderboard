{spawn} = require 'child_process'
path = require 'path'
fs = require 'fs'

EXEC_PRINT_OPTS = printStdout: true, printStderr: true

desc 'List Jake tasks.'
task 'default', -> jake.exec ['jake -T'], EXEC_PRINT_OPTS

#TODO
desc 'Project initialization.'
task 'init', -> console.log 'NOT YET IMPLEMENTED'

desc 'Build JavaScript executables from CoffeeScript source.'
task 'build.coffee', ->
  jake.exec ['coffee -cb model.coffee',
             'coffee -cb ./client/client.coffee',
             'coffee -cb ./server/server.coffee'],
             EXEC_PRINT_OPTS

desc 'Push project to github.'
task 'push', ->
  console.log 'pushing to github...'
  jake.exec ['git push --tags origin master'], EXEC_PRINT_OPTS
