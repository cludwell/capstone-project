const LOAD_BAND = 'bands/LOAD_BAND'
const POST_BAND = 'bands/POST_BAND'
//actions
export const loadBandInfo = bandInfo => {
    return {
        type: LOAD_BAND,
        bandInfo
    }
}
export const postBand = bandInfo => {
    return {
        type: POST_BAND,
        bandInfo
    }
}
//get bandinfo thunk
export const fetchBandInfo = bandId => async dispatch => {
    const response = await fetch(`/api/bands/${bandId}`)
    if (response.ok) {
        const bandInfo = await response.json()
        dispatch(loadBandInfo(bandInfo))
        return bandInfo
    }
}
export const startBand = bandInfo => async dispatch => {
    const {name, city, state, country, artist_image, banner_url, description, genres} = bandInfo
    const response = await fetch('/api/bands',
    {"methods": "POST",
    "headers": {"Content-Type": "application/json"},
    "body": JSON.stringify(bandInfo)})
    const newBand = await response.json()
    if (response.ok) {
        dispatch(postBand(bandInfo))
        return newBand
    }

}
const intitialState = {}

export default function bandReducer (state = intitialState, action) {
    switch (action.type) {
        case LOAD_BAND:
            return {...state, singleBand: {...action.bandInfo}}
        default: return state
        case POST_BAND:
            return {...state, singleBand: {...action.bandInfo}, allBands: {...action.bandInfo}}
    }
}
