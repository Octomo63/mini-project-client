import { useRouter } from 'next/router'
import { useEffect } from 'react'

const CarAuth = WrappedComponent => {
    const Wrapper = props => {
        const { token } = props
        const router = useRouter()
        useEffect(() => {
            if (!token)
                router.push('/showPremiumCar')
            else{
                router.push('/changeDetails')
            }
        }, [token])
        return (<WrappedComponent {...props} />)
    }
    return Wrapper
}

export default CarAuth