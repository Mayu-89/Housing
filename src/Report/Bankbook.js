import React, { useState } from 'react';
import { TextField, Button, MenuItem, Grid } from '@mui/material';
import '../styles/common.css';

const Bankbook = () => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [account, setAccount] = useState('');

  const handlePreview = () => {
    console.log('Previewing report for:', { dateFrom, dateTo, account });
  };

  const handleGenerate = () => {
    console.log('Generating report for:', { dateFrom, dateTo, account });
  };

  return (
    <div className="container-bankbook">
 <h3 style={{ textAlign: 'center', marginBottom: '30px',margintop:'0px' }}>Cash Book/Bank Book</h3>
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
            <label>To</label>
          <TextField
          size="small"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            variant="outlined"
          />
          </div>
        </Grid>
        <Grid item xs={12} sm={8}>
        <div className="input-group">
            <label>Account</label>
          <TextField
            select
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          >
            <MenuItem value="Account1">Account 1</MenuItem>
            <MenuItem value="Account2">Account 2</MenuItem>
            <MenuItem value="Account3">Account 3</MenuItem>
            {/* Add more accounts as needed */}
          </TextField>
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

export default Bankbook;
