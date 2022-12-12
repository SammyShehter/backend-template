import express from "express"
import MainMiddleware from "../middlewares/main.middleware"
import MainController from "../controllers/main.controller"

export const router = express.Router()

router.get(
    "/",
    MainMiddleware.templateCheck,
    MainController.templateAnswer
)

router.post(
    "/",
    MainMiddleware.templateCheck,
    MainController.templateAnswer
)
