const request = require('request');

const findUser = (username) => {

    const options = {
        url:`https://api.github.com/users/${username}`,
        method: 'GET',
        headers: {
            'User-Agent': 'joshuaagapay'
        }
    }

    request(options, (err, res, body) => {
        let json = JSON.parse(body);
        console.info(json);
    });
}

module.exports = findUser;