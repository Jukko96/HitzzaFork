import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log(`Access token: ${token}`);
    if (token) {
      console.log("true");
      navigate("/todos");
    } else {
      console.log("false");
    }
  }, []);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmitClick = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    axios
      .post(
        "https://www.pre-onboarding-selection-task.shop/auth/signup",
        {
          email,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form>
        <input placeholder="이메일" onChange={handleEmailChange} />
        <input placeholder="비밀번호" onChange={handlePasswordChange} />
        <input type="submit" value="회원가입" onClick={handleSubmitClick} />
      </form>
    </div>
  );
};
export default Signup;
