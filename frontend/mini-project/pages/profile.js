import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'
import style from '../styles/Login.module.css'

const Profile1 = ({ token }) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        profileUser()
    }, [])

    const profileUser = async () => {
        try {
            // console.log('token: ', token)
            const users = await axios.get(`${config.URL}/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            // console.log('user: ', users.data)
            setUser(users.data)
        }
        catch (e) {
            console.log(e)
        }

    }
 
    return (
        <Layout>
            <Head>
                <title>User profile</title>
            </Head>
            <div className={styles.container} className = {styles.bg}>
                <Navbar />
                <h1 className = {style.text}>User profile</h1>
                <div >
                    <b className = {style.text1}>Token:</b> {token.substring(0, 15)}... <br /><br />
                    <div className = {style.text2}>
                        This route is protected by token, user is required to login first.
                        <br/>
                        Otherwise, it will be redirect to Login page
                        <br/><br/>
                        {JSON.stringify(user)}
                    </div>
                    
                </div>
            </div>
        </Layout>
    )
}

export default withAuth(Profile1)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}