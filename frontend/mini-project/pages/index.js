import Head from 'next/head' 
import Layout from '../components/layout' 
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import style from '../styles/Login.module.css'
import { ImHome3 } from "react-icons/im";
import { AiFillCar } from "react-icons/ai";
export default function Home({ token }) {
 
  return (
    <Layout>
    <Head>
        <title>First Page</title>
    </Head>
    <div className={styles.container} className = {styles.bg}>
        <Navbar />
        <h1 className = {style.text}><ImHome3 className = {styles.icon1}/> Home page </h1> <br/>
        <div className = {style.text1}>Welcome To My Premium Car Website <AiFillCar className = {styles.icon1} /></div><br/>
        <div className = {style.text2}>No login required!</div>
    </div>
</Layout>
  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}