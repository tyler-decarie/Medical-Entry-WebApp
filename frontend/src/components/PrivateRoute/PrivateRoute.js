import React from "react";
import { browserHistory } from 'react-router';
import { Route, Redirect } from "react-router-dom";
import { authenticate } from "../../views/token";
import axios from "axios";




class PrivateRoute extends React.Component {

    verify(id) {
        var verified = axios.post("http://localhost:3000/login/verify", {
            id: id
        }).then(response => {
            verified = true;
            return verified
        });
        return verified

    }

    render() {
        const { layout: Layout, component: Component, ...rest } = this.props;
        console.log(this.props);
        const isAuthenticated = authenticate();
        var isVerified = false;
        if (isAuthenticated) {
            isVerified = this.verify(isAuthenticated);
        }
        return isVerified ? (
            <Route
                {...rest}
                render={matchProps => (
                    <Layout>
                        <Component {...matchProps} />
                    </Layout>
                )}
            />
        ) : (
                <Redirect to={{ pathname: '/sign-in' }} />
            );
    }
}




export default PrivateRoute;
