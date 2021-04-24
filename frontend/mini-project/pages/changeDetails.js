import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CarAuth from '../components/CarAuth'
import config from '../config/config'
import style from '../styles/Login.module.css'
import styles from '../styles/Home.module.css'

const URL = `${config.URL}/premiumCars`
const changeDetails = ({ token }) => {

  
  const [brand,setBrand] = useState('')
  const [model,setModel] = useState('')
  const [year,setYear] = useState('')
  const [price,setPrice] = useState(0)
  const [premiumCars, setPremiumCars] = useState({
      list:
      [ 
        {id: 1234 , brand: "BMW" , model: "series 3" , year: "2021", price: 2699000}, 
        {id: 1235, brand: "Mercedes Benz" , model: "c-class" , year: "2021", price: 2479000} 
      ]
    })
  
  useEffect(() => {
    getPremiumCars()
  }, [])

  const addPremiumCar = async (brand,model,year, price) =>{
    let premiumCars = await axios.post(URL , {brand,model,year, price})
    setPremiumCars(premiumCars.data)
  }

  const getPremiumCars = async () => {
    let premiumCars = await axios.get(URL)
    setPremiumCars(premiumCars.data)
    
  }

  const printPremiumCars = () =>{
    if( premiumCars.list && premiumCars.list.length)
    return (premiumCars.list.map((premiumCar, index) => 
          <li key = {index}>
            {index + 1 }:
            {(premiumCar) ? premiumCar.brand : "-"}:
            {(premiumCar) ? premiumCar.model : "-"}:
            {(premiumCar) ? premiumCar.year : "-"}:
            {(premiumCar) ? premiumCar.price : 0}
            <button className = {style.submit}  onClick={() => updatePremiumCar(premiumCar.id)}>Update</button>
            <button className = {style.submit}  onClick={() => deletePremiumCar(premiumCar.id)}>Delete</button>
          </li>))
    else
      return (<li>No Premium Car</li>)
  }

  const deletePremiumCar = async (id) => {
    let premiumCars = await axios.delete(`${URL}/${id}`)
    setPremiumCars(premiumCars.data)
  }

  const updatePremiumCar = async (id) => {
    let premiumCars = await axios.put(`${URL}/${id}`,{brand,model,year,price})
    setPremiumCars(premiumCars.data)
  }


  return (
    
     <Layout>
     <Head>
         <title>Premium Car List</title>
     </Head>
     <div className = {styles.bg}>
         <Navbar />
         {JSON.stringify(premiumCars.premiumCars)}
         <ul className = {style.text1}>
             {printPremiumCars()}
         </ul>
         <br/>
         <h2 className = {style.text}>Add Premium Car</h2>
         <div className = {styles.container}>
          <div className = {style.text} >Brand : </div><input type="text" onChange={(e)=>setBrand(e.target.value)} /> 
          <div className = {style.text} >Model : </div> <input type="text" onChange={(e)=>setModel(e.target.value)} /> 
          <div className = {style.text} >Year : </div><input type="text" onChange={(e)=>setYear(e.target.value)} /> 
          <div className = {style.text} >Price : </div> <input type="number" onChange={(e)=>setPrice(e.target.value)} /> <br/>
          <button className = {style.submit} onClick={ () => addPremiumCar(brand,model,year,price)}>Add New Premium Car</button>
         </div>
     </div>
 </Layout>
  )
}
export default CarAuth(changeDetails)
export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}