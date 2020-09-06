import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes, { func } from 'prop-types';
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import { authenticate } from '../../../token';
import axios from "axios";
import MaterialTable from 'material-table';
import validate from 'validate.js';




const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        paddingTop: '5px',
        minWidth: '500px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
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
    },
    notchedOutline: {
        borderWidth: "1px",
        borderColor: theme.palette.primary.dark
    },
    grid: {
        borderBottomStyle: 'solid',
        borderBottom: '1px',
        borderBottomColor: theme.palette.primary.main,
        margin: theme.spacing(1)
    }
}));

const EntryButton = props => {
    const { className, ...rest } = props;

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [responseText, setResponseText] = useState('');
    const [radioValue, setRadioValue] = useState('N/A');
    const [rows, setRows] = useState([]);


    const [formState, setFormState] = useState({
        open: false,
        values: {},
        touched: {},
        date: new Date(),
        time: new Date(),

    });

    const schema = {
        title: {
            presence: { allowEmpty: false, message: 'is required' },
        }
    };

    useEffect(() => {
        //on page load
        //console.log(filtered);

        const id = authenticate();

        console.log(`ID: ` + id);
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                ['time']: new Date(),
                ['date']: new Date()
            }
        }));

        async function fillCategories() {
            await axios.get("http://localhost:3000/entry/category/getQuestions", {
            }).then((response) => {
                const data = response.data;
                data.forEach((questionData) => {
                    setCategory(category => category.concat(questionData))
                })
            }).catch((err) => {
                console.log(err.response);
            })
        }

        fillCategories();
    }, []);

    //console.log(formState.values);
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
        //for title and contents
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

    const handleClickOpen = async () => {

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
        //closing the entry form removes all categories so it doesn't duplicate the next time it opens
        setSelectedCategory([]);
        setRows([]);
    };

    const options = category.map((option) => {
        const firstLetter = option.categoryName[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    const pickCategory = event => {
        let text = event.target.innerText;
        //console.log(text);

        if (!text == undefined || !text == "") {


            const getQuestions = category.filter(question => {
                var questionReturn = question.categoryName.includes(text);
                if (questionReturn) {
                    //setSelectedCategory(prev => [...prev, { categoryName: text, categoryQuestions: question.questions }]);
                    setRows(prevArray => [...prevArray, { categoryName: text, categoryQuestions: question.questions }]);
                }
            })
        }


        //goes to useEffect[selectedCategory]
    }

    const removeRow = (index) => {
        var listRows = [...rows];
        var category = [...selectedCategory];
        listRows.splice(index, 1);
        category.splice(index, 1);
        setRows(listRows);
        //setCategory(category);
    }

    useEffect(() => {
        //when radioValue is updated
        console.log(rows);
    }, [rows]);

    useEffect(() => {
        //when radioValue is updated
    }, [selectedCategory]);

    const pickSelection = event => {
        setRadioValue(event.target.value);
    }

    const setResponse = (event, index1, index2, question) => {
        // setResponseText((responseText => ({
        //     ...responseText, response: {
        //         ...responseText.response,
        //         ['value']: event.target.value
        //     }
        // })));

        // setFormState(formState => ({
        //     ...formState,
        //     values: {
        //         ...formState.values,
        //         [name]: value
        //     }
        // }));


        //       console.log(event.target);
        //debugger;
        // console.log(index1);
        // console.log(index2)
        //console.log(question);
        let newData = [...rows];
        // console.log(newData);
        //rows[index1].categoryQuestions[index2]
        newData[index1].categoryQuestions[index2].response = event.target.value;
        setRows(newData);
        //setRows(prevArray => [...prevArray, { categoryName: text, categoryQuestions: question.questions }]);
    }

    useEffect(() => {
        console.log(responseText);

        //let newData = [...rows];
        //console.log(newData);
        //rows[index1].categoryQuestions[index2]
        //newData[index1].categoryQuestions[index2].response = responseText;
        //setRows(newData);
    }, [responseText]);



    useEffect(() => {
        //when radioValue is updated

    }, [radioValue]);


    //validate title
    useEffect(() => {
        const errors = validate(formState.values, schema);

        setFormState(formState => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {}
        }));
    }, [formState.values]);


    const submit = async () => {
        const id = authenticate();
        await axios
            .post("http://localhost:3000/entry/add/", {
                id: id,
                contents: formState.values.contents,
                title: formState.values.title,
                category: { selectedCategory },
                date: formState.values.date.toISOString().substring(0, 10),
                time: formState.values.time.toISOString().substring(11, 16),
                data: rows
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

    const hasError = field =>
        formState.touched[field] && formState.errors[field] ? true : false;

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                New Entry
                 </Button>

            <Dialog
                open={formState.open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                className={classes.root}
                fullWidth={true}
                maxWidth={'lg'}
                scroll={'paper'}
            >
                <DialogTitle id="form-dialog-title">New Entry</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create an entry, please submit the contents of your entry.
                        </DialogContentText>


                    <Grid container spacing={3}>
                        <Grid item xs>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                name="title"
                                fullWidth
                                label="Title"
                                type="title"
                                onChange={handleChange}
                                error={hasError('title')}
                                helperText={
                                    hasError('title') ? formState.errors.title[0] : null
                                }
                                value={formState.values.title || ''}
                            />

                        </Grid>
                        <Grid item xs>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date"
                                    name="date"
                                    label="Date"
                                    value={formState.values.date || ''}
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
                                    value={formState.values.time || ''}
                                    onChange={pickTime}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />

                            </MuiPickersUtilsProvider>

                        </Grid>

                    </Grid>


                    <table>
                        <thead>
                            <tr>
                                <th>Symptoms</th>
                            </tr>
                            <tr></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Autocomplete
                                        id="grouped-demo"
                                        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                        groupBy={(option) => option.firstLetter}
                                        getOptionLabel={(option) => option.categoryName}
                                        getOptionSelected={(option) => option.categoryName}
                                        style={{ width: 300, paddingTop: 5 }}
                                        onInputChange={pickCategory}
                                        renderInput={(params) => <TextField {...params} label="Select a symptom" variant="outlined" />}
                                    />
                                </td>
                            </tr>
                            {rows.map((row, index) =>
                                <tr id={index} key={index}>
                                    <td>{row.categoryName}</td>
                                    <td>
                                        <Grid
                                            container
                                            spacing={2}
                                            className={classes.grid}
                                        >
                                            {row.categoryQuestions.map((question, index2) => {

                                                //console.log(rows[index].categoryQuestions[index2]);
                                                return [
                                                    <Grid item xs={3} key={index2}  >

                                                        <TextField
                                                            margin="dense"
                                                            id={question.question}
                                                            name="response"
                                                            multiline
                                                            label={question.question}
                                                            type="contents"
                                                            rows={6}
                                                            onChange={() => setResponse(event, index, index2, { question })}
                                                            value={rows[index].categoryQuestions[index2].response || ''}
                                                            color="primary"
                                                            InputProps={{ disableUnderline: true }}
                                                            variant="standard"
                                                        //onChange={handleChange}
                                                        //value={formState.values.response || ''}
                                                        />
                                                    </Grid>
                                                ]
                                            })}
                                        </Grid>
                                    </td>
                                    <td><Button onClick={() => removeRow(index)} color="primary" row={index}> Remove </Button> </td>
                                </tr>)}
                        </tbody>
                    </table>

                    {/* {questions || null} */}


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
                        value={formState.values.contents || ''}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button
                        onClick={() => { handleClose(); submit(); }}
                        color="primary"
                        disabled={!formState.isValid}
                    >
                        Submit
          </Button>
                </DialogActions>
            </Dialog>
        </div >

    )
};

EntryButton.propTypes = {
    className: PropTypes.string
};


export default EntryButton;