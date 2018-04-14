const request = require('request');
const Table   = require('cli-table2');


const findUser = (username, handleResult) => {

    const options = {
        url:`https://api.github.com/users/${username}`,
        method: 'GET',
        headers: {
            'User-Agent': 'joshuaagapay'
        },

    }

    request(options, (err, res, body) => {
       let json = JSON.parse(body);
        handleResult(json);
    });
}

const printUsers = (users) => {
    const table = new Table({
        head: ['Name', 'Followers','Following'],
        colWidths:[30,11,11]
    });

    users.forEach(element => {
        findUser(element,(result) => {
            table.push([result.name,result.followers,result.following]);
            console.log(table.toString());
        });
    });
    
}

module.exports = {findUser, printUsers};