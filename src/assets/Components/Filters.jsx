import React, {useState, forwardRef, useImperativeHandle} from "react";
import {MultiSelect} from "primereact/multiselect";

const Filters = forwardRef((props, ref) => {
    const [selectedFilters, setSelectedFilters] = useState([]);

    const transformFilters = (selected) => {
        const grouped = {};
        selected.forEach(entry => {
            const [category, item] = entry.split(".");
            if (!grouped[category]) grouped[category] = [];
            grouped[category].push(item);
        });
        return { filters: grouped };
    };

    const handleFiltersSending = async () => {
        const payload = transformFilters(selectedFilters);

        const response = await fetch("http://127.0.0.1:8000/annotation/process-filters/", {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })

        if (response.status === 204){
            props.stepperRef.current.nextCallback();
        }else {
            props.setErrorMessage("Something went wrong...Try again")
        }

    };

    useImperativeHandle(ref, () => ({
        handleFiltersSending
    }));

    return (
        <MultiSelect
            value={selectedFilters}
            options={props.filterOptions}
            onChange={(e) => {
                setSelectedFilters(e.value)
                props.setErrorMessage("")
            }}
            optionLabel="label"
            optionGroupLabel="label"
            optionGroupChildren="items"
            placeholder="Select filters"
            className="filter-dropdown"
        />
    );
});

export default Filters;
