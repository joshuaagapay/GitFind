const request = require('request');

const findUser = (name) => {

    const options = {
        url:`https://api.github.com/users/${name}`,
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