import 'bootstrap/dist/css/bootstrap.min.css';
import {TextField, ListItemButton } from '@mui/material';
import { Button, Container } from 'react-bootstrap';
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
    debugger
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

  return (
    <Container style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)'
    }}>
      <div>
        <p>Today's Date</p>
        <p>{currentDate}</p>
      </div>
      <div>
        <TextField style={{ width: 400, paddingRight: 30 }} value={input} onInput={(e) => setInput(e.target.value)} id="standard-basic" label="To-Do" variant="standard" />
        <Button style={{ width: 120, textAlign: "center", marginTop: 15 }} onClick={addDo} variant="outlined">Add</Button>
      </div>
      <div>
        <ListItemButton component="a" href="#simple-list">
          <ul>{
            todoList.map((item) => (
              <div>
                <li style={styles} key={item.id}>{item.task} <input type="checkbox" onClick={() => clickhandler(item)} value={checked} />
                  <Button style={{ width: 120, textAlign: "center", marginTop: 15 }} onClick={() => deleteDo(item)} variant="outlined">Delete</Button>
                </li>
              </div>
            ))
          }
          </ul>
        </ListItemButton>
      </div>
    </Container>
  );
}

export default App;
