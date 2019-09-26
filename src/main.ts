import * as core from '@actions/core';
import Setter = require ('./ConnectionStringSetter');

async function run() {
  try {
    let connectionStringSetter = new Setter.ConnectionStringSetter(core, process.platform);
    connectionStringSetter.setConnectionString();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
