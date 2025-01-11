import React, { useState } from 'react';
import { Button,TextField, Grid,Select, MenuItem,Checkbox, FormControlLabel } from '@mui/material';
import {
    MaterialReactTable,
    useMaterialReactTable,
  } from "material-react-table";
import './membergroup.css'; // Adjust the path based on your folder structure
// import Findmember from '../Member/Findmember';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import '../styles/find.css';
import '../styles/common.css';


const MemberGroup = () => {
    const [accounts, setAccounts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showFindMember, setShowFindMember] = useState(false);

    // State for each field
    const [name, setname] = useState('');
    const [surname, setSurname] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [occupation, setOccupation] = useState('');
    const [annualIncome, setAnnualIncome] = useState('');
    const [mobileNo1, setMobileNo1] = useState('');
    const [mobileNo2, setMobileNo2] = useState('');
    const [landlineno1, setLandlineNo1] = useState('');
    const [landlineno2, setLandlineNo2] = useState('');
    const [email1, setEmail1] = useState('');
    const [email2, setEmail2] = useState('');
    const [pan, setPan] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [isEditMode, setIsEditMode] = useState(false); // Track if we are in edit mode 
    const [editIndex, setEditIndex] = useState(null); // Track the index of the item being edited

    const [addressType, setAddressType] = useState('');/*Address fields*/
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const [mobileNo, setMobileNo] = useState('');
    const [emailId, setEmailId] = useState('');
    const [selectedSalutations, setSelectedSalutations] = useState([]);
    const [selectedOccupations, setSelectedOccupations] = useState([]);
    const [annualIncomeRange, setAnnualIncomeRange] = useState([]);
    // const [errors, setErrors] = useState({});

    const handleFindSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Filter submitted:", { mobileNo, emailId, selectedSalutations, selectedOccupations, annualIncomeRange });
            // setIsFormVisible(false); // Hide the form after submit
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
        setShowFindMember(false);
        // Hide the form after cancel
        // setIsFormVisible(false);
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


    const handleSave = () => {
        const formData = {
          addressType,
          address,
          landmark,
          city,
          pincode,
          latitude,
          longitude,
        };
        console.log('Form Data Saved:', formData);
        // Here, you can add further logic like calling an API to save the data
      };

      const addressTypes = ['Home', 'Office', 'Others'];
  const cities = ['New York', 'London', 'Mumbai', 'Delhi'];
  const handleClose = () => {
    setAddressType('');
    setAddress('');
    setLandmark('');
    setCity('');
    setPincode('');
    setLatitude('');
    setLongitude('');
  };
  

    // Error states
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = "name is required";
        if (!surname) newErrors.surname = "Surname is required";
        if (!firstName) newErrors.firstName = "First Name is required";
        if (!middleName) newErrors.middleName = "middlename is required";
        if (!dob) newErrors.dob = "Date of Birth is required";
        if (!mobileNo1) newErrors.mobileNo1 = "Mobile No 1 is required";
        if (!email1) newErrors.email1 = "Email 1 is required";
        if (!pan) newErrors.pan = "PAN is required";
        if (!aadhar) newErrors.aadhar = "Aadhar is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleSubmit = (e) =>{
         e.preventDefault(); 
            if (validateForm()) { 
                const newAccount = { srno: nextSrNo, // SR No 
                    name, surname, firstName, middleName, dob, gender, occupation, annualIncome, mobileNo1, mobileNo2, landlineno1, landlineno2, email1, email2, pan, aadhar, };
                    if (isEditMode) {
                         // Update existing account 
                         const updatedAccounts = [...accounts]; 
                         updatedAccounts[editIndex] = newAccount; 
                         setAccounts(updatedAccounts); 
                         toast.success('Member updated successfully!', {
                             position: "top-right", 
                             autoClose: 5000, 
                             hideProgressBar: false, 
                             closeOnClick: true,
                              pauseOnHover: true,
                               draggable: true, 
                               progress: undefined, 
                            });
                        } else { // Add new account 
                            setAccounts([...accounts, newAccount]); 
                            setNextSrNo(nextSrNo + 1); // Increment for the next entry 
                            toast.success('Member added successfully!', {
                                 position: "top-right", 
                                 autoClose: 5000, 
                                 hideProgressBar: false, 
                                 closeOnClick: true, 
                                 pauseOnHover: true, 
                                 draggable: true,
                                  progress: undefined,
                                 });
                                 }
                    handleCancel();
                 }
                 };




    const handleCancel = () => {
        setname('');
        setSurname('');
        setFirstName('');
        setMiddleName('');
        setDob('');
        setGender('');
        setOccupation('');
        setAnnualIncome('');
        setMobileNo1('');
        setMobileNo2('');
        setLandlineNo1('');
        setLandlineNo2('');
        setEmail1('');
        setEmail2('');
        setPan('');
        setAadhar('');
        setErrors({});
        setShowForm(false);
        setIsEditMode(false);
         setEditIndex(null);
    };

    const [nextSrNo, setNextSrNo] = useState(1);
    // const handleDelete = (rowIndex) => {
    //     setAccounts((prevAccounts) => prevAccounts.filter((_, index) => index !== rowIndex));
    // };


    const handleDelete = (index) => 
        { const updatedAccounts = accounts.filter((_, i) => i !== index); 
            setAccounts(updatedAccounts); toast.success('Member deleted successfully!', {
                 position: "top-right",
                  autoClose: 5000,
                   hideProgressBar: false, 
                   closeOnClick: true,
                    pauseOnHover: true, 
                    draggable: true, 
                    progress: undefined, }); 
        };
            const handleEdit = (index) => { const account = accounts[index];
                 setname(account.name); 
                 setFirstName(account.firstName); 
                 setMiddleName(account.middleName); 
                 setAadhar(account.aadhar); 
                 setSurname(account.surname);
                 setDob(account.dob);
                 setGender(account.gender);
                 setOccupation(account.occupation);
                 setAnnualIncome(account.annualIncome);
                 setMobileNo1(account.mobileNo1);
                 setMobileNo2(account.mobileNo2);
                 setLandlineNo1(account.landlineno1);
                 setLandlineNo2(account.landlineno2);
                 setEmail1(account.email1);
                 setEmail2(account.email2);
                 setPan(account.pan);
                 setAadhar(account.aadhar);
                 setIsEditMode(true);
                  setEditIndex(index); 
                  setShowForm(true); 
                };



    const columns = [
        {
            accessorKey: 'srno',
            header: 'SR No',
            size:20,
            // Use a custom Cell render function to calculate SR No
            Cell: ({ row }) => row.index + 1,
        },
        { accessorKey: 'name', header: 'Name' ,size:50},
        { accessorKey: 'firstName', header: 'First Name' ,size:50},
        { accessorKey: 'middleName', header: 'Middle Name',size:50 },
        { accessorKey: 'surname', header: 'Surname',size:50 },
        { accessorKey: 'dob', header: 'Date of Birth' },
        { accessorKey: 'gender', header: 'Gender' },
        { accessorKey: 'occupation', header: 'Occupation' },
        { accessorKey: 'annualIncome', header: 'Annual Income' },
        { accessorKey: 'mobileNo1', header: 'Mobile No 1' },
        { accessorKey: 'mobileNo2', header: 'Mobile No 2' },
        { accessorKey: 'landlineno1', header: 'Landline No 1' },
        { accessorKey: 'landlineno2', header: 'Landline No 2' },
        { accessorKey: 'email1', header: 'Email 1' },
        { accessorKey: 'email2', header: 'Email 2' },
        { accessorKey: 'pan', header: 'PAN' },
        { accessorKey: 'aadhar', header: 'Aadhar' },
        {
            accessorKey: 'actions',
            header: 'Actions',
            Cell: ({ row }) => (
                <div>
                    <Button onClick={() => handleEdit(row.index)} variant="contained" color="primary" size="small">
                        Edit
                    </Button>
                    <Button onClick={() => handleDelete(row.index)} variant="contained" color="secondary" size="small">
                        Delete
                    </Button>
                </div>
            ),
        },
    ];
    // const handleFindMember = () => {
    //     setShowFindMember(!showFindMember); // Toggle the Findmember component
    // };

    return (
        <>
        <div className="membergroup-container">
            {!showForm && !showFindMember && (
           <h1 style={{marginTop: '10px', marginBottom: '40px' }}>Member Group</h1>
            )}
        <div className="button-group-front">       
           {/* Show buttons only when not in any form */}
           {!showForm && !showFindMember && (
                    <>
<Button onClick={() => setShowForm(true)} 
    sx={{ backgroundColor: '#6E85A4', marginRight:'5px', color:'white' }}  >
                            New Member
                        </Button>
                        <Button onClick={() => setShowFindMember(true)} 
                        /* <Button onClick={handleFindMember}   */
    sx={{ backgroundColor: '#6E85A4',color:'white' }} >
                            Find Member
                        </Button>
                    </>
                )}
                  {/* Conditionally render Findmember component */}
                  {/* {showFindMember && <Findmember onCancel={handleCancel} />} */}
        </div>
      

 <ToastContainer /> 
 {showFindMember && ( 
    <form onSubmit={handleFindSubmit} className="form-containerfind">
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
 )}
            {showForm && (
                <form onSubmit={handleSubmit} className="memberform-container">
         <h3 style={{ textAlign: 'center', marginBottom: '30px',marginTop:'0%' }}>Manage Member</h3>
                <div className="form-flex">
                    <div className="form-section">
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                            <div className="input-group">
                                <label>Name</label>
                                <Select 
        value={name} 
        onChange={(e) => setname(e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
        required
        style={{ width: '190px', height: '40px' }} // Adjust the width and height as needed
    > 
            <MenuItem value=""><em>None</em></MenuItem>   
            <MenuItem value="Mr">Mr</MenuItem>
            <MenuItem value="Miss">Miss</MenuItem>
            <MenuItem value="Misses">Misses</MenuItem>
                </Select></div>                               
                            </Grid>
                            <Grid item xs={3}>
                            <div className="input-group">
                                <TextField
                                    size="small"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder='enter firstname'
                                    required
                                /></div>
                            </Grid>
                            <Grid item xs={3}>
                            <div className="input-group">
                                <TextField
                                    size="small"
                                    value={middleName}
                                    onChange={(e) => setMiddleName(e.target.value)}
                                    placeholder='enter middlename'
                                    required
                                /></div>
                            </Grid>
                            <Grid item xs={3}>
                            <div className="input-group">
                                <TextField
                                    size="small"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                    error={!!errors.surname}
                                    helperText={errors.surname}
                                    placeholder='enter surname'
                                    required
                                /></div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
    <div className="input-group">
        <label>Date of Birth</label>
        <TextField
            size="small"
            type="date" // Set the type to date
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            style={{ width: '220px', height: '40px' }}
            error={!!errors.dob}
            helperText={errors.dob}
            required
            InputLabelProps={{
                shrink: true, // Keep the label above the input
            }}
        />
    </div>
</Grid>

                            <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Gender</label>
                                <Select
            
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{ width: '220px', height: '40px' }}
            required
        >     
            <MenuItem value=""><em>None</em></MenuItem>     
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
        </Select></div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Occupation</label>
                                <Select
                
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                style={{ width: '220px', height: '40px' }}
                required
            >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Engineer">Engineer</MenuItem>
                <MenuItem value="Doctor">Doctor</MenuItem>
                <MenuItem value="Teacher">Teacher</MenuItem>
                <MenuItem value="Artist">Artist</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
            </Select></div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Annual Income</label>
                                <Select
               
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
                style={{ width: '220px', height: '40px' }}
                required
            >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Below 50,000">Below 50,000</MenuItem>
                <MenuItem value="50,000 - 100,000">50,000 - 100,000</MenuItem>
                <MenuItem value="100,000 - 200,000">100,000 - 200,000</MenuItem>
                <MenuItem value="Above 200,000">Above 200,000</MenuItem>
            </Select></div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Mobile No 1</label>
                                <TextField
                                    size="small"
                                    value={mobileNo1}
                                    onChange={(e) => setMobileNo1(e.target.value)}
                                    error={!!errors.mobileNo1}
                                    helperText={errors.mobileNo1}
                                     maxLength="10"
                                    required
                                /></div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Mobile No 2</label>
                                <TextField
                                size="small"
                                    value={mobileNo2}
                                    onChange={(e) => setMobileNo2(e.target.value)}
                                     maxLength="10"
                                /> </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Landline No 1</label>
                                <TextField
                                size="small"
                                    value={landlineno1}
                                    onChange={(e) => setLandlineNo1(e.target.value)}
                                /></div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Landline No 2</label>
                                <TextField
                                size="small"
                                    value={landlineno2}
                                    onChange={(e) => setLandlineNo2(e.target.value)}
                                /></div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Email 1</label>
                                <TextField
                                size="small"
                                    value={email1}
                                    onChange={(e) => setEmail1(e.target.value)}
                                    error={!!errors.email1}
                                    helperText={errors.email1}
                                    required
                                /></div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Email 2</label>
                                <TextField
                                size="small"
                                    value={email2}
                                    onChange={(e) => setEmail2(e.target.value)}
                                /></div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>PAN</label>
                                <TextField
                                size="small"
                                    value={pan}
                                    onChange={(e) => setPan(e.target.value)}
                                    error={!!errors.pan}
                                    helperText={errors.pan}
                                    required                   
                                /></div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Aadhar</label>
                                <TextField
                                size="small"
                                    value={aadhar}
                                    onChange={(e) => setAadhar(e.target.value)}
                                    error={!!errors.aadhar}
                                    helperText={errors.aadhar}
                                    required
                                /></div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <div className="input-group">
        <label>Address Type</label>
        <select
        size="small"
           style={{ width: '220px', height: '40px' }}
          value={addressType}
          onChange={(e) => setAddressType(e.target.value)}
        >
          <option value="">Select Address Type</option>
          {addressTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div></Grid>
      <Grid item xs={12} sm={6}>
      <div className="input-group">
        <label>Address</label>
        <TextField
        size='small'
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Address"
        />
      </div></Grid>
      <Grid item xs={12} sm={6}>
      <div className="input-group">
        <label>Landmark</label>
        <TextField
          type="text"
          size="small"
          value={landmark}
          onChange={(e) => setLandmark(e.target.value)}
          placeholder="Enter Landmark"
        />
      </div></Grid>
      <Grid item xs={12} sm={6}>
      <div className="input-group">
        <label>City/Village</label>
        <select
        size="small"
           style={{ width: '220px', height: '40px' }}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Select City/Village</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div></Grid>
      <Grid item xs={12} sm={6}>
      <div className="input-group">
        <label >Pincode</label>
        <TextField
          type="text"
          size="small"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter Pincode"
        />
      </div></Grid>
      <Grid item xs={12} sm={6}>
      <div className="input-group">
        <label >Latitude</label>
        <TextField
          type="text"
          size="small"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Enter Latitude"
        />
      </div></Grid>
      <Grid item xs={12} sm={6}>
      <div className="input-group">
        <label>Longitude</label>
        <TextField
          type="text"
          size="small"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Enter Longitude"
        />
      </div>
      </Grid>
                        </Grid>
                    </div>
                </div>
                
                <div className="button-group-bottom">
                    <button type="submit" className="submit">{isEditMode ? 'Update' : 'Submit'}</button>
                    <button type="button" onClick={handleCancel} className="cancel">Cancel</button>
                </div>
            </form>   
            )}




             {!showForm && !showFindMember && (
    <div className='membergrouptable-container' >
         <MaterialReactTable 
           columns={columns}
              data={accounts}
               />
</div>

 )}
        </div>
 </>
    );
};

export default MemberGroup;
