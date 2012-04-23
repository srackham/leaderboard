# Meteor Leaderboard example with CoffeeScript, Less and Bootstrap

A port of the [Meteor](http://meteor.com/) framework's [Leaderboard example](http://meteor.com/examples/leaderboard) rewritten using [CoffeeScript](http://coffeescript.org/), [Less](http://lesscss.org/) and Twitter [Bootstrap](http://twitter.github.com/bootstrap/).

This port has been enhanced with Bootstrap styling, a drop-down menu and tooltips. You can also add and delete players, reset the data and sort players by name and score.  The changes to the original example reflect these enhancements.  I've made use of the jQuery `$.extend()` API to soak up repetitive template property assignments.

Here's a [screenshot](https://github.com/srackham/leaderboard-coffeescript/blob/master/screenshot.png).

The only tricky bit was injecting the tooltip popup events (with Bootstrap's jQuery `tooltip()` plugin method) into the DOM after template (re)rendering. This is done with the `Template.player.enable_tooltips` method which is invoked each time the 'player' template is rendered.  Injection is deferred until the template has been rendered using the `Meteor.defer` method (see [this stackoverflow discussion](http://stackoverflow.com/questions/10109788/callback-after-the-dom-was-updated-in-meteor-js)).

**NOTE**: When an element with a tooltip is clicked tooltips are deleted, this prevents zombie tooltips from occuring when elements are deleted or moved.

## Installation
To install create a meteor  project and clone this repo into it (you have to move the `.meteor` directory out temporarily else git refuses to clone). You also need to install the Meteor jquery package and compile the CoffeeScript and Less files (in my development environment I have configuired Vim to auto-compile CoffeeScript and Less files):

    meteor create leaderboard-coffeescript
    rm leaderboard-coffeescript/*
    mv leaderboard-coffeescript/.meteor/ /tmp
    git clone git@github.com:srackham/leaderboard-coffeescript.git
    mv /tmp/.meteor/ leaderboard-coffeescript/
    cd leaderboard-coffeescript/
    meteor add jquery
    coffee -c leaderboard.coffee
    lessc client/leaderboard.less client/leaderboard.css

To start the project in the built-in Meteor server:

    meteor run

Tested using Meteor version 0.3.3 and compiled with CoffeeScript version 1.2.0.

This document is also published as a [blogpost](https://srackham.wordpress.com/2012/04/22/meteor-leaderboard-with-coffeescript-less-and-bootstrap/).

