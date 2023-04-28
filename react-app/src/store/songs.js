const POST_SONG = 'songs/POST_SONG'
const PUT_SONG = 'songs/PUT_SONG'
export const postSong = newSong => {
    return {
        type: POST_SONG,
        newSong
    }
}
export const editSong = edittedSong => {
    return {
        type: PUT_SONG,
        edittedSong
    }
}
export const postSongRequest = (song, albumId) => async dispatch => {
    const response = await fetch(`/api/albums/${albumId}/songs/`,
        {method: 'POST', headers: {"Content-Type": "application/json"},
        body: JSON.stringify(song)})
    if (response.ok) {
        const newSong = await response.json()
        dispatch(postSong(newSong))
        return newSong
    }
}
export const putSongRequest = (songData, albumId) => async dispatch => {
    const response = await fetch(`/api/albums/${albumId}/songs/${songData.id}`,
        {method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(songData)} )
        if (response.ok) {
            const edittedSong = await response.json()
            dispatch(editSong(edittedSong))
        }

}

const initialState = {}
export default function songReducer( state = initialState, action) {
    switch (action.type) {
        case POST_SONG:
            return { ...state, [action.newSong.albumId]:[ ...action.newSong] }
        case PUT_SONG:
            const preEditState = { ...state}
            const filtered = state[action.edittedSong.albumId].filter(s=>s.id !== action.edittedSong.id )
            return {...preEditState, [action.edittedSong.albumId]: [ ...filtered, action.edittedSong]}
        default:
            return state
    }
}
