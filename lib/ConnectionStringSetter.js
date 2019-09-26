"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConnectionStringSetter {
    constructor(coreLib) {
        // get all the inputs
        this.resourceGroup = coreLib.getInput('resourceGroup');
        this.appService = coreLib.getInput('appService');
        this.connectionStringType = coreLib.getInput('connectionStringType');
        this.connectionString = coreLib.getInput('connectionString');
    }
    setConnectionString() {
        console.log('appService: ' + this.appService);
        console.log('connectionStringType: ' + this.connectionStringType);
        console.log('connectionString: ' + this.connectionString);
    }
}
exports.ConnectionStringSetter = ConnectionStringSetter;
