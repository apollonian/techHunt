'use strict';

const mocha = require('mocha');
const coMocha = require('co-mocha');

coMocha(mocha);

require('./unit/popular');
require('./unit/newest');
require('./unit/today');
require('./unit/yesterday');
require('./unit/days-ago');

require('./functional/default');
require('./functional/http');
