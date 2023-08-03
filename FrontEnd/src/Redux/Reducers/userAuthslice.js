import {createSlice,PayloadAction} from '@reduxjs/toolkit'

const userAuthslice=createSlice({
    name:'userSlice',
    initialState:{
        Student:null,
        Token:null
    },
    reducers:{
        setStudent:(state,action)=>{
            state.Student=action.payload
            

            

        },
        setToken:(state,action)=>{
            state.Token=action.payload
            
        },
    }
})
       
export const {setStudent,setToken}=userAuthslice.actions
export default  userAuthslice.reducer
