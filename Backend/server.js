import dotenv from 'dotenv'
import app from './src/app.js'
import connectToDb from './src/config/database.js';
dotenv.config()

const port = process.env.PORT || 3000;
connectToDb()

app.listen(port,()=>{
    console.log("Connected to port 3000")
})