const request = require('request');

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

module.exports = findUser;