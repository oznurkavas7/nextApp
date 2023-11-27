import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import { SketchPicker } from "react-color";
import {
  TextField, Button, Checkbox, FormControlLabel, List, ListItem, ListItemText,
  CardContent, Card, Grid, Dialog, DialogContent, DialogActions, DialogContentText,
  Modal, Box, Typography, ListItemIcon, ListItemButton, Tooltip
} from '@mui/material';
import { Container } from 'react-bootstrap';
import './App.css';
import React, { useState } from "react";

function App() {
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [currentDate] = useState(getDate());
  let time = new Date().toLocaleTimeString();
  const [ctime, setTime] = useState(time)
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString()
    setTime(time)
  }
  setInterval(UpdateTime)
  const [isDelBtnDisabled, setDelBtnDisabled] = useState(true);
  const [isEditBtnDisabled, setEditBtnDisabled] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 320,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDel = () => {
    setOpenDel(true);
  };

  const handleCloseDel = () => {
    setOpenDel(false);
  };

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}/${month}/${year}`;
  }

  const addDo = () => {
    const id = todoList.length + 1;
    setTodoList((prev) => [
      ...prev,
      {
        id: id,
        task: input,
        complete: false,
        editing: false
      },
    ]);
    setDelBtnDisabled(false);
    setInput("");
    setChecked(false);
    setIsEditing(false);
  };

  const clickhandler = (item, index) => {
    todoList.forEach(i => {
      if (item.id === i.id) {
        item.complete = !item.complete;
      }
      setEditBtnDisabled(index);
    });
  }

  const deleteDo = (value) => {
    setTodoList(oldValues => {
      setDelBtnDisabled(todoList.length === 1);
      return oldValues.filter(item => item !== value)
    })
    setOpenDel(false);
  }

  const editDo = (item) => {
    todoList.forEach(i => {
      if (item.id === i.id) {
        item.editing = true;
      }
    });

  }

  const deleteAll = () => {
    setTodoList([]);
    setDelBtnDisabled(true);
    setOpen(false);
    setOpenDel(false);
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      addDo();
    }
  }

  const handleKeyDownEdit = (e, item) => {
    if (e.key === 'Enter') {
      todoList.forEach(i => {
        if (item.id === i.id) {
          item.editing = false;
          item.task = e.target.value;
        }
      });
    }
  }

  const [openColorSett, setOpenColorSett] = useState(false);
  const [color, setColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1"
  });

  const colorSetting = () => {
    setOpenColorSett(!openColorSett);
  }

  const onCloseMethod = () => {
    setOpenColorSett(false);
  };

  const [containerColor, setContainerColor] = useState('#CCCCFF');


  const changeContainerColor = (color) => {
    const selectColor = color.hex;
    setContainerColor(selectColor);
    setColor({ ...color.rgb });
  }

  return (
    <Container style={{ backgroundColor: containerColor, padding: '2rem', borderRadius: "20px 20px 20px 20px" }}>
      <div style={{ padding: 30 }}>
        <Grid container spacing={10} justify="center">
          <Grid item xs={12} display={{ md: 12 }}>
            <Card>
              <CardContent>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Tooltip title="Change Color">
                    <IconButton aria-label="edit" onClick={colorSetting}>
                      <SettingsIcon style={{ fill: "gray" }} />
                      <Modal
                        open={openColorSett}
                        onClose={onCloseMethod}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            Background Change Color
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'span'} variant={'body2'}>
                            {openColorSett ? (
                              <div>
                                <div onClick={onCloseMethod} />
                                <SketchPicker color={color} onChange={changeContainerColor} />
                              </div>
                            ) : null}
                          </Typography>
                        </Box>
                      </Modal>
                    </IconButton>
                  </Tooltip>

                </div>
                <div>
                  <p>Today's Date:  <b>{currentDate} {ctime}</b></p>

                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <TextField style={{ display: 'flex', width: "calc(100%)" }} value={input} onInput={(e) => setInput(e.target.value)}
                    id="outlined-basic" label="To-Do" variant="outlined" onKeyDown={(e) => handleKeyDown(e)} />
                  <div style={{
                    marginLeft: 10,
                    display: 'inline',
                  }}>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} style={{ display: todoList.length !== 0 ? "inline" : "none" }}
          >
            <div style={{ display: "flex" }}>
              <Button style={{ marginTop: 15, marginLeft: "auto" }} disabled={isDelBtnDisabled} onClick={handleClickOpen} variant="contained">Delete All</Button>
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you want to delete the list?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={() => deleteAll()} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
            <Card>
              <CardContent
              ><div>
                  <List>
                    {todoList.map((item, index) => (
                      <ListItem
                        key={index}
                      >
                        <ListItemButton role={undefined} dense>
                          <ListItemIcon>
                            <Tooltip title="Complete Note">
                              <Checkbox
                                edge="start"
                                onChange={() => clickhandler(item, index)} value={checked}
                                tabIndex={-1}
                                disableRipple
                              />
                            </Tooltip>
                          </ListItemIcon>
                          {item.editing ? (
                            <TextField style={{ display: 'flex', width: "calc(100%)" }} defaultValue={item.task}
                              id="outlined-basic" variant="outlined" onKeyDown={(e) => handleKeyDownEdit(e, item)} />
                          ) : <ListItemText
                            primary={`${item.task}`} style={{ textDecorationLine: item.complete ? "line-through" : "none" }} />}
                        </ListItemButton>

                        <Tooltip title="Edit Note">
                          <IconButton aria-label="edit" onClick={() => editDo(item)} disabled={isEditBtnDisabled === index && item.complete}>
                            <EditIcon style={{ fill: "blue" }} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Note">
                          <IconButton aria-label="delete" onClick={() => deleteDo(item)}>
                            <DeleteIcon style={{ fill: "red", justifyContent: 'flex-end' }} />
                          </IconButton>
                        </Tooltip>
                      </ListItem>
                    ))}
                  </List>
                </div>

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Container>

  )
}

export default App;

/*
     <Dialog
                            open={openDel}
                            onClose={handleCloseDel}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Do you want to delete the to-do?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleCloseDel}>No</Button>
                              <Button onClick={() => deleteDo(item)} autoFocus>
                                Yes
                              </Button>
                            </DialogActions>
                          </Dialog>
*/
