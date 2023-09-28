import express from 'express'
import HomeController from '../controllers/home.controller'

const router = express.Router()

router.get('/', HomeController.index)

export default router
