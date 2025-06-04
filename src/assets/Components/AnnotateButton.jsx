import React, {useState} from "react";
import { Button } from "primereact/button";
import {ProgressSpinner} from "primereact/progressspinner";

export default function AnnotateButton(props) {
    const [loading, setLoading] = useState(false)

    const handleAnnotateClick = async () => {
        setLoading(true)
        const response = await fetch('api/annotate/', {
            method: 'GET',
            credentials: 'include',
        });


        if (response) {
            setLoading(false)
            if (!response.ok) {
                const errorData = await response.json();
                const errorText = errorData?.error || "Unknown error";
                props.setErrorMessage(`Error: ${errorText}`);
            }
            else{
                const blob = await response.blob();
                const contentDisposition = response.headers.get('Content-Disposition');
                const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
                const filename = filenameMatch ? filenameMatch[1] : 'annotated_file.txt';

                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);

                if (props?.stepperRef?.current) {
                    props.setStepNumber(0)
                }
            }
        }
    };

    return (
        <div style={{display: 'flex', flexDirection: "column", alignItems: 'center', gap: '0.5rem'}}>
            <Button
                label={loading ?
                    <div>
                        <span style={{ marginRight: '4px' }}>Processing </span>
                        <span> {loading && <ProgressSpinner style={{width: '20px', height: '20px'}} strokeWidth="6"/>}
                        </span>
                    </div>
                    : "Annotate"}
                outlined
                icon="pi pi-pen-to-square"
                className="next-btn"
                onClick={handleAnnotateClick}
                disabled={loading}
            />

        </div>
    );
}
