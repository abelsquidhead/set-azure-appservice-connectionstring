export class ConnectionStringSetter {
    resourceGroup: string;
    appService: string;
    connectionStringType: string;
    connectionString: string;

    private _platform: string;
    private _coreLib;

    constructor(coreLib, 
                platform: string) 
    {

        // get all the inputs
        this.resourceGroup = coreLib.getInput('resourceGroup');
        this.appService = coreLib.getInput('appService');
        this.connectionStringType = coreLib.getInput('connectionStringType');
        this.connectionString = coreLib.getInput('connectionString');

        this._platform = platform;
        this._coreLib = coreLib;
    }

    setConnectionString() {
        console.log('resourceGroup: ' + this.resourceGroup);
        console.log('appService: ' + this.appService);
        console.log('connectionStringType: ' + this.connectionStringType);
        console.log('connectionString: ' + this.connectionString);

        console.log('');

        console.log('Setting connection string...')
        if (this._platform === 'win32') {
            console.log('    on win32');
        }
        else {
            this.setConnectionStringForLinux();
        }

        console.log ('Done setting connection string')
    }


    private setConnectionStringForLinux() {
        let self = this;
        let exec = require('child_process').exec;
        exec("az", function(err, stdout, stderr) {
            if (err) {
                // should have err.code
                console.log("fuck! error occured. Error code: " + err.code);
            }
            console.log(stdout);
            self._coreLib.error(stderr);
        })
    }
}