import { editReducer} from './Reducer'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    userDetails:editReducer
})