import React, { useState } from 'react';
import { TextField,Button,Grid } from '@mui/material';
import './auditreport.css';

    const Form1 = () => {
        const [formData, setFormData] = useState({
            societyName: '',
            address: '',
            auditYear: '',
            auditClassification: '',
            dateOfRegistration: '',
            areaOfOperation: '',
            branches: '',
            auditorName: '',
            auditPeriod: '',
            auditDates: '',
          });
        
          const handleChange = (e) => {
            setFormData({
              ...formData,
              [e.target.name]: e.target.value,
            });
          };
        
          const handleSubmit = (e) => {
            e.preventDefault();
            console.log('Form Data:', formData);
            // Handle form submission (e.g., send to API or save to state)
          };
        
          return (
            <div className="audit-container">
              <Grid Container spacing ={3}>
            <form onSubmit={handleSubmit}className="audit-form">
              <h2>Audit Report Form</h2>
              <Grid item xs={12} sm={8}>
          <div className="input-group"> 
          <label>Name of the Society:</label>        
                         <TextField type="text" name="societyName" value={formData.societyName} onChange={handleChange} />
              </div></Grid>
              <Grid item xs={12} sm={8}>
              <div className="input-group"> 
              <label>Full Registered Address:</label>          
                <TextField type="text" name="address" value={formData.address} onChange={handleChange} />           
              </div></Grid>
              <Grid item xs={12} sm={8}>
              <div className="input-group"> 
              <label> Audit Classification for the Year:</label>
                <TextField type="text" name="auditYear" value={formData.auditYear} onChange={handleChange} />
            </div></Grid>
            <Grid item xs={12} sm={6}>
            <div className="input-group"> 
             <label>   Audit Classification Given:</label>
                <TextField type="text" name="auditClassification" value={formData.auditClassification} onChange={handleChange} />
             </div></Grid>
             <Grid item xs={12} sm={6}>
             <div className="input-group"> 
            <label>Date of Registration:</label>
                <TextField type="text" name="dateOfRegistration" value={formData.dateOfRegistration} onChange={handleChange} />
          </div></Grid>
          <Grid item xs={12} sm={6}>
          <div className="input-group"> 
          <label> Area of Operation:</label>
                <TextField type="text" name="areaOfOperation" value={formData.areaOfOperation} onChange={handleChange} />
             </div></Grid>
             <Grid item xs={12} sm={6}>
             <div className="input-group"> 
             <label>   No. of Branches, Deposits of Shops:</label>
                <TextField type="text" name="branches" value={formData.branches} onChange={handleChange} />
             </div></Grid>
             <Grid item xs={12} sm={6}>
             <div className="input-group"> 
              <label>  Full Name of the Auditor:</label>
                <TextField type="text" name="auditorName" value={formData.auditorName} onChange={handleChange} />
                </div></Grid>
                <Grid item xs={12} sm={6}>
          <div className="input-group"> 
            <label>Period Covered During the Present Audit:</label>
                <TextField type="text" name="auditPeriod" value={formData.auditPeriod} onChange={handleChange} />
          </div></Grid>
          <Grid item xs={12} sm={6}>
          <div className="input-group"> 
              <label>  Date on Which Audit was Commenced and Completed:</label>
                <TextField type="text" name="auditDates" value={formData.auditDates} onChange={handleChange} />
           </div></Grid>
           <Grid item xs={12} sm={6}>
           <div className="button-group-botom"> 
              <button type="submit">Submit</button></div></Grid>
            </form>
            </Grid>
            </div>
          );
        };
    
    export default Form1;
    