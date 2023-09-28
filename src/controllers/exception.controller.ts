import { Request, Response } from 'express'
import Product from '../models/product'

class ExceptionController {
    // [GET] - /
    static handle404 = async (req: Request, res: Response) => {
        const title = '404'
        res.render('error/404', {title})
    }
}

export default ExceptionController
