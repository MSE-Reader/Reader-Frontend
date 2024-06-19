import React from "react";
import styles from "./HowToUse.module.css";
import { useNavigate } from 'react-router-dom';

const HowToUse = () => {

    const navigate = useNavigate();

    const mainClick = () => {
        navigate("/");
      };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.mainbtn} onClick={mainClick}>
            <h1>Reader.</h1>
        </button>
      </div>
      <div className={styles.card}>
        <section>
          <h2>회원가입 및 로그인</h2>
            <li>웹사이트에 접속하여 회원가입 페이지에서 계정을 생성합니다.</li>
            <li>생성한 계정으로 로그인합니다.</li>
        </section>
        <section>
          <h2>학습하기</h2>
            <li>학습하기 페이지에서 학습할 파일을 순차적으로 업로드합니다.</li>
            <li>업로드한 파일은 Azure OCR을 통해 문자 인식이 수행됩니다.</li>
            <li>인식된 문자들 중 '키'에 해당하는 값을 직접 타이핑해 입력하고, '밸류'에 해당하는 지표들을 마우스 박스 클릭을 통해 선택합니다.</li>
            <li>설정된 키-밸류 페어를 저장합니다.</li>
            <li>정확도를 위해 여러 장의 문서에 대해 동일한 작업을 반복합니다.</li>
            <li>충분한 양의 학습 데이터를 설정한 후, '학습하기' 버튼을 눌러 머신러닝 모델 학습을 시작합니다.</li>
        </section>
        <section>
          <h2>추출하기</h2>
            <li>학습이 완료되면 추출하기 페이지에서 새로운 문서를 업로드합니다.</li>
            <li>'엑셀 다운로드' 버튼을 눌러 학습된 지표가 추출된 엑셀 파일을 다운로드받습니다.</li>
        </section>
        <section>
          <h2>챗봇 사용</h2>
            <li>챗봇을 통해 학습된 지표를 바탕으로 분석을 요청합니다.</li>
            <li>예를 들어, "올해 매출 분석해줘"와 같은 프롬프트를 입력하면 챗봇이 분석 결과를 제공합니다.</li>
        </section>
      </div>
    </div>
  );
};

export default HowToUse;
