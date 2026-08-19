const path = require('path')   // <-- this was missing

const multer=require('multer')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.join(__dirname, '..', 'config'))
    },
    filename:(req,file,cb)=>{
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
          cb(null, unique + path.extname(file.originalname))
    }
})
module.exports=multer({storage:storage})