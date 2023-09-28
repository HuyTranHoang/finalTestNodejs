import { Express } from 'express'

import homeRoute from './home.route'
import cartRoute from './cart.route'
import productRoute from './product.route'
import userRoute from './user.route'

import ExceptionController from '../controllers/exception.controller'

const initRoute = (app: Express) => {
    app.use(homeRoute)
    app.use(cartRoute)
    app.use('/admin', productRoute)
    app.use('/admin', userRoute)

    app.use(ExceptionController.handle404)
}

export default initRoute
