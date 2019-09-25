import * as core from '@actions/core';
import {wait} from './wait'

async function run() {
  try {
    // get input value for resource group
    const resourceGroup = core.getInput('resourceGroup');
    console.log('resourceGroup: ${resourceGroup}');

    //get input value for app service name
    const appService = core.getInput('appService');
    console.log('appService: ${appService}');

    // get inptu value for the type of connection string
    const connectionStringType = core.getInput('connectionStringType');
    console.log('connectionStringType: ${connectionStringType}');

    // get input value for the connection string
    const connectionString = core.getInput('connectionString');
    console.log('connectionString: ${connectionString}');

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
