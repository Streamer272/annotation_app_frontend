import {Stepper} from "primereact/stepper";
import {StepperPanel} from "primereact/stepperpanel";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import React, {useRef, useState} from "react";

import "../CSS/AnnotationPageContent.css"
import {FileUpload} from "primereact/fileupload";
import {MultiSelect} from "primereact/multiselect";


export default function AnnotationPageContent(){
    const stepperRef = useRef(null);
    const [filterOptions, setFilterOptions] = useState(null)
    const [selectedFilters, setSelectedFilters] = useState(null)

    return (
        <Card className="card-content">
            <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }} orientation="vertical">
                <StepperPanel header="Upload PSG file" className="custom-stepper-panel">
                    <div className="step-content">
                        <p>Choose your polysomnography file (.rml): </p>
                        <FileUpload
                        name="rml"
                        accept=".rml"
                        customUpload
                        auto
                        // uploadHandler={}
                        chooseLabel="Choose file"
                        className="uploader"
                        emptyTemplate={<p>No file selected.</p>}
                        />
                        <div className="step-buttons">
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" className="next-btn"
                                    onClick={() => stepperRef.current.nextCallback()}/>
                        </div>
                    </div>
                </StepperPanel>
                <StepperPanel header="Choose filters" >
                    <div className="step-content">
                        <MultiSelect
                          value={selectedFilters}
                          options={filterOptions}
                          onChange={(e) => setSelectedFilters(e.value)}
                          optionLabel="label"
                          placeholder="Select filters"
                          className="filter-dropdown"
                        />
                        <div className="step-buttons">
                            <Button
                                label="Back"
                                icon="pi pi-arrow-left"
                                onClick={() => stepperRef.current.prevCallback()}
                                className="back-btn"
                            />
                            <Button
                                label="Next"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                                onClick={() => stepperRef.current.nextCallback()}
                                className="next-btn"
                            />
                        </div>
                  </div>
                </StepperPanel>

                <StepperPanel header="Upload ePPG file" className="custom-stepper-panel">
                    <div className="step-content">
                        <p>Choose your ePPG file (.txt): </p>
                        <FileUpload
                            name="rml"
                            accept=".rml"
                            customUpload
                            auto
                            // uploadHandler={}
                            chooseLabel="Choose file"
                            className="uploader"
                            emptyTemplate={<p>No file selected.</p>}
                        />
                        <div className="step-buttons">
                            <Button
                                label="Back"
                                icon="pi pi-arrow-left"
                                className="back-btn"
                                onClick={() => stepperRef.current.prevCallback()}
                            />
                            <Button
                                label="Next"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                                onClick={() => stepperRef.current.nextCallback()}
                                className="next-btn"
                            />
                        </div>
                    </div>
                </StepperPanel>
                    <StepperPanel header="Confirm" className="custom-stepper-panel">
                    <div className="step-content">
                        <div>
                            <Button label="Annotate" severity="secondary" icon="pi pi-pen-to-square"/>
                        </div>
                    </div>
                </StepperPanel>
            </Stepper>
        </Card>
    )
}