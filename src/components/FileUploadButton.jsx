import React, { useState, useRef } from 'react';
import { BeatLoader } from 'react-spinners';
import Modal from './Modal';
import styles from './FileUploadButton.module.css';
 
const serverURL = 'http://100.25.242.208:8080/';

function FileUploadButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reopen, setReopen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');

  const fileInputRef = useRef(null);  //파일 입력 요소에 대한 참조 생성

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const reopenButton = () => {
    if (reopen){
      return <div>
        <button className={styles.reloadButton} onClick={() => setIsModalOpen(true)}>다시 열기</button>
      </div>;
    }
    else return;
  };


  const handleImgUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('token', 'Reader');

      const aiOcrURL = `${serverURL}ai/ocr`;
      fetch(aiOcrURL, {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        setAiResponse(data);
        setIsModalOpen(true);
        setReopen(true);
      })
      .catch((error)=> {
        console.error('Error:', error);
      })
      .finally(()=> {
        setIsLoading(false);
      });

      setSelectedFileName(file.name);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
    // 사용자가 "파일 선택" 버튼을 클릭하면 openFileDialog 함수가 호출되고, 
    // 이 함수는 숨겨진 파일 입력 요소를 클릭하여 파일 선택 창 오픈
  };

  return (
    <div>
    <div>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImgUpload} />
      {selectedFileName && <p><b><br />{selectedFileName}</b></p>}
      <button className={styles.uploadButton} onClick={openFileDialog}>파일 선택</button>
      {isLoading ? (
        <div><BeatLoader /></div>
      ) : (<Modal isOpen={isModalOpen} onClose={closeModal} AiData={aiResponse} selectedFileName = {selectedFileName}>
        </Modal>
        )
    } 
    </div>
    {reopenButton()}
    </div>
  );
}

export default FileUploadButton;