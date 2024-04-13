import { ThemeProvider, createTheme } from '@mui/material/styles';
import DarkTheme from './theme/DarkTheme';
import Navbar from './pages/navbar/Navbar';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from './redux/TaskSlice';
import { getUserList, getUserProfile } from './redux/AuthSlice';

const App = () => {
  // const user = false
  const dispatch = useDispatch();
  const { task, auth } = useSelector(store => store);

  useEffect(() => {
    dispatch(fetchTasks({}));
    dispatch(getUserProfile(auth.jwt || localStorage.getItem("jwt")));

    console.log("task", task);
  }, [auth.jwt]);
  console.log("auth", auth);
  return (
    <>
      <ThemeProvider theme={DarkTheme}>
        {
          auth?.user ? <div>
            <Navbar />
            <Home />
          </div> : <Auth />
        }

      </ThemeProvider>
    </>
  );
};

export default App;
