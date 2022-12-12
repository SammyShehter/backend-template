import mongoose, {Schema} from "mongoose"
import {EventEmitter} from "stream"

class MongooseService {
    private mainSchema = new Schema<any>(
        {
            data: {type: String, require: true, unique: true},
        },
        {timestamps: true, versionKey: false}
    )
    constructor() {
        console.log("MongooseService instance created")
    }

    static connectWithRetry = (
        eventEmmiter: EventEmitter,
        count: number = 0,
        retryAttempt: number = 5,
        retrySeconds: number = 5
    ) => {
        if (count >= retryAttempt) {
            console.log("Connection to Mongo DB failed")
            process.exit(1)
        }
        console.log("Attemptin to connect to Mongo DB")
        mongoose
            .connect(process.env["MONGO_CONNECTION_STRING"] as string)
            .then(() => {
                console.log("MongoDB is connected")
                eventEmmiter.emit("ready")
            })
            .catch(async (err) => {
                count++
                console.log(
                    `MongoDB connection failed, will retry ${count}/${retryAttempt} attempt after ${retrySeconds} seconds`,
                    err.message
                )
                setTimeout(
                    () => MongooseService.connectWithRetry(eventEmmiter, count),
                    retrySeconds * 1000
                )
            })
    }

    mainStorage = mongoose.model<any>("mainInfo", this.mainSchema)

    templateAnswer = async (): Promise<any> => {
        // return this.mainStorage.findOne({data}, {_id: 0}).lean().exec()
        return {data: "Hello"}
    }
}

export default MongooseService
