// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

'use strict';

const {assert} = require('chai');
const cp = require('child_process');
const {describe, it, after, before} = require('mocha');
const uuid = require('uuid');
const {RealmsServiceClient} = require('@google-cloud/game-servers');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

describe('Quickstart', () => {
  let projectId;
  let client;
  const location = 'us-central1';
  const realmId = `realm-${uuid.v4().split('-')[0]}`;

  before(async () => {
    client = new RealmsServiceClient();
    projectId = await client.getProjectId();
  });

  it('should run quickstart', async () => {
    const stdout = execSync(
      `node quickstart.js ${projectId} ${location} ${realmId}`
    );
    assert.include(stdout, 'Realm created:');
  });

  after(async () => {
    const [operation] = await client.deleteRealm({
      name: client.realmPath(projectId, location, realmId),
    });
    await operation.promise();
  });
});
