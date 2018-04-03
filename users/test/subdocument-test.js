const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: 'Joe', posts: [{ title: 'First Post' }] });
    joe.save().then(() => {
      done();
    });
  });

  it('can create subdocument', done => {
    let alex = new User({
      name: 'Alex',
      posts: [{ title: 'Post Title' }]
    });

    alex
      .save()
      .then(() => User.findById(alex._id))
      .then(user => {
        assert(user);
        assert(user._id.toHexString() === alex._id.toHexString());
        assert(user.posts.length === 1);
        assert(user.posts[0].title === 'Post Title');
        done();
      });
  });

  it('can add subdocuments to an existing record', done => {
    joe.posts.push({ title: 'New Post' });

    joe
      .save()
      .then(() => User.findById(joe._id))
      .then(user => {
        assert(user);
        assert(user.posts.length === 2);
        assert(user.posts[1].title === 'New Post');
        done();
      });
  });

  it('can remove existing subdocuments', done => {
    joe.posts[0].remove();

    joe
      .save()
      .then(() => User.findById(joe._id))
      .then(user => {
        assert(user);
        assert(user.posts.length === 0);
        done();
      });
  });
});
