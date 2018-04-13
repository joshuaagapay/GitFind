#!/usr/bin/env node

/**
 * Module dependencies.
 */

const program  = require('commander');

const findUser = require('./controllers/controller.js');

const find = (username) => {
    return username.split(",");
};

program
    .version('1.0.0')

program
    .usage('find <username>')
    .alias('f')
    .description('Find users from github')
    .action(username => findUser(username, (result) => {
        console.log(result);
    })
    );

program.parse(process.argv);


