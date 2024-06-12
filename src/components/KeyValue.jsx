import React, { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import styles from './keyValue.module.css'
import FinishLearnButton from "./finishLearnButton";


const KeyValue = ({ AiTextData, coloredIndexes, onChange, coloredBbox, AiData, selectedFileName }) => {
    const [inputValue, setInputValue] = useState('');
    const [key, setKey] = useState('');
    const [keyValuePair, setKeyValuePair] = useState([]);
    const [labelPair, setLabelPair] = useState([]);
    const [value, setValue] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const sortedIndexes = [...coloredIndexes].sort((a, b) => a - b);

    const calculateValue = () => {
        return sortedIndexes.map(index => AiTextData[index]).join(' ');
    };

      useEffect(() => {
        setValue(calculateValue());
      }, [coloredIndexes, AiTextData]);
    

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const submit = () => {
        setKey(inputValue);
    };
    
    const addPair = () => {
        const index = { val: sortedIndexes };
        const key_name = key;
        setLabelPair(prevState => [...prevState, { key_name, index }]);
        setKeyValuePair(prevState => [...prevState, { key, value }]);
        setKey('');
        setInputValue('');
        setValue('');
        coloredBbox.current = [];
        console.log(keyValuePair);
    };

    const saveToAPI = () => {
        const userId = localStorage.getItem("userID");
        const date = Date.now();

        setIsUploading(true);

        const jsondata = {
            word_list: AiData.content.text,
            bbox_list: AiData.content.bbox,
            label: labelPair,
            file_name: selectedFileName,
        };


        const imgdata = AiData.content.image;
        const binary = atob(imgdata);   //이진 데이터로 디코딩
        const array = []; 
        for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }   

        const imgblob = new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
        const jsonblob = new Blob([JSON.stringify(jsondata)], { type: 'application/json' });

        const formdata = new FormData();
        formdata.append("profile_photos", jsonblob, `file_${date}.json`);
        formdata.append("profile_photos", imgblob, `file_${date}.jpg`);

        fetch(`http://18.232.193.248:8080/${userId}/photos`, {
            method: 'POST',
            body: formdata,
           // mode: 'no-cors',
            redirect: 'follow',
        })
        .then(response => response.text())
        .then(result => {
            console.log(result);
            alert('정확도 향상을 위해 최소 5장의 사진에 대해 같은 작업을 진행하고 "완성" 버튼을 눌러주세요.');
            setIsUploading(false);
            setIsSaved(true);
        })
        .catch(error => {
            console.error('Error:', error);
        });


    };



      
    return (
        <div>
        <div>
            <label>
            <h2 className={`${styles.element}`}><b>Key: </b>
                <input className={`${styles.form}`}
                type="text"
                value={inputValue}
                onChange={handleChange} 
                />
                <button className={`${styles.submitButton}`} onClick={submit}>입력</button> 
                
            </h2>
            </label>
        </div>
        <div>
            {key && (
                <label>
                <h2 className={`${styles.element}`}><b>Value: </b>
                    <input className={`${styles.form}`}
                    type="text"
                    value={value}
                    onChange={onChange}
                />
                {key && <button className={`${styles.submitButton}`} onClick={addPair}>추가</button>}
                </h2>
                </label>
            )}
        </div>
        <div className={styles.container}>  
            {key && <b>Key: {key}<br/></b>}
            {key && value && <b> Value: {value}<br/></b>}
        </div>
        {keyValuePair.length > 0 && (
            <div className={styles.align}>
                {keyValuePair.map((pair, index) => (
                    <b key={index}>Key: {pair.key}, Value: {pair.value}<br/></b>
                ))}
            </div>
        )}
        {isSaved ? (
            <FinishLearnButton>업로드</FinishLearnButton>
            ) : (
                <div>
                    {isUploading ? (
                        <div>
                            <br/>
                            <BeatLoader />
                        </div>
                    ) : (
                        <button 
                            className={`${styles.saveButton}`}
                            type="button"  
                            onClick={saveToAPI}>저장하기
                        </button>
                    )}
                    </div>
        )}
        
        </div>
    );
};
   

export default KeyValue;
