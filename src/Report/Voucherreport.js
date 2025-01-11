import React, { useState } from 'react';
import { TextField, Button, MenuItem, Grid } from '@mui/material';
import '../styles/common.css';

const Voucherreport = () => {
  const [voucherNo, setVoucherNo] = useState('');

  const handlePreview = () => {
    // Logic for previewing the report
    console.log('Previewing report for:', voucherNo);
  };

  const handleGenerate = () => {
    // Logic for generating the report
    console.log('Generating report for:', voucherNo);
  };

  return (
    <div class="container-voucherreport">
 <h3 style={{ textAlign: 'center', marginBottom: '30px',margintop:'0px' }}>Voucher Receipt</h3>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <div className="input-group">
                <label>Voucher No</label>
          <TextField
            select
            value={voucherNo}
            onChange={(e) => setVoucherNo(e.target.value)}
            size="small"  // Use size="small" for consistent height
            style={{ width: '500px' }}  // Set width to 300px
          >
            <MenuItem value="Voucher1">Voucher 1</MenuItem>
            <MenuItem value="Voucher2">Voucher 2</MenuItem>
            <MenuItem value="Voucher3">Voucher 3</MenuItem>
            {/* Add more vouchers as needed */}
          </TextField>
          </div>
        </Grid> 
          
        <Grid item xs={12}>  
        < div style={{ display: 'flex', gap: '10px' ,justifyContent:'center',marginTop:'100px'}}>
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

export default Voucherreport;
