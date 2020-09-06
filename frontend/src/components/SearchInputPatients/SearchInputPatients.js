import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px'
  }
}));

const SearchInputPatients = props => {
  const { className, onChange, style, ...rest } = props;
  const classes = useStyles();
  const history = useHistory();
  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      //console.log(event.target.value);
      const name = event.target.value;
      searchUsers(name);
    }
  
  async function searchUsers(name) {
    await axios.post("http://localhost:3000/users/searchmedpros", {
      firstname: name
    }).then((response) => {
        const data = response.data;
        console.log(data[0]);
        history.push({pathname:'/medpros', data:data});
    }).catch((err) => {
        console.log(err);
    })
}
};

  return (
    <Paper
      {...rest}
      className={clsx(classes.root, className)}
      style={style}
    >
      <SearchIcon className={classes.icon} />
      <Input
        {...rest}
        className={classes.input}
        disableUnderline
        onKeyUp={handleKeyDown}
      />
    </Paper>
  );
};

SearchInputPatients.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  history: PropTypes.object,
};

export default SearchInputPatients;
