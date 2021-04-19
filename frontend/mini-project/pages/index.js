import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useSWR, { mutate } from 'swr'


const URL = `http://localhost/api/premiumCars`
const fetcher = url => axios.get(url).then(res => res.data) 
export default function Home() {

  const [premiumCar, setPremiumCar] = useState([])
  const [brand,setBrand] = useState('')
  const [model,setModel] = useState('')
  const [year,setYear] = useState('')
  const [price,setPrice] = useState(0)
  
  const {data,error} = useSWR(URL,fetcher)
  if(!data)
  {
      return <div>Loading ...</div>
  }

  const addPremiumCar = async (brand,model,year, price) =>{
    let premiumCars = await axios.post(URL , {brand,model,year, price})
    mutate(URL)
  }

  const getPremiumCars = async () => {
    let premiumCars = await axios.get(URL)
    mutate(URL)
    
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
    mutate(URL)
  }

  const updatePremiumCar = async (id) => {
    let premiumCar = await axios.put(`${URL}/${id}`,{brand,model,year,price})
    mutate(URL)
  }

  const getPremiumCar = async (id) => {
    const premiumCar = await axios.get(`${URL}/${id}`)
    setPremiumCar({ brand: premiumCar.data.brand , model: premiumCar.data.model, year: premiumCar.data.year, price: premiumCar.data.price })
  }

  return (
    <div> PremiumCar
      <ul>{printPremiumCars(data.list)}</ul>
      Selected Premium Car: {premiumCar.name} {premiumCar.model} {premiumCar.major} {premiumCar.GPA}
      <h2>Add Premium Car</h2>
          Brand : <input type="text" onChange={(e)=>setBrand(e.target.value)} /> <br/>
          model : <input type="text" onChange={(e)=>setModel(e.target.value)} /> <br/>
          Year : <input type="text" onChange={(e)=>setYear(e.target.value)} /> <br/>
          Price : <input type="number" onChange={(e)=>setPrice(e.target.value)} /> <br/>
          <button onClick={ () => addStudent(brand,model,year,price)}>Add New Premium Car</button>

    </div>
  )
}