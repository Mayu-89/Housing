import React, { useState } from 'react';
import { TextField, Button, MenuItem, Grid } from '@mui/material';
import '../styles/common.css';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

const Reportprefences = () => {
    const [openWith, setOpenWith] = useState('');
    const [savePath, setSavePath] = useState('');
    const [displayPath, setDisplayPath] = useState('')


    const handleSave = () => {
        console.log('Saving preferences:', { openWith, savePath });
      };
    
      const handleCancel = () => {
        setOpenWith('');
        setSavePath('');
        setDisplayPath('');
      };
    
      const handleSelectPath = async () => {
        try {
          const dirHandle = await window.showDirectoryPicker();
          const path = dirHandle.name; // This will get the name of the directory
          setSavePath(path);
          setDisplayPath(path);
        } catch (error) {
          console.error('Error selecting directory:', error);
        }
      };
    

  
  return (
    <div className="container-reportrefrences">
 <h3 style={{ textAlign: 'center', marginBottom: '30px',margintop:'0px' }}>Report Prefences</h3>
      <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <div className="input-group">
            <label>Open With</label>
            <TextField
            select
            value={openWith}
            onChange={(e) => setOpenWith(e.target.value)}
            variant="outlined"
            size="small"
            style={{width:'100%'}}
          >
            <MenuItem value="word">Word</MenuItem>
            <MenuItem value="Excel">Excel</MenuItem>
            <MenuItem value="PDF">PDF</MenuItem>
            <MenuItem value="Text">Text</MenuItem>
            {/* Add more accounts as needed */}
          </TextField>
          </div>
        </Grid>     
        <Grid item xs={12} sm={8}>
        <div className="input-group">
            <label>Where do you want to save Report</label>
        <TextField
            label="select path"
            value={savePath}
            onChange={(e) => setSavePath(e.target.value)}
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <Button onClick={handleSelectPath} variant="contained" color="primary">
                  Browse
                </Button>
              ),
            }}
          />
          </div>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Selected Path"
            value={displayPath}
            fullWidth
            variant="outlined"
            readOnly
            style={{ marginBottom: '20px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <button type="button" className='cancel' onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};


export default Reportprefences;
