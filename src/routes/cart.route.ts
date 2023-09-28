import express from 'express'
import CartController from '../controllers/cart.controller'

const router = express.Router()

router.get('/cart', CartController.index)

router.post('/cart/:productId', CartController.store)
router.delete('/cart/:productId', CartController.destroy)

export default router
