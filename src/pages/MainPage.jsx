import React, { useEffect, useState } from 'react';
import styles from './MainPage.module.css'; 
import { useNavigate } from 'react-router-dom';
import upload_icon from '../img/upload_icon.png';
import download_icon from '../img/download_icon.png'

import Chatbot from 'react-chatbot-kit'; 
import 'react-chatbot-kit/build/main.css';

import config from "../chatbot/config";
import MessageParser from '../chatbot/MessageParser';
import ActionProvider from '../chatbot/ActionProvider';

import './chatbot.css';

import chatbot_icon from '../img/free-icon-chat.png';


const MainPage = () => {
    const navigate = useNavigate();

    const refreshPage = () => {
      window.location.reload();
    };
    const learnClick = () => {
      navigate('/learn'); 
      };
    const logInClick = () => {
      navigate('/login');
    };
    const signUpClick = () => {
      navigate('/signup');
    };
    const extractClick = () => {
      navigate('/extract');
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);

    useEffect(() => {
      if (localStorage.getItem("userID")) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      
    }, []);

    const handleLogout = () => {
      localStorage.removeItem("userID");
      localStorage.removeItem("acessToken");
      setIsLoggedIn(false);
      alert('로그아웃 되었습니다.');
    };

    const toggleChatbot = () => {
      setShowChatbot(prev => !prev);
    };

    const denyChatbot = () => {
      alert("로그인 후 이용해주세요.");
    }

      return (
        <div className={styles.container}>
          <div className="header">
            <button className={`${styles.mainbtn}`} onClick={refreshPage}><h1>Reader.</h1></button>
            {isLoggedIn ? ( 
            <button className={`${styles.signbtn}`} onClick={handleLogout}>로그아웃</button>
            ) : (
            <button className={`${styles.loginbtn}`} onClick={logInClick}>로그인</button>
            )}
            {!isLoggedIn && (
            <button className={`${styles.signbtn}`} onClick={signUpClick}>회원가입</button>
            )}
            {isLoggedIn ? (
            <button className={`${styles.chatbotbtn}`} onClick={toggleChatbot}><img src={chatbot_icon} alt="챗봇" /></button>
            ) : (
            <button className={`${styles.chatbotbtn}`} onClick={denyChatbot}><img src={chatbot_icon} alt="챗봇" /></button>
            )}
          </div>
          <div className={styles.card}>
            <div className={styles.iconContainer}>
              <img src={upload_icon} alt="Upload" className={styles.icon} />
            </div>
            <h2><b>처음 사용하시나요?</b></h2>
            <p>데이터화할 이미지를 업로드해</p>
            <p>학습을 진행해주세요.</p>
            <button className={`${styles.btn}`} onClick={learnClick}>학습하기</button>
          </div>
          <div className={styles.card}>
            <div className={styles.iconContainer}>
              <img src={download_icon} alt="Download" className={styles.icon} />
            </div>
            <h2><b>기존 사용자이신가요?</b></h2>
            <p>이미지를 등록해</p> <p>데이터를 추출하세요.</p>
            <button className={`${styles.btn}`} onClick={extractClick}>추출하기</button>
          </div>
            {showChatbot && (
                <Chatbot
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                />
            )}
        </div>
      );
    }      
    

export default MainPage;
