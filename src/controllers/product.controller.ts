import { Request, Response } from 'express'
import Product from '../models/product'

class ProductController {
    // [GET] - /admin/product
    static index = async (req: Request, res: Response) => {
        const title = 'Admin - Product list'
        const products = await Product.getAll()
        res.render('product/index', { products, title })
    }

    // [GET] - /admin/product/:id
    static show = (req: Request, res: Response) => {
        const title = 'Admin - Product Details'
        res.send('Product Show')
    }

    // [GET] - /admin/product/create
    static create = (req: Request, res: Response) => {
        const title = 'Admin - Product add'
        res.render('product/add', { title })
    }

    // [POST] - /admin/product
    static store = async (req: Request, res: Response) => {
        let imageUrl = 'default.jpg'
        if (req.file) imageUrl = req.file.filename
        const { name, price, description } = req.body
        const product = new Product(name, price, description, imageUrl)
        await Product.add(product)

        req.flash('successMessage', 'Product add successfully!')

        res.redirect('/admin/product')
    }

    // [GET] - /admin/product/:id/edit
    static edit = async (req: Request, res: Response) => {
        const title = 'Admin - Product Edit'
        const id = req.params.id
        const product = await Product.findById(id)

        console.log(product)
        res.render('product/edit', { product, title })
    }

    // [PUT] - /admin/product/:id
    static update = async (req: Request, res: Response) => {
        const id = req.params.id
        let { name, price, description, imageUrl } = req.body
        if (req.file) imageUrl = req.file.filename
        const product = new Product(name, price, description, imageUrl)
        await Product.update(id, product)

        req.flash('successMessage', 'Update product successfully!')

        res.redirect('/admin/product')
    }

    // [DELETE] - /admin/product/:id
    static destroy = async (req: Request, res: Response) => {
        const id = req.params.id
        await Product.delete(id)

        req.flash('successMessage', 'Delete product successfully!')

        res.redirect('/admin/product')
    }
}

export default ProductController
