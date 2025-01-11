import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import '../styles/common.css';

const Membercontribution  = () => {
    const [showMembercontribution, setShowMembercontribution] = useState(true);
    // State variables for form fields
    const [date, setDate] = useState('');
    const [member, setMember] = useState('');
    const [accountName, setAccountName] = useState('');
    const [amount, setAmount] = useState('');
    const [narration, setNarration] = useState('');
    const handleMembercontribution = (e) => {
        e.preventDefault();
        alert('Form Submitted');
      };
      
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission (page reload)

        // Basic validation: Check if the required fields are filled
        if (!date || !member || !accountName || !amount) {
            alert('Please fill in all required fields');
            return;
        }

        // Prepare the data to be sent
        const contributionData = {
            date,
            member,
            accountName,
            amount,
            narration,
        };

        // Call the parent function to handle the contribution data
        handleMembercontribution(contributionData);

        // Optionally, clear the form after submission
        setDate('');
        setMember('');
        setAccountName('');
        setAmount('');
        setNarration('');

        // Optionally, close the form after submission
        setShowMembercontribution(false);
    };

    return (
        <div className="container-membercontri">
        {showMembercontribution && (
            <form onSubmit={handleSubmit} className="member-contribution-form">
                <h3 style={{ textAlign: 'center', marginBottom: '30px', marginTop: '20px' }}>Member Contribution</h3>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <div className="input-group">
                            <label>Date</label>
                            <TextField
                                type="date"
                                size="small"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <div className="input-group">
                            <label>Member</label>
                            <TextField
                                size="small"
                                value={member}
                                onChange={(e) => setMember(e.target.value)}
                                fullWidth
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <div className="input-group">
                            <label>Account Name</label>
                            <TextField
                                size="small"
                                value={accountName}
                                onChange={(e) => setAccountName(e.target.value)}
                                fullWidth
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <div className="input-group">
                            <label>Amount</label>
                            <TextField
                                type="number"
                                size="small"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                fullWidth
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <div className="input-group">
                            <label>Narration</label>
                            <TextField
                                size="small"
                                value={narration}
                                onChange={(e) => setNarration(e.target.value)}
                                fullWidth
                            />
                        </div>
                    </Grid>
                </Grid>
                <div className="button-group-bottom">
                    <button type="submit" className="submit"> Save</button>
                    <button type="button" onClick={() => setShowMembercontribution(false)} className="cancel">Close</button>
                </div>
            </form>
        )}
        </div>
    );
};

export default Membercontribution;
