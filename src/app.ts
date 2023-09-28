import express, { Express, NextFunction, Request, Response } from 'express'
import path from 'path'
import session from 'express-session'
import flash from 'express-flash'
import expressLayouts from 'express-ejs-layouts'
import initRoute from './routes'
import connectToDatabase from './utils/mongoDb'
import methodOverride from 'method-override'

const app: Express = express()
const port: number = 3000

// Middleware
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', 'src/views')
app.use(expressLayouts)
app.set('layout extractScripts', true)
app.use(methodOverride('_method'))

// Session & flashmess
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    })
)
app.use(flash())

// Static file
app.use('/public', express.static(path.join(__dirname, '../public')))

app.use((req: Request, res: Response, next: NextFunction): void => {
    res.locals.path = req.url
    next()
})

// Init routes
initRoute(app)

connectToDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`App is running on http://localhost:${port}`)
        })
    })
    .catch((err) => console.log(err))
