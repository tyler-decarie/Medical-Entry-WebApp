// import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import axios from "axios";
// import { authenticate } from '../../AppManager/token'
// import {
//     MuiPickersUtilsProvider,
//     KeyboardTimePicker,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
// import Grid from '@material-ui/core/Grid';


// class EntryForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             open: false,
//             contents: '',
//             title: '',
//             selectedDate: new Date().toISOString().substring(0, 10),
//             selectedTime: new Date()
//         };

//     }

//     pickTime = (time) => {
//         this.setState({
//             selectedTime: time
//         })
//     }

//     pickDate = (date) => {
//         this.setState({
//             selectedDate: date
//         })
//     }
//     handleChange = (input) => (e) => {
//         this.setState({ [input]: e.target.value });
//     };

//     handleClickOpen = () => {
//         this.setState({
//             open: true
//         })
//     };

//     handleClose = () => {
//         this.setState({
//             open: false
//         })
//     };

//     submit = async () => {
//         const id = authenticate();
//         await axios
//             .post("http://localhost:3000/entry/add/", {
//                 id: id,
//                 contents: this.state.contents,
//                 title: this.state.title,
//                 date: this.state.selectedDate,
//                 time: this.state.selectedTime.toLocaleTimeString('en-US')
//             })
//             .then((response) => {
//                 alert(response.data)
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     };
//     render() {
//         return (
//             <div>
//                 <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
//                     New Entry
//                  </Button>
//                 <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
//                     <DialogTitle id="form-dialog-title">New Entry</DialogTitle>
//                     <DialogContent>
//                         <DialogContentText>
//                             To create an entry, please submit the contents of your entry.
//                         </DialogContentText>
//                         <TextField
//                             autoFocus
//                             margin="dense"
//                             id="title"
//                             multiline
//                             label="Title"
//                             type="title"
//                             fullWidth
//                             onChange={this.handleChange(
//                                 "title"
//                             )}
//                         />
//                         <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                             <KeyboardDatePicker
//                                 disableToolbar
//                                 variant="inline"
//                                 format="MM/dd/yyyy"
//                                 margin="normal"
//                                 id="date"
//                                 label="Date"
//                                 value={this.state.selectedDate}
//                                 onChange={this.pickDate}
//                                 KeyboardButtonProps={{
//                                     'aria-label': 'change date',
//                                 }}
//                             />
//                             <KeyboardTimePicker
//                                 margin="normal"
//                                 id="time"
//                                 label="Time picker"
//                                 value={this.state.selectedTime}
//                                 onChange={this.pickTime}
//                                 KeyboardButtonProps={{
//                                     'aria-label': 'change time',
//                                 }}
//                             />

//                         </MuiPickersUtilsProvider>
//                         <TextField
//                             margin="dense"
//                             id="contents"
//                             multiline
//                             label="Contents"
//                             type="contents"
//                             fullWidth
//                             rows={10}
//                             onChange={this.handleChange(
//                                 "contents"
//                             )}
//                         />
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={this.handleClose} color="primary">
//                             Cancel
//           </Button>
//                         <Button onClick={() => { this.handleClose(); this.submit(); }} color="primary">
//                             Submit
//           </Button>
//                     </DialogActions>
//                 </Dialog>
//             </div >
//         )
//     }

// }

// export default EntryForm;