import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from "axios";

import { UsersToolbar, UsersTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = props => {
  const classes = useStyles();
console.log(props.location.data);
const [users, setUsers] = useState([]);
if(props.location.data != undefined) {
  useEffect(() => {
    setUsers(props.location.data);
    console.log(users);
});
}
if(props.location.data == undefined) {
  useEffect(() => {

    async function fillUsers() {
        await axios.post("http://localhost:3000/users/getmedpros", {
          firstname: "*"
        }).then((response) => {
            const data = response.data;
            console.log(data);
            data.forEach((userData) => {
                setUsers(user => user.concat(userData))
            })
        }).catch((err) => {
            console.log(err.response);
            
        })
    }

    fillUsers();
}, []);
}
  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default UserList;
