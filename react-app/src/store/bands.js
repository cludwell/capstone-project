const LOAD_BAND = 'bands/LOAD_BAND'
const POST_BAND = 'bands/POST_BAND'
const DELETE_BAND = 'bands/DELETE_BAND'
const EDIT_BAND = 'bands/EDIT_BAND'
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
export const deleteBand = bandId => {
    return {
        type: DELETE_BAND,
        bandId
    }
}
export const editBand = edittedBand => {
    return {
        type: EDIT_BAND,
        edittedBand
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
    const response = await fetch('/api/bands/',
    {"method": "POST",
    "headers": {"Content-Type": "application/json"},
    "body": JSON.stringify({
        name,
        city,
        state,
        country,
        artist_image,
        banner_url,
        description,
        genres
    })})
    const newBand = await response.json()
    if (response.ok) {
        dispatch(postBand(bandInfo))
        return newBand
    }
}
export const deleteBandCommand = bandId => async dispatch => {
    const response = await fetch(`/api/bands/${bandId}`,
        {"method": "DELETE", "headers": {"Content-Type": "application/json"}})
    const deleted = await response.json()
    if (response.ok) {
        dispatch(deleteBand(bandId))
        return deleted
    }
}
export const editBandRequest = (data, id) => async dispatch => {
    const response = await fetch(`/api/bands/${id}`,
        {"method": "PUT", "headers": {"Content-Type": "application/json"},
        "body": JSON.stringify(data)})
        const edittedBand = await response.json()
    if (response.ok) {
        dispatch(edittedBand)
        return edittedBand
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
        case DELETE_BAND:
            const filtered = Object.values(state.allBands).filter(b=> b.id !== action.deleted.id)
            return {...state, allBands: {...filtered}}
        case EDIT_BAND:
            return {...state, singleBand: action.edittedBand, allBands: {...action.edittedBand}}
    }
}
