import { ObjectId } from 'mongodb'
import { collections } from '../utils/mongoDb'

class Product {
    constructor(
        public name: string,
        public price: number,
        public description: string,
        public imageUrl: string
    ) {}

    static getAll = async () => {
        try {
            const products = collections.products
            const result = await products?.find().toArray()
            return result
        } catch (error) {
            console.log('>> product getAll', error)
        }
    }

    static add = async (product: Product) => {
        try {
            const products = collections.products
            await products?.insertOne(product)
        } catch (error) {
            console.log('>> product add', error)
        }
    }

    static findById = async (id: string) => {
        try {
            const products = collections.products
            const query = { _id: new ObjectId(id) }
            const product = await products?.findOne(query)
            return product
        } catch (error) {
            console.log('>> product findById', error)
        }
    }

    static update = async (id: string, product: Product) => {
        try {
            const products = collections.products
            const filter = { _id: new ObjectId(id) }
            const updateProduct = {
                $set: product
            }
            await products?.updateOne(filter, updateProduct)
        } catch (error) {
            console.log('>> product update', error)
        }
    }

    static delete = async (id: string) => {
        try {
            const products = collections.products
            const query = { _id: new ObjectId(id) }
            await products?.deleteOne(query)
        } catch (error) {
            console.log('>> product delete', error)
        }
    }
}

export default Product
