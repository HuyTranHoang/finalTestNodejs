import { Request, Response } from 'express'

class UserController {
    // [GET] - /admin/user
    static index = async (req: Request, res: Response) => {
        const title = 'Admin - User list'
        res.render('user/index', {title})
    }

    // [GET] - /admin/user/:id
    static show = (req: Request, res: Response) => {
        res.send('User Show')
    }

    // [GET] - /admin/user/create
    static create = (req: Request, res: Response) => {
        res.send('User Add')
    }

    // [POST] - /admin/user
    static store = (req: Request, res: Response) => {
        res.send('User Store')
    }

    // [GET] - /admin/user/:id/edit
    static edit = (req: Request, res: Response) => {
        res.send('User Edit')
    }

    // [PUT] - /admin/user/:id
    static update = (req: Request, res: Response) => {
        res.send('User Update')
    }

    // [DELETE] - /admin/user/:id
    static destroy = (req: Request, res: Response) => {
        res.send('User Update')
    }
}

export default UserController
