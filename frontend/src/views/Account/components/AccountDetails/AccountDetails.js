import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { authenticate } from '../../../token';
import axios from 'axios';
import ControlledAddressInput from './ControlledAddressInput';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [values, setValues] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNum: '',
    street: '',
    city: '',
    province: '',
    postalcode: '',
    country: '',
    name: '',
    phoneNumber: '',
    emg_email: '',
    birthday: '',
    gender: '',
    height_num: '',
    height_unit: '',
    weight_num: '',
    weight_unit: '',
    alg_name: '',
    alg_type: '',
    alg_severity: '',
    disab_name: '',
    disab_type: '',
    disab_definition: '',
    med_name: '',
    dosage: '',
    fillCount: '',
    prescribedBy: '',
    prescribedDate: '',
    renewDate: '',
    bloodType: '',
  });

  const handleChange = event => {

    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const eventhandler = data => {
    setValues({
      ...values,
        street: data.addressLine1,
        city: data.city,
        province: data.region,
        postalcode: data.zip,
        country: data.country,
    });
  }

  const id = authenticate();

  useEffect(async() => {
     await axios.get(`http://localhost:3000/users/loadUser/${id}`)
    .then(response => {
      const data = response.data;
      console.log(data);
      setValues({
        ...values,
        username: data.username,
        firstName: data.personalInfo.firstname,
        lastName: data.personalInfo.lastname,
        email: data.email,
        phoneNum: data.personalInfo.phoneNum,
        street: data.personalInfo.address.street,
        city: data.personalInfo.address.city,
        province: data.personalInfo.address.province,
        postalcode: data.personalInfo.address.postalCode,
        country: data.personalInfo.address.country,
        name: data.personalInfo.emergencyContact.name,
        phoneNumber: data.personalInfo.emergencyContact.phoneNumber,
        emg_email: data.personalInfo.emergencyContact.emg_email,
        birthday: data.patientStats.birthday,
        gender:  data.patientStats.gender,
        height_num:  data.patientStats.height.height_num,
        height_unit:  data.patientStats.height.height_unit,
        weight_num:  data.patientStats.weight.weight_num,
        weight_unit:  data.patientStats.weight.weight_unit,
        alg_name:  data.patientStats.allergies.alg_name,
        alg_type: data.patientStats.allergies.alg_type,
        alg_severity: data.patientStats.allergies.alg_severity,
        disab_name: data.patientStats.disabilities.disab_name,
        disab_type: data.patientStats.disabilities.disab_type,
        disab_definition: data.patientStats.disabilities.disab_definition,
        med_name: data.patientStats.medications.med_name,
        dosage: data.patientStats.medications.dosage,
        fillCount: data.patientStats.medications.fillCount,
        prescribedBy: data.patientStats.medications.prescribedBy,
        prescribedDate: data.patientStats.medications.prescribedDate,
        renewDate: data.patientStats.medications.renewDate,
        bloodType: data.patientStats.bloodType,
      });
    })
    .catch(error => {
      console.log(error)
    })
  },[]);

  const handleClick = () => {
    setOpen(true);
  };

  function handleChangeDate1(val){
    setValues({
      ...values,
        birthday: val,
    });
  }

  function handleChangeDate2(val){
    setValues({
      ...values,
      prescribedDate: val,
    });
  }

  function handleChangeDate3(val){
    setValues({
      ...values,
      renewDate: val,
    });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  console.log(values.address);

  const handleUpdate = async event => {
    const id = authenticate();
    event.preventDefault();
    await axios.post(`http://localhost:3000/users/update`, {
        id: id,
        username: values.username,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNum: values.phoneNum,
        street: values.street,
        city: values.city,
        province: values.province,
        postalcode: values.postalcode,
        country: values.country,
        name: values.name,
        phoneNumber: values.phoneNumber,
        emg_email: values.emg_email,
        birthday: values.birthday,
        gender: values.gender,
        height_num: values.height_num,
        height_unit: values.height_unit,
        weight_num: values.weight_num,
        weight_unit: values.weight_unit,
        alg_name: values.alg_name,
        alg_type: values.alg_type,
        alg_severity: values.alg_severity,
        disab_name: values.disab_name,
        disab_type: values.disab_type,
        disab_definition: values.disab_definition,
        med_name: values.med_name,
        dosage: values.dosage,
        fillCount: values.fillCount,
        prescribedBy: values.prescribedBy,
        prescribedDate: values.prescribedDate,
        renewDate: values.renewDate,
        bloodType: values.bloodType,
			})
				.then((response) => {
					if (response.status === 200) {
            
					}
				})
				.catch((error) => {
          
        });
        handleClick();
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify your username"
                label="Username"
                margin="dense"
                name="username"
                onChange={handleChange}
                required
                value={values.username}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                margin="dense"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                margin="dense"
                name="phoneNum"
                onChange={handleChange}
                type="number"
                value={values.phoneNum}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <ControlledAddressInput
                name="address"
                onChange={eventhandler}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />

 {/* Patient medical information */}
        <CardHeader
          subheader="Patients Medical information/History."
          title="Patient Information"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField 
                fullWidth
                id="select" 
                label="Gender"
                onChange={handleChange} 
                value={values.gender}
                variant="outlined"
                margin="dense"
                // helperText="Select of for unspecified gender"
                name="gender"
                select>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  disableFuture
                  id="date"
                  name="birthday"
                  openTo="year"
                  format="dd/MM/yyyy"
                  label="Date of birth"
                  views={["year", "month", "date"]}
                  value={values.birthday}
                  onChange={val => {
                    handleChangeDate1(val);
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField

                label="Height"
                margin="dense"
                name="height_num"
                onChange={handleChange}
                type="number"
                value={values.height_num}
                variant="outlined"
              />
              <TextField 
                id="select" 
                onChange={handleChange} 
                value={values.height_unit}
                variant="outlined"
                margin="dense"
                name="height_unit"
                select>
                <MenuItem value="ft">ft</MenuItem>
                <MenuItem value="cm">cm</MenuItem>
              </TextField>
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField

                label="Weight"
                margin="dense"
                name="weight_num"
                onChange={handleChange}
                type="number"
                value={values.weight_num}
                variant="outlined"
              />
              <TextField 
                id="select" 
                onChange={handleChange} 
                value={values.weight_unit}
                variant="outlined"
                margin="dense"
                name="weight_unit"
                select>
                <MenuItem value="kg">kg</MenuItem>
                <MenuItem value="lbs">lbs</MenuItem>
              </TextField>
            </Grid>
    
            <Grid
              item
              md={6}
              xs={12}
            >
            <Divider />
             <CardHeader
                subheader="Disabilities"
                
              />
              <Divider />
              <TextField
                
                label="Disability Name"
                margin="dense"
                name="disab_name"
                onChange={handleChange}
                value={values.disab_name}
                variant="outlined"
              />
               &nbsp;
               &nbsp;
              <TextField
                
                label="Disability Type"
                margin="dense"
                name="disab_type"
                onChange={handleChange}
                value={values.disab_type}
                variant="outlined"
                />
              <TextField
                fullWidth
                multiline
                helperText="Brief explaination of the disability"
                label="Disability Definition"
                margin="dense"
                name="disab_definition"
                onChange={handleChange}
                value={values.disab_definition}
                variant="outlined"
                />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
            <Divider />
              <CardHeader
                subheader="Allergies"
                
              />
              <Divider />
              <TextField
                label="Allergies Name"
                margin="dense"
                name="alg_name"
                onChange={handleChange}
                value={values.alg_name}
                variant="outlined"
              />
               &nbsp;
               &nbsp;
              <TextField
                label="Allergy Type"
                margin="dense"
                name="alg_type"
                onChange={handleChange}
                value={values.alg_type}
                variant="outlined"
                />
              <TextField
                fullWidth 
                multiline
                label="Allergy Severity"
                margin="dense"
                name="alg_severity"
                onChange={handleChange}
                value={values.alg_severity}
                helperText="Brief explaination on how severe allergy is."
                variant="outlined"
                />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
            <Divider />
              <CardHeader
                subheader="Medication"
                
              />
              <Divider />
              <TextField
                fullWidth
                label="Medication Name"
                margin="dense"
                name="med_name"
                onChange={handleChange}
                value={values.med_name}
                variant="outlined"
              />
      
              <TextField
                fullWidth
                label="Dosage"
                margin="dense"
                name="dosage"
                onChange={handleChange}
                value={values.dosage}
                variant="outlined"
                />
              <TextField
                label="Fill Count"
                margin="dense"
                name="fillCount"
                onChange={handleChange}
                type="number"
                value={values.fillCount}
                variant="outlined"
                />
              <TextField
                fullWidth
                label="Prescribed By"
                margin="dense"
                name="prescribedBy"
                onChange={handleChange}
                value={values.prescribedBy}
                variant="outlined"
                />
              	&nbsp;<br></br>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  disableFuture
                  id="date"
                  name="prescribedDate"
                  openTo="year"
                  format="dd/MM/yyyy"
                  label="Prescribed Date"
                  views={["year", "month", "date"]}
                  value={values.prescribedDate}
                  onChange={val => {
                    handleChangeDate2(val);
                  }}
                />
              </MuiPickersUtilsProvider>
              &nbsp;
              &nbsp;

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  disableFuture
                  id="date"
                  name="renewDate"
                  openTo="year"
                  format="dd/MM/yyyy"
                  label="Renew Date"
                  views={["year", "month", "date"]}
                  value={values.renewDate}
                  onChange={val => {
                    handleChangeDate3(val);
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField 
                fullWidth
                id="select" 
                label="Blood Type"
                onChange={handleChange} 
                value={values.bloodType}
                variant="outlined"
                margin="dense"
                name="bloodType"
                select>
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
              </TextField> 
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
{/* Patients Emergency contact */}
        <CardHeader
          subheader="Your emergency contacts information"
          title="Emergency Contact"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                //helperText="Please specify emergency contacts first name"
                label="Name"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                // helperText="Emergency contact phone number"
                label="Phone Number"
                margin="dense"
                name="phoneNumber"
                onChange={handleChange}
                type="number"
                value={values.phoneNumber}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                //helperText="Emergency contanct email"
                label="Email Address"
                margin="dense"
                name="emg_email"
                onChange={handleChange}
                required
                value={values.emg_email}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>

        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleUpdate}
          >
            Save details
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
                Account Updated
            </Alert>
          </Snackbar>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;

