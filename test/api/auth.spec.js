import { Api } from 'dist/server/api';
import { dependencies } from 'dist/server/dependencies';
import express from 'express';
import bodyParser from 'body-parser';
import superagent from 'superagent';
import assert from 'assert';

describe('API :: Auth', function() {
  describe(`POST /register/email`, function() {
    let di;
    let server;
    const PORT = 5858;

    const BASE_URL = `localhost:${ PORT }/api/auth`;

    let $User;
    let $Password
    beforeEach(async function() {
      try {
        di = dependencies();
        $User = di.get('$User');
        $Password = di.get('$Password');

        const app = express();
        app
          .use(bodyParser.json())
          .use(`/api`, Api(di));
        
        server = app.listen(PORT);

        await Promise.all([$User.remove({}), $Password.remove({})]);

      } catch (error) {
        handleError(error);
      }
    });

    afterEach(function() {
      try {
        server.close();
        di.invoke(function(db) {
          db.close();
        });
      } catch (error) {
        handleError(error);
      }
    });

    it('Can register via email', async function() {
      try {
        const res = await superagent  
          .post(`${ BASE_URL }/register/email`)
          .send({ 
            doc : {
              profile: { email: 'test@artofmetrics.com', name: { first: 'Test', last: 'User' } },
            },
            password: 'abc123',
            confirmPassword: 'abc123'
          });
        
        const data = JSON.parse(res.text);

        const doc = await $User.findById(data.user._id).setOptions({ select: 'profile internal' });
        assert.equal(doc.get('profile.email'), 'test@artofmetrics.com');

        const pw = $Password.findById(doc.internal.password);
        assert.ok(pw);
      } catch (error) {
        handleError(error);
      }
    });

  });
});

function handleError(error) {
  console.error(error);
  throw error;
}