import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import '../styles/common.css';

const Document = () => {
    const [plot, setPlot] = React.useState('');
    const [member, setMember] = React.useState('');
   

    const handleViewFiles = () => {
        // Your logic to view files
    };

    const handleViewMember = () => {
        // Your logic to view member
    };

    return (
        <div className="container-view">
           <h1 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}>View</h1>
            <Grid container spacing={2}>

                {/* Plot Input */}
                <Grid item xs={12} sm={8}>
                    <div className="input-group">
                    <label style={{ marginTop: "20px" }}>Plot</label>
                        <TextField
                            size="small"
                            value={plot}
                            onChange={(e) => setPlot(e.target.value)}
                            placeholder="Enter plot number"
                            required
                            style={{ marginTop:'40px' }}
                        />
                    </div>
                </Grid>

                {/* View Files Button */}
                <Grid item xs={12} sm={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleViewFiles}
                        style={{ marginTop:'40px' }}
                    >
                        View Files
                    </Button>
                </Grid>

                {/* Member Selection */}
                <Grid item xs={12} sm={8}>
                    <div className="input-group">
                        <label>Member</label>                     
                            <Select
                                value={member}
                                onChange={(e) => setMember(e.target.value)}
                                required
                                style={{ width: '220px', height: '40px' }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="member1">Member 1</MenuItem>
                                <MenuItem value="member2">Member 2</MenuItem>
                                <MenuItem value="member3">Member 3</MenuItem>
                            </Select>
                    </div>
                </Grid>

                {/* View Button */}
                <Grid item xs={12} sm={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleViewMember}
                    >
                        View
                    </Button>
                </Grid>                
            </Grid>
        </div>
    );
};

export default Document;
