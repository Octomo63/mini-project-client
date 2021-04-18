const express = require('express')
let bodyParser = require('body-parser')
const app = express()
const router = express.Router()
const PORT = 80
let cors = require('cors');
app.use(cors());

let students = {
    list: [ 
        {id: 6135512019 , name: "Thanan" , surname: "Chairat" , major: "CoE", GPA: 4.33}, 
        {id: 1234567891 , name: "Aaaaaa" , surname: "Bbbbbbb" , major: "SE", GPA: 2.87} 
    ]
}


// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);


app.use('/api',router)
router.route('/students')
    .get((req,res) => res.json(students))
    .post((req,res) => {
        let id = (students.list.length)?students.list[students.list.length-1].id+1:1
        id = req.body.id
        let newStudent = {}
        newStudent.id = (students.list.length)?students.list[students.list.length - 1].id + 1:1
        newStudent.name = req.body.name
        newStudent.surname = req.body.surname
        newStudent.major = req.body.major
        newStudent.GPA = req.body.GPA
        students = { "list": [...students.list, newStudent] }
        res.json(students)
    })
router.route('/students/:student_id')
    .get((req,res) => {
        let id = students.list.findIndex((item) => (item.id === +req.params.student_id))
        if(id === -1)
        {
            res.send("No ID (SHOW)")
        }
        else
        { 
            res.json(students.list[id])
        }
           
        
    })
    .put((req,res) => {
        let id = students.list.findIndex((item) => (item.id === +req.params.student_id))
        if(id === -1)
        {
            res.send("No ID (UPDDATE)")
        }
        else
        {
            students.list[id].name = req.body.name
            students.list[id].surname = req.body.surname
            students.list[id].major = req.body.major
            students.list[id].GPA = req.body.GPA
            res.json(students)
        }
    })
    .delete( (req,res) => {
        let id = students.list.findIndex((item) => (item.id === +req.params.student_id))
        if(id === -1)
        {
            res.send("No ID (DELETE)")
        }
        else
        {
            students.list = students.list.filter( item => item.id !== +req.params.student_id)
            res.json(students)
        }
        
    })

app.listen(PORT, () => console.log('Server is running at', PORT))