import { MongoClient, ServerApiVersion, Collection } from 'mongodb'
const uri =
    'mongodb+srv://huyth:Rrh7QlDbA5JrIiNx@huyth.myi7vyd.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'

const collections: { products?: Collection; users?: Collection } = {}

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

async function connectToDatabase() {
    try {
        await client.connect()
        const db = await client.db('c2206l_nodejs')
        collections.products = db.collection('products')
        collections.users = db.collection('users')
        console.log('MongoDB connected!')
    } catch (err) {
        console.log('connectToDatabase', err)
    }
}

export default connectToDatabase

export { collections }
