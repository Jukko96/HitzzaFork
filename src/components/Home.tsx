import React, { useState } from "react";
import Signup from "./Signup";
import { Link } from "react-router-dom";

const Home = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="home">
      <div className="signin-title">SIGN IN</div>
      <div className="signin-container">
        <input
          className="signin-input"
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디"
        />
        <input
          className="signin-input"
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="signin-button-conatainer">
          <input className="submit-button" type="button" value={"로그인"} />
          <Link to={"/signup"}>
            <div className="submit-button">회원가입</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
