import {Button} from "primereact/button";
import React from "react";
import {Message} from "primereact/message";

export default function NextButtonForUploader(props){
    const handleClick = () => {
        const hasFile = props.uploaderRef.current?.hasFile();
        if (hasFile) {
            props.setErrorMessage("");
            props.uploaderRef.current.upload();
        } else {
            props.setErrorMessage("You need to upload the file to continue");
        }
    };
    return (
        <>
            <Button
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                className="next-btn"
                onClick={handleClick}
            />

        </>
    )
}
