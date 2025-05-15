import React from "react";

import "../CSS/AnnotationPage.css";
import Menu from "../Components/Menu.jsx"
import AnnotationPageContent from "../Components/AnnotationPageContent.jsx";

export default function AnnotationPage() {
  return (
    <div className="annotation-container">
        <Menu/>
        <AnnotationPageContent />
    </div>
  );
}
