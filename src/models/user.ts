import { ObjectId } from 'mongodb'
import { collections } from '../utils/mongoDb'

class User {
    constructor(
        public username: string,
        public email: string,
        public gender: string
    ) {}

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

    static update = async (id: string, user: User) => {
        try {
            const users = collections.users
            const filter = { _id: new ObjectId(id) }
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
}

export default User
