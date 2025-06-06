import React, { useRef, useState, useEffect } from "react";
import { Stepper } from "primereact/stepper";
import { Card } from "primereact/card";
import {StepperPanel} from "primereact/stepperpanel";

import { groupOptionsFromServerData } from "../utils/filters";

import PSGUploadStepperContent from "./Steppers/PSGUploadStepperContent.jsx";
import FiltersStepperContent from "./Steppers/FiltersStepperContent.jsx";
import EPPGUploadStepperContent from "./Steppers/EPPGUploadStepperContent.jsx";
import ConfirmStepperContent from "./Steppers/ConfirmStepperContent.jsx";

import "../CSS/AnnotationPageContent.css"
import {Message} from "primereact/message";

export default function AnnotationPageContent() {
    const stepperRef = useRef(null);
    const filtersRef = useRef(null);

    const [filterOptions, setFilterOptions] = useState([]);
    const [serverResponse, setServerResponse] = useState(null);

    const [successMessagePSG, setSuccessMessagePSG] = useState(null)
    const [successMessageEPPG, setSuccessMessageEPPG] = useState(null)
    const [errorMessageFilters, setErrorMessageFilters] = useState("")


    const [stepNumber, setStepNumber] = useState(0)


    useEffect(() => {
        if (serverResponse?.result) {
            const groupedOptions = groupOptionsFromServerData(serverResponse.result.filters);
            setFilterOptions(groupedOptions);
        }
    }, [serverResponse]);

    const handleFiltersStepNext = async () => {
        if (errorMessageFilters === "")
            if (filtersRef.current?.handleFiltersSending) {
                await filtersRef.current.handleFiltersSending();
            }
    };
    return (
        <div>
            <div style={{width: "90%", margin: "3% 5% 0% 5%"}}>
                <Message severity="info" text="Please go step by step to annotate your ePPG file. If you want to change something made in your previous turn, please return back and repeat the operation again. The annotated file will be downloaded automatically."/>
            </div>
            <Card className="card-content">
            <Stepper ref={stepperRef} activeStep={stepNumber} orientation="vertical" onChangeStep={(e) => setStepNumber(e.index)}>
                <StepperPanel header="Upload PSG file" className="custom-stepper-panel">
                    <PSGUploadStepperContent
                        stepperRef={stepperRef}
                        setServerResponse={setServerResponse}
                        setSuccessMessage={setSuccessMessagePSG}
                    />
                </StepperPanel>
                <StepperPanel header="Choose filters">
                    <FiltersStepperContent
                        stepperRef={stepperRef}
                        filterOptions={filterOptions}
                        filtersRef={filtersRef}
                        onNext={handleFiltersStepNext}
                        successMessagePSG={successMessagePSG}
                        errorMessage={errorMessageFilters}
                        setErrorMessage={setErrorMessageFilters}
                    />
                </StepperPanel>
                <StepperPanel header="Upload ePPG file" className="custom-stepper-panel">
                    <EPPGUploadStepperContent
                        stepperRef={stepperRef}
                        setServerResponse={setServerResponse}
                        setSuccessMessage={setSuccessMessageEPPG}
                    />
                </StepperPanel>
                <StepperPanel header="Confirm" className="custom-stepper-panel">
                    <ConfirmStepperContent
                        stepperRef={stepperRef}
                        successMessageEPPG={successMessageEPPG}
                        setStepNumber={setStepNumber}
                    />
                </StepperPanel>
            </Stepper>
        </Card>
        </div>
    );
}