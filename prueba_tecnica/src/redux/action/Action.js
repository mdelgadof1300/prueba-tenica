import { EDIT_USER } from "./ActionType";
export const editUser = (id) => {
    console.log( "i am id",id);
    let data = JSON.parse(localStorage.getItem('userdata'))
    console.log("local data 12345",data)
    let data1 = data[id];
    console.log("I am data",data1)
    return{
        type:EDIT_USER,
        payload:data1,
        handleId:id
     }

}