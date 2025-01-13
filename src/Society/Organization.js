import React, { useState,useEffect } from 'react';
import {TextField, Grid, Select, MenuItem,Button,Paper } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import './society.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Organization = () => {
    const [societyName, setSocietyName] = useState('');
    const [line1, setAddressLine1] = useState('');
    const [line2, setAddressLine2] = useState('');
    const [line3, setAddressLine3] = useState('');
    const [pin,  setPin] =useState('');
    const [state,setState] =useState('');
    const [mobileno,   setMobileNo] =useState('');
    const [emailid,setEmailId] =useState('');
    const [addressforregisteringauthority,  setAddressofRegistringauthority] =useState('');
    const [registeringauthority,   setRegisteringAuthority] =useState('');
    const [registration, setRegistration] = useState('');
    const [registeredDate, setRegisteredDate] = useState('');
    const [formedDate, setFormedDate] = useState('');
    const [showorganization, setShoworganization] = useState();

     // Data for table
  const [OrganizationData, setOrganizationData] = useState([]);
  
  // State for managing editing a row
  const [editingIndex, setEditingIndex] = useState(null);

  const formatDate = (dateObject) => {
    const date = new Date(dateObject.date.split(' ')[0]); // Extract the date portion
    return date.toLocaleDateString(); // This will return the date in MM/DD/YYYY format, or you can format as needed
};

 useEffect(() => {
    fetchData();
}, []);

