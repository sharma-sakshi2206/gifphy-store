import {gifConstants} from '../constants/gif-constants';
import {gifServices} from './gif-services';

export const gifActions = {
    getTrendingGif,
    searchGif
};

function getTrendingGif(offset) {
    return dispatch => {
        dispatch(request(offset === 0));
        gifServices.getTrendingGif(offset)
            .then(
                gifs => dispatch(success(gifs)),
                error => dispatch(failure( error.toString()))
            );
    };
    function request(reset) { return { type: gifConstants.TRENDING_REQUEST, reset} }
    function success(gifs) { return { type: gifConstants.TRENDING_SUCCESS, gifs} }
    function failure() { return { type: gifConstants.TRENDING_FAILURE } }
}

function searchGif(searchKey, offset) {
    return dispatch => {
        dispatch(request(offset === 0));
        gifServices.searchGif(searchKey, offset)
            .then(
                gifs => dispatch(success(gifs)),
                error => dispatch(failure( error.toString()))
            );
    };

    function request(reset) { return { type: gifConstants.SEARCH_REQUEST, reset } }
    function success(gifs) { return { type: gifConstants.SEARCH_SUCCESS, gifs} }
    function failure() { return { type: gifConstants.SEARCH_FAILURE } }
}