const express = require('express'); //couche supplem pour serveur (lightweight)
const cors = require('cors'); //pour accepter des requetes du serveur spécifique (pour la sécurité)
const mongoose = require('mongoose'); //mongodb
const cookieParser = require('cookie-parser'); //accepter les cookies (http online)
const expressValidator = require('express-validator') //valider les champs

//Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');

//Config App
require('dotenv').config(); //acceder au fichier .env
const app = express(); //declaration du serveur

//Db mongoDB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log('db connected')) //daz mzn
.catch(() => console.log('not nonnect to the database !')) //erreur

//Middlewares (les parametres li 3tit l serveur)
app.use(express.json()) //rest full api (send and receive json)
app.use(express.urlencoded({extended : true})); //accepter html sans exception
app.use(cors()) //accepter les requetes
app.use(cookieParser()) //accepter les cookie dyal http
app.use(expressValidator())

//Routes Middleware
app.use('/api', authRoutes); 
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);


const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`app is running on port ${port}`));