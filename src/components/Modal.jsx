import styles from './Modal.module.css';
import React, { useState, useRef, useEffect } from 'react';
import KeyValue from './KeyValue';
import close_icon from '../img/close.png';

function Modal({ isOpen, onClose, AiData, selectedFileName}) {

  const [resizeFactor, setResizeFactor] = useState(null);
  const coloredBbox = useRef([]);
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    if (AiData && !resizeFactor) {
      const img = new Image();
      img.onload = () => {
        setResizeFactor(800 / img.width);
      };
      img.src = `data:image/jpeg;base64,${AiData.content.image}`;
    }
  }, [AiData, resizeFactor]);


  useEffect(()=> {
    if (isOpen && AiData && resizeFactor){
      const canvas = canvasRef.current;
      if (canvas){
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        AiData.content.bbox.forEach((bbox) => {

          const [x, y, xMax, yMax] = bbox;
          const width = (xMax - x)*resizeFactor;
          const height = (yMax - y)*resizeFactor;
          let adjustedX = x * resizeFactor;
          let adjustedY = y * resizeFactor;
          context.beginPath();
          context.rect(adjustedX, adjustedY, width, height);
       
          context.strokeStyle = 'black';
          context.lineWidth = .3;
          context.stroke();
        });
        

      {/* screenX, screenY 는 모니터 화면 기준 좌표. 좌측상단 (0,0)
        pageX, pageY는 전체 문서 기준 좌표.
        clientX, clientY 는 웹페이지가 보여지는 영역 기준 좌표. => 화면 스크롤해도 특정 지점의 좌표값 동일. 마우스 커서 기준.
        offsetX, offsetY s는 좌표출력 이벤트 DOM 기준. 그니까 지금 코드에서 canvas <div> 기준.*/}

        const mouseClick = (event) => {
          const {offsetX, offsetY} = event;
          AiData.content.bbox.forEach((bbox, index) => {
            const [x, y, xMax, yMax] = bbox.map(coord => coord * resizeFactor);
            const width = xMax-x;
            const height = yMax-y;
           
            if(offsetX>=x && offsetX<=xMax && offsetY>=y && offsetY<=yMax){
              if (coloredBbox.current.includes(index)){
                context.clearRect(x, y, width, height);
                const updatedArray = coloredBbox.current.filter((item, itemIndex) => item !== index);
                coloredBbox.current = updatedArray;
                console.log({index});
                console.log(coloredBbox);
              }
              else{
                context.fillStyle = 'rgba(255, 0, 0, 0.2)'
                context.fillRect(x, y, width, height);
                coloredBbox.current = [...coloredBbox.current, index];
                setValue(AiData.content.text[index]);
              }

              console.log(coloredBbox.current);
              
              
              
            }
            
          });

        };
        canvas.addEventListener('click', mouseClick);     
      
          
      }
    }
  }, [isOpen, AiData, resizeFactor, coloredBbox]);

  if (!isOpen || !AiData) return;

  const bboxList = AiData.content.bbox;

  


  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.leftContainer}>
        <img
            src={`data:image/jpeg;base64,${AiData.content.image}`}
            className={styles.image} alt="원본이미지" 
          />
          <canvas ref={canvasRef} width="800" height="800" className={styles.canvasOverlay}></canvas>
        </div>
        <div className={styles.rightContainer}>
          <div>
              <KeyValue AiTextData={AiData.content.text} coloredIndexes={coloredBbox.current} value={value} onChange={handleChange} coloredBbox={coloredBbox} AiData={AiData} selectedFileName={selectedFileName}/>
          </div>
          <div>
             <button className={styles.closeButton} onClick={onClose}><img src={close_icon} alt="닫기" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;


 

 

