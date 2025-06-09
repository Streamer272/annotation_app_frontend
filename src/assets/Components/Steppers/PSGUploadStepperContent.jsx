import React, {useRef, useState} from "react";
import { StepperPanel } from "primereact/stepperpanel";
import FileUploader from "../FileUploader.jsx";
import NextButtonForUploader from "../NextButtonForUploader.jsx";
import {Message} from "primereact/message";
const API_BASE_URL = import.meta.env.VITE_API_URL

export default function PSGUploadStepperContent(props) {
    const uploaderRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState()
    const [loading, setLoading] = useState(false)


    return (
        <div className="step-content">
            <p>Choose your polysomnography file (.rml): </p>
            <FileUploader
                ref={uploaderRef}
                setServerResponse={props.setServerResponse}
                fileType=".rml"
                linkToServer={ API_BASE_URL + '/filters/'}
                nameOfFile="RML_src"
                setSuccessMessage={props.setSuccessMessage}
                setErrorMessage={setErrorMessage}
                stepperRef={props.stepperRef}
                setLoading={setLoading}
            />
            {errorMessage && (
                        <Message severity="error" text={errorMessage} />)
            }
            <div className="step-buttons">
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
