import Layout from '../components/layout'
import Head from 'next/head'
import config from '../config/config'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'
import style from '../styles/Login.module.css'

const GetConfig = () => {
    return (<Layout>
        <Head>
            <title>Get Config</title>
        </Head>
        <div className={styles.container} className = {styles.bg}>
            <Navbar />
            <h2 className = {style.text}> Get Configuration from ../config/config.js </h2> <br/>
            <b className = {style.text1}>Config: </b> <div className = {style.text1}>{JSON.stringify(config)}</div> <br/>
            <ul className = {style.text1}>
                <li>npm run dev  (for development mode)</li>
                <li>npm run build; npm run start  (for production mode)</li>
            </ul>
        </div>

    </Layout>)
}

export default GetConfig