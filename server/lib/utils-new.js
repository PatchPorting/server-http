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

// TODO: Rename to utils and push to the GitHub repo. (shared with other projects)

const path = require('path');

// Lodash as base.
const utils = require('lodash');
const debug = require('debug');


function pathToTag(fullPath) {
  const res = path.basename(fullPath, '.js');

  if (!res || res === fullPath) {
    throw new Error('Bad path');
  } else {
    return res;
  }
}


// Basis.

utils.debug = (projectName, fullPath) => debug(`${projectName}:${pathToTag(fullPath)}`);

utils.validator = require('validator');


// TODO: Change to async, not a big deal, only once at the start.
utils.requireDir = require('require-directory');

utils.pathToTag = pathToTag;


module.exports = utils;
