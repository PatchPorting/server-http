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

const assert = require('assert');

const utils = require('../lib/utils');
const setupDefault = require('../lib/defaults/setup.json');


const dbg = utils.dbg(__filename);


// This server is the same that app, isn't it?
module.exports = function initModels(server) { // eslint-disable-line no-unused-vars
  const setupM = server.models.setup;
  const name = 'default';

  dbg('Starting, default setup', setupDefault);
  // We want the last added one, the rest are kept for historical reasons.
  setupM.find({ where: { name }, limit: 1, order: 'id DESC' })
  .then((setupDb) => {
    let create = false;
    dbg('Setup received', setupDb[0]);
    const setupFound = setupDb[0];

    if (!setupFound) {
      dbg('Setup NOT found');
      create = true;
    } else {
      try {
        assert.deepEqual(setupFound.content, setupDefault);
        dbg('Same setup found');
        // Storing it in memory to avoid a new DB request each time we need it
        // in the server.
        global.setupDefaultId = setupFound.id;
      } catch (err) {
        dbg('Different setup found');
        create = true;
      }
    }

    if (!create) { return; }

    dbg('Creating default setup ...');
    // Reusing the object.
    setupM.create({ name, content: setupDefault })
    .then((setupCreated) => {
      dbg('Default setup created', setupCreated);

      global.setupDefaultId = setupCreated.id;
    })
    .catch((err) => {
      utils.logger.error('Adding default setup', err);
      process.exit(1);
    });
  })
  .catch((err) => {
    utils.logger.error('Finding default setup', err);
    process.exit(1);
  });
};
