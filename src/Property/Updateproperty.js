import React, { useState,useEffect } from 'react';
import { Button, TextField, Grid,Select, MenuItem,Paper,Typography } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { toast,ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import './updateproperty.css';

const Updateproperty = () => {
  // State for form visibility
  const [showStructure, setShowStructure] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);  // To manage loading state
  const [error, setError] = useState(null);      // To manage errors

  // State for each form field
  const [noOfUnits, setNoOfUnits] = useState(250);
  const [noOfWings, setNoOfWings] = useState(3);
  const [nameOfWing, setNameOfWing] = useState();
  const [typeOfUnit, setTypeOfUnit] = useState('');
  const [unitOfMeasurement, setUnitOfMeasurement] = useState('');
 
  const [tableData, setTableData] = useState([]); // State to store table data

  // Option lists for comboboxes
  const typeOfUnitOptions = ['Flat', 'Office', 'Shop']; 
  const unitOfMeasurementOptions = ['Sqft', 'Sqm']; 
  const [selectedId, setSelectedId] = useState(null);


  const [editIndex, setEditIndex] = useState(null); // Track the current property being edited
  const [propertyData, setPropertyData] = useState([]);

  // State for each form field under showForm
  const [landAuthority, setLandAuthority] = useState('');
  const [leaseDeedExecuted, setLeaseDeedExecuted] = useState('');
  const [leasePeriod, setLeasePeriod] = useState('');
  const [leaseRentPremiumRs, setLeaseRentPremiumRs] = useState('');
  const [ctsNo, setCtsNo] = useState('');
  const [village, setVillage] = useState('');
  const [plotNo, setPlotNo] = useState('');
  const [plotArea, setPlotArea] = useState('');
  const [onEast, setonEast] = useState('');
  const [onWest, setonWest] = useState('');
  const [onNorth, setonNorth] = useState('');
  const [onSouth, setonSouth] = useState('');
  const [conveyanceDeed, setConveyanceDeed] = useState('');
  const [nonAgriculturalTax, setNonAgriculturalTax] = useState('');
  const [naTaxPremiumRs, setNaTaxPremiumRs] = useState('');
  const [propertyTaxAuthority, setPropertyTaxAuthority] = useState('');
  const [propertyTaxNo, setPropertyTaxNo] = useState('');
  const [propertyTaxPremiumGSTINBills, setPropertyTaxPremiumGSTINBills] = useState('');
  const [waterSupplyAuthority, setWaterSupplyAuthority] = useState('');
  const [noOfWaterConnections, setNoOfWaterConnections] = useState('');
  const [waterConnectionNo, setWaterConnectionNo] = useState('');
  const [waterBillGenerationDatesGSTINBills, setWaterBillGenerationDatesGSTINBills] = useState('');
  const [electricitySupplyServiceProvider, setElectricitySupplyServiceProvider] = useState('');
  const [noOfElectricityConnections, setNoOfElectricityConnections] = useState('');
  const [electricityConnectionNo, setElectricityConnectionNo] = useState('');
  const [electricityBillGenerationDatesGSTINBills, setElectricityBillGenerationDatesGSTINBills] = useState('');

  // Option lists for combo boxes
  const leaseDeedExecutedOptions = ['Yes', 'No'];
  const conveyanceDeedOptions = ['Yes', 'No'];

   // State for options to populate dropdowns
   const [landAuthorityOptions, setLandAuthorityOptions] = useState([]);
   const [waterSupplyAuthorityOptions, setWaterSupplyAuthorityOptions] = useState([]);
   const [electricitySupplyServiceProviderOptions, setElectricitySupplyServiceProviderOptions] = useState([]);
   const [propertyTaxAuthorityOptions, setPropertyTaxAuthorityOptions] = useState([]);
 
 // Function to fetch data for each dropdown
 const fetchOptions = async (tableName, setter) => {
  setLoading(true);
  setError('');
  try {
    const response = await fetch(`https://weaveitapp.microtechsolutions.co.in/api/housing/Get/gettable.php?Table=${tableName}`, {
      method: 'GET', // Specify the method as GET
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',  // Content-Type header
        'X-API-KEY': 'f4e3d2c1b0a9g8h7i6j5',  // API key for authentication
      },
    });

    const data = await response.json(); // Parse the JSON response
    setter(data); // Update the state with the fetched data
  } catch (err) {
    setError(`Failed to load data for ${tableName}`);
  } finally {
    setLoading(false);
  }
};

