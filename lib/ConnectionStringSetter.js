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
        console.log("input params:");
        console.log("    servicePrincipal: " + servicePrincipal);
        console.log("    servicePrincipalTenant: " + servicePrincipalTenant);
        console.log("    servicePrincipalSecret: " + servicePrincipalSecret);
        console.log("    azureSubscriptionName: " + azureSubscriptionName);
        console.log('    resourceGroup: ' + resourceGroup);
        console.log('    appService: ' + appService);
        console.log('    connectionStringType: ' + connectionStringType);
        console.log('    connectionString: ' + connectionString);
        console.log('    connectionStringName: ' + connectionStringName);
        console.log('');
        // setting connection string based on linux/win platform
        if (this._platform === 'win32') {
            console.log('on win32');
            this.setConnectionStringForWindows(servicePrincipal, servicePrincipalTenant, servicePrincipalSecret, azureSubscriptionName, resourceGroup, appService, connectionStringType, connectionString, connectionStringName);
        }
        else {
            console.log('on linux');
            this.setConnectionStringForLinux(servicePrincipal, servicePrincipalTenant, servicePrincipalSecret, azureSubscriptionName, resourceGroup, appService, connectionStringType, connectionString, connectionStringName);
        }
    }
    setConnectionStringForLinux(servicePrincipal, servicePrincipalTenant, servicePrincipalSecret, azureSubscriptionName, resourceGroup, appService, connectionStringType, connectionString, connectionStringName) {
        // figure out where the bash script is to set the connectin string
        let bashScriptPath = this._libRootPath + "/updateConnectionString.sh";
        console.log("    bash script path: " + bashScriptPath);
        // craft the command line call
        let commandLineCall = `${bashScriptPath} ${servicePrincipal} ${servicePrincipalTenant} ${servicePrincipalSecret} ${azureSubscriptionName} ${resourceGroup} ${appService} ${connectionStringType} "${connectionString}" "${connectionStringName}"`;
        console.log("    commandLineCall: " + commandLineCall);
        console.log("");
        // call bash script 
        let self = this;
        this._exec("sh " + commandLineCall, function (err, stdout, stderr) {
            if (err) {
                // should have err.code
                // console.log("        fuck! error occured. Error code: " + err.code); 
                // console.log("        error: " + err);
            }
            console.log(stdout);
            console.log("Done setting connection string");
        });
    }
    setConnectionStringForWindows(servicePrincipal, servicePrincipalTenant, servicePrincipalSecret, azureSubscriptionName, resourceGroup, appService, connectionStringType, connectionString, connectionStringName) {
        // figure out where the bash script is to set the connectin string
        let bashScriptPath = this._libRootPath + "/updateConnectionString.ps1";
        console.log("    bash script path: " + bashScriptPath);
        // craft the command line call
        let commandLineCall = "powershell -command " + `${bashScriptPath} ${servicePrincipal} ${servicePrincipalTenant} ${servicePrincipalSecret} ${azureSubscriptionName} ${resourceGroup} ${appService} ${connectionStringType} "${connectionString}" "${connectionStringName}"`;
        console.log("    commandLineCall: " + commandLineCall);
        console.log("");
        // call bash script 
        let self = this;
        this._exec(commandLineCall, function (err, stdout, stderr) {
            if (err) {
                // should have err.code
                // console.log("        fuck! error occured. Error code: " + err.code); 
                // console.log("        error: " + err);
            }
            console.log(stdout);
            console.log("Done setting connection string");
        });
    }
}
exports.ConnectionStringSetter = ConnectionStringSetter;
