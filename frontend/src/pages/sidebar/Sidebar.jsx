import React, { useState } from 'react'
import {Avatar} from '@mui/material' 
import {Button} from '@mui/material'
import './Sidebar.css'
import CreateTask from '../Task/CreateTask'
import {useLocation,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/AuthSlice'


const menu=[
    {name:"Home",value:"Home",role:["ROLE_ADMIN","ROLE_CUSTOMER"]},
    {name:"DONE",value:"DONE",role:["ROLE_ADMIN","ROLE_CUSTOMER"]},
    {name:"ASSIGNED",value:"ASSIGNED",role:["ROLE_ADMIN"]},
    {name:"NOT ASSIGNED",value:"PENDING",role:["ROLE_ADMIN"]},
    {name:"Create New Task",value:"",role:["ROLE_ADMIN"]},
    {name:"Notifications",value:"NOTIFICATION",role:["ROLE_CUSTOMER"]},
]
var role="ROLE_ADMIN"

const Sidebar = () => {
  const { auth } = useSelector(store => store);
  role=auth.user.role
  console.log(role)

  const dispatch = useDispatch();

  const location = useLocation()
  const navigate =useNavigate()
    const [openCreateTaskForm,setOpenCreateTaskForm]=React.useState(false);
    const handleCloseCreateTaskForm=()=>{
      setOpenCreateTaskForm(false)
    }
    const handleOpenCreateTaskForm = ()=>{
      setOpenCreateTaskForm(true);
    }
    const [activeMenu,setActiveMenu] = useState("Home")
    const handleChange=(item)=>{
      const updatedParams=new URLSearchParams(location.search)
        if(item.name=="Create New Task"){
        handleOpenCreateTaskForm();
        }
        else if(item.name =="Home"){
          updatedParams.delete("filter")
          const queryString = updatedParams.toString();
          const updatedPath = queryString?`${location.pathname}?${queryString}`:location.pathname;
          navigate(updatedPath);
        }else{
          updatedParams.set("filter",item.value);
          navigate(`${location.pathname}?${updatedParams.toString()}`)
        }
        setActiveMenu(item.name)
    }
    function handelLogout(){
      const dispatch = useDispatch();
      dispatch(logout())

        console.log("Handle log out")
        alert("onsole.log(Handle log out")
    }
    
  return (
  <>
      <div className='card min-h-[85vh] flex flex-col justify-center fixed w-[20vw]'>
    <div className='space-y-5 h-full'>
        <div className='flex justify-center'>
            <Avatar
                sx={{width:"8rem",height:"8rem"}}
                className='border-2 border-[#c24dd0]'
            >{auth.user.fullName[0]}</Avatar>
        </div>
        {menu.filter((item)=>item.role.includes(role))
        .map((item,i)=><p onClick={()=>handleChange(item)} key={i} className={`py-3 px-5 rounded-full text-center cursor-pointer ${activeMenu ===item.name?"activeMenu":"menuItem"}`}>
        {item.name}</p>)
        }
        <Button onClick={handelLogout} sx={{padding:".7rem",borderRadius:"2rem"}} fullWidth className='logoutButton'>
        logout</Button>
    </div>
    
    </div>
    <CreateTask open={openCreateTaskForm} handleClose={handleCloseCreateTaskForm}/>
  </>
  )
}

export default Sidebar