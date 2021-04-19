const express = require('express')
let bodyParser = require('body-parser')
const app = express()
const router = express.Router()
const PORT = 80
let cors = require('cors');
app.use(cors());

let premiumCars = {
    list: [ 
        {id: 1234 , brand: "BMW" , model: "series 3" , year: "2021", price: 2699000}, 
        {id: 1235, brand: "Mercedes Benz" , model: "c-class" , year: "2021", price: 2479000} 
    ]
}


// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);


app.use('/api',router)
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

app.listen(PORT, () => console.log('Server is running at', PORT))