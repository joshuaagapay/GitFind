#!/usr/bin/env node

/**
 * Module dependencies.
 */

const program  = require('commander');

const findUser = require('./controllers/controller.js');

program
    .version('1.0.0')

program
    .command('find <username>')
    .alias('f')
    .description('Find users from github')
    .action(username => findUser(username));

program.parse(process.argv);

