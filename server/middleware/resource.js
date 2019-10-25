module.exports = options => {
    return async (req,res,next) =>{
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../models/${modelName}`)   //直接在这const model 那么后边是访问不到的，给请求对象上挂载一个属性 req.model 就可以用了
        next()
    }
}