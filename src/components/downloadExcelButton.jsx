import React from "react";
import styles from "../pages/MainPage.module.css";

const serverURL = "http://100.25.242.208:8080/";
const userID = localStorage.getItem("userID");

class DownloadExcelButton extends React.Component {
  handleClick = async () => {
    try {
      const response = await fetch(`${serverURL}ai/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userID }),
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
    }
  };

  render() {
    return (
      <button className={`${styles.btn}`} onClick={this.handleClick}>
        추출하기
      </button>
    );
  }
}

export default DownloadExcelButton;
