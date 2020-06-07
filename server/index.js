const express = require("express")

const app = express()

app.set('secret','w2j5n2b4m5b')
app.use(require('cors')())
app.use(express.json())

app.use('/',express.static(__dirname + '/web'))
app.use('/admin',express.static(__dirname + '/admin'))

app.use('/uploads',express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)



app.listen(3000,() =>{
    console.log('app listening 3000');
})