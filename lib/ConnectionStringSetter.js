"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
class ConnectionStringSetter {
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
exports.ConnectionStringSetter = ConnectionStringSetter;
