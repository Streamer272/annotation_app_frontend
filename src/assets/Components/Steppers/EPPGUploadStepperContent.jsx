import React, {useRef, useState} from "react";
import FileUploader from "../FileUploader.jsx";
import NextButtonForUploader from "../NextButtonForUploader.jsx";
import { Button } from "primereact/button";
import {Message} from "primereact/message";

const API_BASE_URL = import.meta.env.VITE_API_URL


export default function EPPGUploadStepperContent({ stepperRef, setServerResponse, setSuccessMessage }) {
    const uploaderRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false)
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
                linkToServer={API_BASE_URL + '/files/eppg/'}
                nameOfFile="EPPG_src"
                setLoading={setLoading}
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
                <NextButtonForUploader
                    uploaderRef={uploaderRef}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    loading={loading}
                    setLoading={setLoading}
                />
            </div>
        </div>
    );
}