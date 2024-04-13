import {  } from "redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {thunk} from "redux-thunk";
// import {  } from "redux-thunk";
import TaskSlice from "./TaskSlice";
import authSlice from "./AuthSlice";
import SubmissionSlice from "./SubmissionSlice";

const rootReducer = combineReducers({
  // Add your reducers here
  auth: authSlice,
  task: TaskSlice,
  submission:SubmissionSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
// import { configureStore } from "@reduxjs/toolkit";
// import TaskSlice from "./TaskSlice";
// import submissionSlice from "./SubmissionSlice";
// import authSlice from "./AuthSlice";

// const store = configureStore({
//  reducer: {
//     auth: authSlice,
//     task: TaskSlice,
//     submission: submissionSlice
//  },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),

//  // If you need to add custom middleware, you can do so here
//  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(yourCustomMiddleware),
// });

// export default store;

