import React, { useRef, useState, useEffect } from "react";

import styled from "styled-components";
import "./App.css";

const App = () => {
  const [fileName, setFileName] = useState();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const filePickerRef = useRef();

  const Container = styled.div`
    width: 100vw;
    padding: 16px;
    border: solid 1px #9b9b9b;
    border-radius: 5px;
    @media (min-width: 768px) {
      width: 90vw;
    }
  `;
  const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    @media (min-width: 768px) {
      justify-content: flex-start;
    }
  `;

  const Button = styled.button`
    background-color: #4a4a4a;
    color: white;
    border-radius: 5px;
    padding: 0.5rem 0.8rem;
    font-size: 24px;
    cursor: pointer;
  `;

  const FileName = styled.p`
    font-size: 24px;
  `;

  const ImageContainer = styled.div`
    width: 100%;
    border: solid 1px #9b9b9b;
    border-radius: 5px;
  `;

  const PreviewImage = styled.img`
    width: 100%;
    padding: 5rem 0;
    @media (min-width: 768px) {
      width: calc(100% - 10rem);
      padding: 0 5rem;
    }
  `;

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const fileHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setFileName(pickedFile.name);
    }
    console.log(filePickerRef);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  return (
    <Container>
      <ButtonContainer>
        <Button onClick={pickImageHandler}>上傳照片</Button>
      </ButtonContainer>
      <input
        type="file"
        style={{ display: "none" }}
        ref={filePickerRef}
        onChange={fileHandler}
      />
      <FileName>{`檔案名稱：${fileName || "尚未選擇檔案"}`}</FileName>
      <ImageContainer>
        <PreviewImage src={previewUrl} />
      </ImageContainer>
    </Container>
  );
};

export default App;
