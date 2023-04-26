const LOAD_BAND = 'bands/LOAD_BAND'
const POST_BAND = 'bands/POST_BAND'
const DELETE_BAND = 'bands/DELETE_BAND'
const EDIT_BAND = 'bands/EDIT_BAND'
const LOAD_ALL_BANDS = 'bands/LOAD_ALL_BANDS'
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
export const loadAllBands = bandData => {
    return {
        type: LOAD_ALL_BANDS,
        bandData
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
export const editBandRequest = (data, bandId) => async dispatch => {
    const response = await fetch(`/api/bands/${bandId}`,
        {"method": "PUT", "headers": {"Content-Type": "application/json"},
        "body": JSON.stringify(data)})
        const edittedBand = await response.json()
    if (response.ok) {
        dispatch(editBand(edittedBand))
        return edittedBand
    }
}
export const loadBandRequest = () => async dispatch => {
    const response = await fetch(`/api/bands/`)
    const bandData = await response.json()
    if (response.ok) {
        dispatch(loadAllBands(bandData))
        return bandData
    }
}
const intitialState = {}

export default function bandReducer (state = intitialState, action) {
    switch (action.type) {
        case LOAD_BAND:
            return {...state, singleBand: {...action.bandInfo}}
        case POST_BAND:
            return {...state, singleBand: {...action.bandInfo}, allBands: { [action.bandInfo.id]: action.bandInfo} }
        case DELETE_BAND:
            const modified = { ...state }
            delete modified.allBands[action.deleted.id]
            // const filtered = Object.values(state.allBands).filter(b=> b.id !== action.deleted.id)
            return modified
        case EDIT_BAND:
            return {...state, singleBand: action.edittedBand, allBands: { [action.edittedBand]: action.edittedBand}}
        case LOAD_ALL_BANDS:
            return { ...state, allBands: { ...action.bandData } }
        default: return state
    }
}
