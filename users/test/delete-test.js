const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save()
            .then(() => { done(); });
    })

    it('model instance remove', (done) => {
        joe.remove()
            .then(() => User.findById(joe._id))
            .then((user) => {
                assert(!user);
                done();
            });
    });

    it('class method remove', (done) => {
        User.remove({ name: joe.name })
            .then(() => User.findById(joe._id))
            .then((user) => {
                assert(!user);
                done();
            });
    });

    it('class method findOneAndRemove', (done) => {
        User.findOneAndRemove({ name: joe.name })
            .then(() => User.findById(joe._id))
            .then((user) => {
                assert(!user);
                done();
            });
    });

    it('class methods findByIdAndRemove', (done) => {
        User.findByIdAndRemove(joe._id)
            .then(() => User.findById(joe._id))
            .then((user) => {
                assert(!user);
                done();
            }); 
    });
});