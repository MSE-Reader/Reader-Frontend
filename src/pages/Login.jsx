import React, { useState } from "react";
import styles from "./Login.module.css"; 
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();

  const mainClick = () => {
    navigate("/");
  };

  const signUpClick = () => {
    navigate("/signup");
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // 로그인 요청
      const response = await fetch(
        `http://mobilesystems.site:8081/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nickname: username, password: password }),
        }
      );

      const result = await response.json();
      const decodedToken = jwtDecode(result.accessToken);

      if (response.ok) {
        // 로컬 스토리지에 저장
        localStorage.setItem("accessToken",result.accessToken);
        localStorage.setItem("userID", decodedToken.userId);

        alert(result.name + "님 환영합니다!");
        navigate("/");

      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("아이디 및 비밀번호를 확인해주세요.");
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className="header">
        <button className={`${styles.mainbtn}`} onClick={mainClick}>
            <h1>Reader.</h1>
          </button>
          <button className={`${styles.signbtn}`} onClick={signUpClick}>
            회원가입
          </button>
      </div>
      <div className={styles.card}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <h2 className={`${styles.element}`}>
                <b>아이디: </b>
                <input
                  className={`${styles.form}`}
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </h2>
            </label>
          </div>
          <div>
            <label>
              <h2 className={`${styles.element}`}>
                <b>비밀번호: </b>
                <input
                  className={`${styles.form}`}
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </h2>
            </label>
          </div>
          <div>
            <button className={`${styles.loginbtn}`} type="submit">
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
