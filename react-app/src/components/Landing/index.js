import { useDispatch } from 'react-redux'
import './Landing.css'
import { useEffect } from 'react'

export default function Landing() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch()
    }, [dispatch])
    return (
        <div className='landing-container'>

        </div>
    )
}
