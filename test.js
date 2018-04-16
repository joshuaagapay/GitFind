const findUser = require('./controllers/controller')
const assert = require('assert');
const request = require('request');

describe('demo test', () => {
    it('return specific user', () => {
        const user = 'joshuaagapay';

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

        findUser(user, (result) => {
            assert(user === result.login);
        });
    });
});