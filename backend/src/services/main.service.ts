import {singleAnswer} from "../types/http.types"
import {ErrorCodes} from "../utils/error.utils"
import MongooseService from "./mongo.service"

class MainService {
    private db: MongooseService

    constructor(DB: any) {
        this.db = new DB()
        console.log("MainService instance created")
    }


    templateAnswer = async (): Promise<singleAnswer> => {
        const {data} = await this.db.templateAnswer()
        
        if (!data) {
            throw ErrorCodes.GENERAL_ERROR
        }

        return {
            message: data,
        }
    }

}

export default new MainService(MongooseService)
