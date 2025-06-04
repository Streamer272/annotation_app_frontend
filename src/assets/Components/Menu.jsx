import React from "react";
import { Menubar } from "primereact/menubar";
import "../CSS/Menu.css"


export default function Menu() {
    const menuItems = []
    const start = (
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <img src="/favicon.png" alt="Logo" style={{width: '10%', height: '10%'}}/>
            <span className="title">PSG Annotation</span>
        </div>
    );

    return (
        <>
            <Menubar model={menuItems} className="custom-menubar" start={start}/>
        </>
    );
}
