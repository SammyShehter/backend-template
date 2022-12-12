import fs from "fs"
import {Request, Response} from "express"
import {ErrorCodes} from "./error.utils"

const date = (): string => {
    return new Date().toLocaleString("he-IL")
}

export const handleSuccess = (
    data: any,
    res: Response,
    status: number = 200
): Response => {
    return res.status(status).json({status: "SUCCESS", data})
}

export const handleError = (
    error: any,
    req: Request,
    res: Response,
    status: number = 400
): Response => {
    const isSystemError: boolean = !!error.stack
    const errorLog: string[] | string = isSystemError
        ? error.stack.split(" at ")
        : error.innerMessage
    const message = `
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        REQUEST ${status === 400 ? "ERROR" : "WARNING"}!     
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Request ID: ${req.correlation_id}
Error Time: ${date()}
${
    isSystemError
        ? "Error in: " + errorLog[1] + "\n" + errorLog[0]
        : "Error: " + errorLog
}
    `
    fs.appendFile(
        "error.log",
        message,() => {}
    )
    return res.status(status).json({
        status: "FAILURE",
        errors: isSystemError
            ? [{message: ErrorCodes.GENERAL_ERROR.message}]
            : [{message: error.message, action: error.action}],
    })
}

export const handle404 = (req: Request, res: Response): Response => {
    const message = `
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            404 REQUEST
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Request ID: ${req.correlation_id}
Request Time: ${date()}
Requested Path: ${req.originalUrl}
        `
    console.log(message)
    fs.appendFile("404.log", message, () => {})
    return res
        .status(404)
        .json({status: "FAILURE", errors: [{message: "404 not found"}]})
}
