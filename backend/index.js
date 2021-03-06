const express = require('express'),
app = express(),
passport = require('passport'),
port = process.env.PORT || 80,
cors = require('cors'),
cookie = require('cookie')

const bcrypt = require('bcrypt')

const db = require('./database.js')
let users = db.users
let premiumCars = {
    list: [ 
        {id: 1234 , brand: "BMW" , model: "series 3" , year: "2021", price: 2699000}, 
        {id: 1235, brand: "Mercedes Benz" , model: "c-class" , year: "2021", price: 2479000} 
    ]
}


require('./passport.js')

const router = require('express').Router(),
    jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.route('/premiumCars')
    .get((req,res) => res.json(premiumCars))
    .post((req,res) => {
        let id = (premiumCars.list.length)?premiumCars.list[premiumCars.list.length-1].id+1:1
        id = req.body.id
        let newPremiumCar = {}
        newPremiumCar.id = (premiumCars.list.length)?premiumCars.list[premiumCars.list.length - 1].id + 1:1
        newPremiumCar.brand = req.body.brand
        newPremiumCar.model = req.body.model
        newPremiumCar.year = req.body.year
        newPremiumCar.price = req.body.price
        premiumCars = { "list": [...premiumCars.list, newPremiumCar] }
        res.json(premiumCars)
    })
router.route('/premiumCars/:premiumCar_id')
    .get((req,res) => {
        let id = premiumCars.list.findIndex((item) => (item.id === +req.params.premiumCar_id))
        if(id === -1)
        {
            res.send("No ID (SHOW)")
        }
        else
        { 
            res.json(premiumCars.list[id])
        }
           
        
    })
    .put((req,res) => {
        let id = premiumCars.list.findIndex((item) => (item.id === +req.params.premiumCar_id))
        if(id === -1)
        {
            res.send("No ID (UPDDATE)")
        }
        else
        {
            premiumCars.list[id].brand = req.body.brand
            premiumCars.list[id].model = req.body.model
            premiumCars.list[id].year = req.body.year
            premiumCars.list[id].price = req.body.price
            res.json(premiumCars)
        }
    })
    .delete( (req,res) => {
        let id = premiumCars.list.findIndex((item) => (item.id === +req.params.premiumCar_id))
        if(id === -1)
        {
            res.send("No ID (DELETE)")
        }
        else
        {
            premiumCars.list = premiumCars.list.filter( item => item.id !== +req.params.premiumCar_id)
            res.json(premiumCars)
        }
        
    })
////////////////////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/login', (req, res, next) => {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            console.log('Login: ', req.body, user, err, info)
            if (err) return next(err)
            if (user) {
                const token = jwt.sign(user, db.SECRET, {
                    expiresIn: (req.body.RememberMe === "on") ?'7d' : '1d'
                })
                // req.cookie.token = token
                res.setHeader(
                    "Set-Cookie",
                    cookie.serialize("token", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== "development",
                        maxAge: 60 * 60,
                        sameSite: "strict",
                        path: "/",
                    })
                );
                res.statusCode = 200
                return res.json({ user, token })
            } else
                return res.status(422).json(info)
        })(req, res, next)
    })
    
    router.get('/foo',
        passport.authenticate('jwt', { session: false }),
        (req, res, next) => {
            return res.json({ message: "Foo" })
    
        });
    
    router.get('/logout', (req, res) => { 
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", '', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: -1,
                sameSite: "strict",
                path: "/",
            })
        );
        res.statusCode = 200
        return res.json({ message: 'Logout successful' })
    })
    
    
    
    /* GET user profile. */
    router.get('/profile',
        passport.authenticate('jwt', { session: false }),
        (req, res, next) => {
            res.send(req.user)
        });
    
    router.post('/register',
        async (req, res) => {
            try {
                const SALT_ROUND = 10
                const { username, email, password } = req.body 
                if (!username || !email || !password)
                    return res.json( {message: "Cannot register with empty string"})
                if (db.checkExistingUser(username) !== db.NOT_FOUND)
                    return res.json({ message: "Duplicated user" })
    
                let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
                hash = await bcrypt.hash(password, SALT_ROUND)
                users.users.push({ id, username, password: hash, email })
                res.status(200).json({ message: "Register success" })
            } catch {
                res.status(422).json({ message: "Cannot register" })
            }
        })
    
    router.get('/alluser', (req,res) => res.json(db.users.users))
    
    router.get('/', (req, res, next) => {
        res.send('Respond without authentication');
    });
    
    // Error Handler
    app.use((err, req, res, next) => {
        let statusCode = err.status || 500
        res.status(statusCode);
        res.json({
            error: {
                status: statusCode,
                message: err.message,
            }
        });
    });
    
// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))