const LOAD_BAND = 'bands/LOAD_BAND'

//actions
export const loadBandInfo = bandInfo => {
    return {
        type: LOAD_BAND,
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

const intitialState = {}

export default function bandReducer (state = intitialState, action) {
    switch (action.type) {
        case LOAD_BAND:
            return {...state, singleBand: {...action.bandInfo}}
        default: return state
    }
}