// Fetch data when component mounts
useEffect(() => {
  fetchData();
  fetchOptions('LandAuthority', setLandAuthorityOptions);
  fetchOptions('WaterSupplyAuthority', setWaterSupplyAuthorityOptions);
  fetchOptions('ElectricitySupply', setElectricitySupplyServiceProviderOptions);
  fetchOptions('PropertyTaxAuthority', setPropertyTaxAuthorityOptions);
}, []);

  const [registrationNo, setRegistrationNo] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const [cregistrationNo, setcRegistrationNo] = useState('');
  const [cregistrationDate, setcRegistrationDate] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [landConveyanceName, setLandConveyanceName] = useState('');

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };
  // handle form submission (dummy function for now)
  const handleFilter = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    toast.success('Form submitted successfully!');
  };
  // Function to close the form
  const closeForm = () => {
    setShowStructure(false);
    setShowForm(false);
  };



  // Reset form fields
  const resetForm = () => {
    setLandAuthority('');
    setLeaseDeedExecuted('');
    setLeasePeriod('');
    setLeaseRentPremiumRs('');
    setCtsNo('');
    setVillage('');
    setPlotNo('');
    setPlotArea('');
    setonEast('');
    setonWest('');
    setonNorth('');
    setonSouth('');
    setPropertyTaxPremiumGSTINBills('');
    setWaterBillGenerationDatesGSTINBills('');
    setElectricitySupplyServiceProvider('');
    setElectricityBillGenerationDatesGSTINBills('');
    setEditIndex(null); // Reset the edit index
  };

 
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://weaveitapp.microtechsolutions.co.in/api/housing/Get/gettable.php?Table=PropertyStructure', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-API-KEY': 'f4e3d2c1b0a9g8h7i6j5',
        },
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setTableData(data); // Store fetched data in state
    } catch (error) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };
 // Handle form submission (Save or Update)
 const handleSaveStructure = async (e) => {
  e.preventDefault();
  const formData = new URLSearchParams();
  formData.append('NoOfUnits', noOfUnits);
  formData.append('NoOfWings', noOfWings);
  formData.append('NameOfWing', nameOfWing);
  formData.append('TypeOfUnit', typeOfUnit);
  formData.append('UnitOfMeasurement', unitOfMeasurement);

  try {
    const response = await fetch('https://weaveitapp.microtechsolutions.co.in/api/housing/Post/postpropertystructure.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-API-KEY': 'f4e3d2c1b0a9g8h7i6j5',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    const result = await response.json();
    console.log('Save result:', result);

    toast.success('Structure saved successfully!');
    setShowStructure(false); // Close the form after saving
    fetchData(); // Refresh the data after saving

  } catch (error) {
    toast.error('Error: ' + error.message);
  }
  resetStructureForm(); // Reset the form
};

// Update function to modify an existing record based on Id
const handleUpdateStructure = async (e) => {
  e.preventDefault();

  if (!selectedId) {
    toast.error('No ID selected for update.');
    return;
  }

  // Log the data to check what is being sent
  console.log('Updating data with ID:', selectedId);

  // Prepare form data
  const formData = new URLSearchParams();
  formData.append('Id', selectedId);
  formData.append('NoOfUnits', noOfUnits);
  formData.append('NoOfWings', noOfWings);
  formData.append('NameOfWing', nameOfWing);
  formData.append('TypeOfUnit', typeOfUnit);
  formData.append('UnitOfMeasurement', unitOfMeasurement);

  try {
    const response = await fetch('https://weaveitapp.microtechsolutions.co.in/api/housing/Update/updatepropertystructure.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-API-KEY': 'f4e3d2c1b0a9g8h7i6j5',
      },
      body: formData,
    });

    // Check if response is successful
    if (!response.ok) {
      throw new Error('Request failed');
    }

    // Check content type of the response
    const contentType = response.headers.get("Content-Type");

    let result;
    if (contentType && contentType.includes("application/json")) {
      // Parse the response as JSON if the content type is JSON
      result = await response.json();
    } else {
      // Otherwise, handle it as text
      result = await response.text();
    }

    console.log('Update Result:', result);

    // Check if the result contains a success message (assuming it's a string like 'Value Updated Successfully')
    if (typeof result === 'string' && result.includes('Value Updated Successfully')) {
      toast.success('Structure updated successfully!');
    } else if (result && result.success) {
      // If the response is JSON with a success property
      toast.success('Structure updated successfully!');
    } else {
      toast.error('Failed to update structure');
    }

    setShowStructure(false);
    setSelectedId(null); // Clear selectedId after update
    fetchData(); // Refresh data after updating
  } catch (error) {
    console.error('Update error:', error);
    toast.error('Error: ' + error.message);
  }
  resetStructureForm();
};


