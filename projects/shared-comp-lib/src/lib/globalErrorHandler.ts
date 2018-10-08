import { ErrorHandler } from "@angular/core";

// @dynamic
export class GlobalErrorHandler implements ErrorHandler {
    handleError(error:Error) {
        console.log('global exception : ' + error.name + '  ' + error.message)
        console.log(error.stack);
    }
}