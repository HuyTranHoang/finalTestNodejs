import { Request, Response } from 'express'
import Product from '../models/product'

class CartController {
    // [GET] - /cart
    static index = async (req: Request, res: Response) => {
        try {
            const title = 'Cart'
            const cartItems = await req.user.getCart()
            let totalMoney = 0

            res.render('cart/index', { cartItems, title, totalMoney })
        } catch (error) {
            console.log('>>> CartController Index', error)
        }
    }

    // [POST] - /cart/:productId
    static store = async (req: Request, res: Response) => {
        try {
            const productId = req.params.productId
            const product = await Product.findById(productId)
            await req.user.addToCart(product)
            res.redirect('/cart')

        } catch (error) {
            console.log('>>> CartController store', error)
        }
    }

        // [DELETE] - /cart/:productId
        static destroy = async (req: Request, res: Response) => {
            try {
                const productId = req.params.productId
                await req.user.removeFromCart(productId)
                res.redirect('/cart')
            } catch (error) {
                console.log('>>> CartController destroy', error)
            }
        }
}

export default CartController
