import { EDIT_USER } from "../action/ActionType";

export const editReducer = (state=[],action) => {
    switch(action.type){
        case EDIT_USER:
            console.log("reducer 2342",action.payload);
            return{
                ...state,
                userDetail:action.payload,
                handleId:action.handleId
            };
         default:
          return state;
    }
}