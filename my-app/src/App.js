import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import { SketchPicker } from "react-color";
import {
  TextField, Button, CardContent, Card, Grid, Dialog, DialogContent, 
  DialogActions, DialogContentText, Modal, Box, Typography, Tooltip, Paper
} from '@mui/material';
import { Container } from 'react-bootstrap';
import './App.css';
import { getDate, settingBox } from './controller';
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    setCardFld(input);
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

  const editDo = (item, isEdit) => {
    todoList.forEach(i => {
      if (item.id === i.id) {
        item.editing && cardFldVal !== '' && (item.task = cardFldVal);
        item.editing = !isEdit;
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
    r: "204",
    g: "204",
    b: "255",
    a: "0"
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

  const [cardFldVal, setCardFld] = useState('');

  const handleChange = (event) => {
    setCardFld(event.target.value);
  };

  return (
    <Container style={{ backgroundColor: containerColor, padding: '2rem', borderRadius: "20px 20px 20px 20px" }}>
      <div style={{ padding: 30 }}>
        <Grid container spacing={10} justify="center">
          <Grid item xs={12} display={{ md: 12 }}>
            <Card>
              <CardContent>
                <div className='cardStyle'>
                  <Tooltip title="Change Color">
                    <IconButton aria-label="edit" onClick={colorSetting}>
                      <SettingsIcon style={{ fill: "gray" }} />
                      <Modal
                        open={openColorSett}
                        onClose={onCloseMethod}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={settingBox}>
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
                <div className='todoText'>
                  <TextField
                    style={{ display: 'flex', width: "calc(100%)" }}
                    value={input}
                    onInput={(e) => setInput(e.target.value)}
                    id="outlined-basic"
                    label="To-Do"
                    variant="outlined"
                    onKeyDown={(e) => handleKeyDown(e)} />
                  <div className='todoDiv'>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} style={{ display: todoList.length !== 0 ? "inline" : "none" }}
          >
            <div className='cardStyle'>
              <Tooltip title="Delete the cards">
                <span>
                  <Button className='deleteAllStyle'
                    disabled={isDelBtnDisabled}
                    onClick={handleClickOpen}
                    variant="contained" startIcon={<DeleteIcon />}>Delete All</Button>
                </span>
              </Tooltip>
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you want to delete the cards?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={() => deleteAll()} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
            <div>
              <Grid sx={{ flexGrow: 1 }} container spacing={12} >
                <Grid item xs={12}>
                  <Grid container justifyContent="center" spacing={6}>
                    {todoList.map((item, index) => (
                      <Grid key={index} item>
                        <Paper sx={{
                          height: 120,
                          width: 200,
                          backgroundColor: "#fff",
                          my: 1,
                          mx: 'auto',
                          p: 3,
                          borderRadius: "10px 10px 10px 10px"
                        }}>
                          <div className="lineOver">
                            {item.editing ? (
                              <TextField defaultValue={item.task}
                                id="outlined-multiline-static"
                                rows={2}
                                multiline
                                onChange={handleChange}
                                onKeyDown={(e) => handleKeyDownEdit(e, item)} />
                            ) : <Typography
                              style={{ overflowWrap: 'break-word', textDecorationLine: item.complete ? "line-through" : "none" }}>
                              {`${item.task}`}
                            </Typography>}
                          </div>
                        </Paper>
                        <Box className='iconBtnBox'
                        >
                          <Tooltip title="Edit Note">
                            <IconButton aria-label="edit" onClick={() => editDo(item, item.editing)} disabled={isEditBtnDisabled === index && item.complete}>
                              <EditIcon style={{ fill: "blue" }} />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Done Note">
                            <IconButton aria-label="edit" onClick={() => clickhandler(item, index)}>
                              <DoneIcon style={{ fill: "green" }} />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete Note">
                            <IconButton aria-label="delete" onClick={() => deleteDo(item)}>
                              <DeleteIcon style={{ fill: "red" }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default App;
