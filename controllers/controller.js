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
    let table = new Table({
        head: ['ID','USERNAME','NAME', 'FOLLOWERS','FOLLOWING'],
        colWidths:[15,20,30,11,11]
    });
    users.forEach((element,index) => {
        findUser(element,(result) => {
            table.push([result.id,result.login,result.name,result.followers,result.following]);
            if(index == users.length-1){
                console.log(table.toString());
                return;
            }
        });
    });
    // console.log(table.toString());
   
}

module.exports = {findUser, printUsers};