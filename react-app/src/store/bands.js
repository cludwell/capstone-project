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
export const deleteBand = deleted => {
    return {
        type: DELETE_BAND,
        deleted
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
export const startBand = bandData => async dispatch => {
    const formData = new FormData()
    for (let key in bandData) formData.append(`${key}`, bandData[key])
    formData.set('banner_url', bandData.banner_url[0])
    formData.set('artist_image', bandData.artist_image[0])
    formData.set('background_image', bandData.background_image[0])
    const response = await fetch('/api/bands/', {
        method: "POST",
        body: formData})
    if (response.ok) {
        const newBand = await response.json()
        dispatch(postBand(bandData))
        return newBand
    }
}
export const deleteBandCommand = bandId => async dispatch => {
    const response = await fetch(`/api/bands/${bandId}`,
        {"method": "DELETE", "headers": {"Content-Type": "application/json"}})

    if (response.ok) {
        const deleted = await response.json()
        dispatch(deleteBand(bandId))
        return deleted
    }
}
export const editBandRequest = (bandData, bandId) => async dispatch => {
    const formData = new FormData();
    for (let key in bandData) formData.append(`${key}`, bandData[key]);
    formData.set('banner_url', bandData.banner_url[0]);
    formData.set('artist_image', bandData.artist_image[0]);
    formData.set('background_image', bandData.background_image[0])
    
    const response = await fetch(`/api/bands/${bandId}`, {
        method: "PUT",
        body: formData
    })
        if (response.ok) {
        const edittedBand = await response.json()
        dispatch(editBand(edittedBand))
        return edittedBand
    }
}
export const fetchAllBands = () => async dispatch => {
    const response = await fetch(`/api/bands/`)
    if (response.ok) {
        const bandData = await response.json()
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
            delete modified.allBands[action?.deleted?.id]
            // const filtered = Object.values(state.allBands).filter(b=> b.id !== action.deleted.id)
            return modified
        case EDIT_BAND:
            return {...state, singleBand: action.edittedBand, allBands: { [action.edittedBand]: action.edittedBand}}
        case LOAD_ALL_BANDS:
            return { ...state, allBands: { ...action.bandData } }
        default: return state
    }
}
