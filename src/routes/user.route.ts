import express from 'express'
import UserController from '../controllers/user.controller'

const router = express.Router()

// prefix /admin
router.get('/user', UserController.index)

router
    .get('/user/create', UserController.create)
    .post('/user', UserController.store)

router
    .get('/user/:id/edit', UserController.edit)
    .put('/user/:id', UserController.update)

router.delete('/user/:id', UserController.destroy)

router.get('/user/:id', UserController.show)

export default router
