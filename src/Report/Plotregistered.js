import React, { useState } from 'react';
import { TextField, Button, MenuItem, Grid } from '@mui/material';
import '../styles/common.css';

const Plotregistered = () => {
  
  const handlePreview = () => {
   // console.log('Previewing report for:', { dateFrom, dateTo, account });
  };

  const handleGenerate = () => {
   // console.log('Generating report for:', { dateFrom, dateTo, account });
  };

  return (
    <div className="container-plotregisterd">
 <h3 style={{ textAlign: 'center', marginBottom: '30px',margintop:'0px' }}>Report</h3>    
 <Grid container spacing={2}>  
 <Grid item xs={12} sm={8}>
            <div className="input-group">
                <label>Report</label>
          <TextField
          size="small"
         
         
            variant="outlined"
          />
          </div>
        </Grid>
 <Grid item xs={12} sm={8}>
  </Grid>
        <Grid item xs={12}>  
        < div style={{ display: 'flex', gap: '10px' ,justifyContent:'center',marginTop:'100px',alignItems:'center'}}>
        <Button variant="contained" color="primary" onClick={handlePreview}>
              Preview Report
            </Button>
            <Button variant="contained" color="secondary" onClick={handleGenerate}>
              Generate Report
            </Button>
  </div>
  </Grid>
  </Grid>
    </div>
  );
};

export default Plotregistered;