// Function to fetch data from the API
const fetchData = async () => {
    try {
        const response = await fetch('https://weaveitapp.microtechsolutions.co.in/api/housing/Get/gettable.php?Table=SocietyInformation', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY': 'f4e3d2c1b0a9g8h7i6j5',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Format data and correct the date
        const formattedData = data.map(item => {
            const { CreatedOn, UpdatedOn, RegistrationDate, ...rest } = item;
            return {
                ...rest,
                RegistrationDate: RegistrationDate.date.split(' ')[0], // Extract only the date portion
            };
        });

        setOrganizationData(formattedData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('SocietyName', societyName);
    formData.append('AddressLine1', line1);
    formData.append('AddressLine2', line2);
    formData.append('AddressLine3', line3);
    formData.append('State', state);
    formData.append('Pin', pin);
    formData.append('MobileNo', mobileno);
    formData.append('EmailId', emailid);
    formData.append('Registration', registration);
    formData.append('RegistrationDate', registeredDate);
    formData.append('RegisteringAuthority', registeringauthority);
    formData.append('AddressOfRegisteringAuthority', addressforregisteringauthority);

    try {
        const response = await fetch('https://weaveitapp.microtechsolutions.co.in/api/housing/Post/postsocietyinformation.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY': 'f4e3d2c1b0a9g8h7i6j5',
            },
            body: formData.toString(),
        });

        if (response.ok) {
            const data = await response.json();
            toast.success('Society added successfully!', {autoClose: 5000, });
            setOrganizationData([...OrganizationData, data]); // Assuming backend returns inserted data
        } else {
            const errorData = await response.json();
            console.error('Error Response:', errorData);
            toast.error(`Error adding society: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('Error submitting form');
    }

    resetFields();
};
  // Handle deleting a row
  const handleEdit = (rowIndex) => {
    const row = OrganizationData[rowIndex];
    setSocietyName(row.SocietyName);
    setAddressLine1(row.AddressLine1);
    setAddressLine2(row.AddressLine2);
    setAddressLine3(row.AddressLine3);
    setPin(row.Pin);
    setState(row.State);  
    setMobileNo(row.MobileNo);
    setEmailId(row.EmailId);
    setRegistration(row.Registration);
    setRegisteredDate(row.RegistrationDate); // No need to split date, it's already in the correct format
    setRegisteringAuthority(row.RegisteringAuthority);  
    setAddressofRegistringauthority(row.AddressOfRegisteringAuthority);
    setEditingIndex(rowIndex);  
    setShoworganization(true);
};


const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('Id', OrganizationData[editingIndex].Id); // Get ID from the current data
    formData.append('SocietyName', societyName);
    formData.append('AddressLine1', line1);
    formData.append('AddressLine2', line2);
    formData.append('AddressLine3', line3);
    formData.append('State', state);
    formData.append('Pin', pin);
    formData.append('MobileNo', mobileno);
    formData.append('EmailId', emailid);
    formData.append('Registration', registration);
    formData.append('RegistrationDate', registeredDate);
    formData.append('RegisteringAuthority', registeringauthority);
    formData.append('AddressOfRegisteringAuthority', addressforregisteringauthority);

    try {
        const response = await fetch('https://weaveitapp.microtechsolutions.co.in/api/housing/Update/updatesocietyinformation.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY': 'f4e3d2c1b0a9g8h7i6j5',
            },
            body: formData.toString(),
        });

        if (response.ok) {
            toast.success('Society updated successfully!',{autoClose: 5000, });
            // Refresh the data after update
            fetchData();
        } else {
            const errorData = await response.json();
            toast.error(`Error updating society: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error updating society:', error);
        toast.error('Error updating society');
    }

    resetFields();
};

const handleDelete = async (rowIndex) => {
    const id = OrganizationData[rowIndex].Id; // Get the ID of the row to be deleted

    try {
        const response = await fetch(`https://weaveitapp.microtechsolutions.co.in/api/housing/Delete/delrecord.php?Id=${id}&Table=SocietyInformation`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY': 'f4e3d2c1b0a9g8h7i6j5',
            },
        });

        if (response.ok) {
            toast.success('Society deleted successfully!', {autoClose: 5000, });
            // Remove the deleted row from the state
            setOrganizationData(OrganizationData.filter((_, index) => index !== rowIndex));
        } else {
            const errorData = await response.json();
            toast.error(`Error deleting society: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error deleting society:', error);
        toast.error('Error deleting society');
    }
};

// Define your columns with updated Edit and Delete buttons
const columns = [
    { accessorKey: 'Id', header: 'ID' },
    { accessorKey: 'SocietyName', header: 'Society Name' },
    { accessorKey: 'AddressLine1', header: 'Address Line 1' },
    { accessorKey: 'AddressLine2', header: 'Address Line 2' },
    { accessorKey: 'AddressLine3', header: 'Address Line 3' },
    { accessorKey: 'State', header: 'State' },
    { accessorKey: 'Pin', header: 'Pin' },
    { accessorKey: 'MobileNo', header: 'Mobile No' },
    { accessorKey: 'EmailId', header: 'Email Id' },
    { accessorKey: 'Registration', header: 'Registration' },
    { accessorKey: 'RegistrationDate', header: 'Registration Date'},  
    { accessorKey: 'RegisteringAuthority', header: 'Registering Authority' },
    { accessorKey: 'AddressOfRegisteringAuthority', header: 'Address of Registering Authority' },
    {
        accessorKey: 'actions',
        header: 'Actions',
        Cell: ({ row }) => (
            <div>
                <Button onClick={() => handleEdit(row.index)} color="primary" variant="contained">Edit</Button>
                <Button onClick={() => handleDelete(row.index)} color="secondary" variant="contained">Delete</Button>
            </div>
        ),
    },
];


    const resetFields = () => {
        setSocietyName('');
        setAddressLine1('');
        setAddressLine2('');
        setAddressLine3('');
        setState('');
        setPin('');
        setMobileNo('');
        setEmailId('');
        setAddressofRegistringauthority('');
        setRegisteringAuthority('');
        setRegistration('');
        setRegisteredDate('');
        setFormedDate('');
        setShoworganization(false);    
    };

    return (
        <div className="society-container">
              {!showorganization && (
            <div className="button-group-front-voucher">      
        <Button onClick={() => setShoworganization(true)} sx={{ backgroundColor: '#6E85A4', color: 'white' }}>
          Society Information
        </Button>  </div>
              )}
      <ToastContainer />
             {showorganization && (
        <form onSubmit={handleSubmit} className="form-group">
        <h3 style={{ textAlign: 'center', marginBottom: '30px',marginTop:'0px' }}>Society Information</h3>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={12} >
                    <div class= "input-group">
                    <label>SocietyName</label>
                    <TextField  
                        style={{ width:'630px',marginbottom:'20px',marginleft:'50px'}}     
                        value={societyName}
                        onChange={(e) => setSocietyName(e.target.value)}
                        required  
                               
                    />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div class= "input-group">
                <label>Address Line</label>
                    <TextField                   
                        value={line1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        size="small"
                        required
                    />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div class= "input-group">
                <label>Address Line</label>
                    <TextField                   
                        value={line2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        size="small"
                        required
                    />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div class= "input-group">
                <label>Address Line</label>
                    <TextField                   
                        value={line3}
                        onChange={(e) => setAddressLine3(e.target.value)}
                        size="small"
                        required
                    />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div class= "input-group">
                <label>State</label>
                <Select
                size="small"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                style={{ width: '230px' }}
              >
                <MenuItem value="" disabled>Select State</MenuItem>
                <MenuItem value="India">India</MenuItem>
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="SouthAfrica">SouthAfrica</MenuItem>
              </Select>
                    </div>
                   
                </Grid>
                <Grid item xs={12} sm={6}>
                <div class= "input-group">
                <label>Pin</label>
                    <TextField                   
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        size="small"
                        required
                    />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div class= "input-group">
                <label>Mobile No</label>
                    <TextField                   
                        value={mobileno}
                        onChange={(e) => setMobileNo(e.target.value)}
                        size="small"
                        required
                    />
                    </div>
                </Grid>
                <Grid item xs={12} sm={8}>
                <div class= "input-group">
                <label>Email Id</label>
                    <TextField
                    fullWidth                   
                        value={emailid}
                        onChange={(e) => setEmailId(e.target.value)}
                        size="small"
                        required
                    />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div class= "input-group">
                <label>Registration</label>
                    <TextField                  
                        value={registration}
                        onChange={(e) => setRegistration(e.target.value)}
                        size="small"
                        required
                    />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
            <div class="input-group">
              <label>Registered Date</label>
              <TextField
  type="date"
  value={registeredDate}  // This should be in YYYY-MM-DD format
  onChange={(e) => setRegisteredDate(e.target.value)}
  size="small"
  required
  style={{ width: '230px' }}
/>
                    </div>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                <div class= "input-group">
                <label>Registering Authority</label>
                <Select
    size="small"
    value={registeringauthority}  // Bind to registering authority value
    onChange={(e) => setRegisteringAuthority(e.target.value)}  // Update authority when changed
    required
    style={{ width: '230px' }}
>
    <MenuItem value="" disabled>Select Registering Authority</MenuItem>
    <MenuItem value="deputy-registrar">Deputy Registrar</MenuItem>
    <MenuItem value="assistant-registrar">Assistant Registrar</MenuItem>
    <MenuItem value="cooperative-societies">Cooperative Societies</MenuItem>
    <MenuItem value="ward">Ward</MenuItem>
    <MenuItem value="tal">Tal</MenuItem>
</Select>
                    </div>
                </Grid>
                <Grid item xs={12} sm={8}>
                <div class= "input-group">
                <label>Address of Registering Authority</label>
                    <TextField    
                    fullWidth               
                        value={addressforregisteringauthority}
                        onChange={(e) => setAddressofRegistringauthority(e.target.value)}
                        size="small"
                        required
                    />
                    </div>
                </Grid>
            </Grid>
            <div className="button-group-bottom">
            <button
              type="submit" className='submit'
              onClick={editingIndex !== null ? handleUpdate : handleSubmit}
            >
              {editingIndex !== null ? 'Update' : 'Save'}
            </button>
                    {/* <button type="submit" className="submit">Save</button> */}
                    <button type="button" onClick={() => { resetFields(); setShoworganization(false); }} className="cancel">Cancel</button>
                </div>
        </form>
           )}
           {!showorganization && (
          <Paper style={{ marginTop: '20px', padding: '10px', maxWidth: '1000px', margin: '0 auto' }}>
          <MaterialReactTable
              columns={columns}  // The columns you defined earlier
              data={OrganizationData}  // Data fetched from API and stored in state
          />
      </Paper>   
           )}
        </div>       
    );
};
export default Organization;
