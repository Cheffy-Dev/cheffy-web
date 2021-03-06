import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "../../../../styles/chefPlateFileList.css";

const FileList = ({ file }) => {
  //console.log(file);

  const [uploadFile, setUploadFile] = useState({});

  useEffect(() => {
    setUploadFile(file);
  }, [file]);

  return (
    <div className="container-fileList">
      <div className="fileInfo">
        <img src={uploadFile.preview} alt="imageUp" className="preview" />
        <div className="container-info">
          <strong>{uploadFile.name}</strong>
          <span>
            {uploadFile.readableSize}{" "}
            {!!uploadFile.url && <button> Excluir</button>}
          </span>
        </div>
      </div>

      <div className="container-icons">
        {!uploadFile.uploaded && !uploadFile.error && (
          <CircularProgressbar
            styles={{
              root: { width: 24 },
              path: { stroke: "#ff402d" },
            }}
            strokeWidth={10}
            value={uploadFile.progress}
          />
        )}
        {uploadFile.url && (
          <a
            href={uploadFile.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <Link style={{ marginRight: 8, color: "#222" }} /> */}
          </a>
        )}
        {/* {uploadFile.uploaded && <CheckCircle style={{ color: "#78e5d5" }} />} */}
        {/* {uploadFile.error && <Error style={{ color: "#e57878" }} />} */}
      </div>
    </div>
  );
};

export default FileList;
