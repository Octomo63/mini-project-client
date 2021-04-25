import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { ImHome3 } from "react-icons/im";
const Navbar = () => (
    <div >
        <Link href="/"><a>  <ImHome3 className = {styles.icon}/> Home Page</a></Link> |
        <Link href="/register"><a> Register</a></Link>  |
        <Link href="/login"><a> Login </a></Link> |
        <Link href="/profile"><a> Profile </a></Link> | 
        <Link href="/getConfig"><a> Config </a></Link> | 
        <Link href="/showPremiumCar"><a> Premium Car List </a></Link> | 
        <Link href="/logout"><a> Logout </a></Link>
    </div>
)

export default Navbar