const handleStructureEdit = (index) => {
  const selectedRecord = tableData[index];
  setSelectedId(selectedRecord.Id);
  setNameOfWing(selectedRecord.NameOfWing);
  setNoOfUnits(selectedRecord.NoOfUnits);
  setNoOfWings(selectedRecord.NoOfWings);
  setTypeOfUnit(selectedRecord.TypeOfUnit);
  setUnitOfMeasurement(selectedRecord.UnitOfMeasurement);
  setShowStructure(true);
};

// Delete function with proper handling of unexpected token
const handleStructureDelete = async (index) => {
  const id = tableData[index].Id;
  try {
    const response = await fetch(
      `https://weaveitapp.microtechsolutions.co.in/api/housing/Delete/delrecord.php?Id=${id}&Table=PropertyStructure`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-API-KEY': 'f4e3d2c1b0a9g8h7i6j5',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete structure');
    }

    const result = await response.text(); // Expecting plain text response
    if (result === 'Value Deleted') {
      toast.success('Structure deleted successfully!');
    } else {
      throw new Error('Unexpected response');
    }

    fetchData(); // Refresh data after deletion
  } catch (error) {
    toast.error('Error: ' + error.message);
  }
};

const resetStructureForm = () => {
  // setNoOfUnits('');
  // setNoOfWings('');
  setNameOfWing('');
  setTypeOfUnit('');
  setUnitOfMeasurement('');
  setSelectedId(null);
};


  const columns = [
    { accessorKey: 'Id', header: 'Id' },
    { accessorKey: 'NoOfUnits', header: 'No Of Units' },
    { accessorKey: 'NoOfWings', header: 'No Of Wings' },
    { accessorKey: 'NameOfWing', header: 'Name Of Wing' },
    { accessorKey: 'TypeOfUnit', header: 'Type Of Unit' },
    { accessorKey: 'UnitOfMeasurement', header: 'Unit Of Measurement' },
    {
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleStructureEdit(row.index)}
          >
            Edit
          </Button>
          <Button
             variant="contained"
             color="secondary"
            onClick={() => handleStructureDelete(row.index)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="structure-container">
      {!showForm && !showStructure && (
        <h1 style={{ textAlign: 'left', marginTop: '10px', marginBottom: '40px' }}>Property</h1>
      )}

      <div className="button-group-front-structure">
        {!showForm && !showStructure && (
          <>
            <Button 
              onClick={() => setShowStructure(true)} 
              sx={{ backgroundColor: '#6E85A4', marginRight:'5px', color:'white' }} 
            >
              Structure Details
            </Button>
            <Button 
              onClick={() => setShowForm(true)}  
              sx={{ backgroundColor: '#6E85A4', color:'white' }} 
            >
              Property Details
            </Button>
          </>
        )}
      </div>

      {/* Structure Details Form */}
      <ToastContainer />
      {showStructure && (
      <form onSubmit={selectedId ? handleUpdateStructure : handleSaveStructure} className="structure-form">
           <h3>{selectedId ? 'Edit Structure Details' : 'New Structure Details'}</h3>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <div className="input-group">
                <label>No Of Units</label>                         
                <TextField
  size="small"
  value={noOfUnits}
  onChange={(e) => setNoOfUnits(e.target.value)}
  InputProps={{
    readOnly: true, // Making the field read-only
    style: {
      backgroundColor: '#f0f0f0', // Light grey background for the read-only field
      color: '#6e6e6e', // Text color (grayish)
    },
  }}
/>
              </div>
            </Grid>
            <Grid item xs={12} sm={8}>
              <div className="input-group">
                <label>No Of Wings</label>
                <TextField
  size="small"
  value={noOfWings}
  onChange={(e) => setNoOfWings(e.target.value)}
  InputProps={{
    readOnly: true, // Making the field read-only
    style: {
      backgroundColor: '#f0f0f0', // Light grey background for the read-only field
      color: '#6e6e6e', // Text color (grayish)
    },
  }}
/>
              </div>
            </Grid>    
            <Grid item xs={12} sm={8}>
              <div className="input-group">
                <label>Name Of Wing</label>
                <TextField
                  size="small"
                  value={nameOfWing}
                  onChange={(e) => setNameOfWing(e.target.value)}
                />
              </div>
            </Grid>

            {/* Type Of Unit */}
            <Grid item xs={12} sm={8}>
              <div className="input-group">
                <label>Type Of Unit</label>
                <select
                  value={typeOfUnit}
                  onChange={(e) => setTypeOfUnit(e.target.value)}
                  className="input-select"
                >
                  <option value="">Select Unit Type</option>
                  {typeOfUnitOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </Grid>

            {/* Unit Of Measurement of Flat Area */}
            <Grid item xs={12} sm={8}>
              <div className="input-group">
                <label>Unit Of Measurement of Flat Area</label>
                <select
                  value={unitOfMeasurement}
                  onChange={(e) => setUnitOfMeasurement(e.target.value)}
                  className="input-select"
                >
                  <option value="">Select Unit</option>
                  {unitOfMeasurementOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </Grid>
          </Grid>
          <div className="button-group-bottom">
            <button type="submit" className="submit">  {selectedId ? 'Update' : 'Save'} </button>
            <button type="button" onClick={closeForm} className="cancel">Close</button>
          </div>
        </form>
      )}
{/* property details form */}
{showForm && (
        <form  className="property-form">
          <h3 style={{ textAlign: 'center', marginBottom: '30px', marginTop: '0px' }}>Property Details</h3>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
          <div className="input-group">
        <label>Land Authority</label>
        <Select
          value={landAuthority}
          onChange={(e) => setLandAuthority(e.target.value)}
          className="input-select"
          disabled={loading}
        >
          {loading ? (
            <MenuItem value="">Loading...</MenuItem>
          ) : error ? (
            <MenuItem value="">{error}</MenuItem>
          ) : (
            landAuthorityOptions.map((option, index) => (
              <MenuItem key={index} value={option.Id}>{option.AuthorityName}</MenuItem>
            ))
          )}
        </Select>
      </div>
            </Grid>
              {/* Lease Deed Executed */}
              {landAuthority !== 'Free Hold' && (
              <Grid item xs={12} sm={6}>
                <div className="input-group">
                  <label>Lease Deed Executed</label>
                    <Select
                      value={leaseDeedExecuted}
                      onChange={(e) => setLeaseDeedExecuted(e.target.value)}
                       className="input-select"
                    >
                      {leaseDeedExecutedOptions.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                </div>
              </Grid>
            )}
                {/* Conditional rendering based on the "Yes" selection */}
            {leaseDeedExecuted === 'Yes' && (
        <>
          <Grid item xs={12} sm={6}>
            <div className="input-group">
              <label>Registration No</label>
              <TextField
                value={registrationNo}
                onChange={(e) => setRegistrationNo(e.target.value)}
                size="small"
                variant="outlined"
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className="input-group">
              <label>Registration Date</label>
              <TextField
                type="date"
                value={registrationDate}
                onChange={(e) => setRegistrationDate(e.target.value)}
                size="small"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className="input-group">
              <label>Attach PDF Document</label>
              <div className="custom-file-upload">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfChange}
                  id="file-upload"
                  className="file-upload-input"
                />
                <label htmlFor="file-upload" className="file-upload-label">
  {pdfFile ? pdfFile.name : 'Choose File'}
</label>

              </div>
            </div>
          </Grid>
          </>
      )}
 <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>Lease Period</label>
                <TextField
                  size="small"
                  value={leasePeriod}
                  onChange={(e) => setLeasePeriod(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>Lease Rent Premium Rs</label>
                <TextField
                  size="small"
                  value={leaseRentPremiumRs}
                  onChange={(e) => setLeaseRentPremiumRs(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>CTS No</label>
                <TextField
                  size="small"
                  value={ctsNo}
                  onChange={(e) => setCtsNo(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>Village</label>
                <TextField
                  size="small"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>Plot No</label>
                <TextField
                  size="small"
                  value={plotNo}
                  onChange={(e) => setPlotNo(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>Plot Area</label>
                <TextField
                  size="small"
                  value={plotArea}
                  onChange={(e) => setPlotArea(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={8}>
            <label style={{ fontWeight: 'bold', color: 'red', fontSize: '18px', marginBottom: '8px' }}>Boundary Details</label>
</Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>On East</label>
                  <TextField
                    size="small"
                    value={onEast}
                    onChange={(e) => setonEast(e.target.value )}
                  />
                  </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>On West</label>
                  <TextField
                    size="small"
                    value={onWest}
                    onChange={(e) =>setonWest(e.target.value )}
                  />
                  </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>On North</label>
                  <TextField
                    size="small"
                    value={onNorth}
                    onChange={(e) =>setonNorth(e.target.value )}
                  />
                  </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>On South</label>
                  <TextField
                    size="small"
                    value={onSouth}
                    onChange={(e) => setonSouth(e.target.value )}
                  />
                </div>
                </Grid>
            {/* Conveyance Deed */}
            <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>Conveyance Deed in Favour of Society</label>             
                  <Select
                  size="small"
                    value={conveyanceDeed}
                    onChange={(e) => setConveyanceDeed(e.target.value)}
                     className="input-select"
                  >
                    {conveyanceDeedOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
              </div>
            </Grid>

             {/* Conditional rendering based on the "Yes" or "No" selection */}
      {conveyanceDeed === 'Yes' && (
        <>
          <Grid item xs={12} sm={6}>
            <div className="input-group">
              <label>Registration No</label>
              <TextField
                value={cregistrationNo}
                onChange={(e) => setcRegistrationNo(e.target.value)}
                size="small"
                variant="outlined"
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className="input-group">
              <label>Registration Date</label>
              <TextField
                type="date"
                value={cregistrationDate}
                onChange={(e) => setcRegistrationDate(e.target.value)}
                size="small"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </Grid>
        </>
      )}

      {conveyanceDeed === 'No' && (
        <Grid item xs={12} sm={6}>
          <div className="input-group">
            <label>Land Conveyance in the Name of</label>
            <TextField
              value={landConveyanceName}
              onChange={(e) => setLandConveyanceName(e.target.value)}
              size="small"
              variant="outlined"
            />
          </div>
        </Grid>
      )}
            <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>Non Agricultural Tax</label>
                <TextField
                  size="small"
                  value={nonAgriculturalTax}
                  onChange={(e) => setNonAgriculturalTax(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>NA Tax Premium Rs</label>
                <TextField
                  size="small"
                  value={naTaxPremiumRs}
                  onChange={(e) => setNaTaxPremiumRs(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-group">
              <label>Property Tax Authority</label>
        <Select
          value={propertyTaxAuthority}
          onChange={(e) => setPropertyTaxAuthority(e.target.value)}
          className="input-select"
          disabled={loading}
        >
          {loading ? (
            <MenuItem value="">Loading...</MenuItem>
          ) : error ? (
            <MenuItem value="">{error}</MenuItem>
          ) : (
            propertyTaxAuthorityOptions.map((option, index) => (
              <MenuItem key={index} value={option.Id}>{option.AuthorityName}</MenuItem>
            ))
          )}
        </Select>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>Property Tax No</label>
                <TextField
                  size="small"
                  value={propertyTaxNo}
                  onChange={(e) => setPropertyTaxNo(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>Property Tax Premium GSTIN Bills</label>
                  <Select
                    value={propertyTaxPremiumGSTINBills}
                    onChange={(e) => setPropertyTaxPremiumGSTINBills(e.target.value)}
                  className="input-select"
                 >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
            <div className="input-group">
        <label>Water Supply Authority</label>
        <Select
          value={waterSupplyAuthority}
          onChange={(e) => setWaterSupplyAuthority(e.target.value)}
          className="input-select"
          disabled={loading}
        >
          {loading ? (
            <MenuItem value="">Loading...</MenuItem>
          ) : error ? (
            <MenuItem value="">{error}</MenuItem>
          ) : (
            waterSupplyAuthorityOptions.map((option, index) => (
              <MenuItem key={index} value={option.Id}>{option.AuthorityName}</MenuItem>
            ))
          )}
        </Select>
      </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>No of Water Connections</label>
                  <Select
                    value={noOfWaterConnections}
                    onChange={(e) => setNoOfWaterConnections(e.target.value)}
                     className="input-select"
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                  </Select>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>Water Connection No</label>
                <TextField
                  size="small"
                  value={waterConnectionNo}
                  onChange={(e) => setWaterConnectionNo(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>Water Bill Generation Dates</label>
                <TextField
                  size="small"
                  value={waterBillGenerationDatesGSTINBills}
                  onChange={(e) => setWaterBillGenerationDatesGSTINBills(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>Electricity Supply Service Provider</label>
                <Select
          value={electricitySupplyServiceProvider}
          onChange={(e) => setElectricitySupplyServiceProvider(e.target.value)}
          className="input-select"
          disabled={loading}
        >
          {loading ? (
            <MenuItem value="">Loading...</MenuItem>
          ) : error ? (
            <MenuItem value="">{error}</MenuItem>
          ) : (
            electricitySupplyServiceProviderOptions.map((option, index) => (
              <MenuItem key={index} value={option.Id}>{option.SupplierName}</MenuItem>
            ))
          )}
        </Select>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label> No Electricity Connection </label>
                <TextField
                  size="small"
                  value={electricityConnectionNo}
                  onChange={(e) => setElectricityConnectionNo(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label> Water Connection No </label>
                <TextField
                  size="small"
                  value={waterConnectionNo}
                  onChange={(e) => setWaterConnectionNo(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-group">
                <label>Water Bill Generation Dates GSTIN Bills</label>
                <TextField
                  size="small"
                  value={waterBillGenerationDatesGSTINBills}
                  onChange={(e) => setWaterBillGenerationDatesGSTINBills(e.target.value)}
                />
              </div>
            </Grid>
          </Grid>
          <div className="button-group-bottom">
          <button
              type="button"
              className="submit"
              // onClick={editIndex === null ? handleSave : handleUpdate}
            >
              {/* {editIndex === null ? 'Save' : 'Update'} */}
            </button>
            <button type="button" onClick={closeForm} className="cancel">Close</button>
          </div>
        </form>
      )}
      {!showForm && !showStructure &&  (
   <Paper style={{ marginTop: '20px', padding: '10px', maxWidth: '1000px', margin: '0 auto' }}>
<MaterialReactTable
          data={tableData} // Make sure this is correctly bound to the state
          columns={columns}
          muiTableHeadCellProps={{
            style: {
              backgroundColor: '#E9ECEF',
              color: 'black',
              fontSize: '14px',
            },
          }}
        />
        </Paper>
)}
{!showForm && !showStructure && (
   <Paper style={{ marginTop: '20px', padding: '10px', maxWidth: '1000px', margin: '0 auto' }}>
        <MaterialReactTable
          columns={[
            { accessorKey: 'srNo', header: 'SR No.' },
            { accessorKey: 'landAuthority', header: 'Land Authority' },
            { accessorKey: 'leaseDeedExecuted', header: 'Lease Deed Executed' },
            { accessorKey: 'leasePeriod', header: 'Lease Period' },
            { accessorKey: 'leaseRentPremiumRs', header: 'Lease Rent Premium (Rs)' },
            { accessorKey: 'ctsNo', header: 'CTS No.' },
            { accessorKey: 'village', header: 'Village' },
            { accessorKey: 'plotNo', header: 'Plot No.' },
            { accessorKey: 'plotArea', header: 'Plot Area' },
            { accessorKey: 'onEast', header: 'Boundary East' },
            { accessorKey: 'onWest', header: 'Boundary West' },
            { accessorKey: 'onNorth', header: 'Boundary North' },
            { accessorKey: 'onSouth', header: 'Boundary South' },
            { accessorKey: 'propertyTaxPremiumGSTINBills', header: 'Property Tax Premium GSTIN Bills' },
            { accessorKey: 'waterBillGenerationDatesGSTINBills', header: 'Water Bill Generation Dates' },
            { accessorKey: 'electricitySupplyServiceProvider', header: 'Electricity Supply Service Provider' },
            { accessorKey: 'electricityBillGenerationDatesGSTINBills', header: 'Electricity Bill Generation Dates' },
            {
              accessorKey: 'actions',
              header: 'Actions',
              Cell: ({ row }) => (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    // onClick={() => handleEdit(row.index)}
                    style={{ marginRight: '10px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    // onClick={() => handleDelete(row.index)}
                  >
                    Delete
                  </Button>
                </div>
              ),
            },
          ]}
          data={propertyData} // Make sure this is correctly bound to the state
          muiTableHeadCellProps={{
            style: {
              backgroundColor: '#E9ECEF',
              color: 'black',
              fontSize: '14px',
            },
          }}
        /></Paper>   
)}
      </div>
  );
};

export default Updateproperty;
