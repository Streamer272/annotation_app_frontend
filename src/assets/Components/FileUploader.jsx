import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';

import "../CSS/FileUploader.css";
import {Message} from "primereact/message";

const FileUploader = forwardRef((props, ref) => {
    const toast = useRef(null);
    const fileUploadRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);


    const onTemplateSelect = (e) => {
        const file = e.files?.[0];
        if (file) {
            setSelectedFile(file);
            fileUploadRef.current.setFiles([file]);
        }
        props.setErrorMessage("")
    };

    const onClear = () => {
        setSelectedFile(null);
        props.setErrorMessage("")
    };
    const headerTemplate = (options) => {
        const { className, chooseButton, cancelButton } = options;
        return (
            <div className={className} style={{ backgroundColor: 'rgba(200, 230, 201, 0.3)', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {cancelButton}
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-file-import mt-3 p-5" style={{ fontSize: '5em', borderRadius: '20%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span> </span>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop File Here
                </span>
            </div>
        );
    };

    const chooseOptions = {
        icon: 'pi pi-fw pi-file',
        iconOnly: true,
        className: 'custom-choose-btn p-button-rounded p-button-outlined uploader upload'
    };

    const cancelOptions = {
        icon: 'pi pi-fw pi-times',
        iconOnly: true,
        className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined uploader cancel'
    };
    const customUploadHandler = async ({ files }) => {
        const file = files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append(props.nameOfFile, file);


        const response = await fetch(props.linkToServer, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });

        const contentType = response.headers.get("content-type");
        if (response.ok) {
            props.stepperRef.current.nextCallback();
            props.setSuccessMessage("Your file was successfully processed! If you want to change it, you need to return and upload it again.")
            const data = contentType?.includes("application/json")
                ? await response.json()
                : null;

            if (data) {
                props.setServerResponse?.(data);
            }
        }else if(response.status === 400 || response.status === 422){
            const errorData = await response.json();
            const errorMessage = errorData?.error
            props.setErrorMessage?.(errorMessage);
        }else {
            props.setErrorMessage("Something went wrong... Try again")
        }
    };

    useImperativeHandle(ref, () => ({
        upload: () => {
            fileUploadRef.current?.upload();
        },
        hasFile: () => Boolean(selectedFile)
    }));

    return (
        <div>
            <Toast ref={toast} />
            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <FileUpload
                ref={fileUploadRef}
                name={props.nameOfFile}
                customUpload
                uploadHandler={customUploadHandler}
                accept={props.fileType}
                auto={false}
                multiple={false}
                onSelect={onTemplateSelect}
                onClear={onClear}
                headerTemplate={headerTemplate}
                emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions}
                cancelOptions={cancelOptions}
            />
        </div>
    );
});

export default FileUploader;
