import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import PDFButton from '../PDFButton';
import axios from 'axios';

import {
    Divider,
    Grid,
    Button,
    IconButton,
    TextField,
    Link,
    List,
    ListItem,
    ListItemText,
    Card,
    CardContent,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        paddingLeft: '5px',
        width: '75%'
    },
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
    spacer: {
        flexGrow: 1
    },
    button: {
        marginRight: theme.spacing(1),
    },
    inline: {
        display: 'inline',
    },
    list: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    card: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    indent: {
        marginBottom: 12,
        paddingLeft: 5
    }
}));

const EntriesExport = React.forwardRef((props, ref) => {
    const { selectedEntries } = props;
    const [results, setResults] = React.useState([]);
    const classes = useStyles();

    //for dialog 
    const [formState, setFormState] = useState({
        open: false,
        values: {},
    });

    //to close or when you click away from the generated export
    const handleClose = () => {
        setFormState(formState => ({
            ...formState,
            open: false,
            values: ''
        }));
        //removes results so its clear for next time
        console.log(formState.open);
        setResults([]);
    };




    const exportData = async () => {
        console.log(selectedEntries);
        //make a request to the backend to get entry data using list of id's
        await axios
            .post("http://localhost:3000/entry/getentrylist/", {
                selectedEntries: selectedEntries
            })
            .then((response) => {
                if (response.status === 200) {
                    setResults(response.data);
                    //set [results] to the entry data
                }
            })
            .catch((error) => {
                console.log(error);
            });

    };

    useEffect(() => {

        //when results get filled, open the generated report window
        if (results.length > 0) {
            setFormState(formState => ({
                ...formState,
                open: true,
                values: {
                    ...formState.values,
                }
            }));
        }

    }, [results])


    let categoryQuestion = [];
    return (
        <div>
            <Button
                color="primary"
                onClick={exportData}
                variant="outlined"
                className={classes.button}
                disabled={selectedEntries.length < 1}
            //need at least 1 entry to be able to export
            >
                Export
        </Button>

            <Dialog
                open={formState.open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth={false}
                maxWidth={'md'}
            >

                <Grid container spacing={1} id="print">
                    <Grid item xs={12}>
                        <DialogTitle id="form-dialog-title">Generated export</DialogTitle>
                    </Grid>
                    {/*
                    look thruogh all entries
                    */}
                    {results.map((result) => {
                        categoryQuestion = [];
                        return (
                            <React.Fragment key={result._id}>
                                <Grid item xs={6}>
                                    {result.category.map((answer) => {
                                        {/*
                    look thruogh all entry symptoms, their questions and answers
                    */}
                                        categoryQuestion.push(
                                            <Fragment key={answer}>
                                                <Typography className={classes.pos} component="p">Symptom: {answer.categoryName} </Typography>
                                            </Fragment>
                                        );
                                        answer.categoryQuestions.map((question, index) => {
                                            categoryQuestion.push(
                                                <Fragment key={question[0]._id}>
                                                    <Typography className={classes.indent} component="p"><b>{question[0].question}</b>: {question[0].response} </Typography>
                                                </Fragment>
                                            )
                                        })
                                    })}

                                    <Card className={classes.root} variant="outlined">
                                        <CardContent key={result._id}>
                                            <Typography className={classes.title} color="primary" gutterBottom>{result.title} </Typography>
                                            <Typography className={classes.pos} component="p">Created: {result.createdAt.substr(0, 10)} </Typography>
                                            <Typography className={classes.pos} component="p">Date: {result.dateOfEntry.substr(0, 10)} </Typography>
                                            <Typography className={classes.pos} component="p">Time: {result.timeOfEntry} </Typography>
                                            <Typography className={classes.pos} component="p">Contents: {result.contents} </Typography>

                                            {/*
                    entry symptom + question + response data
                    */}
                                            {categoryQuestion}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </React.Fragment>
                        )
                    })}
                </Grid>
                <PDFButton />
            </Dialog>
        </div>
    );
});


EntriesExport.propTypes = {
    className: PropTypes.string
};

export default EntriesExport;
