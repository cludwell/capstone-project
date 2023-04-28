import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import './SongDeleteModal.css'
import { deleteSongRequest } from '../../store/songs'
import { fetchSingleAlbum } from '../../store/albums'

export default function SongDeleteModal({ song, album}) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const goBack = e => closeModal()
    const confirmDelete = async e => {
        await dispatch(deleteSongRequest(song.id))
        await dispatch(fetchSingleAlbum(album.id))
        closeModal()
    }
    return (
        <div className='song-delete-modal'>
        <h2 className='song-delete-title'>Are you sure you want to delete this song?</h2>
        <div className='song-delete-buttons'>
        <button className='song-delete-button confirm-delete-song band-deets-user-auth' onClick={confirmDelete}>Yes</button>
        <button className='song-delete-button decline-delete-song band-deets-user-auth' onClick={goBack}>No</button>
        </div>
        </div>
    )
}
 