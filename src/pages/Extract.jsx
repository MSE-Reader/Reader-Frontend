import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.css";
import UploadLearnfileButton from "../components/UploadLearnfileButton";
import upload_icon from "../img/upload_icon.png";
import download_icon from "../img/download_icon.png";
import DownloadExcelButton from "../components/downloadExcelButton";

const ExtractPage = () => {
  const navigate = useNavigate();
  const mainClick = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("userID")) {
      navigate("/");
      alert("로그인 후 이용해주세요");
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className="header">
        <button className={`${styles.mainbtn}`} onClick={mainClick}>
          <h1>Reader.</h1>
        </button>
      </div>
      <div className={styles.card}>
        <div className={styles.iconContainer}>
          <img src={upload_icon} alt="Upload" className={styles.icon} />
        </div>
        <h2>
          <b>추출할 이미지 업로드</b>
        </h2>
        <p>여러 이미지를 업로드해</p>
        <p>추출 서비스를 이용하세요.</p>
        <UploadLearnfileButton></UploadLearnfileButton>
      </div>
      <div className={styles.card}>
        <div className={styles.iconContainer}>
          <img src={download_icon} alt="Download" className={styles.icon} />
        </div>
        <h2>
          <b>Excel 파일 다운받기</b>
        </h2>
        <p>데이터화할 이미지들을 업로드하셨다면</p>
        <p>Excel 파일을 다운받으세요.</p>
        <DownloadExcelButton />
      </div>
    </div>
  );
};
export default ExtractPage;
