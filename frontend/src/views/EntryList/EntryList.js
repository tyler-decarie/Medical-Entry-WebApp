import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import axios from "axios";
import { EntryToolbar } from './components';
import EntriesTable from './components/EntriesTable/EntriesTable';
import { authenticate } from '../../views/token';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    },
    pagination: {
        marginTop: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
}));

const EntryList = props => {
    const classes = useStyles();
    const id = authenticate();
    const [entries, setEntries] = useState([]);

    if(props.location.data != undefined) {
        useEffect(() => {
            setEntries(props.location.data);
            console.log(entries);
      });
      }
      if(props.location.data == undefined) {
      useEffect(() => {
        console.log("on load");
        console.log(id);
        async function fillEntries() { 
            await axios.post("http://localhost:3000/entry/", { patient: id
            }).then((response) => {
                const data = response.data;
                console.log(data);
                data.forEach((entryData) => {
                    setEntries(entry => entry.concat(entryData))
                })
            }).catch((err) => {
                console.log(err.response);
            })
        }
    
        fillEntries();
    }, []);
      }

    return (
        <div className={classes.root}>
            <EntryToolbar />
            <div className={classes.content}>
                <EntriesTable entries={entries}/>
            </div>
            <div className={classes.pagination}>
                <Typography variant="caption">1-6 of 20</Typography>
                <IconButton>
                    <ChevronLeftIcon />
                </IconButton>
                <IconButton>
                    <ChevronRightIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default EntryList;
