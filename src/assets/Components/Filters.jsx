import React, {useState, forwardRef, useImperativeHandle} from "react";
import {MultiSelect} from "primereact/multiselect";
import {getCookie} from "../utils/cookies.js";

const API_BASE_URL = import.meta.env.VITE_API_URL


const Filters = forwardRef((props, ref) => {
    const [selectedFilters, setSelectedFilters] = useState([]);

    const csrfToken = getCookie('csrftoken');
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

        const response = await fetch(API_BASE_URL + "/filters/selected/", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            },
            body: JSON.stringify(payload)
        })

        if (response.status === 204) {
            props.stepperRef.current.nextCallback();
        } else if (response.status === 400) {
            const errorData = await response.json();
            const errorMessage = errorData?.error
            props.setErrorMessage?.(errorMessage)
        } else {
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
