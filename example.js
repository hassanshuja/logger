'use strict';

/* global require */

var People = require('./lib/index').default;

var people = new People('Albert', '26');

console.log(people.getPeople());
