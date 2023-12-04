import 'bootstrap/dist/css/bootstrap.min.css';
import {
  CardContent, Card, Grid
} from '@mui/material';
import { Container } from 'react-bootstrap';
import './App.css';
import { getDate, TodoPanel } from './TodoPanel';
import React, { useState } from "react";
import TodoListPanel from './TodoListPanel';
import TodoTextPanel from './TodoTextPanel';
import ChangeColorSett from './ChangeColorSett';

function App() {
  const [currentDate] = useState(getDate());
  let time = new Date().toLocaleTimeString();
  const [ctime, setTime] = useState(time)
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString()
    setTime(time)
  }
  setInterval(UpdateTime);

  return (
    <TodoPanel>
      <Container style={{ backgroundColor: localStorage.getItem("containerColor"), borderRadius: "20px 20px 20px 20px" }}>
        <div style={{ padding: 30 }}>
          <Grid container spacing={10} justify="center">
            <Grid item xs={12} display={{ md: 12 }}>
              <Card>
                <CardContent>
                  <ChangeColorSett></ChangeColorSett>
                  <div>
                    <p>Today's Date:  <b>{currentDate} {ctime}</b></p>
                  </div>
                  <TodoTextPanel ></TodoTextPanel>
                </CardContent>
              </Card>
            </Grid>
            <TodoListPanel></TodoListPanel>
          </Grid>
        </div>
      </Container>
    </TodoPanel>
  )
}

export default App;
