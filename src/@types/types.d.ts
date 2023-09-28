type user = {
    _id: ObjectId
    username: string
    email: string
    gender: string
    cart: { items: { productId: ObjectId; quantity: number }[] }
    addToCart: (product: ProductWithId) => void
    getCart: () => cartItems[]
    removeFromCart: (productId) => void
}

declare namespace Express {
    export interface Request {
        user: user
    }
    export interface Response {
        user: user
    }
}
