import React, { useState } from "react";
import "./Login.css";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LocationCityOutlinedIcon from "@material-ui/icons/LocationCityOutlined";
import PermIdentityRoundedIcon from "@material-ui/icons/PermIdentityRounded";
import { Link } from "react-router-dom";

function Login(props) {
  const [selectedTab, setselectedTab] = useState(0);
  const [username, setUsername] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event, newValue) => {
    setselectedTab(newValue);
  };

  const handleInput = (event, field) => {
    switch (field) {
      case "username":
        setUsername(event.target.value);
        break;
      case "schoolname":
        setSchoolName(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleLogin = (event, is_student) => {
    event.preventDefault();
    let body = is_student
      ? {
          username: username,
          password: password,
        }
      : {
          name: schoolName,
          password: password,
        };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    let url = is_student ? "/account/student-login" : "/account/school-login";
    fetch(url, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data === null) {
          props.history.push("/");
        } else {
          setError(data.msg);
        }
      });
  };

  return (
    <div className='login'>
      <form className='login-form'>
        <Paper square className='paper'>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            variant='fullWidth'
            indicatorColor='primary'
            textColor='primary'>
            <Tab icon={<LocationCityOutlinedIcon />} label='School' />
            <Tab icon={<PermIdentityRoundedIcon />} label='Student' />
          </Tabs>
        </Paper>{" "}
        {selectedTab === 0 && (
          <>
            <input
              type='text'
              onChange={(event) => {
                handleInput(event, "schoolname");
              }}
              maxLength='30'
              placeholder='School Name'
            />
            <input
              type='password'
              onChange={(event) => {
                handleInput(event, "password");
              }}
              placeholder='Password'
              maxLength='8'
            />
            <button
              className='login-btn'
              onClick={(event) => {
                handleLogin(event, false);
              }}>
              Login
            </button>
          </>
        )}
        {selectedTab === 1 && (
          <>
            <input
              type='text'
              onChange={(event) => {
                handleInput(event, "username");
              }}
              maxLength='30'
              placeholder='Username'
            />

            <input
              type='password'
              placeholder='Password'
              onChange={(event) => {
                handleInput(event, "password");
              }}
              maxLength='8'
            />

            <button
              className='login-btn'
              onClick={(event) => {
                handleLogin(event, true);
              }}>
              Login
            </button>
          </>
        )}
        {error !== "" && <p className='error'>{error}</p>}
        <div class='sign-up'>
          Don't have an account?{" "}
          <Link to='/signup'>
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
