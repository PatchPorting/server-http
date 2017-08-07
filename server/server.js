/*
  Copyright (c) 2017 IBM Corp.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*/

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const utils = require('./lib/utils');

const dbg = utils.dbg(__filename);
const app = module.exports = loopback();


app.start = () => {
  dbg('Starting the web server ...');

  return app.listen(() => {
    app.emit('started');

    // The one returned by Bluemix includes a "/" at the end.
    const baseUrl = app.get('url').replace(/\/$/, '');
    dbg(`Web server listening at: ${baseUrl}`);

    const urlsInfo = { url: baseUrl };
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      urlsInfo.explorer = `${baseUrl}${explorerPath}`;
    }
    utils.logger.info('Browse your REST API at', urlsInfo);
  });
};


// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
dbg('Booting ...');
boot(app, __dirname, (err) => {
  if (err) {
    utils.logger.error('Bootstrapping the app', err);

    process.exit(1);
  }

  // To allow SSL in Bluemix.
  app.enable('trust proxy');

  // start the server if `$ node server.js`
  if (require.main === module) {
    dbg('Starting via "node server.js" ...');
    app.start();
  }
});
