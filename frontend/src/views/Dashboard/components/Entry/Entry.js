import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Button,
    IconButton,
    TextField,
    Link,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { authenticate } from '../../../../views/token';
import axios from "axios";


const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        fontWeight: 700
    },
    avatar: {
        backgroundColor: theme.palette.error.main,
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    },
    difference: {
        marginTop: theme.spacing(2),
        display: 'flex',
        alignItems: 'center'
    },
    differenceIcon: {
        color: theme.palette.error.dark
    },
    differenceValue: {
        color: theme.palette.error.dark,
        marginRight: theme.spacing(1)
    }
}));

const Entry = props => {
    const { className, ...rest } = props;

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [formState, setFormState] = useState({
        open: false,
        values: {},
        touched: {},
        date: new Date(),
        time: new Date()
    });

    useEffect(() => {
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                ['time']: new Date(),
                ['date']: new Date()
            }
        }));
    }, []);

    console.log(formState.values);
    const pickTime = (time) => {
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                ['time']: time
            }
        }));

    }

    const pickDate = (date) => {
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                ['date']: date
            }
        }));
    }
    const handleChange = event => {
        const { name, value } = event.target;
        //event.persist();


        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [name]: value
            }
        }));
    };

    const handleClickOpen = () => {
        setFormState(formState => ({
            ...formState,
            open: true,
            values: {
                ...formState.values,
                ['time']: new Date(),
                ['date']: new Date(),
            }
        }));
    };

    const handleClose = () => {
        setFormState(formState => ({
            ...formState,
            open: false,
            values: ''
        }));
    };

    const submit = async () => {
        const id = authenticate();
        console.log(formState.values);
        await axios
            .post("http://localhost:3000/entry/add/", {
                id: id,
                contents: formState.values.contents,
                title: formState.values.title,
                date: formState.values.date.toISOString().substring(0, 10),
                time: formState.values.time.toISOString().substring(11, 16)
            })
            .then((response) => {
                alert(response.data)

                setFormState(formState => ({
                    ...formState,
                    values: ''
                }));

            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                New Entry
                 </Button>
            <Dialog open={formState.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Entry</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create an entry, please submit the contents of your entry.
                        </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        name="title"
                        multiline
                        label="Title"
                        type="title"
                        fullWidth
                        onChange={handleChange}
                        value={formState.values.title}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date"
                            name="date"
                            label="Date"
                            value={formState.values.date}
                            onChange={pickDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardTimePicker
                            margin="normal"
                            id="time"
                            label="Time picker"
                            name="time"
                            value={formState.values.time}
                            onChange={pickTime}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />

                    </MuiPickersUtilsProvider>
                    <TextField
                        margin="dense"
                        id="contents"
                        name="contents"
                        multiline
                        label="Contents"
                        type="contents"
                        fullWidth
                        rows={10}
                        onChange={handleChange}
                        value={formState.values.contents}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={() => { handleClose(); submit(); }} color="primary">
                        Submit
          </Button>
                </DialogActions>
            </Dialog>
        </div >

    )
};

Entry.propTypes = {
    className: PropTypes.string
};


export default Entry;