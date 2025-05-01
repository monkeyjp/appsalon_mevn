import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { db } from './config/db.js'


//enviroment variable
dotenv.config()


//config app
const app = express()

//read data via body
app.use(express.json())

//connect db
db()

//CORS configuartion

const whiteList = [process.env.FRONTEND_URL, undefined]

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            //permit
            callback(null, true)
        } else {
            // block
            callback(new Error('CORS error'))
        }

    }
}

app.use(cors(corsOptions))


// define path
app.use('/api/services', servicesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/users', userRoutes)


// define port
const PORT = process.env.PORT || 4000


//run app
app.listen(PORT, () => {
    console.log(colors.blue("server running in : " + colors.bold(PORT)));

})
