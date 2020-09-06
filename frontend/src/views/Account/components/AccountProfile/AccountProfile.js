import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';
import axios from 'axios';
import { authenticate } from '../../../token';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const id = authenticate();
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({
    name: '',
    city: '',
    country: '',
    timezone: 'GTM-7',
    avatar: '/images/avatars/avatar_11.png'
  });


  useEffect(async() => {
    await axios.get(`http://localhost:3000/users/loadUser/${id}`)
    .then(response => {
      const data = response.data;
      setUser({
        ...user,
          name: data.personalInfo.firstname + ' ' + data.personalInfo.lastname,
          city: data.personalInfo.address.city,
          country: data.personalInfo.address.country,
      });

      if(data.username !== ''){
        setCount((count) => count + 1);
      }
      console.log(count);
      if(data.personalInfo.firstname !== ''){
        setCount((count) => count + 1);
      }
      console.log(count);
      if(data.personalInfo.lastname !== ''){
        setCount((count) => count + 1);
      }
      if(data.email !== ''){
        setCount((count) => count + 1);
      }
      if(data.personalInfo.phoneNum !== ''){
        setCount((count) => count + 1);
      }
      if(data.personalInfo.address.street !== ''){
        setCount((count) => count + 1);
      }
      if(data.personalInfo.address.city !== ''){
        setCount((count) => count + 1);
      }
      if(data.personalInfo.address.province !== ''){
        setCount((count) => count + 1);
      }
      if(data.personalInfo.address.postalCode !== ''){
        setCount((count) => count + 1);
      }
      if(data.personalInfo.address.country !== ''){
        setCount((count) => count + 1);
      }
      if(data.personalInfo.emergencyContact.name !== ''){
        setCount((count) => count + 1);
      }
      if(data.personalInfo.emergencyContact.phoneNumber !== ''){
        setCount((count) => count + 1);
      }
      if(data.personalInfo.emergencyContact.emg_email !== ''){
        setCount((count) => count + 1);
      }
      if(data.patientStats.birthday !== ''){
        setCount((count) => count + 1);
      }
      if(data.patientStats.gender !== ''){
        setCount((count) => count + 1);
      }
      if(data.patientStats.height.height_num !== ''){
        setCount((count) => count + 1);
      }
      if(data.patientStats.height.height_unit !== ''){
        setCount((count) => count + 1);
      }
      if(data.patientStats.weight.weight_num !== ''){
        setCount((count) => count + 1);
      }
      if(data.patientStats.weight.weight_num !== ''){
        setCount((count) => count + 1);
      }
      if(data.patientStats.allergies.alg_name !== ''){
        setCount((count) => count + 1);
      }
      if(data.patientStats.allergies.alg_type !== ''){
        setCount((count) => count + 1);
      }
      if(data.patientStats.allergies.alg_severity !== ''){
        setCount((count) => count + 1);
      }
      if(data.patientStats.disabilities.disab_name !== ''){
        setCount((count) => count + 1);
      }
      if(data.patientStats.disabilities.disab_type !== ''){
        setCount((count) => count + 1);
      }
      if(data.patientStats.disabilities.disab_definition !== ''){
        setCount((count) => count + 1);
      }
      if(data.patientStats.medications.med_name !== ''){
        setCount((count) => count + 1);
      }
      if(data.patientStats.medications.dosage !== ''){
        setCount((count) => count + 1);
      }
      if(data.patientStats.medications.fillCount !== ''){
        setCount((count) => count + 1);
      }
      if(data.patientStats.medications.prescribedBy !== ''){
        setCount((count) => count + 1);
      }
      if(data.patientStats.medications.prescribedDate !== ''){
        setCount((count) => count + 1);
      }
      if(data.patientStats.medications.renewDate !== ''){
        setCount((count) => count + 1);
      }
      if(data.patientStats.bloodType !== ''){
        setCount((count) => count + 1);
      }

      console.log(count);
      setCount((count) => (count/32) * 100);

    })
    .catch(error => {
      console.log(error)
    })
  },[]);

  // retrieve user using axios

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {user.name}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.city}, {user.country}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {moment().format('hh:mm A')} ({user.timezone})
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: {count}%</Typography>
          <LinearProgress
            value={count}
            variant="determinate"
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
        >
          Upload picture
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
