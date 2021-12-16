import { gifConstants } from '../constants/gif-constants';

export function gifStore(state = {}, action) {
    switch (action.type) {
        case gifConstants.TRENDING_REQUEST:
            return {
                loading: true,
                gifs: !action.reset && state.gifs,
            };
        case gifConstants.TRENDING_SUCCESS:
            return state.gifs ? {gifs:  [...state.gifs, ...action.gifs.data]} : {gifs:  action.gifs.data};
        case gifConstants.TRENDING_FAILURE:
            return {
                error: action.error
            };
        case gifConstants.SEARCH_REQUEST:
            return {
                loading: true,
                gifs: !action.reset && state.gifs,
            };
        case gifConstants.SEARCH_SUCCESS:
            return state.gifs ? {gifs:  [...state.gifs, ...action.gifs.data]} : {gifs:  action.gifs.data};
        case gifConstants.SEARCH_FAILURE:
            return {
                error: action.error
            };
        case gifConstants.RESET_GIFS:
            return {
                gifs: []
            };
        default:
            return state
    }
}