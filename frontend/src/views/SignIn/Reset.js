import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  InputAdornment,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import { saveToken, tokenDetails } from '../token';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';
import PasswordStrengthMeter from '../../StrengthMeter/PasswordStrengthMeter.js';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const schema = {
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },

  password2: {
    presence: { allowEmpty: false, message: 'is required' },
    equality: "password",
    length: {
      maximum: 128
    }
  },
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const Reset = props => {
  const { history } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
		setShowPassword(!showPassword );
	};

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
    error: false,
    success: false,
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  function initialize() {
		axios.get(`http://localhost:3000/login/forgot/token/${props.match.params.token}`)
			.then(response => {
				console.log(`response: ` + response);
			}).catch((error) => {
				console.log(`error: ` + error.response.status);
				if (error.response.status === 400) {
					history.push('/sign-in');
				}
			});
	}

  useEffect(() => {
    initialize();
  }, []);

  const handleReset = async event => {
    event.preventDefault();
    await axios.post(`http://localhost:3000/login/forgot/${props.match.params.token}`, {
				token: props.match.params.token,
				password: formState.values.password
			})
				.then((response) => {
					if (response.status === 200) {
            this.state.tokenValidated = true;
            setFormState(formState => ({
              ...formState,
              success: true,
              error: false
            }));
					}
				})
				.catch((error) => {
          setFormState(formState => ({
            ...formState,
            success: false,
            error: true
          }));
				});
    handleClick();
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1">
                PROJECT CLEAR
              </Typography>
              <div className={classes.person}>
                <Typography className={classes.name} variant="body1">
                  3ELM Consulting
                </Typography>
                <Typography className={classes.bio} variant="body2">
                  Southern Alberta Institute of Technology
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleReset}>
                <Typography className={classes.title} variant="h2">
                  New Password
                </Typography>
                <Typography
                  align="center"
                  className={classes.sugestion}
                  color="textSecondary"
                  variant="body1">
                  Reset Password
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  value={formState.values.password || ''}
                  variant="outlined"
                  InputProps={{
								  endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
										>
										{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>	
								)
							}}
                />
                <PasswordStrengthMeter password={formState.values.password || ''} />
                <TextField
                  className={classes.textField}
                  error={hasError('password2')}
                  fullWidth
                  helperText={
                    hasError('password2') ? formState.errors.password2[0] : null
                  }
                  label="Confirm Password"
                  name="password2"
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  value={formState.values.password2 || ''}
                  variant="outlined"
                  InputProps={{
								  endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
										>
										{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>	
								)
							}}
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Reset
                </Button>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}>
                  {formState.error ? (
                    <Alert onClose={handleClose} severity="error">
                      Unable to change password
                    </Alert>
                  ) : formState.success ? (
                    <Alert onClose={handleClose} severity="success">
                      Password Reset!
                    </Alert>
                  ) : null}
                </Snackbar>
                <Typography color="textSecondary" variant="body1">
                  Return to login page {' '}
                  <Link component={RouterLink} to="/sign-in" variant="h6">
                    Sign in
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

Reset.propTypes = {
  history: PropTypes.object
};

export default withRouter(Reset);
