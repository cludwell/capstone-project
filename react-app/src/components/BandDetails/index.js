import { useParams } from 'react-router-dom'
import './BandDetails.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function BandDetails() {
    const { bandId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [dispatch])
}
