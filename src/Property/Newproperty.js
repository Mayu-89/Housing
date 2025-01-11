import React, { useState } from 'react';
import { Button, TextField, Grid, Select, MenuItem } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import './property.css';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const Newproperty = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]); // State for filtered properties
    const [showForm, setShowForm] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [showProperty, setShowProperty] = useState(false);
    const [showUnassignProperty, setShowUnassignProperty] = useState(false);

    // State for each field
    const [propertyType, setPropertyType] = useState('');
    const [buildingName, setBuildingName] = useState('');
    const [description, setDescription] = useState('');
    const [remarks, setRemarks] = useState('');
    const [citySurveyNumber, setCitySurveyNumber] = useState('');
    const [areaSurveyMeter, setAreaSurveyMeter] = useState('');
    const [onEast, setOnEast] = useState('');
    const [onWest, setOnWest] = useState('');
    const [onNorth, setOnNorth] = useState('');
    const [onSouth, setOnSouth] = useState('');
        const [name, setName] = useState('');
        const [pointFrom, setPointFrom] = useState('');
        const [pointTo, setPointTo] = useState('');
        const [remark, setRemark] = useState('');
        const [lengthMeter, setLengthMeter] = useState('');
        const [descriptionproperty, setdescription] = useState('');
        const [oneast, setOneast] = useState('');
        const [onwest, setOnwest] = useState('');
        const [onnorth, setOnnorth] = useState('');
        const [onsouth, setOnsouth] = useState('');
        const [property, setProperty] = useState('');
        const [resolutionTo, setResolutionTo] = useState('');
        const [dateTo, setDateTo] = useState('');
        const [propertyName, setPropertyName] = useState('');
        const [citySurvey, setCitySurvey] = useState('');
        const [areaSquareMeter, setAreaSquareMeter] = useState('');
    // Filter states
    const [filterBuildingName, setFilterBuildingName] = useState('');
    const [filterDescription, setFilterDescription] = useState('');
    const [filterCitySurveyNumber, setFilterCitySurveyNumber] = useState('');
    const [filterAreaSurveyMeter, setFilterAreaSurveyMeter] = useState('');

    const handleSearch = (propertyData) => {
        console.log("Property Data submitted:", propertyData);
        // You can handle the form data here, e.g., make an API call or filter local data
    };

 // Handle property form submission
 const handlePropertySearch = (e) => {
    e.preventDefault();

    if (editingIndex === null) {
        // Add new property
        const newProperty = {
            srNo: properties.length + 1,
            name,
            pointFrom,
            pointTo,
            descriptionproperty,
            remark,
            lengthMeter,
            oneast,
            onwest,
            onnorth,
            onsouth,
        };

        setProperties([...properties, newProperty]);

        // Show toast notification for adding a new property
        toast.success(' property saved successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } else {
        // Update existing property
        const updatedProperties = [...properties];
        updatedProperties[editingIndex] = {
            srNo: updatedProperties[editingIndex].srNo,
            name,
            pointFrom,
            pointTo,
            descriptionproperty,
            remark,
            lengthMeter,
            oneast,
            onwest,
            onnorth,
            onsouth,
        };
        setProperties(updatedProperties);
        setEditingIndex(null); // Reset editing state after update

        // Show toast notification for updating the property
        toast.success('Property form updated successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    resetFields();
    setShowProperty(false);
    setShowForm(true);
};


    const handleSubmit = (e) => {
        e.preventDefault();
        const newProperty = {
            srNo: properties.length + 1,
            propertyType,
            buildingName,
            description,
            remarks,
            citySurveyNumber,
            areaSurveyMeter,
            onEast,
            onWest,
            onNorth,
            onSouth,
        };

        if (editingIndex !== null) {
            const updatedProperties = [...properties];
            updatedProperties[editingIndex] = { ...newProperty, srNo: editingIndex + 1 };
            setProperties(updatedProperties);
            // Show success toast notification 
    toast.success('Property form updated successfully!', {
    position: "top-right", 
    autoClose: 3000, 
    hideProgressBar: false,
     closeOnClick: true, 
     pauseOnHover: true, 
     draggable: true, progress:
      undefined, 
   });
            
        } else {
            setProperties([...properties, newProperty]);
            // Show success toast notification 
toast.success('Property form saved successfully!', {
    position: "top-right", 
    autoClose: 3000, 
    hideProgressBar: false,
     closeOnClick: true, 
     pauseOnHover: true, 
     draggable: true, progress:
      undefined, 
   });
        }

        resetFields();
        setShowForm(false);
    };

    const resetFields = () => {
        setPropertyType('');
        setBuildingName('');
        setDescription('');
        setRemarks('');
        setCitySurveyNumber('');
        setAreaSurveyMeter('');
        setOnEast('');
        setOnWest('');
        setOnNorth('');
        setOnSouth('');
        setdescription('');
        setOneast('');
        setOnwest('');
        setOnnorth('');
        setOnsouth('');
        setRemark('');
        setName('');
        setPointFrom('');
        setPointTo('');
        setLengthMeter('');
        setEditingIndex(null);
    };
    const handleClose = () => {
        resetFields();
        setShowForm(false);
        setEditingIndex(null);
        setShowFilter(false);
    };
    const handlePropertyEdit = (index) => {
        const property = properties[index];
        setName(property.name);
        setPointFrom(property.pointFrom);
        setPointTo(property.pointTo);
        setdescription(property.descriptionproperty);
        setRemark(property.remark);
        setLengthMeter(property.lengthMeter);
        setOneast(property.oneast);
        setOnwest(property.onwest);
        setOnnorth(property.onnorth);
        setOnsouth(property.onsouth);
        setEditingIndex(index);
        setShowProperty(true); // Show the form for editing
        setShowForm(false);
    };
    const handleEdit = (index) => {
        const property = properties[index];
        setPropertyType(property.propertyType);
        setBuildingName(property.buildingName);
        setDescription(property.description);
        setRemarks(property.remarks);
        setCitySurveyNumber(property.citySurveyNumber);
        setAreaSurveyMeter(property.areaSurveyMeter);
        setOnEast(property.onEast);
        setOnWest(property.onWest);
        setOnNorth(property.onNorth);
        setOnSouth(property.onSouth);
        setEditingIndex(index);
        setShowForm(true);
    };
    const handleDelete = (index) => {
        const updatedProperties = properties.filter((_, i) => i !== index);
        const reindexedProperties = updatedProperties.map((item, idx) => ({
            ...item,
            srNo: idx + 1,
        }));
        setProperties(reindexedProperties);
        toast.success('Properties Deleted successfully!', {
            position: "top-right", 
            autoClose: 5000, 
            hideProgressBar: false, 
            closeOnClick: true,
             pauseOnHover: true,
              draggable: true, 
              progress: undefined, 
           });
    };
    const handlePropertyDelete = (index) => {
        const updatedProperties = properties.filter((_, i) => i !== index); // Remove the property at the index
        const reindexedProperties = updatedProperties.map((item, idx) => ({
            ...item,
            srNo: idx + 1, // Re-index remaining properties
        }));
        setProperties(reindexedProperties); // Update the state with the new list of properties
    
        // Show success toast notification
        toast.success('Property Deleted successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleFilter = (e) => {
        e.preventDefault();
        const filtered = properties.filter(property => {
            return (
                (filterBuildingName ? property.buildingName.includes(filterBuildingName) : true) &&
                (filterDescription ? property.description.includes(filterDescription) : true) &&
                (filterCitySurveyNumber ? property.citySurveyNumber.includes(filterCitySurveyNumber) : true) &&
                (filterAreaSurveyMeter ? property.areaSurveyMeter.includes(filterAreaSurveyMeter) : true)
            );
        });
        setFilteredProperties(filtered); // Set filtered properties
        setShowFilter(false); // Close filter form after filtering
        
        // Reset filter fields
        setFilterBuildingName('');
        setFilterDescription('');
        setFilterCitySurveyNumber('');
        setFilterAreaSurveyMeter('');
    };
    const handleUnassignProperty = (unassignData) => {
        console.log('Unassign Property Data:', unassignData);
        // You can make an API call, update state, or perform any action here
    };
    const handleUnassignSubmit = (e) => {
        e.preventDefault(); // Prevent page reload on submit
        const unassignData = {
            property,
            resolutionTo,
            dateTo,
            propertyType,
            propertyName,
            description,
            remarks,
            citySurvey,
            areaSquareMeter,
            onEast,
            onWest,
            onNorth,
            onSouth,
        };

        // Call the handleUnassignProperty function (could be API call or data processing)
        handleUnassignProperty(unassignData);
// Show success toast notification 
toast.success('Property form submitted successfully!', {
     position: "top-right", 
     autoClose: 3000, 
     hideProgressBar: false,
      closeOnClick: true, 
      pauseOnHover: true, 
      draggable: true, progress:
       undefined, 
    });
        // Clear form after submission (optional)
        setProperty('');
        setResolutionTo('');
        setDateTo('');
        setPropertyType('');
        setPropertyName('');
        setDescription('');
        setRemarks('');
        setCitySurvey('');
        setAreaSquareMeter('');
        setOnEast('');
        setOnWest('');
        setOnNorth('');
        setOnSouth('');      // Close the form (optional)
        setShowUnassignProperty(false);
    };

    return (
        <div className="property-container">
            {!showForm && !showFilter && !showProperty && !showUnassignProperty &&(
           <h1 style={{ textAlign: 'left', marginTop: '10px', marginBottom: '40px' }}>Property</h1>
            )}
            <div className="button-group-front-property">
                {!showForm && !showFilter && !showProperty && !showUnassignProperty &&(
                    <>
                    <Button onClick={() => setShowForm(true)} 
    sx={{ backgroundColor: '#6E85A4', marginRight:'5px', color:'white' }}  >
                            New Property
                        </Button>
                        <Button onClick={() => setShowFilter(true)}  
    sx={{ backgroundColor: '#6E85A4',color:'white' }} >
                            Find Property
                        </Button>
                    </>
                )}
            </div>
            {/* Filter Property Form */}

            <ToastContainer/>
            {showFilter && (
                <form onSubmit={handleFilter} className="filter-form">
                      <h3 style={{ textAlign: 'center', marginBottom: '30px',margintop:'0px' }}>Filter Property</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <div className="input-group">
                                <label>Building Name</label>
                                <TextField
                                    size="small"
                                    value={filterBuildingName}
                                    onChange={(e) => setFilterBuildingName(e.target.value)}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div className="input-group">
                                <label>Description</label>
                                <TextField
                                    size="small"
                                    value={filterDescription}
                                    onChange={(e) => setFilterDescription(e.target.value)}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div className="input-group">
                                <label>City Survey Number</label>
                                <TextField
                                    size="small"
                                    value={filterCitySurveyNumber}
                                    onChange={(e) => setFilterCitySurveyNumber(e.target.value)}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div className="input-group">
                                <label>Area Square Meter</label>
                                <TextField
                                    size="small"
                                    value={filterAreaSurveyMeter}
                                    onChange={(e) => setFilterAreaSurveyMeter(e.target.value)}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <div className="button-group-bottom">
                        <button type="submit" className="submit">Search</button>
                        <button type="button" onClick={() => setShowFilter(false)} className="cancel">Close</button>
                    </div>
                </form>
            )}
            
             {showUnassignProperty && (
            <form onSubmit={handleUnassignSubmit} className="unassign-property-form">
                <h3 style={{ textAlign: 'center', marginBottom: '30px', marginTop: '-20px' }}>Unassign Property</h3>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <div className="input-group">
                            <label>Property</label>
                            <TextField
                                size="small"
                                value={property}
                                onChange={(e) => setProperty(e.target.value)}
                                required
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <div className="input-group">
                            <label>Resolution To</label>
                            <TextField
                                size="small"
                                value={resolutionTo}
                                onChange={(e) => setResolutionTo(e.target.value)}
                                required
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <div className="input-group">
                            <label>Date To</label>
                            <TextField
                                type="date"
                                size="small"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <div className="input-group">
                            <label>Property Type</label>
                            <TextField
                                size="small"
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                                required
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="input-group">
                            <label>Property Name</label>
                            <TextField
                                size="small"
                                value={propertyName}
                                onChange={(e) => setPropertyName(e.target.value)}
                                required
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="input-group">
                            <label>Description</label>
                            <TextField
                                size="small"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="input-group">
                            <label>Remarks</label>
                            <TextField
                                size="small"
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                required
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="input-group">
                            <label>City Survey Number</label>
                            <TextField
                                size="small"
                                value={citySurvey}
                                onChange={(e) => setCitySurvey(e.target.value)}
                                required
                            />
                        </div>
                    </Grid>

                    {/* Area Square Meter Field */}
                    <Grid item xs={12} sm={6}>
                        <div className="input-group">
                            <label>Area Square Meter</label>
                            <TextField
                                size="small"
                                value={areaSquareMeter}
                                onChange={(e) => setAreaSquareMeter(e.target.value)}
                                required
                            />
                        </div>
                    </Grid>
                    {/* Directions (East, West, North, South) */}
                    <Grid item xs={12} sm={6}>
                        <div className="input-group">
                            <label>On East</label>
                            <TextField
                                size="small"
                                value={onEast}
                                onChange={(e) => setOnEast(e.target.value)}
                                required
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="input-group">
                            <label>On West</label>
                            <TextField
                                size="small"
                                value={onWest}
                                onChange={(e) => setOnWest(e.target.value)}
                                required
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="input-group">
                            <label>On North</label>
                            <TextField
                                size="small"
                                value={onNorth}
                                onChange={(e) => setOnNorth(e.target.value)}
                                required
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="input-group">
                            <label>On South</label>
                            <TextField
                                size="small"
                                value={onSouth}
                                onChange={(e) => setOnSouth(e.target.value)}
                                required
                            />
                        </div>
                    </Grid>
                </Grid>
                <div className="button-group-bottom">
                <button type="submit" className="submit">Unassign</button>
                <button type="button" onClick={() => setShowUnassignProperty(false)} className="cancel">Close</button>
                </div>
            </form>
        )}

{showProperty && (
    <form onSubmit={handlePropertySearch} className="property-form">
        <h3 style={{ textAlign: 'center', marginBottom: '30px', marginTop: '0px' }}>Property</h3>
        <Grid container spacing={2}>
            {/* Name Field */}
            <Grid item xs={12} sm={8}>
                <div className="input-group">
                    <label>Name</label>
                    <TextField
                        size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </Grid>         
            <Grid item xs={12} sm={8}>
                <div className="input-group">
                    <label>Point From</label>
                    <TextField
                        size="small"
                        value={pointFrom}
                        onChange={(e) => setPointFrom(e.target.value)}
                    />
                </div>
            </Grid>
            <Grid item xs={12} sm={8}>
                <div className="input-group">
                    <label>Point To</label>
                    <TextField
                        size="small"
                        value={pointTo}
                        onChange={(e) => setPointTo(e.target.value)}
                    />
                </div>
            </Grid>
            <Grid item xs={12} sm={8}>
                <div className="input-group">
                    <label>Description</label>
                    <TextField
                        size="small"
                        value={descriptionproperty}
                        onChange={(e) => setdescription(e.target.value)}
                    />
                </div>
            </Grid>
            <Grid item xs={12} sm={8}>
                <div className="input-group">
                    <label>Remarks</label>
                    <TextField
                        size="small"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                    />
                </div>
            </Grid>
            <Grid item xs={12} sm={8}>
                <div className="input-group">
                    <label>LengthMeter</label>
                    <TextField
                        size="small"
                        value={lengthMeter}
                        onChange={(e) => setLengthMeter(e.target.value)}
                    />
                </div>
            </Grid>
            <Grid item xs={12} sm={8}>
                <div className="input-group">
                    <label>On East</label>
                    <TextField
                        size="small"
                        value={oneast}
                        onChange={(e) => setOneast(e.target.value)}
                    />
                </div>
            </Grid>
            <Grid item xs={12} sm={8}>
                <div className="input-group">
                    <label>On West</label>
                    <TextField
                        size="small"
                        value={onwest}
                        onChange={(e) => setOnwest(e.target.value)}
                    />
                </div>
            </Grid>
            <Grid item xs={12} sm={8}>
                <div className="input-group">
                    <label>On North</label>
                    <TextField
                        size="small"
                        value={onnorth}
                        onChange={(e) => setOnnorth(e.target.value)}
                    />
                </div>
            </Grid>
            <Grid item xs={12} sm={8}>
                <div className="input-group">
                    <label>On South</label>
                    <TextField
                        size="small"
                        value={onsouth}
                        onChange={(e) => setOnsouth(e.target.value)}
                    />
                </div>
            </Grid>
            </Grid>
        <div className="button-group-bottom">
        <button type="submit" className="submit">
            {editingIndex === null ? 'Save' : 'Update'}</button>
            <button type="button" onClick={() =>{ setShowProperty(false);setShowForm(true)}} className="cancel">Close</button>
        </div>
    </form> 
)}
            {showForm && (
                <form onSubmit={handleSubmit} className="form-container">
                      <h3 style={{ textAlign: 'center', marginBottom: '30px',marginTop:'0px' }}>{editingIndex !== null ? "Edit Property" : "Add New Property"}</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Property Type</label>
                                <Select
                                    value={propertyType}
                                    onChange={(e) => setPropertyType(e.target.value)}
                                    required
                                    style={{ width: '245px', height: '40px' }}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="Plot">Plot</MenuItem>
                                    <MenuItem value="Flat">Flat</MenuItem>
                                </Select>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Building Name</label>
                                <TextField
                                    size="small"
                                    value={buildingName}
                                    onChange={(e) => setBuildingName(e.target.value)}
                                    required
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Description</label>
                                <TextField
                                    size="small"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Remarks</label>
                                <TextField
                                    size="small"
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    required
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>City Survey Number</label>
                                <TextField
                                    size="small"
                                    value={citySurveyNumber}
                                    onChange={(e) => setCitySurveyNumber(e.target.value)}
                                    required
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Area Square Meter</label>
                                <TextField
                                    size="small"
                                    value={areaSurveyMeter}
                                    onChange={(e) => setAreaSurveyMeter(e.target.value)}
                                    required
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>On East</label>
                                <TextField
                                    size="small"
                                    value={onEast}
                                    onChange={(e) => setOnEast(e.target.value)}
                                    required
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>On West</label>
                                <TextField
                                    size="small"
                                    value={onWest}
                                    onChange={(e) => setOnWest(e.target.value)}
                                    required
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>On North</label>
                                <TextField
                                    size="small"
                                    value={onNorth}
                                    onChange={(e) => setOnNorth(e.target.value)}
                                    required
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>On South</label>
                                <TextField
                                    size="small"
                                    value={onSouth}
                                    onChange={(e) => setOnSouth(e.target.value)}
                                    required
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <div className="button-group-bottom">
                        <button type="submit" className="submit">{editingIndex !== null ? "Update" : "Save"}</button>
                        <button type="button" onClick={handleClose} className="cancel">Close</button>
                    </div>
                    <Grid item xs={12} sm={8}>
                    <Button onClick={() => {setShowProperty(true);setShowForm(false);}}
                        sx={{ backgroundColor: '#74858F', marginRight:'5px',marginBottom:'20px', color:'white' }}>
                 Property Measurement
             </Button>          
             <Button onClick={() => {setShowUnassignProperty(true);setShowForm(false);}} sx={{ backgroundColor: '#74858F', marginRight:'5px',marginBottom:'20px', color:'white' }}>
                 Add Property
             </Button>
             </Grid>
                </form>               
            )}
             {showForm && !showFilter && !showProperty && !showUnassignProperty &&(
                <div className='propertytable-container' >
                <MaterialReactTable
                    columns={[
                        { accessorKey: 'srNo', header: 'SR No.' },
                        { accessorKey: 'name', header: 'Name' },
                        { accessorKey: 'pointFrom', header: 'Point From' },
                        { accessorKey: 'pointTo', header: 'Point To' },
                        { accessorKey: 'descriptionproperty', header: 'Description' },
                        { accessorKey: 'remark', header: 'Remark' },
                        { accessorKey: 'lengthMeter', header: 'LengthMeter' },
                        { accessorKey: 'oneast', header: 'On East' },
                        { accessorKey: 'onwest', header: 'On West' },
                        { accessorKey: 'onnorth', header: 'On North' },
                        { accessorKey: 'onsouth', header: 'On South' },
                        {
                            accessorKey: 'actions',
                            header: 'Actions',
                            Cell: ({ row }) => (
                                <div>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => handlePropertyEdit(row.index)}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        onClick={() => handlePropertyDelete(row.index)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            ),
                        },
                    ]}
                    data={properties}
                    // data={showFilter ? filteredProperties : properties} // Render filtered properties or original
                    muiTableHeadCellProps={{
                        style: {
                            backgroundColor: '#E9ECEF',
                            color: 'black',
                            fontSize: '16px',
                        },
                    }}              
                /></div>
            )}
            {!showForm && !showFilter && !showProperty && !showUnassignProperty &&(
               <div className='propertytable-container' >
                <MaterialReactTable
                    columns={[
                        { accessorKey: 'srNo', header: 'SR No.' },
                        { accessorKey: 'propertyType', header: 'Property Type' },
                        { accessorKey: 'buildingName', header: 'Building Name' },
                        { accessorKey: 'description', header: 'Description' },
                        { accessorKey: 'remarks', header: 'Remarks' },
                        { accessorKey: 'citySurveyNumber', header: 'City Survey Number' },
                        { accessorKey: 'areaSurveyMeter', header: 'Area Survey Meter' },
                        { accessorKey: 'onEast', header: 'On East' },
                        { accessorKey: 'onWest', header: 'On West' },
                        { accessorKey: 'onNorth', header: 'On North' },
                        { accessorKey: 'onSouth', header: 'On South' },
                        {
                            accessorKey: 'actions',
                            header: 'Actions',
                            Cell: ({ row }) => (
                                <div>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => handleEdit(row.index)}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        onClick={() => handleDelete(row.index)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            ),
                        },
                    ]}
                    data={showFilter ? filteredProperties : properties} // Render filtered properties or original
                    muiTableHeadCellProps={{
                        style: {
                            backgroundColor: '#E9ECEF',
                            color: 'black',
                            fontSize: '16px',
                        },
                    }}              
                /></div>
            )}
        </div>
    );
};


export default Newproperty;
