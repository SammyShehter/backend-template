import {userErrorMessage} from "../types/error.type"

export class ErrorCodes {
    static get GENERAL_ERROR(): userErrorMessage {
        return {
            message: "GENERAL ERROR",
            action: "action message",
            innerMessage: "inner message",
        }
    }
}
