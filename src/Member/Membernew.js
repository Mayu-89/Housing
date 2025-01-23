import React, { useState,useEffect } from 'react';
import {Tab, Tabs, TextField, Grid, Checkbox, Button, Select, MenuItem ,Paper} from '@mui/material';
import './membernew.css'; // Same CSS file for consistent styling
import { ToastContainer } from 'react-toastify';
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
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., API call)
        console.log('Form submitted with data:', {
            printName,
            memberGroup,
            isMember,
            isActive,
            positionNo,
            // Add all other states here as needed
        });
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
                    {/* <Button onClick={() => handleEdit(row.index)} color="primary" variant="contained">Edit</Button>
                    <Button onClick={() => handleDelete(row.index)} color="secondary" variant="contained">Delete</Button> */}
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
            <ToastContainer />
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
            <button className="submit" type="submit">
                Save
            </button>
            {/* Close Button */}
            <button
                type="button"
                className="cancel"
                onClick={() => setShowMembernew(false)}  // Close the form when clicked
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
        </div>
    );
};

export default Membernew;
