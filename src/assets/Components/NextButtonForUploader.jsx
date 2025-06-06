import {Button} from "primereact/button";
import React from "react";
import {ProgressSpinner} from "primereact/progressspinner";

export default function NextButtonForUploader(props){
    const handleClick = () => {
        const hasFile = props.uploaderRef.current?.hasFile();
        if (hasFile) {
            if (!props.errorMessage) {
                props.setErrorMessage("");
                props.uploaderRef.current.upload();
                props.setLoading(true)
            }
        } else {
            props.setErrorMessage("You need to upload the file to continue");
        }
    };

    return (
        <>
            <div style={{display: 'flex', flexDirection: "column", alignItems: 'center', gap: '0.5rem'}}>
                <Button
                    label={props.loading ?
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <span style={{marginRight: '10%'}}>Processing</span>
                                <ProgressSpinner style={{width: '30px', height: '30px'}} strokeWidth="6"/>
                            </div>
                         :
                            "Next"
                    }
                    outlined
                    icon="pi pi-arrow-right"
                    className="next-btn"
                    disabled={props.loading || props.errorMessage !== ""}
                    onClick={handleClick}
                />
            </div>

        </>
    )
}
