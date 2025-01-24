import React, { useState,useEffect } from 'react';
import {Tab, Tabs, TextField, Grid, Checkbox, Button, Select, MenuItem ,Paper} from '@mui/material';
import './membernew.css'; // Same CSS file for consistent styling
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MaterialReactTable } from 'material-react-table';

const Membernew = () => {
    // Use separate state for each field
    const [printName, setPrintName] = useState('');
    const [memberGroup, setMemberGroup] = useState('');
    const [isMember, setIsMember] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isBillwise, setIsBillwise] = useState(false);
    const [positionNo, setPositionNo] = useState('');
    const [wingName, setWingName] = useState('');
    const [floor, setFloor] = useState('');
    const [unitMember, setUnitMember] = useState('');
    const [unitType, setUnitType] = useState('');
    const [parentType, setParentType] = useState('');
    const [unitArea, setUnitArea] = useState('');
    const [uom, setUom] = useState('');
    const [constructionCost, setConstructionCost] = useState('');
    const [chargesTemplate, setChargesTemplate] = useState('');
    const [tenantChargesTemplate, setTenantChargesTemplate] = useState('');
    const [supplementaryChargesTemplate, setSupplementaryChargesTemplate] = useState('');
    const [ownerType, setOwnerType] = useState('');
    const [memberClass, setMemberClass] = useState('');
    const [isTenantDetails, setIsTenantDetails] = useState(false);
    const [isParkingDetails, setIsParkingDetails] = useState(false);
    const [isMemberCharges, setIsMemberCharges] = useState(false);
    const [updatedMemberName, setUpdatedMemberName] = useState('');
    const [mailingName, setMailingName] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [pin, setPin] = useState('');
    const [contactReason, setContactReason] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [isInterest, setIsInterest] = useState(false);
    const [pan, setPan] = useState('');
    const [gstRegistrationOnType, setGstRegistrationOnType] = useState('');
    const [gstin, setGstin] = useState('');
    const [isAssesseeOtherTerritory, setIsAssesseeOtherTerritory] = useState(false);
    const [isEcommerce, setIsEcommerce] = useState(false);
    const [isDeemedExport, setIsDeemedExport] = useState(false);
    const [partyType, setPartyType] = useState('');
    const [isTransporter, setIsTransporter] = useState(false);
    const [dateOfAdmission, setDateOfAdmission] = useState('');
    const [dateOfEntranceFeePayment, setDateOfEntranceFeePayment] = useState('');
    const [fullName, setFullName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [age, setAge] = useState('');
    const [nameOfNominee, setNameOfNominee] = useState('');
    const [dateOfNomination, setDateOfNomination] = useState('');
    const [dateOfCessationOfMembership, setDateOfCessationOfMembership] = useState('');
    const [reasonOfCessation, setReasonOfCessation] = useState('');
    const [remark, setRemark] = useState('');

    const [activeTab, setActiveTab] = useState(0);
    const [showmembernew,setShowMembernew]=useState();
    const [MemberData, setMemberData] = useState([]);
    const [stateOptions, setStateOptions] = useState([]);
    const [countryOptions, setCountryOptions] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [formedDate, setFormedDate] = useState('');

    const [loading, setLoading] = useState(false);  // To manage loading state
    const [error, setError] = useState(null);      // To manage errors

const fetchOptions = async (tableName, setter) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://weaveitapp.microtechsolutions.co.in/api/housing/Get/gettable.php?Table=${tableName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'X-API-KEY': 'f4e3d2c1b0a9g8h7i6j5',  // Replace with your actual API key
        },
      });

      const data = await response.json();
      console.log(data);  // Log the response data to verify structure
      setter(data);  // Update the state with the fetched data
    } catch (err) {
      setError(`Failed to load data for ${tableName}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions('Statenew', setStateOptions);
     fetchOptions('Country', setCountryOptions);
  }, []);

  const formatDate = (dateObject) => {
    const date = new Date(dateObject.date.split(' ')[0]); // Extract the date portion
    return date.toLocaleDateString(); // This will return the date in MM/DD/YYYY format, or you can format as needed
};

  const fetchData = async () => {
    try {
        const response = await fetch('https://weaveitapp.microtechsolutions.co.in/api/housing/Get/gettable.php?Table=MemberNew', {
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
            const { CreatedOn, UpdatedOn,DateOfAdmission, DateOfEntranceFeePayment,DateOfNomination,DateOfCessationOfMembership, ...rest } = item;
            return {
                ...rest,
                DateOfAdmission:DateOfAdmission.date.split('')[0],
                DateOfEntranceFeePayment:DateOfEntranceFeePayment.date.split('')[0],
                DateOfNomination: DateOfNomination.date.split(' ')[0],
                DateOfCessationOfMembership: DateOfCessationOfMembership.date.split(' ')[0], // Extract only the date portion
            };
        });

        setMemberData(formattedData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();

    // Append form fields
    formData.append('PrintName', printName);
    formData.append('MemberGroup', memberGroup);
    formData.append('IsMember', isMember);
    formData.append('IsActive', isActive);
    formData.append('PositionNo', positionNo);
    formData.append('IsBillWise', isBillwise);
    formData.append('WingName', wingName);
    formData.append('Floor', floor);
    formData.append('UnitMember', unitMember);
    formData.append('UnitType', unitType);
    formData.append('ParentType', parentType);
    formData.append('UnitArea', unitArea);
    formData.append('UOM', uom);
    formData.append('ConstructionCost', constructionCost);
    formData.append('ChargesTemplate', chargesTemplate);
    formData.append('TenantChargesTemplate', tenantChargesTemplate);
    formData.append('SupplementaryChargesTemplate', supplementaryChargesTemplate);
    formData.append('OwnerType', ownerType);
    formData.append('MemberClass', memberClass);
    formData.append('IsTenantDetails', isTenantDetails);
    formData.append('IsParkingDetails', isParkingDetails);
    formData.append('IsMemberCharges', isMemberCharges);
    formData.append('UpdatedMemberName', updatedMemberName);
    formData.append('MailingName', mailingName);
    formData.append('Country', country);
    formData.append('State', state);
    formData.append('PIN', pin);
    formData.append('ContactReason', contactReason);
    formData.append('PhoneNo', phoneNo);
    formData.append('Mobile', mobile);
    formData.append('Email', email);
    formData.append('IsInterest', isInterest);
    formData.append('PAN', pan);
    formData.append('GSTRegistrationOnType', gstRegistrationOnType);
    formData.append('IsAssesseeOtherTerritory', isAssesseeOtherTerritory);
    formData.append('IsEcommerce', isEcommerce);
    formData.append('IsDeemedExport', isDeemedExport);
    formData.append('PartyType', partyType);
    formData.append('IsTransporter', isTransporter);
    formData.append('DateOfAdmission', dateOfAdmission);
    formData.append('DateOfEntranceFeePayment', dateOfEntranceFeePayment);
    formData.append('FullName', fullName);
    formData.append('Occupation', occupation);
    formData.append('Age', age);
    formData.append('NameOfNominee', nameOfNominee);
    formData.append('DateOfNomination', dateOfNomination);
    formData.append('DateOfCessationOfMembership', dateOfCessationOfMembership);
    formData.append('ReasonOfCessation', reasonOfCessation);
    formData.append('Remark', remark);

    // Check the form data in the console
    for (let [key, value] of formData) {
        console.log(key + ": " + value);
    }

    try {
        const response = await fetch('https://weaveitapp.microtechsolutions.co.in/api/housing/Post/postmembernew.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY': 'f4e3d2c1b0a9g8h7i6j5',
            },
            body: formData.toString(),
        });

        if (response.ok) {
            const data = await response.json();
            toast.success('Member added successfully!', { autoClose: 5000 });
            fetchData(); // Assuming you want to reload data
        } else {
            const errorData = await response.json();
            console.error('Error Response:', errorData);
            toast.error(`Error adding member: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('Error submitting form');
    }

    resetFields();  // Assuming you want to clear the form after submission
};

