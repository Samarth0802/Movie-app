import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routers/auth.routes.js';
import handleError from './middleware/error.middleware.js';
import adminRouter from './routers/admin.routes.js'
import movieRouter from './routers/tmdb.routes.js';
const app = express();

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.use('/api/auth',authRouter)
app.use('/api/admin',adminRouter)
app.use('/api/movie',movieRouter)


app.use(handleError)

export default app;