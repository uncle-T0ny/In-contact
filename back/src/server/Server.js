const config = require('config');
const Hapi = require('hapi');
const jwt = require('jsonwebtoken');

const db = require('../db');
const { User, Contact } = db.models;


function generateToken(req, GUID, opts) {
  opts = opts || {};

  const expiresDefault = '7d';

  const token = jwt.sign({
    auth: GUID,
    userId: opts.userId,
    agent: req.headers['user-agent']
  }, config.authSecret, { expiresIn: opts.expires || expiresDefault });

  return token;
}

function generateAndStoreToken(req, opts) {
  const GUID = new Date().getTime();
  const token = generateToken(req, GUID, opts);
  return token;
}

function validate(decoded, req, h) {
  if (decoded && decoded.exp > Date.now() / 1000) {
    return { isValid: true };
  } else {
    return { isValid: false };
  }
}


const init = async () => {
  const server = new Hapi.Server({
    host: '0.0.0.0',
    port: 5000,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  await server.register(require('hapi-auth-jwt2'));

  server.auth.strategy('jwt', 'jwt',
    {
      key: config.authSecret,
      validate,
      verifyOptions: { algorithms: ['HS256'] }
    });

  server.auth.default('jwt');

  server.route([
    {
      method: "GET",
      path: "/",
      config: { auth: false },
      handler: function (request, h) {
        return h.response({ text: 'Token not required' });
      }
    },
    {
      method: 'GET',
      path: '/auth/check',
      config: { auth: 'jwt' },
      handler: function (request, h) {
        const response = h.response({ isAuthenticated: true });
        response.header("Authorization", request.headers.authorization);
        return response;
      }
    },
    {
      method: 'POST',
      path: '/auth/register',
      config: { auth: false },
      handler: async function (request, h) {
        const email = request.payload.email.toLowerCase();
        const { password } = request.payload;

        const user = await User.create({ email, password });

        const token = generateAndStoreToken(request, { userId: user.id });

        return h.response({ token });
      }
    },
    {
      method: 'POST',
      path: '/auth/login',
      config: { auth: false },
      handler: async function (request, h) {
        const email = request.payload.email.toLowerCase();
        const { password } = request.payload;

        const user = await User.findOne({ where: { email, password } });
        if (user) {
          const token = generateAndStoreToken(request, { userId: user.id });
          return h.response({ token });
        }

        return h.response().code(401);
      }
    },
    {
      method: 'POST',
      path: '/auth/logout',
      config: { auth: 'jwt' },
      handler: async function (request, h) {
        return h.response();
      }
    },
    {
      method: 'GET',
      path: '/contacts',
      config: { auth: 'jwt' },
      handler: async function (request, h) {
        const { userId } = request.auth.credentials;
        const user = await User.findOne({ where: { id: userId } });

        const contacts = await user.getContacts();
        return h.response({ contacts });
      }
    },
    {
      method: 'PUT',
      path: '/contacts',
      config: { auth: 'jwt' },
      handler: async function (request, h) {
        const { userId } = request.auth.credentials;
        const user = await User.findOne({ where: { id: userId } });

        const contact = await user.createContact(request.payload);
        return h.response({ contactId: contact.id });
      }
    }
  ]);

  server.events.on({ name: 'request', channels: 'error' }, (request, event, tags) => {
    console.log('error', event.error);
  });

  await server.start();
  return server;
};


init().then(server => {
  console.log('Server running at:', server.info.uri);
})
  .catch(error => {
    console.log(error);
  });

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1) //mandatory (as per the Node docs)
});

process.on('unhandledRejection', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1) //mandatory (as per the Node docs)
});