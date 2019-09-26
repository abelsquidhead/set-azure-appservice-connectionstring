export class ConnectionStringSetter {
    private _platform: string;
    private _coreLib;
    private _exec;
    private _libRootPath;

    constructor(coreLib, 
                platform: string,
                exec,
                libPath: string )
    {
        this._platform = platform;
        this._coreLib = coreLib;
        this._exec = exec;
        this._libRootPath = libPath;
    }

    setConnectionString() {
        // get all the inputs
        let servicePrincipal: string = this._coreLib.getInput('servicePrincipal');
        let servicePrincipalTenant: string = this._coreLib.getInput('servicePrincipalTenant');
        let servicePrincipalSecret: string = this._coreLib.getInput('servicePrincipalSecret');
        let resourceGroup: string = this._coreLib.getInput('resourceGroup');
        let appService:string = this._coreLib.getInput('appService');
        let connectionStringType: string = this._coreLib.getInput('connectionStringType');
        let connectionString: string = this._coreLib.getInput('connectionString');

        // ouptut inputs
        console.log("input params:")
        console.log ("   servicePrincipal: " + servicePrincipal);
        console.log("    servicePrincipalTenant: " + servicePrincipalTenant);
        console.log("    servicePrincipalSecret: " + servicePrincipalSecret);
        console.log('    resourceGroup: ' + resourceGroup);
        console.log('    appService: ' + appService);
        console.log('    connectionStringType: ' + connectionStringType);
        console.log('    connectionString: ' + connectionString);

        console.log('');

        // setting connection string based on linux/win platform
        console.log('Setting connection string...')
        if (this._platform === 'win32') {
            console.log('    on win32');
        }
        else {
            console.log('    on linux');
            this.setConnectionStringForLinux(servicePrincipal,
                                             servicePrincipalTenant,
                                             servicePrincipalSecret,
                                             resourceGroup,
                                             appService,
                                             connectionStringType,
                                             connectionString);
        }


    }


    private setConnectionStringForLinux(servicePrincipal: string,  
                                        servicePrincipalTenant: string,  
                                        servicePrincipalSecret: string,
                                        resourceGroup: string,
                                        appService: string,
                                        connectionStringType: string,
                                        connectionString) {
        // figure out where the bash script is to set the connectin string
        let bashScriptPath = this._libRootPath + "/updateConnectionString.sh"
        console.log("    bash script path: " + bashScriptPath);
        
        // craft the command line call
        let commandLineCall = `sh ${bashScriptPath} ${servicePrincipal} ${servicePrincipalTenant} ${servicePrincipalSecret} ${resourceGroup} ${appService} ${connectionStringType} ${connectionString}`;
        console.log("    commandLineCall: " + commandLineCall);
        
        // call bash script 
        let self = this;
        this._exec(commandLineCall, function(err, stdout, stderr) {
            if (err) {
                // should have err.code
                console.log("    fuck! error occured. Error code: " + err.code); 
                console.log("    error: " + err);
            }
            console.log(stdout);
            self._coreLib.error(stderr);
            console.log("Done setting connection string");
        })
    }
}