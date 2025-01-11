import React, { useState } from 'react';
import { TextField, Button, MenuItem, Grid } from '@mui/material';
import '../styles/common.css';

const Terizmanagement = () => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handlePreview = () => {
    console.log('Previewing report for:', { dateFrom, dateTo});
  };

  const handleGenerate = () => {
    console.log('Generating report for:', { dateFrom, dateTo });
  };

  return (
    <div className="container-teriz">
 <h3 style={{ textAlign: 'center', marginBottom: '30px',margintop:'0px' }}>Terij Management</h3>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
            <div className="input-group">
                <label>Date from</label>
          <TextField
          size="small"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            variant="outlined"
          />
          </div>
        </Grid>
        <Grid item xs={12} sm={8}>
        <div className="input-group">
            <label> To</label>
          <TextField
          size="small"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            variant="outlined"
          />
          </div>
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

export default Terizmanagement;
