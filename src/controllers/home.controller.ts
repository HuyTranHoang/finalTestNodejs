import { Request, Response } from 'express'
import Product from '../models/product'

class HomeController {
    // [GET] - /
    static index = async (req: Request, res: Response) => {
        try {
            const products = await Product.getAll()
            const title = 'Home'
            res.render('index', { products, title })
        } catch (error) {
            console.log('>>> HomeController Index', error)
        }
    }
}

export default HomeController
