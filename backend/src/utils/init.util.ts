import Mongo from "../services/mongo.service"
import {EventEmitter} from "stream"

export const initEvents = new EventEmitter()

export function init() {
    //check that env file exists
    if (process.env.INIT !== "fine") {
        console.log("env file is not confiured")
        process.exit(1)
    }

    // check data base connection
    Mongo.connectWithRetry(initEvents)
}
