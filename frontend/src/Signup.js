import "./Signup.css";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LocationCityOutlinedIcon from "@material-ui/icons/LocationCityOutlined";
import PermIdentityRoundedIcon from "@material-ui/icons/PermIdentityRounded";
import { Link } from "react-router-dom";
import React, { Component } from "react";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0,
      username: "",
      fullname: "",
      schoolname: "",
      district: "",
      password: "",
      error: "",
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ selectedTab: newValue });
  };

  handleInput = (event, field) => {
    this.setState({ [field]: event.target.value });
  };

  handleSignup = (event, is_student) => {
    event.preventDefault();
    let body = is_student
      ? {
          username: this.state.username,
          schoolname: this.state.schoolname,
          password: this.state.password,
        }
      : {
          name: this.state.schoolname,
          district: this.state.district,
          password: this.state.password,
        };
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    let url = is_student ? "/account/create-student" : "/account/create-school";
    fetch(url, requestOptions)
      .then((response) => {
        if (response.status === 201) {
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data === null) {
          this.props.history.push("/");
        } else {
          this.setState({ error: data.msg });
        }
      });
  };

  render() {
    return (
      <div className='signup'>
        <form className='signup-form'>
          <Paper square className='paper'>
            <Tabs
              value={this.state.selectedTab}
              onChange={this.handleChange}
              variant='fullWidth'
              indicatorColor='primary'
              textColor='primary'>
              <Tab icon={<LocationCityOutlinedIcon />} label='School' />
              <Tab icon={<PermIdentityRoundedIcon />} label='Student' />
            </Tabs>
          </Paper>

          {this.state.selectedTab === 1 && (
            <>
              <input
                type='text'
                onChange={(event) => {
                  this.handleInput(event, "username");
                }}
                maxLength='30'
                placeholder='Username'
              />
              <input
                type='text'
                onChange={(event) => {
                  this.handleInput(event, "schoolname");
                }}
                maxLength='16'
                placeholder='School Name'
              />
              <p className='helpertext'>(Case sensitive and School must have an account)</p>

              <input
                type='password'
                onChange={(event) => {
                  this.handleInput(event, "password");
                }}
                placeholder='password'
                maxLength='8'
              />
              <button
                className='signup-btn'
                onClick={(event) => {
                  this.handleSignup(event, true);
                }}>
                Sign Up
              </button>
            </>
          )}
          {this.state.selectedTab === 0 && (
            <>
              <input
                type='text'
                onChange={(event) => {
                  this.handleInput(event, "schoolname");
                }}
                maxLength='30'
                placeholder='School name'
              />
              <input
                type='text'
                onChange={(event) => {
                  this.handleInput(event, "district");
                }}
                maxLength='30'
                placeholder='district'
              />
              <input
                type='password'
                onChange={(event) => {
                  this.handleInput(event, "password");
                }}
                placeholder='password'
                maxLength='8'
              />
              {this.state.error && <p className='error'>{this.state.error}</p> }
              <button
                className='signup-btn'
                onClick={(event) => {
                  this.handleSignup(event, false);
                }}>
                Sign Up
              </button>
            </>
          )}
          <div class='login-bottom'>
            Have an account?{" "}
            <Link to='/login'>
              Log in
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
