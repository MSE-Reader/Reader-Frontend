import React, { useState, useRef } from "react";
import { BeatLoader } from 'react-spinners';
import styles from "./UploadLearnfileButton.module.css";

const UploadLearnfileButton = () => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const fileArray = Array.from(selectedFiles);
    console.log("Selected files:", fileArray);
    setFiles(fileArray);
  };

  const handleUpload = async () => {
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    const userID = localStorage.getItem("userID");
    const formData = new FormData();

    for (let file of files) {
      formData.append("profile_photos", file);
      console.log(`Uploading ${file.name}...`);
    }

    try {
      const response = await fetch(
        `http://18.232.193.248:8080/${userID}/predict/photos`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
          redirect: "follow",
          mode: "no-cors",
        }
      );

      if (response.ok) {
        console.log("업로드 성공:", await response.json());
        alert("파일 업로드 성공");
      }
    } catch (error) {
      console.error("업로드 중 오류 발생:", error);
      alert("업로드 중 오류가 발생했습니다.");
    } 
    finally {
      setLoading(false);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        multiple
        onChange={handleFileChange}
      />
      <button className={styles.btn} onClick={openFileDialog}>
        파일 선택
      </button>
      {files.length > 0 && (
        <>
          <button className={styles.btn} onClick={handleUpload}>
            업로드
          </button>
          {loading && <BeatLoader />}
        </>
      )}
    </div>
  );
};

export default UploadLearnfileButton;
