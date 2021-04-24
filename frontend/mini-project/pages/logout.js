import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'
import style from '../styles/Login.module.css'

export default function Logout({ token }) {

    const [status, setStatus] = useState('')

    useEffect(() => {
        logout()
    }, [])

    const logout = async () => {
        console.log('remove token: ', token)
        let result = await axios.get(`${config.URL}/logout`, { withCredentials: true })
        setStatus("Logout successful")
    }
 
    return (
        <Layout>
            <Head>
                <title>User profile</title>
            </Head>
            <div className={styles.container} className = {styles.bg}>
                <Navbar />
                <h1 className = {style.text}>Logout</h1>
                <div>
                    <h2 className = {style.text1}> {status}  </h2>
                </div>
            </div>
        </Layout>
    )
}