const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('Id', MemberData[editingIndex].Id); // Get ID from the current data
   formData.append('PrintName', printName);
    formData.append('MemberGroup', memberGroup);
    formData.append('IsMember', isMember);
    formData.append('IsActive', isActive);
    formData.append('PositionNo', positionNo);
    formData.append('IsBillWise', isBillwise);
    formData.append('WingName', wingName);
    formData.append('Floor', floor);
    formData.append('UnitMember', unitMember);
    formData.append('UnitType', unitType);
    formData.append('ParentType', parentType);
    formData.append('UnitArea', unitArea);
    formData.append('UOM', uom);
   formData.append('ConstructionCost', constructionCost);
   formData.append('ChargesTemplate', chargesTemplate);
   formData.append('TenantChargesTemplate', tenantChargesTemplate);
   formData.append('SupplementryChargesTemplate', supplementaryChargesTemplate);
   formData.append('OwnerType', ownerType);
   formData.append('MemberClass', memberClass);
   formData.append('IsTenantDetails', isTenantDetails);
   formData.append('IsParkingDetails', isParkingDetails);
   formData.append('IsMemberCharges', isMemberCharges);
   formData.append('UpdatedMemberName', updatedMemberName);
   formData.append('MailingName', mailingName);
   formData.append('Country', country);
   formData.append('State', state);
   formData.append('PIN', pin);
   formData.append('ContactReason', contactReason);
   formData.append('PhoneNo', phoneNo);
   formData.append('Mobile', mobile);
   formData.append('Email', email,);
   formData.append('IsInterest', isInterest);
   formData.append('PAN', pan);
   formData.append('GSTRegistrationOnType', gstRegistrationOnType);
   formData.append('IsAssesseeOtherTerritory', isAssesseeOtherTerritory);
   formData.append('IsEcommerce', isEcommerce);
   formData.append('IsDeemedExport', isDeemedExport);
   formData.append('PartyType', partyType);
   formData.append('IsTransporter', isTransporter);
   formData.append('DateOfAdmission', dateOfAdmission);
   formData.append('DateOfEntranceFeePayment', dateOfEntranceFeePayment);
   formData.append('FullName',fullName);
   formData.append('Occupation', occupation);
   formData.append('Age', age);
   formData.append('NameOfNominee', nameOfNominee);
   formData.append('DateOfNomination', dateOfNomination);
   formData.append('DateOfCessationOfMembership', dateOfCessationOfMembership);
   formData.append('ReasonOfCessation', reasonOfCessation);
   formData.append('Remark', remark);



    try {
        const response = await fetch('https://weaveitapp.microtechsolutions.co.in/api/housing/Update/updatemembernew.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY': 'f4e3d2c1b0a9g8h7i6j5',
            },
            body: formData.toString(),
        });

        if (response.ok) {
            toast.success('Member updated successfully!',{autoClose: 5000, });
            // Refresh the data after update
            fetchData();
        } else {
            const errorData = await response.json();
            toast.error(`Error updating member: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error updating member:', error);
        toast.error('Error updating member');
    }

    resetFields();
};
const handleDelete = async (rowIndex) => {
    const id = MemberData[rowIndex].Id; // Get the ID of the row to be deleted

    try {
        const response = await fetch(`https://weaveitapp.microtechsolutions.co.in/api/housing/Delete/delrecord.php?Id=${id}&Table=MemberNew`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY': 'f4e3d2c1b0a9g8h7i6j5',
            },
        });

        if (response.ok) {
            toast.success('Member deleted successfully!', {autoClose: 5000, });
            // Remove the deleted row from the state
            setMemberData(MemberData.filter((_, index) => index !== rowIndex));
        } else {
            const errorData = await response.json();
            toast.error(`Error deleting member: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error deleting member:', error);
        toast.error('Error deleting member');
    }
};
const handleEdit = (rowIndex) => {
    const row = MemberData[rowIndex];

    // Set all the state values from the selected row
    setPrintName(row.PrintName);
    setMemberGroup(row.MemberGroup);
    setIsMember(row.IsMember);
    setIsActive(row.IsActive);
    setIsBillwise(row.IsBillWise);
    setPositionNo(row.PositionNo);
    setWingName(row.WingName);
    setFloor(row.Floor);
    setUnitMember(row.UnitMember);
    setUnitType(row.UnitType);
    setParentType(row.ParentType);
    setUnitArea(row.UnitArea);
    setUom(row.UOM);
    setConstructionCost(row.ConstructionCost);
    setChargesTemplate(row.ChargesTemplate);
    setTenantChargesTemplate(row.TenantChargesTemplate);
    setSupplementaryChargesTemplate(row.SupplementaryChargesTemplate);
    setOwnerType(row.OwnerType);
    setMemberClass(row.MemberClass);
    setIsTenantDetails(row.IsTenantDetails);
    setIsParkingDetails(row.IsParkingDetails);
    setIsMemberCharges(row.IsMemberCharges);
    setUpdatedMemberName(row.UpdatedMemberName);
    setMailingName(row.MailingName);
    setCountry(row.Country);
    setState(row.State);
    setPin(row.PIN);
    setContactReason(row.ContactReason);
    setPhoneNo(row.PhoneNo);
    setMobile(row.Mobile);
    setEmail(row.Email);
    setIsInterest(row.IsInterest);
    setPan(row.PAN);
    setGstRegistrationOnType(row.GSTRegistrationOnType);
    setGstin(row.Gstin);
    setIsAssesseeOtherTerritory(row.IsAssesseeOtherTerritory);
    setIsEcommerce(row.IsEcommerce);
    setIsDeemedExport(row.IsDeemedExport);
    setPartyType(row.PartyType);
    setIsTransporter(row.IsTransporter);
    setDateOfAdmission(row.DateOfAdmission);
    setDateOfEntranceFeePayment(row.DateOfEntranceFeePayment);
    setFullName(row.FullName);
    setOccupation(row.Occupation);
    setAge(row.Age);
    setNameOfNominee(row.NameOfNominee);
    setDateOfNomination(row.DateOfNomination);
    setDateOfCessationOfMembership(row.DateOfCessationOfMembership);
    setReasonOfCessation(row.ReasonOfCessation);
    setRemark(row.Remark);

    // Set the index of the row being edited
    setEditingIndex(rowIndex);  

    setShowMembernew(true);
};

const resetFields = () => {
    setPrintName('');
    setMemberGroup('');
    setIsMember(false);
    setIsActive(false);
    setIsBillwise(false);
    setPositionNo('');
    setWingName('');
    setFloor('');
    setUnitMember('');
    setUnitType('');
    setParentType('');
    setUnitArea('');
    setUom('');
    setConstructionCost('');
    setChargesTemplate('');
    setTenantChargesTemplate('');
    setSupplementaryChargesTemplate('');
    setOwnerType('');
    setMemberClass('');
    setIsTenantDetails(false);
    setIsParkingDetails(false);
    setIsMemberCharges(false);
    setUpdatedMemberName('');
    setMailingName('');
    setCountry('');
    setState('');
    setPin('');
    setContactReason('');
    setPhoneNo('');
    setMobile('');
    setEmail('');
    setIsInterest(false);
    setPan('');
    setGstRegistrationOnType('');
    setGstin('');
    setIsAssesseeOtherTerritory(false);
    setIsEcommerce(false);
    setIsDeemedExport(false);
    setPartyType('');
    setIsTransporter(false);
    setDateOfAdmission('');
    setDateOfEntranceFeePayment('');
    setFullName('');
    setOccupation('');
    setAge('');
    setNameOfNominee('');
    setDateOfNomination('');
    setDateOfCessationOfMembership('');
    setReasonOfCessation('');
    setRemark('');
    setShowMembernew(false);
  };
  
    const columns = [
        { accessorKey: 'Id', header: 'ID' },
        { accessorKey: 'PrintName', header: 'Print Name' },
        { accessorKey: 'MemberGroup', header: 'Member Group' },
        { accessorKey: 'PositionNo', header: 'Position No' },
        { accessorKey: 'WingName', header: 'Wing Name' },
        { accessorKey: 'Floor', header: 'Floor' },
        { accessorKey: 'UnitMember', header: 'Unit Member' },
        { accessorKey: 'UnitType', header: 'Unit Type' },
        { accessorKey: 'ParentType', header: 'Parent Type' },
        { accessorKey: 'UnitArea', header: 'Unit Area' },
        { accessorKey: 'UOM', header: 'UOM'},  
        { accessorKey: 'ConstructionCost', header: 'Construction Cost' },
        { accessorKey: 'ChargesTemplate', header: 'Charges Template' },
        { accessorKey: 'TenantChargesTemplate', header: 'Tenant Charges Template' },
        { accessorKey: 'SupplementryChargesTemplate', header: 'Supplementry Charges Template' },
        { accessorKey: 'OwnerType', header: 'Owner Type' },
        { accessorKey: 'MemberClass', header: 'Member Class' },
        { accessorKey: 'UpdatedMemberName', header: 'Updated Member Name' },
        { accessorKey: 'MailingName', header: 'Mailing Name' },
        { accessorKey: 'PIN', header: 'Pin' },
        { accessorKey: 'ContactReason', header: 'Contact Reason' },
        { accessorKey: 'PartyType', header: 'PartyType' },
        { accessorKey: 'FullName', header: 'Full Name' },
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
    return (
        <div className="new-container">
             {!showmembernew && (
            <div className="button-group-front">      
        <Button onClick={() => setShowMembernew(true)} sx={{ backgroundColor: '#6E85A4', color: 'white' }}>
          Member New
        </Button>  </div>
              )}          
            {showmembernew && (
           <div className="form-container">
                <h3 style={{ textAlign: 'center', marginBottom: '30px', marginTop: '0%' }}>Member</h3>

                <Tabs
                    value={activeTab}
                    onChange={(event, newValue) => setActiveTab(newValue)}
                    aria-label="form tabs"
                    className="tabs"
                    TabIndicatorProps={{ style: { display: 'none' } }} 
                >
                    <Tab label="Tab 1"  className={`tab ${activeTab === 0 ? 'active' : ''}`}/>
                    <Tab label="Tab 2"   className={`tab ${activeTab === 1 ? 'active' : ''}`}/>
                    <Tab label="Tab 3"  className={`tab ${activeTab === 2 ? 'active' : ''}`}/>
                </Tabs>

                <form onSubmit={handleSubmit} className="memberform-container">
                    {activeTab === 0 && (
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Print Name</label>
                                    <TextField
                                        value={printName}
                                        onChange={(e) => setPrintName(e.target.value)}
                                        required
                                        size="small"
                                    />
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Member Group</label>
                                    <TextField
                                        value={memberGroup}
                                        onChange={(e) => setMemberGroup(e.target.value)}
                                        required
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Is member</label>
                                    <Checkbox
                                                checked={isMember}
                                                onChange={(e) => setIsMember(e.target.checked)}
                                            />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Is Active</label>
                                    <Checkbox
                                                checked={isActive}
                                                onChange={(e) => setIsActive(e.target.checked)}
                                            />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Position No</label>
                                    <TextField
                                        value={positionNo}
                                        onChange={(e) => setPositionNo(e.target.value)}                               
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Is Billwise</label>
                                    <Checkbox
                                                checked={isBillwise}
                                                onChange={(e) => setIsBillwise(e.target.checked)}
                                            />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Wing Name</label>
                                    <TextField
                                        value={wingName}
                                        onChange={(e) => setWingName(e.target.value)}                 
                                        required
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Floor</label>
                                    <TextField
                                        value={floor}
                                        onChange={(e) => setFloor(e.target.value)}
                                        required
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Unit Member</label>
                                    <TextField
                                        value={unitMember}
                                        onChange={(e) => setUnitMember(e.target.value)}                   
                                        required
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Unit Type</label>
                                    <TextField
                                        value={unitType}
                                        onChange={(e) => setUnitType(e.target.value)}               
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Parent Type</label>
                                    <TextField
                                        value={parentType}
                                        onChange={(e) => setParentType(e.target.value)}                   
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Unit Area</label>
                                    <TextField
                                        value={unitArea}
                                        onChange={(e) => setUnitArea(e.target.value)}                 
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>UOM</label>
                                    <TextField
                                        value={uom}
                                        onChange={(e) => setUom(e.target.value)}
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Construction Cost</label>
                                    <TextField
                                        value={constructionCost}
                                        onChange={(e) => setConstructionCost(e.target.value)}            
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Charges Template</label>
                                    <TextField
                                        value={chargesTemplate}
                                        onChange={(e) => setChargesTemplate(e.target.value)}                   
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Tenant Charges Template</label>
                                    <TextField
                                        value={tenantChargesTemplate}
                                        onChange={(e) => setTenantChargesTemplate(e.target.value)}                    
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Supplementry Charges Template</label>
                                    <TextField
                                        value={supplementaryChargesTemplate}
                                        onChange={(e) => setSupplementaryChargesTemplate(e.target.value)}            
                                        size="small"
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    )}

                    {activeTab === 1 && (
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Owner Type</label>
                                    <TextField
                                        value={ownerType}
                                        onChange={(e) => setOwnerType(e.target.value)}               
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Member Class</label>
                                    <TextField
                                        value={memberClass}
                                        onChange={(e) => setMemberClass(e.target.value)}        
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Is Tenant Details</label>
                                    <Checkbox
                                                checked={isTenantDetails}
                                                onChange={(e) => setIsTenantDetails(e.target.checked)}
                                            />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Is Parking Details</label>
                                    <Checkbox
                                                checked={isParkingDetails}
                                                onChange={(e) => setIsParkingDetails(e.target.checked)}
                                            />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Is Member Charges</label>
                                    <Checkbox
                                                checked={isMemberCharges}
                                                onChange={(e) => setIsMemberCharges(e.target.checked)}
                                            />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Updated Member Name</label>
                                    <TextField
                                        value={updatedMemberName}
                                        onChange={(e) => setUpdatedMemberName(e.target.value)}                  
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Mailing Name</label>
                                    <TextField
                                        value={mailingName}
                                        onChange={(e) => setMailingName(e.target.value)}
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Country</label>
                                    <Select
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        size="small"
                                        style={{ width: '230px' }}
                                    >   {loading ? (
                                                <MenuItem value="">Loading...</MenuItem>
                                              ) : error ? (
                                                <MenuItem value="">{error}</MenuItem>
                                              ) : (
                                                countryOptions.map((option, index) => (
                                                    <MenuItem key={index} value={option.Name}>{option.Name}</MenuItem>  // Use StateName as the value
                                                ))
                                              )}</Select>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>State</label>
                                    <Select
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        size="small"
                                        style={{ width: '230px' }}
                            >
                                           {loading ? (
                                                    <MenuItem value="">Loading...</MenuItem>
                                                  ) : error ? (
                                                    <MenuItem value="">{error}</MenuItem>
                                                  ) : (
                                                    stateOptions.map((option, index) => (
                                                        <MenuItem key={index} value={option.StateName}>{option.StateName}</MenuItem>  // Use StateName as the value
                                                    ))
                                                  )}</Select>
                                    
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>PIN</label>
                                    <TextField
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Contact Reason</label>
                                    <TextField
                                        value={contactReason}
                                        onChange={(e) => setContactReason(e.target.value)}
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Phone No</label>
                                    <TextField
                                        value={phoneNo}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Mobile</label>
                                    <TextField
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Email</label>
                                    <TextField
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Is Interest</label>
                                    <Checkbox
                                                checked={isInterest}
                                                onChange={(e) => setIsInterest(e.target.checked)}
                                            />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>PAN</label>
                                    <TextField
                                        value={pan}
                                        onChange={(e) => setPan(e.target.value)}
                                        size="small"
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    )}

                    {activeTab === 2 && (
                        <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>GST Registration On Type</label>
                                    <TextField
                                        value={gstRegistrationOnType}
                                        onChange={(e) => setGstRegistrationOnType(e.target.value)}
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>GSTIN</label>
                                    <TextField
                                        value={gstin}
                                        onChange={(e) => setGstin(e.target.value)}
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Is Assessee other Territory</label>
                                    <Checkbox
                                                checked={isAssesseeOtherTerritory}
                                                onChange={(e) => setIsAssesseeOtherTerritory(e.target.checked)}
                                            />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Is E-Commerce</label>
                                    <Checkbox
                                                checked={isEcommerce}
                                                onChange={(e) => setIsEcommerce(e.target.checked)}
                                            />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Is Deemed Export</label>
                                    <Checkbox
                                                checked={isDeemedExport}
                                                onChange={(e) => setIsDeemedExport(e.target.checked)}
                                            />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Party Type</label>
                                    <TextField
                                        value={partyType}
                                        onChange={(e) => setPartyType(e.target.value)}
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Is Transporter</label>
                                    <Checkbox
                                                checked={isTransporter}
                                                onChange={(e) => setIsTransporter(e.target.checked)}
                                            />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Date Of Admission</label>
                                    <TextField
                                    type='date'
                                        value={dateOfAdmission}
                                        onChange={(e) => setDateOfAdmission(e.target.value)}
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Date Of Entrance Fee Payment</label>
                                    <TextField
                                    type='date'
                                        value={dateOfEntranceFeePayment}
                                        onChange={(e) => setDateOfEntranceFeePayment(e.target.value)}
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Full Name</label>
                                    <TextField
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}                  
                                        required
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Occupation</label>
                                    <TextField
                                        value={occupation}
                                        onChange={(e) => setOccupation(e.target.value)}                
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Age</label>
                                    <TextField
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}                
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Name Of Nominee</label>
                                    <TextField
                                        value={nameOfNominee}
                                        onChange={(e) => setNameOfNominee(e.target.value)}                
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Date Of Nominee</label>
                                    <TextField
                                    type='date'
                                        value={dateOfNomination}
                                        onChange={(e) => setDateOfNomination(e.target.value)}                
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Date Of Cessation Of Membership</label>
                                    <TextField
                                    type='date'
                                        value={dateOfCessationOfMembership}
                                        onChange={(e) => setDateOfCessationOfMembership(e.target.value)}                
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Reason Of Cessation</label>
                                    <TextField
                                        value={reasonOfCessation}
                                        onChange={(e) => setReasonOfCessation(e.target.value)}                
                                        size="small"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Remark</label>
                                    <TextField
                                        value={remark}
                                        onChange={(e) => setRemark(e.target.value)}                
                                        size="small"
                                        multiline
                                        row={4}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    )}

<div className="button-group-bottom">
    {activeTab === 2 ? (
        <>
            <button className="submit" type="submit"
            onClick={editingIndex !== null ? handleUpdate : handleSubmit}
            >
              {editingIndex !== null ? 'Update' : 'Save'}
            </button>
            {/* Close Button */}
            <button
                type="button"
                className="cancel"
                onClick={() => { resetFields(); setShowMembernew(false); }}   // Close the form when clicked
            >
                Close
            </button>
        </>
    ) : (
        <Button
            variant="contained"
            onClick={() => setActiveTab(activeTab + 1)}
        >
            Next
        </Button>
    )}
</div>
                </form>
           </div>
            )}
             {!showmembernew && (
          <Paper style={{ marginTop: '20px', padding: '10px', maxWidth: '1000px', margin: '0 auto' }}>
          <MaterialReactTable
              columns={columns}  // The columns you defined earlier
              data={MemberData}
          />
      </Paper>   
           )}
             <ToastContainer />
        </div>
    );
};

export default Membernew;
