import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import axios from 'axios';
import { authenticate } from '../../../../../../views/token';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const id = authenticate();

  const [user, setUser] = useState({
    name: '',
    bio: '',
    avatar: '/images/avatars/avatar_11.png'
  });


  useEffect(() => {
  axios.get(`http://localhost:3000/users/loadUser/${id}`)
    .then(response => {
      const data = response.data;
      setUser({
        ...user,
          name: data.personalInfo.firstname + ' ' + data.personalInfo.lastname,
          bio: data.username,
      });
    })
    .catch(error => {
      console.log(error)
    })
  },[]);



  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/dashboard"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
