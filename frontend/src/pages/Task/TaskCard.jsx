import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useDispatch,useSelector } from 'react-redux';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UserList from "../UserList";
import SubmissionList from "./SubmissionList";
import EditTaskList from "./EditTaskList";
import { deleteTask } from "../../redux/TaskSlice";
import {useLocation , useNavigate} from 'react-router-dom'

const TaskCard = ({item}) => {
  const dispatch = useDispatch();
const location =useLocation();
const navigate =useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const role = "ROLE_ADMIN";

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [openUserList, setOpenUserList] = useState(false);
  const handleCloseUserList = () => {
    setOpenUserList(false);
  };
  const handleOpenUserList = () => {
    setOpenUserList(true);
  };

  const [openSubmissionList, setOpenSubmissionList] = useState(false);
  const handleOpenSubmissionList = () => {
    setOpenSubmissionList(true);
  };
  const handleCloseSubmissionList = () => {
    setOpenSubmissionList(false);
  };

  const [openUpdateTaskList, setOpenUpdateTaskList] = useState(false);
  const handleOpenUpdateTaskModel = () => {
    const updatedParams= new URLSearchParams(location.search)
    setOpenUpdateTaskList(true);
    updatedParams.set("taskId",item.id);
          navigate(`${location.pathname}?${updatedParams.toString()}`)
    handleMenuClose();
  };
  const handleCloseUpdateTaskModel = () => {
    setOpenUpdateTaskList(false);
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(item.id))
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="card lg:flex justify-between">
        <div className="lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]">
          <div>
            <img
              className="lg:w-[7rem] lg:h-[7rem] object-cover"
              src={item.image}
              alt=""
            />
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <h1 className="font-bold text-lg">{item.title}</h1>
              <p className="text-grey-500 text-sm">
                {item.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {item.tags.map((item, i) => (
                <span className="py-1 px-5 rounded-full techStack" key={i}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <IconButton
            id="basic-button"
            aria-controls={openMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu}
            onClick={handleMenuClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {role == "ROLE_ADMIN" ? (
              <div>
                <MenuItem onClick={handleOpenUserList}>Assigned User</MenuItem>
                <MenuItem onClick={handleOpenSubmissionList}>
                  see submissions
                </MenuItem>
                <MenuItem onClick={handleOpenUpdateTaskModel}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
              </div>
            ) : (
              <>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              </>
            )}
          </Menu>
        </div>
      </div>
      <UserList open={openUserList} handleClose={handleCloseUserList} />
      <SubmissionList
        open={openSubmissionList}
        handleClose={handleCloseSubmissionList}
      />
      <EditTaskList
      item={item}
        open={openUpdateTaskList}
        handleClose={handleCloseUpdateTaskModel}
      />
    </div>
  );
};

export default TaskCard;
