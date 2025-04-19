import { log } from "console"
import dotenv from "dotenv"
import path from "path"

dotenv.config({path: path.join(__dirname, '../../.env')})


export default{
    env: process.env.NODE_ENV || 'development',
    //secret: process.env.secret || 'default secret',
    logDir: process.env.LOG_DIR || './logs',
    isDev: process.env.NODE_ENV === 'development',
}