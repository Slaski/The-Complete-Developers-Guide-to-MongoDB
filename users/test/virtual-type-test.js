const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
  it('postCount returns number of posts', done => {
    let joe = new User({
      name: 'Joe',
      posts: [{ title: 'Post Title' }]
    });

    joe
      .save()
      .then(() => User.findById(joe._id))
      .then(user => {
        assert(user.postCount === 1);
        done();
      });
  });
});
