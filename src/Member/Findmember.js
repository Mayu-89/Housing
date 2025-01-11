import React, { useState } from 'react';
import { Button, TextField, Grid, Checkbox, FormControlLabel } from '@mui/material';
import '../styles/find.css';
import '../styles/common.css';

const Findmember = () => {
    const [mobileNo, setMobileNo] = useState('');
    const [emailId, setEmailId] = useState('');
    const [selectedSalutations, setSelectedSalutations] = useState([]);
    const [selectedOccupations, setSelectedOccupations] = useState([]);
    const [annualIncomeRange, setAnnualIncomeRange] = useState([]);
    const [errors, setErrors] = useState({});
    const [isFormVisible, setIsFormVisible] = useState(true);  // State to control visibility of the form

    const validateForm = () => {
        const newErrors = {};
        if (!mobileNo) newErrors.mobileNo = "Mobile No is required";
        if (!emailId) newErrors.emailId = "Email ID is required";
        if (selectedSalutations.length === 0) newErrors.salutation = "At least one salutation is required";
        if (selectedOccupations.length === 0) newErrors.occupation = "At least one occupation is required";
        if (annualIncomeRange.length === 0) newErrors.annualIncome = "At least one income range is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Filter submitted:", { mobileNo, emailId, selectedSalutations, selectedOccupations, annualIncomeRange });
            setIsFormVisible(false); // Hide the form after submit
        }
    };

    const handleCancelClick = () => {
        // Reset form fields
        setMobileNo('');
        setEmailId('');
        setSelectedSalutations([]);
        setSelectedOccupations([]);
        setAnnualIncomeRange([]);
        setErrors({}); // Clear validation errors

        // Hide the form after cancel
        setIsFormVisible(false);
    };

    const salutations = ["Mr", "Ms", "Mrs", "Smt"];
    const occupations = ["Engineer", "Doctor", "Teacher", "Artist"];
    const incomeRanges = ["<20k", "20k-50k", "50k-100k", ">100k"];

    const handleSalutationChange = (event) => {
        const { value, checked } = event.target;
        setSelectedSalutations(prev =>
            checked ? [...prev, value] : prev.filter(salutation => salutation !== value)
        );
    };

    const handleOccupationChange = (event) => {
        const { value, checked } = event.target;
        setSelectedOccupations(prev =>
            checked ? [...prev, value] : prev.filter(occupation => occupation !== value)
        );
    };

    const handleIncomeChange = (event) => {
        const { value, checked } = event.target;
        setAnnualIncomeRange(prev =>
            checked ? [...prev, value] : prev.filter(income => income !== value)
        );
    };

    if (!isFormVisible) return <p>Form has been closed.</p>; // Optionally show something else after the form is closed.

    return (
        <form onSubmit={handleSubmit} className="form-containerfind">
            <h3 style={{ textAlign: 'center', marginBottom: '30px', marginTop: '0px' }}>Filter Members</h3>
            <Grid container spacing={4}>
                {/* Mobile No and Email ID Fields */}
                <Grid item xs={12} sm={6} md={6}>
                    <div className="input-group">
                        <label>Mobile No</label>
                        <TextField
                            size="small"
                            value={mobileNo}
                            onChange={(e) => setMobileNo(e.target.value)}
                            placeholder="Enter Mobile No"
                            required
                            error={!!errors.mobileNo}
                            helperText={errors.mobileNo}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <div className="input-group">
                        <label>Email ID</label>
                        <TextField
                            size="small"
                            type="email"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            placeholder="Enter Email ID"
                            required
                            error={!!errors.emailId}
                            helperText={errors.emailId}
                        />
                    </div>
                </Grid>

                {/* Salutation Checkbox */}
                <Grid item xs={12} sm={6} md={6}>
                    <div className="input-group">
                        <label>Salutation</label>
                        <div className="input-wrapper" style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #ccc', padding: '5px', marginTop: '4px' }}>
                            {salutations.map((salutation) => (
                                <FormControlLabel
                                    key={salutation}
                                    control={
                                        <Checkbox
                                            value={salutation}
                                            checked={selectedSalutations.includes(salutation)}
                                            onChange={handleSalutationChange}
                                            style={{ marginBottom: '0px' }}
                                        />
                                    }
                                    label={salutation}
                                    style={{ margin: '0' }}
                                />
                            ))}
                        </div>
                        {errors.salutation && <div style={{ color: 'red' }}>{errors.salutation}</div>}
                    </div>
                </Grid>

                {/* Occupation Checkbox */}
                <Grid item xs={12} sm={6} md={6}>
                    <div className="input-group">
                        <label>Occupation</label>
                        <div className="input-wrapper" style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #ccc', padding: '5px', marginTop: '4px' }}>
                            {occupations.map((occupation) => (
                                <FormControlLabel
                                    key={occupation}
                                    control={
                                        <Checkbox
                                            value={occupation}
                                            checked={selectedOccupations.includes(occupation)}
                                            onChange={handleOccupationChange}
                                            style={{ marginBottom: '0px' }}
                                        />
                                    }
                                    label={occupation}
                                    style={{ margin: '0' }}
                                />
                            ))}
                        </div>
                        {errors.occupation && <div style={{ color: 'red' }}>{errors.occupation}</div>}
                    </div>
                </Grid>

                {/* Annual Income Checkbox */}
                <Grid item xs={12} sm={6} md={6}>
                    <div className="input-group">
                        <label>Annual Income</label>
                        <div className="input-wrapper" style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #ccc', padding: '5px', marginTop: '4px' }}>
                            {incomeRanges.map((income) => (
                                <FormControlLabel
                                    key={income}
                                    control={
                                        <Checkbox
                                            value={income}
                                            checked={annualIncomeRange.includes(income)}
                                            onChange={handleIncomeChange}
                                            style={{ marginBottom: '0px' }}
                                        />
                                    }
                                    label={income}
                                    style={{ margin: '0' }}
                                />
                            ))}
                        </div>
                        {errors.annualIncome && <div style={{ color: 'red' }}>{errors.annualIncome}</div>}
                    </div>
                </Grid>

                {/* Buttons */}
                <Grid item xs={12}>
                <div className="button-group-bottom">
                        <button type="submit" className="search">Search</button>
                        <button type="button" onClick={handleCancelClick} className="cancel">Cancel</button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
};

export default Findmember;
