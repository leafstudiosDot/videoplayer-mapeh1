import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({
    component: RouteComponent, ...rest
}) => {
    const { currentUser } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={routesProps =>
                !!currentUser ? (
                    <RouteComponent{...routesProps} />
                ) : (
                        <Redirect to={"/?sesstimedout"} />
                    )
            }
        />
    );
};

export default PrivateRoute;