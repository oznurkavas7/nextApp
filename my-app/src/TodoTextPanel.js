import React, { useContext, useState } from "react";
import { GlobalContext } from "./TodoPanel";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    TextField
} from '@mui/material';
import './App.css';

const TodoTextPanel = () => {
    const { addToArray } = useContext(GlobalContext);
    const [input, setInput] = useState("");

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.target.value !== "" && addDo(e.target.value);
        }
    };

    function addDo(val) {
        addToArray(val);
        setInput("");
    };

    return (
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
    );
}

export default TodoTextPanel;