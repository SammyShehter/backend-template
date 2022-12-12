import fs from "fs"
import {randomUUID} from "crypto"
import {Request, Response, NextFunction} from "express"

class MainMiddleware {
    constructor() {
        console.log("MainMiddleware instance created")
    }

    saveRequest = async (
        req: Request,
        _: Response,
        next: NextFunction
    ): Promise<void> => {
        req.correlation_id = randomUUID()
        const message = `
Request ID: ${req.correlation_id}
Method: ${req.method} 
Requested URL: ${req.originalUrl} 
${
    Object.keys(req.body).length !== 0
        ? "Request Body: " + JSON.stringify(req.body) + "\n"
        : ""
}`
        console.log(message)

        fs.appendFile("app.log", message, () => {})
        next()
    }

    templateCheck = (req: Request, _: Response, next: NextFunction) => {
        console.log('Middleware fired');
        next()
    }
}

export default new MainMiddleware()
