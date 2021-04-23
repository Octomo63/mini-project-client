import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'
import style from '../styles/Login.module.css'

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

  const printPremiumCars = (premiumCar) =>{
    if( premiumCar && premiumCar.length)
    return (premiumCar.map((item, index) => 
          <li key = {index}>
            {index + 1 }:
            {(item) ? item.brand : "-"}:
            {(item) ? item.model : "-"}:
            {(item) ? item.year : "-"}:
            {(item) ? item.price : 0}
            <button onClick={() => getPremiumCar(item.id)}>Get</button>
            <button onClick={() => updatePremiumCar(item.id)}>Update</button>
            <button onClick={() => deletePremiumCar(item.id)}>Delete</button>
          </li>))
    else
      return (<li>No Premium Car</li>)
  }

  const deletePremiumCar = async (id) => {
    let premiumCar = await axios.delete(`${URL}/${id}`)
    setPremiumCars(premiumCars.data)
  }

  const updatePremiumCar = async (id) => {
    let premiumCar = await axios.put(`${URL}/${id}`,{brand,model,year,price})
    setPremiumCars(premiumCars.data)
  }

  const getPremiumCar = async (id) => {
    const premiumCar = await axios.get(`${URL}/${id}`)
    setPremiumCars({ brand: premiumCar.data.brand , model: premiumCar.data.model, year: premiumCar.data.year, price: premiumCar.data.price })
  }

  return (
    
     <Layout>
     <Head>
         <title>Premium Car List</title>
     </Head>
     <div >
         <Navbar />
         {JSON.stringify(premiumCars.premiumCars)}
         <ul >
             {printPremiumCars()}
         </ul>
         <h2>Add Premium Car</h2>
         <div>
          Brand : <input type="text" onChange={(e)=>setBrand(e.target.value)} /> <br/>
          model : <input type="text" onChange={(e)=>setModel(e.target.value)} /> <br/>
          Year : <input type="text" onChange={(e)=>setYear(e.target.value)} /> <br/>
          Price : <input type="number" onChange={(e)=>setPrice(e.target.value)} /> <br/>
          <button onClick={ () => addPremiumCar(brand,model,year,price)}>Add New Premium Car</button>
         </div>
     </div>
 </Layout>
  )
}
export default withAuth(changeDetails)
export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}