import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../button/Button";
import "./FormLogin.css";
import ICONS from "../../../constant/Image";
import useMediaQuery from "../../../hook/useMediaQuery";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify/unstyled";

const FormLogin = () => {
  const navigate = useNavigate();
  const isScreenPhone = useMediaQuery("(max-width: 576px)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState();

  const baseUrl = import.meta.env.VITE_REACT_APP_USER_END_POINT;

  const showToastMessageSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
    });
  };
  const showToastMessageFail = (message) => {
    toast.error(message, {
      position: "top-right",
    });
  };

  const fetchData = async () => {
    const response = await axios.get(`${baseUrl}`);
    setUserData(response.data);
  };

  const handleOnClick = async () => {
    if (Array.isArray(userData)) {
      const user = userData.find(
        (item) => item.user_email === email && item.password === password
      );
      console.log(user)
      if (user) {
        if (Number(user.role_id) === 2 || Number(user.role_id) === 1) {
          showToastMessageSuccess("Login Successful!");
          navigate("/manager");
        } else {
          showToastMessageFail("You do not have access!");
        }
      } else {
        showToastMessageFail("Email or password is incorrect!");
      }
    }    
  };

  useEffect(() => {
    if (userData === undefined || userData === null) {
      fetchData();
    }
  });
  return (
    <>
      <Form
        className={isScreenPhone ? "center-content form mb-4" : "form mb-4"}
      >
        <Form.Group className="mb-3">
          <Form.Label className="text-label-login">Email</Form.Label>
          <Form.Control
            className="input-login"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="text-label-login">Password</Form.Label>
          <Form.Control
            className="input-login"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <p className="mb-4 text-end text-forgot-password">Forgot password?</p>
        <Button text="Login" handleOnClick={handleOnClick} />
      </Form>
      <div
        className={
          isScreenPhone ? "line-or-line center-content" : "line-or-line"
        }
      >
        <div className="line"></div>or
        <div className="line"></div>
      </div>
      {isScreenPhone ? (
        <div className="login-other">
          <img src={ICONS.icon_google} alt="" />
          <img src={ICONS.icon_apple} alt="" />
        </div>
      ) : (
        <div className="login-other-button">
          <img src={ICONS.icon_google} alt="" />
          <span>Sign in with Google</span>
        </div>
      )}

      <p
        className={!isScreenPhone ? "no-account" : "no-account text-center"}
        style={!isScreenPhone ? { marginBottom: "10vh" } : {}}
      >
        Don't have an account? <span>Sign up</span>
      </p>
    </>
  );
};

export default FormLogin;
