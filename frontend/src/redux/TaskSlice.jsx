import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {api,setAuthHeader} from '../api/Api'
import { getUserList } from './AuthSlice';
export const fetchTasks = createAsyncThunk("task/fetchTasks",
    async({status})=>{
        setAuthHeader(localStorage.getItem("jwt"),api)
        try {
            const {data} = await api.get("/api/tasks",{
                params:{status}
            });
            console.log("fetch tasks",data);
           
            return data;
        } catch (error) {
            console.log(error);
            throw Error(error.response.data.error)
        }
    }
)
export const fetchUsersTasks = createAsyncThunk("task/fetchUsersTasks",
    async({status})=>{
        setAuthHeader(localStorage.getItem("jwt"),api)
        try {
            const {data} = await api.get("/api/tasks/user",{
                params:{status}
            });
            console.log("fetch user tasks",data);
            return data;
        } catch (error) {
            console.log(error);
            throw Error(error.response.data.error)
        }
    }
)
export const fetchTasksById = createAsyncThunk("task/fetchTasksById",
    async(taskId)=>{
        setAuthHeader(localStorage.getItem("jwt"),api)
        try {
            const {data} = await api.get(`/api/tasks/${taskId}`);
            console.log("fetch user tasks by id",data);
            return data;
        } catch (error) {
            console.log(error);
            throw Error(error.response.data.error)
        }
    }
)
export const createTask = createAsyncThunk("task/createTask",
    async(taskData)=>{
        setAuthHeader(localStorage.getItem("jwt"),api)
        try {
            const {data} = await api.post(`/api/tasks`,taskData);
            console.log("fetch user tasks by id",data);
            return data;
        } catch (error) {
            console.log(error);
            throw Error(error.response.data.error)
        }
    }
)
export const updateTask = createAsyncThunk("task/updateTask",
async({updatedTaskData, id}, { rejectWithValue }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
        const {data} = await api.put(`/api/tasks/${id}`, updatedTaskData);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.error);
    }
}
);

export const assignedTasktoUser = createAsyncThunk("task/assignedTasktoUser",
async({taskId, userId}, { rejectWithValue }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
        const {data} = await api.put(`/api/tasks/${taskId}/user/${userId}/assigned`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.error);
    }
}
);

export const deleteTask = createAsyncThunk("task/deleteTask",
    async(taskId)=>{
        setAuthHeader(localStorage.getItem("jwt"),api)
        try {
            const {data} = await api.delete(`/api/tasks/${taskId}`);
            console.log("fetch user delete  by id");
            return taskId;
        } catch (error) {
            console.log(error);
            throw Error(error.response.data.error)
        }
    }
)

const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: [],
        loading: false,
        error: null,
        taskDetails: null,
        usersTask: []
    },
    reducers: {}, // Empty reducers object since you're using extraReducers
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchTasksById.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchUsersTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.usersTask = action.payload;
            })
            .addCase(fetchUsersTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const updatedTask = action.payload;
                state.loading = false;
                state.tasks = state.tasks.map((task) =>
                    task.id === updatedTask.id ? { ...task, ...updatedTask } : task
                );
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            });
    }
});

export default taskSlice.reducer;
