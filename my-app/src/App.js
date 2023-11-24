import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import {
  TextField, Button, Checkbox, FormControlLabel, List, ListItem, ListItemText,
  CardContent, Card, Grid, Dialog, DialogContent, DialogActions, DialogContentText
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
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      },
    ]);
    setDelBtnDisabled(false);
    setInput("");
    setChecked(false);
  };

  const clickhandler = (item, checked) => {
    todoList.forEach(i => {
      if (item.id === i.id) {
        setChecked(!checked);
        item.complete = !checked;
      }
    });
  }

  const deleteDo = value => {
    setTodoList(oldValues => {
      setDelBtnDisabled(todoList.length === 1);
      return oldValues.filter(item => item !== value)
    })
  }

  const deleteAll = () => {
    setTodoList([]);
    setDelBtnDisabled(true);
    setOpen(false);
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      addDo();
    }
  }

  return (
    <Container>
      <div style={{ padding: 30 }}>
        <Grid container spacing={10} justify="center">
          <Grid item xs={12} display={{ md: 12 }}>
            <Card>
              <CardContent>
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
          <Grid item xs={12} display={{ md: todoList.length !== 0 ? 12 : "none" }}
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
                  Tüm to-do listesi silinsin mi?
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
                    {todoList.map((item) => (
                      <ListItem
                        key={item.id}
                      >
                        <ListItemText
                          primary={`${item.task}`} style={{ textDecorationLine: item.complete ? "line-through" : "none" }} />
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => deleteDo(item)}>
                          <DeleteIcon />
                        </IconButton>
                        <FormControlLabel control={<Checkbox />} label="Completed" onChange={() => clickhandler(item, checked)} value={checked} />
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

/* onClick={() => editDo(item)}
  const [isEditing, setIsEditing] = useState(false);
<div>
            <SketchPicker>
          </SketchPicker>
            </div>
*/