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


const utils = require('../lib/utils');


module.exports = (Model) => {
  // Model.disableRemoteMethodByName('prototype.__create__results', false);
  // Model.disableRemoteMethodByName('prototype.__delete__results', false);
  Model.disableRemoteMethodByName('prototype.__destroyById__results', false);
  Model.disableRemoteMethodByName('prototype.__findById__results', false);
  Model.disableRemoteMethodByName('prototype.__updateById__results', false);
  // Only those created through the API.
  Model.beforeRemote('create', (ctx, modelInstance, next) => {
    /* eslint-disable no-param-reassign */
    ctx.req.body.mode = 'manual';

    next();
  });

  // Those created through the API or using the model directly (worker).
  Model.observe('before save', (ctx, next) => {
    // We only want to do this on creation.
    if (ctx.isNewInstance) {
      // eslint-disable-next-line arrow-body-style
      ctx.instance.hunks = utils.map(ctx.instance.hunks, (hunkContent) => {
      /* eslint-enable no-param-reassign */
        return {
          id: hunkContent.id,
          setupId: hunkContent.setupId || global.setupDefaultId,
        };
      });
    }

    next();
  });
};
