import React, { useState } from "react";
import { BeatLoader } from 'react-spinners';
import styles from "./UploadLearnfileButton.module.css";

const serverURL = "http://100.25.242.208:8080/";
const userID = localStorage.getItem("userID");

const DownloadExcelButton = () => {
  const [loading, setLoading] = useState(false);
  
  const handleClick = async () => {
    setLoading(true);
    try {
      const formBody = new URLSearchParams();
      formBody.append("user_id", userID);

      const response = await fetch(`${serverURL}ai/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "download.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className={`${styles.btn}`} onClick={handleClick} disabled={loading}>
        추출하기
      </button>
      {loading && <BeatLoader />}
    </div>
  );
};

export default DownloadExcelButton;
