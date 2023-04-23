import { useParams } from 'react-router-dom'
import './UserDetails.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchUserPurchases } from '../../store/purchases'

export default function UserDetails() {
    const { userId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserPurchases(userId))
    })

    return (
    <div className='user-details-container'>
    <div className='user-details-header'>
    <div className='user-details-header-accent'></div>
    {/* <img src={``} */}
    </div>
    </div>
    )
}
