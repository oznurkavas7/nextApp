import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { createContext, useEffect, useReducer } from "react";
import AppReducer from './AppReducer';

export const GlobalContext = createContext([]);

const initialState = {
  todoList: localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : [],//localstorage'de deger varsa JS'e cevir goster, yoksa boş array yolla
  containerColor: localStorage.getItem("containerColor") ? localStorage.getItem("containerColor") : "#CCCCFF"
}

export const TodoPanel = (props) => { //props => aşagıdakı elemanların hepsini almak ıcın
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const addToArray = (item) => {
    dispatch({ type: "ADD_TO_ARRAY", payload: item })
  };

  const deleteToCard = (item) => {
    dispatch({ type: "DELETE_TO_CARD", payload: item })
  };

  const deleteToAllCard = (item) => {
    dispatch({ type: "DELETE_TO_ALL_CARD", payload: item })
  };

  const changeBgColor = (item) => {
    dispatch({ type: "CHANGE_BG_COLOR", payload: item })
  };

  //local stroge
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(state.todoList));
    localStorage.setItem("containerColor", state.containerColor); 

  }, [state])

  //parent kapsayıcı
  return (
    <GlobalContext.Provider value={ //parents kapsayıcı
      {
        todoList: state.todoList,
        containerColor: state.containerColor,
        addToArray,
        deleteToCard,
        deleteToAllCard,
        changeBgColor
      }

    }>
      {props.children}
    </GlobalContext.Provider>
  );
}

export function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${date}/${month}/${year}`;
}