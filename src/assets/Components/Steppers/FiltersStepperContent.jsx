import React from "react";
import { Button } from "primereact/button";
import Filters from "../Filters.jsx";
import {Message} from "primereact/message";

export default function FiltersStepperContent(props) {
    return (
        <div className="step-content">
            {props.successMessagePSG && (
                        <Message severity="success" text={props.successMessagePSG} />)
            }
            <Filters
                stepperRef={props.stepperRef}
                ref={props.filtersRef}
                filterOptions={props.filterOptions}
                setErrorMessage={props.setErrorMessage}
            />
            {props.errorMessage && (
                        <Message severity="error" text={props.errorMessage} />)
            }
            <div className="step-buttons">
                <Button
                    label="Back"
                    icon="pi pi-arrow-left"
                    onClick={() => props.stepperRef.current.prevCallback()}
                    className="back-btn"
                />
                <Button
                    label="Next"
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    onClick={props.onNext}
                    className="next-btn"
                />
            </div>
        </div>
    );
}