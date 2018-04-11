const program = require('commander');
const findUser = require('./controllers/controller.js');

program
    .version('1.0.0')

program
    .command('find <name>')
    .alias('f')
    .description('Find users from github')
    .action(name => findUser(name));

program.parse(process.argv);

