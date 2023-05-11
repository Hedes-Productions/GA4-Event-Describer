const http = require('http');
const destroyer = require('server-destroy');
const url = require('url');
const { google } = require('googleapis');
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

exports.authenticate = async (scopes) => {
  const { default: open } = await import('open');
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes.join(' '),
  });

  return new Promise((resolve, reject) => {
    const requestHandler = async (req, res) => {
      try {
        if (req.url.indexOf('/oauth2callback') > -1) {
          const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
          const { tokens } = await oauth2Client.getToken(qs.get('code'));
          oauth2Client.setCredentials(tokens);
          res.end('Authentication successful! Please return to the console.');
          serverInstance.destroy();
          resolve(oauth2Client);
        }
      } catch (e) {
        console.log(e);
        reject(e);
      }
    };

    const serverInstance = http.createServer((req, res) => {
      res.writeHead(200);
      res.end('OK');
    });

    serverInstance.listen(3000, () => {
      // open the browser to the authorize url to start the workflow
      open(authorizeUrl, { wait: false }).then((cp) => cp.unref());
    });

    destroyer(serverInstance);

    serverInstance.on('request', requestHandler);
    serverInstance.on('error', reject);
  });
};
