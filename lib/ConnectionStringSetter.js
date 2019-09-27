"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConnectionStringSetter {
    constructor(coreLib, platform, exec, libPath) {
        this._platform = platform;
        this._coreLib = coreLib;
        this._exec = exec;
        this._libRootPath = libPath;
    }
    setConnectionString() {
        // get all the inputs
        let servicePrincipal = this._coreLib.getInput('servicePrincipal');
        let servicePrincipalTenant = this._coreLib.getInput('servicePrincipalTenant');
        let servicePrincipalSecret = this._coreLib.getInput('servicePrincipalSecret');
        let azureSubscriptionName = this._coreLib.getInput('azureSubscriptionName');
        let resourceGroup = this._coreLib.getInput('resourceGroup');
        let appService = this._coreLib.getInput('appService');
        let connectionStringType = this._coreLib.getInput('connectionStringType');
        let connectionString = this._coreLib.getInput('connectionString');
        let connectionStringName = this._coreLib.getInput('connectionStringName');
        // ouptut inputs
        this._coreLib.debug("input params:");
        this._coreLib.debug("    servicePrincipal: " + servicePrincipal);
        this._coreLib.debug("    servicePrincipalTenant: " + servicePrincipalTenant);
        this._coreLib.debug("    servicePrincipalSecret: " + servicePrincipalSecret);
        this._coreLib.debug("    azureSubscriptionName: " + azureSubscriptionName);
        this._coreLib.debug('    resourceGroup: ' + resourceGroup);
        this._coreLib.debug('    appService: ' + appService);
        this._coreLib.debug('    connectionStringType: ' + connectionStringType);
        this._coreLib.debug('    connectionString: ' + connectionString);
        this._coreLib.debug('    connectionStringName: ' + connectionStringName);
        this._coreLib.debug('');
        // setting connection string based on linux/win platform
        if (this._platform === 'win32') {
            this._coreLib.debug('on win32');
            this.setConnectionStringForWindows(servicePrincipal, servicePrincipalTenant, servicePrincipalSecret, azureSubscriptionName, resourceGroup, appService, connectionStringType, connectionString, connectionStringName);
        }
        else {
            this._coreLib.debug('on linux');
            this.setConnectionStringForLinux(servicePrincipal, servicePrincipalTenant, servicePrincipalSecret, azureSubscriptionName, resourceGroup, appService, connectionStringType, connectionString, connectionStringName);
        }
    }
    setConnectionStringForLinux(servicePrincipal, servicePrincipalTenant, servicePrincipalSecret, azureSubscriptionName, resourceGroup, appService, connectionStringType, connectionString, connectionStringName) {
        // figure out where the bash script is to set the connectin string
        let bashScriptPath = this._libRootPath + "/updateConnectionString.sh";
        this._coreLib.debug("    bash script path: " + bashScriptPath);
        // craft the command line call
        let commandLineCall = `${bashScriptPath} ${servicePrincipal} ${servicePrincipalTenant} ${servicePrincipalSecret} ${azureSubscriptionName} ${resourceGroup} ${appService} ${connectionStringType} "${connectionString}" "${connectionStringName}"`;
        this._coreLib.debug("    commandLineCall: " + commandLineCall);
        this._coreLib.debug("");
        // call bash script 
        let self = this;
        this._exec("sh " + commandLineCall, function (err, stdout, stderr) {
            if (err) {
                // should have err.code
                // self._coreLib.setFailed(err);
            }
            console.log(stdout);
            console.log("Done setting connection string");
        });
    }
    setConnectionStringForWindows(servicePrincipal, servicePrincipalTenant, servicePrincipalSecret, azureSubscriptionName, resourceGroup, appService, connectionStringType, connectionString, connectionStringName) {
        // figure out where the bash script is to set the connectin string
        let scriptPath = this._libRootPath + "/updateConnectionString.ps1";
        this._coreLib.debug("    powershell script path: " + scriptPath);
        // craft the command line call
        let commandLineCall = "powershell -command " + `${scriptPath} -servicePrincipal ${servicePrincipal} -servicePrincipalTenant ${servicePrincipalTenant} -servicePrincipalSecret ${servicePrincipalSecret} -azureSubscriptionName ${azureSubscriptionName} -resourceGroup ${resourceGroup} -appService ${appService} -connectionStringType ${connectionStringType} -connectionString "'${connectionString}'" -connectionStringName "${connectionStringName}"`;
        this._coreLib.debug("    commandLineCall: " + commandLineCall);
        this._coreLib.debug("");
        // call bash script 
        let self = this;
        this._exec(commandLineCall, function (err, stdout, stderr) {
            if (err) {
                // should have err.code
                self._coreLib.setFailed(err);
            }
            console.log(stdout);
            console.log("Done setting connection string");
        });
    }
}
exports.ConnectionStringSetter = ConnectionStringSetter;
