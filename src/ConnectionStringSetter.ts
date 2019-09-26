import * as core from '@actions/core';

export class ConnectionStringSetter {
    resourceGroup: string;
    appService: string;
    connectionStringType: string;
    connectionString: string;

    constructor() {
        // get all the inputs
        this.resourceGroup = core.getInput('resourceGroup');
        this.appService = core.getInput('appService');
        this.connectionStringType = core.getInput('connectionStringType');
        this.connectionString = core.getInput('connectionString');
    }

    setConnectionString() {
        console.log('appService: ' + this.appService);
        console.log('connectionStringType: ' + this.connectionStringType);
        console.log('connectionString: ' + this.connectionString);
    }
}