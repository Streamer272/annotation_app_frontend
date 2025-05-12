import React from "react";
import { FileUpload } from "primereact/fileupload";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Stepper } from 'primereact/stepper';


import "../CSS/AnnotationPage.css";
import Menu from "../Components/Menu.jsx"
import AnnotationPageContent from "../Components/AnnotationPageContent.jsx";

const FILTER_OPTIONS = [
  { label: "Tachycardia", category: "Cardiac" },
  { label: "Bradycardia", category: "Cardiac" },
  { label: "NREM", category: "Sleep Stages" },
];

export default function AnnotationPage() {
  // const [rmlUploaded, setRmlUploaded] = useState(false);
  // const [filtersConfirmed, setFiltersConfirmed] = useState(false);
  // const [selectedFilters, setSelectedFilters] = useState([]);
  // const [rmlFile, setRmlFile] = useState(null);
  // const [eppgFile, setEppgFile] = useState(null);
  //
  //
  // const handleRmlUpload = ({ files }) => {
  //   setRmlFile(files[0]);
  //   setRmlUploaded(true);
  //   console.log("RML uploaded:", files[0]);
  // };
  //
  // const handleFilterConfirm = () => {
  //   setFiltersConfirmed(true);
  //   console.log("Filters confirmed:", selectedFilters);
  // };
  //
  // const handleAnnotate = () => {
  //   console.log("Final annotation data:", {
  //     rmlFile,
  //     eppgFile,
  //     selectedFilters,
  //   });
  //   // Your annotation logic here
  // };


  return (
    <div className="annotation-container">
        <Menu/>
        <AnnotationPageContent />


    </div>
  );
}
