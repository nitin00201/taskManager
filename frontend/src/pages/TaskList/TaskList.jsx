import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import TaskCard from '../Task/TaskCard';
import { fetchTasks, fetchUsersTasks } from '../../redux/TaskSlice';
import store from '../../redux/Store';
import {useLocation} from 'react-router-dom'


const TaskList = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const filterValue=queryParams.get("filter")

  const dispatch = useDispatch();
  const {auth,task} = useSelector(store =>store)
  useEffect(()=>{
    if(auth.user?.role ==="ROLE_ADMIN"){
      dispatch(fetchTasks({status:filterValue}))
    }
    else{
      dispatch(fetchUsersTasks({status:filterValue}))
    }
  },[filterValue])
  console.log("task in task list",task);
  console.log("auth",auth);
  return (
    <div className='w-[67vw]'>
        <div className='space-y-3'>
        {
            task.tasks.map((item, i)=><TaskCard item={item} key={i}/>)
        }

        </div>
    </div>
  )
}

export default TaskList