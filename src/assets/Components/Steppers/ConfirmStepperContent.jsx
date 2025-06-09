import React, {useState} from "react";
import AnnotateButton from "../AnnotateButton.jsx";
import { Button } from "primereact/button";
import {Message} from "primereact/message";

export default function ConfirmStepperContent(props) {
    const [errorMessage, setErrorMessage] = useState("")


    return (
        <div className="step-content">
            {props.successMessageEPPG && (
                        <Message severity="success" text={props.successMessageEPPG} />)
            }
            {
                <Message severity="info" summary="Info" text="After annotation, your file will be automatically uploaded!"/>
            }
            <div>
                <AnnotateButton
                    stepperRef={props.stepperRef}
                    setErrorMessage={setErrorMessage}
                    setStepNumber={props.setStepNumber}
                />
            </div>
            {errorMessage && (
                        <Message severity="error" text={errorMessage} />)
            }
            <div className="step-buttons">
                <Button
                    label="Back"
                    icon="pi pi-arrow-left"
                    className="back-btn"
                    onClick={() => props.stepperRef.current.prevCallback()}
                />
            </div>
        </div>
    );
}