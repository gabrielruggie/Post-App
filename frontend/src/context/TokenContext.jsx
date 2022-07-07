import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("awesomeLeadsToken"));

  useEffect(() => {
    const fetchUser = async () => {
      axios({
        method: "GET",
        url: "http://localhost:8000/dashboard",
        headers: {
          "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
      }).then(result => {
        if (!result.ok){
          setToken(null);
        }
      })
      
      localStorage.setItem("awesomeLeadsToken", token);
    };
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={[token, setToken]}>
      {props.children}
    </UserContext.Provider>
  );
};