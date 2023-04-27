const POST_SONG = 'songs/POST_SONG'

export const postSong = newSong => {
    return {
        type: POST_SONG,
        newSong
    }
}

export const postSongRequest = (song, albumId) => async dispatch => {
    console.log('SONG THUNK', albumId)
    const response = await fetch(`/api/albums/${albumId}/songs/`,
        {method: 'POST', headers: {"Content-Type": "application/json"},
        body: JSON.stringify(song)})
    if (response.ok) {
        const newSong = await response.json()
        dispatch(postSong(newSong))
        return newSong
    }
}

const initialState = {}
export default function songReducer( state = initialState, action) {
    switch (action.type) {
        case POST_SONG:
            console.log('SONG REDUCER')
            return { ...state, [action.newSong.albumId]:[ ...action.newSong] }
        default:
            return state
    }
}
