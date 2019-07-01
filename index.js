#!/usr/bin/env node

/**
 * Module dependencies.
 */

const program  = require('commander');

const {printUsers} = require('./controllers/controller.js');

const find = (username) => {
    return username.split(',');
   
};

program
    .version('0.1.0')

program
    .usage('[options] <username...>')
    .option('-f, --find <username>', ' ', find)
    .description('Find users from github')


program.parse(process.argv);

let users = program.find;

printUsers(users);

            


