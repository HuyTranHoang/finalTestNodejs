import express from 'express'
import ProductController from '../controllers/product.controller'
import upload from '../middlewares/upload'

const router = express.Router()

// prefix /admin
router.get('/product', ProductController.index)

router
    .get('/product/create', ProductController.create)
    .post('/product', upload.single('image'), ProductController.store)

router
    .get('/product/:id/edit', ProductController.edit)
    .put('/product/:id', upload.single('image'), ProductController.update)

router.delete('/product/:id', ProductController.destroy)

router.get('/product/:id', ProductController.show)

export default router
