"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
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
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
