import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { TextField, Button, Checkbox, FormControlLabel, List, ListItem, ListItemText } from '@mui/material';
import { Container } from 'react-bootstrap';
import './App.css';
import React, { useState } from "react";

function App() {
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const styles = { textDecorationLine: checked ? "line-through" : "none" };
  const [currentDate] = useState(getDate());

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
    setInput("");
  };

  const clickhandler = (value) => {
    todoList.forEach(item => {
      if (item.id === value.id) {
        if (!value.complete) {
          setChecked(true);
          value.complete = true;
          item.complete = true;

        }
        else {
          setChecked(false);
          value.complete = false;
          item.complete = false;
        }
      }
    });
  }

  const deleteDo = value => {
    setTodoList(oldValues => {
      return oldValues.filter(item => item !== value)
    })
  }

  const deleteAll = () => {
    setTodoList([]);
  }

  return (
    <Container>
      <div>
        <p>Today's Date:  <b>{currentDate}</b></p>
      </div>
      <div>
        <TextField style={{ paddingRight: 30, width: 300 }} value={input} onInput={(e) => setInput(e.target.value)} id="standard-basic" label="To-Do" variant="standard" />
        <Button style={{ marginTop: 15 }} onClick={addDo} variant="outlined">Add</Button>
        <Button style={{ marginTop: 15 }} onClick={deleteAll} variant="outlined">Delete All</Button>

      </div>
      <div>
        <List sx={{ width: '100%', maxWidth: 360 }}>
          {todoList.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton aria-label="delete" onClick={() => deleteDo(item)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={`${item.task}`} />
            </ListItem>
          ))}
        </List>
      </div>
    </Container>
  );
}

export default App;

/*<FormControlLabel control={<Checkbox />} style={styles} label="Completed" onClick={() => clickhandler(item)} value={checked} />
              <input type="checkbox" onClick={() => clickhandler(item)} value={checked} />
               <Button onClick={() => deleteDo(item)} variant="outlined" color="secondary" size="small" startIcon={<DeleteIcon />}>Delete</Button>

             */