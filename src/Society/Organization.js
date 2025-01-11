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
    const [showorganization, setShoworganization] = useState(true);

     // Data for table
  const [OrganizationData, setOrganizationData] = useState([]);
  
  // State for managing editing a row
  const [editingIndex, setEditingIndex] = useState(null);

  const formatDate = (dateObject) => {
    const date = new Date(dateObject.date);
    return date.toLocaleDateString(); // Formatting to MM/DD/YYYY (localized)
};
// Fetching data with useEffect
useEffect(() => {
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

            const data = await response.json();  // Here, data is fetched

            // Format data (exclude CreatedOn and UpdatedOn, and format RegistrationDate)
            const formattedData = data.map(item => {
                const { CreatedOn, UpdatedOn, ...rest } = item;
                return {
                    ...rest,
                    RegistrationDate: formatDate(item.RegistrationDate),  // Format the date here
                };
            });

            // Set the processed data
            setOrganizationData(formattedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

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
            toast.success('Society added successfully!');
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
const handleEdit = (societyId) => {
    const societyToEdit = OrganizationData.find(item => item.ID === societyId);
    
    if (societyToEdit) {
      setSocietyName(societyToEdit.SocietyName);
      setAddressLine1(societyToEdit.AddressLine1);
      setAddressLine2(societyToEdit.AddressLine2);
      setAddressLine3(societyToEdit.AddressLine3);
      setState(societyToEdit.State);
      setPin(societyToEdit.Pin);
      setMobileNo(societyToEdit.MobileNo);
      setEmailId(societyToEdit.EmailId);
      setAddressofRegistringauthority(societyToEdit.AddressOfRegisteringAuthority);
      setRegisteringAuthority(societyToEdit.RegisteringAuthority);
      setRegistration(societyToEdit.Registration);
      setRegisteredDate(societyToEdit.RegistrationDate);
      setEditingIndex(societyToEdit.ID);  // Store the editing index for later use
    }
  };
  
// Handle editing a row
const handleEditSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
  
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
      const response = await fetch(`https://weaveitapp.microtechsolutions.co.in/api/housing/Update/updatesocietyinformation.php?id=${editingIndex}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-API-KEY': 'f4e3d2c1b0a9g8h7i6j5',
        },
        body: formData.toString(),
      });
  
      if (response.ok) {
        const data = await response.json();
        toast.success('Society updated successfully!');
        
        // Update the state with the new data
        const updatedData = [...OrganizationData];
        const index = updatedData.findIndex(item => item.ID === editingIndex);
        updatedData[index] = data;  // Replace the edited row with the updated data
        setOrganizationData(updatedData);  // Update the state to reflect the changes
        setEditingIndex(null);  // Reset the editing state
      } else {
        toast.error('Error updating society');
      }
    } catch (error) {
      console.error('Error updating society:', error);
      toast.error('Error updating society');
    }
  
    resetFields();  // Clear the form
  };
  
  // Handle deleting a row
  const handleDelete = async (societyId) => {
    try {
        // Construct the URL with the correct ID and Table query parameters
        const url = `https://weaveitapp.microtechsolutions.co.in/api/housing/Delete/delrecord.php?Id=${societyId}&Table=SocietyInformation`;

        const response = await fetch(url, {
            method: 'DELETE',  // Use DELETE method as specified by the API
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY': 'f4e3d2c1b0a9g8h7i6j5',  // If the API requires an API key, include it here
            },
        });

        if (response.ok) {
            toast.success('Society deleted successfully!');
            const updatedData = OrganizationData.filter(item => item.ID !== societyId); // Remove the deleted society from the state
            setOrganizationData(updatedData);  // Update the state to reflect the deletion
        } else {
            toast.error('Error deleting society');
        }
    } catch (error) {
        console.error('Error deleting society:', error);
        toast.error('Error deleting society');
    }
};

  // Columns for MaterialReactTable
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
    { accessorKey: 'RegistrationDate', header: 'Registration Date' },
    { accessorKey: 'RegisteringAuthority', header: 'Registering Authority' },
    { accessorKey: 'AddressOfRegisteringAuthority', header: 'Address of Registering Authority' },
    {
        accessorKey: 'actions',
        header: 'Actions',
        Cell: ({ row }) => (
            <div>
                <Button onClick={() => handleEdit(row.original.ID)} color="primary">Edit</Button>
                <Button onClick={() => handleDelete(row.original.ID)} color="secondary">Delete</Button>
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
       
    };

    return (
        <div className="society-container">
              {!showorganization && (
            <div className="button-group-front-voucher">      
        <Button onClick={() => setShoworganization(true)} sx={{ backgroundColor: '#6E85A4', color: 'white' }}>
          Society Information
        </Button>  </div>
              )}

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
                      <MenuItem value="" disabled>
        Select State  {/* This is the placeholder */}
    </MenuItem>
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
                <div class= "input-group">
                <label>Registered Date</label>
                    <TextField                    
                        type="date"
                        onChange={(e) => setRegisteredDate(e.target.value)}
                        size="small"
                        required
                        style={{ width: '230px'}}
            
                    />
                    </div>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                <div class= "input-group">
                <label>Registering Authority</label>
                    <Select
                        size="small"                    
                        value={registeringauthority}
                        onChange={(e) => setRegisteringAuthority(e.target.value)}
                        required
                        style={{ width: '230px' }}
                    >
                       <MenuItem value="" disabled>
        Select Authority  {/* This is the placeholder */}
    </MenuItem>
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
                    <button type="submit"  onClick={handleEditSubmit} className="submit">Save</button>
                    <button type="button" onClick={() => { resetFields(); setShoworganization(false); }} className="cancel">Cancel</button>
                </div>
                <ToastContainer/>
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
