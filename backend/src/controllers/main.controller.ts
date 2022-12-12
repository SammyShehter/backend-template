import {Request, Response} from "express"
import MainService from "../services/main.service"
import {handleError, handleSuccess} from "../utils/common.utils"

class MainController {
    constructor() {
        console.log("MainController instance created")
    }

    templateAnswer = async (req: Request, res: Response) => {
        try {
            const data = await MainService.templateAnswer()

            return handleSuccess(data, res)
        } catch (error) {
            return handleError(error, req, res)
        }
    }
}

export default new MainController()
