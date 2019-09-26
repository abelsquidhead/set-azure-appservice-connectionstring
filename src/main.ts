import * as core from '@actions/core';
import Setter = require ('./ConnectionStringSetter');

async function run() {
  try {
    let connectionStringSetter = new Setter.ConnectionStringSetter(core, process.platform, require('child_process').exec, __dirname);
    connectionStringSetter.setConnectionString();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
