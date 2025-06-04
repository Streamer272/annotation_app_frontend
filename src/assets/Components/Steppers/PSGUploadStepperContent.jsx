import React, {useRef, useState} from "react";
import { StepperPanel } from "primereact/stepperpanel";
import FileUploader from "../FileUploader.jsx";
import NextButtonForUploader from "../NextButtonForUploader.jsx";
import {Message} from "primereact/message";

export default function PSGUploadStepperContent(props) {
    const uploaderRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState()
    return (
        <div className="step-content">
            <p>Choose your polysomnography file (.rml): </p>
            <FileUploader
                ref={uploaderRef}
                setServerResponse={props.setServerResponse}
                fileType=".rml"
                linkToServer="api/filters/"
                nameOfFile="RML_src"
                setSuccessMessage={props.setSuccessMessage}
                setErrorMessage={setErrorMessage}
                stepperRef={props.stepperRef}
            />
            {errorMessage && (
                        <Message severity="error" text={errorMessage} />)
            }
            <div className="step-buttons">
                <NextButtonForUploader
                    uploaderRef={uploaderRef}
                    setErrorMessage={setErrorMessage}
                    errorMessage={errorMessage}
                />
            </div>
        </div>
    );
}
