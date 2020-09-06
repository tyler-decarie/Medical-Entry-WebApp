import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { authenticate } from '../../../token';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import {
  Card,
  Button,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
import axios from "axios";
import {history}from 'history';
import EntriesExport from '../EntriesExport'
import { getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  button: {
    marginRight: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1
  },

}));

const EntriesTable = props => {
  const { className, history, entries, ...rest } = props;

  console.log(entries)
  const classes = useStyles();

  const [selectedEntries, setselectedEntries] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { entries } = props;

    let selectedEntries;

    if (event.target.checked) {
      selectedEntries = entries.map(entry => entry._id);
    } else {
      selectedEntries = [];
    }

    setselectedEntries(selectedEntries);
  };

  const handleSelectOne = (event, id) => {
    console.log(event.target);
    const selectedIndex = selectedEntries.indexOf(id);
    let newselectedEntries = [];
    if (selectedIndex === -1) {
      newselectedEntries = newselectedEntries.concat(selectedEntries, id);
    } else if (selectedIndex === 0) {
      newselectedEntries = newselectedEntries.concat(selectedEntries.slice(1));
    } else if (selectedIndex === selectedEntries.length - 1) {
      newselectedEntries = newselectedEntries.concat(selectedEntries.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedEntries = newselectedEntries.concat(
        selectedEntries.slice(0, selectedIndex),
        selectedEntries.slice(selectedIndex + 1)
      );
    }

    setselectedEntries(newselectedEntries);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  //Remove a single entry 
   const handleRemove = async (event, title) =>
  {
    event.preventDefault();
    window.location.reload(false);
       await axios
          .post("http://localhost:3000/entry/delete", {
              title: title,
          })
          .then((response) => {
              setFormState(formState => ({
                  ...formState,
                  values: ''
              }));
          })
          .catch((error) => {
              console.log("Failed to delete");
          });
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <div className={classes.row}>
              <span className={classes.spacer} />
              <Button className={classes.button} color="primary" variant="outlined">Import</Button>
              {          /*
            sends selected entries to the export button
          */}
              {<EntriesExport selectedEntries={selectedEntries} />}
            </div>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedEntries.length === entries.length}
                      color="primary"
                      indeterminate={
                        selectedEntries.length > 0 &&
                        selectedEntries.length < entries.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Questions</TableCell>
                  <TableCell>Contents</TableCell>
                  <TableCell>Date Created</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entries.slice(0, rowsPerPage).map(entry => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={entry._id}
                    selected={selectedEntries.indexOf(entry._id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedEntries.indexOf(entry._id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, entry._id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>

                        <Typography variant="body1">{entry.title}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      {entry.category.map(category => (
                        <div>
                          {category.categoryName}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {entry.category.map(category => (

                        category.categoryQuestions.map(question => (

                          <div><b>{question[0].question}</b>: {question[0].response}</div>
                        ))

                      ))}
                    </TableCell>
                    <TableCell>
                      {entry.contents}
                    </TableCell>
                    <TableCell>
                      {moment(entry.createdAt).format('DD/MM/YYYY')}
                    </TableCell>

                    <TableCell>
                    <IconButton aria-label="edit" color="primary">
                        <EditIcon />
                    </IconButton> 
                    </TableCell>
                    
                    <TableCell>
                    <IconButton onClick={() => handleRemove(event, entry.title)} aria-label="delete" color="action">
                        <DeleteIcon />
                    </IconButton>
                    </TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={entries.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

EntriesTable.propTypes = {
  className: PropTypes.string,
  entries: PropTypes.array.isRequired,
  history: PropTypes.object
};



export default withRouter(EntriesTable);
