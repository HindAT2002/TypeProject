const express = require('express');

const port =8080;
const app = express();
const mongoose=require('mongoose');
const typeRoutes=require('./routes/typeRoutes')
const champRoutes=require('./routes/champRoutes')
const productRoutes=require('./routes/productRoutes')
const bodyParser = require('body-parser');

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(productRoutes)
app.use(typeRoutes)
app.use(champRoutes)
app.listen(port,()=>{console.log("bonjour depuis le serveur "+ port)});
mongoose.connect('mongodb+srv://hindaittaleb2002:g131113668@cluster0.hg9ee2o.mongodb.net/?retryWrites=true&w=majority',{  useNewUrlParser: true,
useUnifiedTopology: true,}).then(result=>{
    console.log('hi hanodati');
    app.listen(9000);
}).catch(err=>{
    console.log(err);
});