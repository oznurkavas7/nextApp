import React, { useContext, useState } from "react";
import { GlobalContext } from "./TodoPanel";
import 'bootstrap/dist/css/bootstrap.min.css';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import {
    Button, Grid, Dialog, DialogContent, DialogActions, DialogContentText,
    Box, Typography, Tooltip, Paper, TextField
} from '@mui/material';
import './App.css';

const TodoListPanel = () => {
    const { todoList, deleteToCard, deleteToAllCard } = useContext(GlobalContext);
    const [cardFldVal, setCardFld] = useState('');
    const [open, setOpen] = useState(false);

    function editDo(item, isEdit) {
        todoList.forEach(i => {
            if (item.id === i.id) {
                item.editing && cardFldVal !== '' && (item.task = cardFldVal);
                item.editing = !isEdit;
            }
        });
    };

    function handleChange(event) {
        setCardFld(event.target.value);
    };

    function clickHandler(item, index) {
        todoList.forEach(i => {
            if (item.id === i.id) {
                item.complete = !item.complete;
            }
        });
    };

    function handleKeyDownEdit(e, item) {
        if (e.key === 'Enter') {
            todoList.forEach(i => {
                if (item.id === i.id) {
                    item.editing = false;
                    item.task = e.target.value;
                }
            });
        }
    };

    function handleClose() {
        setOpen(false);
    };


    function handleClickOpen() {
        setOpen(true);
    };

    function deleteAll() {
        deleteToAllCard();
        setOpen(false);
    }

    return (
        <Grid item xs={12} style={{ display: todoList.length !== 0 ? "inline" : "none" }}
        >
            <div className='cardStyle'>
                <Tooltip title="Delete the cards">
                    <span>
                        <Button className='deleteAllStyle'
                            onClick={() => handleClickOpen()}
                            variant="contained" startIcon={<DeleteIcon />}>Delete All</Button>
                    </span>
                </Tooltip>
            </div>
            <Dialog
                open={open}
                onClose={() => handleClose()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to delete the cards?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose()}>No</Button>
                    <Button onClick={() => deleteAll()} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <div>
                <Grid sx={{ flexGrow: 1 }} container spacing={12} >
                    <Grid item xs={12}>
                        <div>
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
                                                        onChange={(e) => handleChange(e)}
                                                        onKeyDown={(e) => handleKeyDownEdit(e, item)}
                                                    />
                                                ) : <Typography
                                                    style={{ overflowWrap: 'break-word', textDecorationLine: item.complete ? "line-through" : "none" }}>
                                                    {`${item.task}`}
                                                </Typography>}
                                            </div>
                                        </Paper>
                                        <Box className='iconBtnBox'
                                        >
                                            {item.editing ? (
                                                <>
                                                    <Tooltip title="Save Note">
                                                        <IconButton aria-label="edit" onClick={() => editDo(item, item.editing)}>
                                                            <SaveIcon style={{ fill: "blue" }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </>
                                            ) : (
                                                <Tooltip title="Edit Note">
                                                    <IconButton aria-label="edit" onClick={() => editDo(item, item.editing)}>
                                                        <EditIcon style={{ fill: "blue" }} />
                                                    </IconButton>
                                                </Tooltip>
                                            )}

                                            <Tooltip title="Done Note">
                                                <IconButton aria-label="edit" onClick={() => clickHandler(item, index)}>
                                                    <DoneIcon style={{ fill: "green" }} />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Delete Note">
                                                <IconButton aria-label="delete" onClick={() => deleteToCard(item)}>
                                                    <DeleteIcon style={{ fill: "red" }} />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Grid>


    );
}

export default TodoListPanel;