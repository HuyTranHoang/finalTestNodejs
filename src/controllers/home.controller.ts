import { Request, Response } from 'express'
import Product from '../models/product'

class HomeController {
    // [GET] - /
    static index = async (req: Request, res: Response) => {
        try {
            const products = await Product.getAll()
            const title = 'Home'
            res.render('home/index', { products, title })
        } catch (error) {
            console.log('>>> HomeController Index', error)
        }
    }

    // [GET] - /product/:id
    static show = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const product = await Product.findById(id)
            const title = 'Home - Product details'
            res.render('home/show', { product, title })
        } catch (error) {
            console.log('>>> HomeController show', error)
        }
    }
}

export default HomeController
