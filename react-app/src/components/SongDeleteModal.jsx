import { useDispatch } from 'react-redux'
import { useModal } from '../context/Modal'
import { deleteSongRequest } from '../store/songs'
import { fetchSingleAlbum } from '../store/albums'

export default function SongDeleteModal({ song, album}) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const confirmDelete = async e => {
        await dispatch(deleteSongRequest(song.id))
        await dispatch(fetchSingleAlbum(album.id))
        closeModal()
    }
    return (
        <div className="w-96">
          <h2 className=" montserrat text-black">
            Are you sure you want to delete this song, {song.trackNum}: {song.name}?
          </h2>
          <div className="flex flex-col">
            <button
              className="bg-teal-500 w-full my-2 p-3 uppercase montserrat rounded-lg active:scale-95 active:bg-teal-800 transition duration-200 ease-in-out text-lg text-white font-bold "
              onClick={confirmDelete}
            >
              Yes
            </button>
            <button
              className="bg-red-500 w-full my-2 p-3 uppercase montserrat rounded-lg active:scale-95 active:bg-red-800 transition duration-200 ease-in-out text-lg text-white font-bold "
              onClick={closeModal}
            >
              No
            </button>
          </div>
        </div>
    )
}
