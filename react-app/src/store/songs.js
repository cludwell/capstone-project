const POST_SONG = 'songs/POST_SONG'

export const postSong = song => {
    return {
        type: POST_SONG,
        song
    }
}

export const postSongRequest = (song, albumId) => async dispatch => {
    const response = await fetch(`/api/${albumId}/song`,
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
            return { ...state, [action.newSong.albumId]:[ ...action.newSong] }
        default:
            return state
    }
}
