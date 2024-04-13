import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, api, setAuthHeader } from '../api/Api';
export const login = createAsyncThunk("auth/login", async(userData)=>{
    try {
        console.log("in sign in try")
        const {data}=await axios.post(`${BASE_URL}/auth/signin`,userData)
        localStorage.setItem("jwt",data.jwt)
        console.log(data.jwt)
        localStorage.setItem("auth", data)
        console.log("login success the fata is",data);
        return data;
        
    } catch (error) {
        console.log(error);
        throw Error(error.response.data.error)
    }
})

export const register = createAsyncThunk("auth/register", async (userData) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/signup`, userData);
        localStorage.setItem("jwt", data.jwt);

        console.log("register", data);
        return data;
    } catch (error) {
        console.log(error);
        throw Error(error.response.data.error);
    }
});


export const logout = createAsyncThunk("auth/logout",async()=>{
    try {
        localStorage.clear();
        
    } catch (error) {
        console.log(error);
        throw Error(error.response.data.error)

    }
})
export const getUserProfile = createAsyncThunk("auth/getUserProfile",
    async(jwt) => {
        // setAuthHeader(jwt, api);
        try {
            console.log(api)
            console.log(jwt)
            const {data} = await axios.get(`/api/users/profile`, {
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("user profile success", data);
            return data;
        } catch (error) {
            console.log("error happens in user profile", error);
            return error.response.data.error;
        }
    }
);

export const getUserList = createAsyncThunk("auth/getUserList",
    async(jwt) => {
        setAuthHeader(jwt, api);
        
        try {
            const {data} = await api.get(`/api/users/allProfiles`);
            console.log("user list success", data);
            return data;
        } catch (error) {
            console.log(error);
            return error.response.data.error;
        }
    }
);


const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        loggedIn:false,
        loading:false,
        error:null,
        jwt:"",
        users:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading = false;
            state.jwt = action.payload.jwt
            state.loggedIn = true;         
            
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        }) 
        .addCase(register.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.loading=false
            state.jwt=action.payload.jwt
            state.loggedIn=true
        })
        .addCase(register.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })

        .addCase(getUserProfile.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(getUserProfile.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
            state.loggedIn=true
        })
        .addCase(getUserProfile.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })

        
        .addCase(getUserList.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(getUserList.fulfilled,(state,action)=>{
            state.loading=false
            state.users=action.payload
            state.loggedIn=true
        })
        .addCase(getUserList.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })


        .addCase(logout.fulfilled,(state)=>{
            state.user=null;
            state.jwt=null
            state.users=[]
            state.error=null
            state.loggedIn=false;
        })
        

    }
})

export default authSlice.reducer;

