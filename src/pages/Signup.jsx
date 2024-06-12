import React, { useEffect, useState } from 'react';
import styles from './Signup.module.css'; 
import { useNavigate } from 'react-router-dom';

function Signup() {

  const mainClick = () => {
    navigate('/');
  };

  const navigate = useNavigate();
  const loginClick = () => {
    navigate('/login');
  };

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupToken, setSignupToken] = useState('');
  

  useEffect(() => {
    // 회원가입 토큰 요청
    const fetchSignupToken = async () => {
      try {
        const response = await fetch('http://mobilesystems.site:8081/user/signup-token');
        const data = await response.json();
        setSignupToken(data.signupToken);
      } catch (error) {
        console.error('회원가입 토큰 요청 실패:', error);
      }
    };

    fetchSignupToken();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // 회원가입 요청
      const response = await fetch(`http://mobilesystems.site:8081/user/${signupToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name:name, nickname:username, password:password })
      })
      const result = await response.json();

      if (response.ok) {
        alert('회원가입 성공');
        navigate('/');
      } else {
        alert(result.message[0]);
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className="header">
          <button className={`${styles.mainbtn}`} onClick={mainClick}><h1>Reader.</h1></button>
          <button className={`${styles.loginbtn}`} onClick={loginClick}>로그인</button>
      </div>
      <div className={styles.card}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <h2 className={`${styles.element}`}><b>이름: </b>
              <input className={`${styles.form}`}
                type="text"
                value={name}
                onChange={handleNameChange}
                required
              /></h2>
            </label>
          </div>
          <div>
            <label>
              <h2 className={`${styles.element}`}><b>아이디: </b>
              <input className={`${styles.form}`}
                type="text"
                value={username}
                onChange={handleUsernameChange}
                required
              /></h2>
            </label>
          </div>
          <div>
            <label>
              <h2 className={`${styles.element}`}>
              <b>비밀번호: </b>
              <input className={`${styles.form}`}
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              /></h2>
            </label>
          </div>
          <button className={`${styles.signupbtn}`} type="submit">가입하기</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
