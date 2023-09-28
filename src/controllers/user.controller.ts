import e, { Request, Response } from 'express'
import User from '../models/user'

class UserController {
    // [GET] - /admin/user
    static index = async (req: Request, res: Response) => {
        const title = 'Admin - User list'
        const users = await User.getAll()
        res.render('user/index', { users, title })
    }

    // [GET] - /admin/user/:id
    static show = (req: Request, res: Response) => {
        res.send('User show')
    }

    // [GET] - /admin/user/create
    static create = (req: Request, res: Response) => {
        const title = 'Admin - User Add'
        res.render('user/add', { title })
    }

    // [POST] - /admin/user
    static store = async (req: Request, res: Response) => {
        const { username, email, gender } = req.body
        const user = new User(username, email, gender)
        await User.add(user)

        req.flash('successMessage', 'User add successfully!')

        res.redirect('/admin/user')
    }

    // [GET] - /admin/user/:id/edit
    static edit = async (req: Request, res: Response) => {
        const title = 'Admin - User Edit'
        const id = req.params.id
        const user = await User.findById(id)

        res.render('user/edit', { user, title })
    }

    // [PUT] - /admin/user/:id
    static update = async (req: Request, res: Response) => {
        const id = req.params.id
        const { username, email, gender } = req.body
        const user = new User(username, email, gender)
        await User.update(id, user)

        req.flash('successMessage', 'Update user successfully!')

        res.redirect('/admin/user')
    }

    // [DELETE] - /admin/user/:id
    static destroy = async (req: Request, res: Response) => {
        const id = req.params.id
        await User.delete(id)

        req.flash('successMessage', 'Delete user successfully!')

        res.redirect('/admin/user')
    }
}

export default UserController
