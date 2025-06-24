// src/guards/withRoleGuard.js
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const withRoleGuard = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    const history = useHistory();
    const userType = localStorage.getItem("userType");

    useEffect(() => {
      if (!allowedRoles.includes(userType)) {
        history.replace("/404");
      }
    }, [userType, history]);

    if (!allowedRoles.includes(userType)) {
      return null; // Don't render anything while redirecting
    }

    return <WrappedComponent {...props} />;
  };
};

export default withRoleGuard;
