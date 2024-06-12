import React from "react";
import styles from "./keyValue.module.css";

const serverURL = "http://100.25.242.208:8080/";
const userID = localStorage.getItem("userID");

class FinishLearnButton extends React.Component {
  handleClick = async () => {
    try {
      const response = await fetch(`${serverURL}ai/train`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `user_id=${encodeURIComponent(userID)}`,
      });
      if (response.ok) {
        alert("모델 생성을 시작합니다. 생성까지 약 2시간 소요됩니다.");
      } else {
        alert("요청이 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("요청이 실패했습니다. 다시 시도해주세요.");
    }
  };

  render() {
    return (
      <button className={styles.saveButton} onClick={this.handleClick}>
        완성
      </button>
    );
  }
}

export default FinishLearnButton;