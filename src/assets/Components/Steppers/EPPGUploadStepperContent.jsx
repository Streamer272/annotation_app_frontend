import React, {useRef, useState} from "react";
import FileUploader from "../FileUploader.jsx";
import NextButtonForUploader from "../NextButtonForUploader.jsx";
import { Button } from "primereact/button";
import {Message} from "primereact/message";

export default function EPPGUploadStepperContent({ stepperRef, setServerResponse, setSuccessMessage }) {
    // http://127.0.0.1:8000/annotation/upload-eppg/
    const uploaderRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);
    return (
        <div className="step-content">
            <p>Choose your ePPG file (.txt):</p>
            <FileUploader
                ref={uploaderRef}
                setServerResponse={setServerResponse}
                stepperRef={stepperRef}
                setErrorMessage={setErrorMessage}
                setSuccessMessage={setSuccessMessage}
                fileType=".txt"
                linkToServer="api/files/eppg/"
                nameOfFile="EPPG_src"
            />
            {errorMessage && (
                        <Message severity="error" text={errorMessage} />)
            }
            <div className="step-buttons">
                <Button
                    label="Back"
                    icon="pi pi-arrow-left"
                    className="back-btn"
                    onClick={() => stepperRef.current.prevCallback()}
                />
                <NextButtonForUploader uploaderRef={uploaderRef} setErrorMessage={setErrorMessage} />
            </div>
        </div>
    );
}