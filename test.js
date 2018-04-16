const {findUser} = require('./controllers/controller')
const assert = require('assert');

describe('demo test', () => {
    it('return specific user', () => {
        const user = 'joshuaagapay';

        findUser(user, (result) => {
            assert(user === result.login);
        });
    });
});