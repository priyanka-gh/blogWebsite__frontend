import React from 'react'
// import CancelIcon from '@mui/icons-material/Cancel';
import './FailPost.css'
import {  FaTimes } from "react-icons/fa";

const Posted = () => {
    return (
        <div className="posted">
            <FaTimes className="checkIcon"/>
            <h1 className="h1Posted">FAILED</h1>
        </div>
    )
}

export default Posted
