import { combineReducers } from 'redux';

import { gifStore } from './gif-store-reducer';

const rootReducer = combineReducers({
    gifStore
});

export default rootReducer;