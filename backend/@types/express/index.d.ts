import express = require("express")
import {decodedUser} from "../../src/common/common.types"

declare global {
    namespace Express {
        interface Request {
            correlation_id: string
            data: any
        }
    }
}
