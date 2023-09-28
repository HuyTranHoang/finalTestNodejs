import multer, { FileFilterCallback,Multer } from 'multer'

const storage = multer.diskStorage({
    destination: (req, file: Express.Multer.File, cb): void => {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
    }
})

const fileFilter = (req: any, file: Express.Multer.File, cb: FileFilterCallback): void => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload: Multer = multer({storage, fileFilter})

export default upload