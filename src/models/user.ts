import { ObjectId, Collection } from 'mongodb'
import { collections } from '../utils/mongoDb'
import Product from './product'

type ProductWithId = Product & {
    _id: ObjectId
}

class User {
    constructor(
        public _id: ObjectId,
        public username: string,
        public email: string,
        public gender: string,
        public cart: { items: { productId: ObjectId; quantity: number }[] }
    ) {
        this.cart = cart ? cart : { items: [] }
    }

    static getAll = async () => {
        try {
            const users = collections.users
            const result = await users?.find().toArray()
            return result
        } catch (error) {
            console.log('>> User getAll', error)
        }
    }

    static add = async (user: User) => {
        try {
            const users = collections.users
            await users?.insertOne(user)
        } catch (error) {
            console.log('>> User add', error)
        }
    }

    static findById = async (id: string) => {
        try {
            const users = collections.users
            const query = { _id: new ObjectId(id) }
            const user = await users?.findOne(query)
            return user
        } catch (error) {
            console.log('>> User findById', error)
        }
    }

    static update = async (user: User) => {
        try {
            const users = collections.users
            const filter = { _id: new ObjectId(user._id) }
            const updateUser = {
                $set: user
            }
            await users?.updateOne(filter, updateUser)
        } catch (error) {
            console.log('>> User update', error)
        }
    }

    static delete = async (id: string) => {
        try {
            const users = collections.users
            const query = { _id: new ObjectId(id) }
            await users?.deleteOne(query)
        } catch (error) {
            console.log('>> User delete', error)
        }
    }

    addToCart = async (product: ProductWithId) => {
        const updatedCartItems = [...this.cart.items]
        const index = this.cart.items.findIndex(
            (i) => i.productId.toString() === product._id.toString()
        )
        let quantity = 1

        if (index > -1) {
            quantity = this.cart.items[index].quantity + 1
            updatedCartItems[index].quantity = quantity
        } else {
            updatedCartItems.push({
                productId: new ObjectId(product._id),
                quantity
            })
        }

        const users: Collection | undefined = collections.users
        const filter = { _id: new ObjectId(this._id) }
        const updatedCart = {
            items: updatedCartItems
        }
        await users?.updateOne(filter, { $set: { cart: updatedCart } })
    }

    getCart = async () => {
        const cartItems = []

        for (const item of this.cart.items) {
            const product = await Product.findById(item.productId.toString())
            const quantity = item.quantity
            cartItems.push({ ...product, quantity })
        }

        return cartItems
    }

    removeFromCart = async (productId: string) => {
        const productObjectId = new ObjectId(productId)

        const index = this.cart.items.findIndex((item) =>
            item.productId.equals(productObjectId)
        )

        if (index !== -1) {
            this.cart.items.splice(index, 1)

            const users: Collection | undefined = collections.users
            const filter = { _id: new ObjectId(this._id) }
            const updatedCart = {
                ...this.cart
            }
            await users?.updateOne(filter, { $set: { cart: updatedCart } })
        }
    }
}

export default User
