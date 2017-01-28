const deps = require('dist/server/dependencies').default;

describe('Models :: User', function() {
  let di;
  let $User;

  function init() {
    di = deps();
    $User = di.get('$User');
  }

  it('Works', function(done) {
    const user = new $User({
      profile: {
        name: { first: 'Student', last: 'User' },
        email: 'student@artofmetrics.com'
      }
    });

    done();
  });
});