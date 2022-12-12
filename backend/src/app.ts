import express from "express"
import mainMiddleware from "./middlewares/main.middleware"
import {router as mainRouter} from "./router/main.router"
import {handle404} from "./utils/common.utils"
import {init, initEvents} from "./utils/init.util"

const app = express()

app.use(express.json())
app.use(mainMiddleware.saveRequest)
app.use("/", mainRouter)
app.use(handle404)

init()

// ignite
initEvents.once("ready", () => {
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`)
    })
})
