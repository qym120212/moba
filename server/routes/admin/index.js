module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const assert = require("http-assert")
    const router = express.Router({
        mergeParams: true   //在app.use中定義的參數.又在router中用到了參數，所以在router中加一個特殊的參數
    })
    // const Category = require('../../models/Category')
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)

    })
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)

    })
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })

    })
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') { 
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)

    })
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)

    })
    //登录校验中间件
    const authMiddleware = require('../../middleware/auth')
    const resourceMiddleware = require('../../middleware/resource')

    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)//当访问/admin/api/rest时 先用处理函数处理,里边如果要有next的话就处理下一个 router 相关的函数



    const multer = require('multer')
    const MAO = require('multer-aliyun-oss');
    const upload = multer({
        //  dest: __dirname + '/../../uploads' 
        storage: MAO({
            config: {
                region: 'oss-cn-hongkong',
                accessKeyId: 'LTAI4FnsFpLttpUssfhVyWDe',
                accessKeySecret: '6iO719b3F46pigsceOhBvCJCyNy7Jv',
                bucket: 'node-vue-moba-1'
            }
        })
})
    //这里post 也是用到了中间件 next() 先验证 后上传
    app.post('/admin/api/upload',authMiddleware(),async (req,res,next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token,401,"请提供jwt token")
        // const tokenData = jwt.verify(token,app.get('secret'))
        // console.log(tokenData);
        const {id} = jwt.verify(token,req.app.get('secret'))
        assert(id,401,"无效的jwt token")
      req.user = await AdminUser.findById(id)
      assert(req.user,401,"请先登录")
        await next()
    }, upload.single('file'), async (req, res) => {
        const file = req.file
        // file.url = `http://www.quyuanming.top/uploads/${file.filename}`
        res.send(file)
    })//upload.single表示接受的是单个文件的上传，同时字段名为file
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body  
        //1.根据用户名找用户
        const AdminUser = require('../../models/AdminUser')
        const user = await AdminUser.findOne({ username }).select('+password')//默认不取他，+
        assert(user, 422, '用户不存在')
        // if (!user){
        //     return res.status(422).send({
        //         message:"用户不存在"
        //     })
        // }
        //2.校验密码 
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, "密码错误")
        // if(!isValid){
        //     return res.status(422).send({
        //         message:"密码错误"
        //     })
        // }


        //3.返回token

        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })
    })
    //错误处理函数
    app.use(async (err, req, res, next) => {
        // console.log(err);
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}
//导出一个函数，这个函数接收一个app对象
//express本身获取不到上传文件的数据的，所以这一需要multer中间件专门处理上传文件