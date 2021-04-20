import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'

const URL = `${config.URL}/premiumCars`
const showPremiumCar = ({ token }) => {

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

	const getPremiumCars = async () => {
        let premiumCar = await axios.get(URL)
        setPremiumCars(premiumCar.data)
	}
	const printPremiumCars = () => {
	    console.log('PremiumCars:', premiumCars)
			if (premiumCars.list && premiumCars.list.length)
				return (premiumCars.list.map((premiumCar, index) =>
				(<li key={index} className={styles.listItem}>
				Name : {(premiumCar) ? premiumCar.brand : '-'} <br></br>
				Surname : {(premiumCar) ? premiumCar.model : '-'}  <br></br>
				Major : {(premiumCar) ? premiumCar.year : '-'}  <br></br>
				GPA : {(premiumCar) ? premiumCar.price : '-'}  <br></br> 
				</li>)
				))
			else {
				return (<h2>No Premium Car To Show</h2>)
			}
    }
	return (
	    <Layout>
            <Head>
                <title>Premium Cars </title>
            </Head>
            <div>
                <Navbar/>
                {JSON.stringify(premiumCars.premiumCars)}
                <ul>
                    {printPremiumCars()}
                </ul>
                
            </div>
        </Layout>
	)
}

export default withAuth(showPremiumCar)
export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}