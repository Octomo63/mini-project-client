import Head from 'next/head'
import Layout from '../components/layout'
import { useState } from 'react'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import style from '../styles/Login.module.css'
import axios from 'axios'
import config from '../config/config'

export default function Login({ token }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const [RememberMe, setRememberMe] = useState('')

    const login = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/login`,
                { username, password, RememberMe },
                { withCredentials: true })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.status + ': ' + result.data.user.username)
        }
        catch (e) {
            console.log('error: ', JSON.stringify(e.response))
            setStatus(JSON.stringify(e.response).substring(0, 80) + "...")
        }
    }

    const loginForm = () => (
        <div className={styles.gridContainer}>
            <div>
                Username:
            </div>
            <div >
                <input type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                Password:
            </div>
            <div >
                <input type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
        </div>
    )

    const copyText = () => {
        navigator.clipboard.writeText(token)
    }
    
    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <div className={styles.container} className = {styles.bg}>
                <Navbar /> 
                <h1 className = {style.text}>Login</h1>
                <div><b className = {style.text1}>Token:</b> {token.substring(0, 15)}...
                <button className = {style.submit} onClick={copyText}> Copy token </button>
                </div>
                <br/>
                <div className = {style.text1}>
                    Status:  {status} {RememberMe}
                </div>
                <br />
                    {loginForm()}
                <div>
                    <button className = {style.submit} onClick={login}>Login</button>
                </div>
                <div className = {style.text1}>
                <input type="checkbox"
                    name="RememberMe"
                    onChange = {(e) => setRememberMe(e.target.value)} /> Remember Me

                </div>
            </div>
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}