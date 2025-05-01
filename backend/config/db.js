import mongoose from 'mongoose'
import colors from 'colors'

export const db = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL)
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(colors.cyan(`MongoDB connect succes: ${colors.bold(url)}`));

    } catch (error) {
        console.log(colors.red(`Error: ${error.message}`));
        process.exit(1)
    }
}