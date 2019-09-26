export class ConnectionStringSetter {
    resourceGroup: string;
    appService: string;
    connectionStringType: string;
    connectionString: string;

    constructor(coreLib) {
        // get all the inputs
        this.resourceGroup = coreLib.getInput('resourceGroup');
        this.appService = coreLib.getInput('appService');
        this.connectionStringType = coreLib.getInput('connectionStringType');
        this.connectionString = coreLib.getInput('connectionString');
    }

    setConnectionString() {
        console.log('resourceGroup: ' + this.resourceGroup);
        console.log('appService: ' + this.appService);
        console.log('connectionStringType: ' + this.connectionStringType);
        console.log('connectionString: ' + this.connectionString);

        console.log('');

        console.log('Setting connection string...')
        if (process.platform === 'win32') {
            console.log('    on win32');
        }
        else {
            console.log('    on linux');
        }

        console.log ('Done setting connection string')
    }
}