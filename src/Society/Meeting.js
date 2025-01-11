import React, { useState } from 'react';
import { Button, TextField, Grid, Select, MenuItem } from '@mui/material';
import './meeting.css';
import { MaterialReactTable } from 'material-react-table'; // Import MaterialReactTable
import { toast, ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

const Meeting = () => {
    const [showForm, setShowForm] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [subjects, setSubjects] = useState([]); // State for storing subjects
    const [meetings, setMeetings] = useState([]); // Define meetings state

    const [showSubjectForm, setShowSubjectForm] = useState(false); // New state for Subject Form
    const [showOfficerForm, setShowOfficerForm] = useState(false); // State for Officer Form
    const [showResolutionForm, setShowResolutionForm] = useState(false); // State for Resolution Form

    // State for add meeting form
    const [meetingType, setMeetingType] = useState('');
    const [dateto, setDateto] = useState('');
    const [datefrom, setDatefrom] = useState('');
    const [place, setPlace] = useState('');
    const [description, setDescription] = useState('');
    const [comments, setComments] = useState('');


    const [subjectType, setSubjectType] = useState(''); // State for subject combo box
    const [subjectText, setSubjectText] = useState(''); // State for subject text box
    
    const [officerName, setOfficerName] = useState(''); // State for officer name
    const [officerDescription, setOfficerDescription] = useState(''); // State for officer description
    const [officerComments, setOfficerComments] = useState(''); // State for officer comments
    const [resolutionMeetingType, setResolutionMeetingType] = useState(''); // State for Resolution Meeting Type
    const [resolutionSubject, setResolutionSubject] = useState(''); // State for Resolution Subject
    const [resolutionComments, setResolutionComments] = useState(''); // State for Resolution Comments
    const [proposedBy, setProposedBy] = useState(''); // State for Proposed By
    const [secondedBy, setSecondedBy] = useState(''); // State for Seconded By
    // State for search filter
    const [filterType, setFilterType] = useState('');
    const [filterPlace, setFilterPlace] = useState('');
    const [filterDescription, setFilterDescription] = useState('');

     // State for success message
     const [saveMessage, setSaveMessage] = useState('');


     const [isEditing, setIsEditing] = useState(false);
     const [editIndex, setEditIndex] = useState(null); // State to store the index of the meeting being edited

     const handleSave = (e) => {
        e.preventDefault();
        const newMeeting = { meetingType, datefrom, dateto, place, description, comments };
    
        if (!meetingType || !datefrom || !dateto || !place || !description || !comments) {
            setSaveMessage('Please fill out all fields');
            return;
        }
    
        if (isEditing && editIndex !== null) { // Check if editing and index is valid
            // Update the specific meeting using editIndex
            setMeetings((prevMeetings) => {
                const updatedMeetings = [...prevMeetings];
                updatedMeetings[editIndex] = newMeeting; // Update the specific meeting
                return updatedMeetings;
            });
            toast.success('Meeting updated successfully!', {
                position: "top-right", 
                autoClose: 5000, 
                hideProgressBar: false, 
                closeOnClick: true,
                 pauseOnHover: true,
                  draggable: true, 
                  progress: undefined, 
               });
        } else {
            // Add new meeting if not editing
            setMeetings((prevMeetings) => [...prevMeetings, newMeeting]);
            toast.success('Meeting Saved successfully!', {
                position: "top-right", 
                autoClose: 5000, 
                hideProgressBar: false, 
                closeOnClick: true,
                 pauseOnHover: true,
                  draggable: true, 
                  progress: undefined, 
               });
        }
    
        handleClose();
    };
    
    const handleEdit = (index, isSubject = false) => {
        if (isSubject) {
            const subject = subjects[index];
            if (subject) {
                setSubjectType(subject.subjectType);
                setSubjectText(subject.subjectText);
                setIsEditing(true);
                setEditIndex(index);
                setShowSubjectForm(true);
            } else {
                console.error('Subject not found at index:', index);
            }
        } else {
            // If editing a meeting
            if (index >= 0 && index < meetings.length) {
                const meetingToEdit = meetings[index];
                // Populate the form with the meeting details
                setMeetingType(meetingToEdit.meetingType);
                setDateto(meetingToEdit.dateto);
                setDatefrom(meetingToEdit.datefrom);
                setPlace(meetingToEdit.place);
                setDescription(meetingToEdit.description);
                setComments(meetingToEdit.comments);
        
                // Set editing state and index for meeting
                setIsEditing(true);
                setEditIndex(index);
                setShowForm(true); // Show the meeting form
            } else {
                console.error('Invalid index for editing meeting:', index);
            }
        }
    };
    

    const handleDelete = (deleteIndex) => {
        setMeetings(meetings.filter((_, i) => i !== deleteIndex));
        setSubjects(subjects.filter((_, i) => i !== deleteIndex));
    
        toast.success('Entry deleted successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    
    
  
    const handleSearch = (e) => {
        e.preventDefault();
        // Handle search logic here
        console.log({ filterType, filterPlace, filterDescription });
        // Reset the search filter or implement search functionality
    };
    const handleOfficerSave = (e) => {
        e.preventDefault();
        console.log({ officerName, officerDescription, officerComments });
        setShowOfficerForm(false); // Close the officer form after saving
        toast.success('Officer Details Saved successfully!', {
            position: "top-right", 
            autoClose: 5000, 
            hideProgressBar: false, 
            closeOnClick: true,
             pauseOnHover: true,
              draggable: true, 
              progress: undefined, 
           });
    };

    const handleSubjectSave = (e) => {
        e.preventDefault();
    
        if (!subjectText || !subjectType) {
            setSaveMessage('Please fill out all fields');
            return;
        }
    
        if (isEditing) {
            // Update the subject
            const updatedSubjects = subjects.map((subject, index) => {
                if (index === editIndex) {
                    return { subjectType, subjectText };
                }
                return subject;
            });
    
            setSubjects(updatedSubjects);
            toast.success('Subject updated successfully!', {
                position: "top-right", 
                autoClose: 5000, 
                hideProgressBar: false, 
                closeOnClick: true,
                 pauseOnHover: true,
                  draggable: true, 
                  progress: undefined, 
               });
        } else {
            // Create a new subject
            const newSubject = { subjectType, subjectText, srNo: subjects.length + 1 };
            setSubjects([...subjects, newSubject]);
            toast.success('Subject Saved successfully!', {
                position: "top-right", 
                autoClose: 5000, 
                hideProgressBar: false, 
                closeOnClick: true,
                 pauseOnHover: true,
                  draggable: true, 
                  progress: undefined, 
               });
        }
    
        // Reset form and state
        setShowSubjectForm(true);
        setSubjectType('');
        setSubjectText('');
        setIsEditing(false); // Reset editing state
        setEditIndex(null); // Reset edit index
    };
    
    const handleResolutionSave = (e) => {
        e.preventDefault();
        console.log({ resolutionMeetingType, resolutionSubject, resolutionComments, proposedBy, secondedBy });
        setShowResolutionForm(false); // Close the resolution form after saving
        setShowForm(true); // Show the new meeting form after closing
        toast.success('Resoultion Saved successfully!', {
            position: "top-right", 
            autoClose: 5000, 
            hideProgressBar: false, 
            closeOnClick: true,
             pauseOnHover: true,
              draggable: true, 
              progress: undefined, 
           });
    };

    const handleClose = () => {
        setShowForm(false);
        setShowFilter(false);
        setShowSubjectForm(false); // Close the subject form
        setShowOfficerForm(false); // Close the officer form
        setShowResolutionForm(false); // Close the resolution form
        // Reset form inputs
        setMeetingType('');
        setDateto('');
        setDatefrom('');
        setPlace('');
        setDescription('');
        setComments('');
        setFilterType('');
        setFilterPlace('');
        setFilterDescription('');
        setSubjectType(''); // Reset subject combo box
        setSubjectText(''); // Reset subject text box
        setOfficerName(''); // Reset officer name
        setOfficerDescription(''); // Reset officer description
        setOfficerComments(''); // Reset officer comments
        setResolutionMeetingType(''); // Reset resolution meeting type
        setResolutionSubject(''); // Reset resolution subject
        setResolutionComments(''); // Reset resolution comments
        setProposedBy(''); // Reset proposed by
        setSecondedBy(''); // Reset seconded by
        setIsEditing(false); // Reset editing state
        setEditIndex(null);  // Reset edit index
        setSaveMessage('');
    };

    return (
        <div className="meeting-container">
            {!showForm && !showFilter && (
            <h1 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}>Meeting</h1>
            )}
            <div className="button-group-front-meeting">
                {!showForm && !showFilter && (
                    <>
                        <Button onClick={() => setShowForm(true)}  sx={{ backgroundColor: '#6E85A4', marginRight:'5px', color:'white',marginBottom:'10px' }}  >
                            Add New Meeting
                        </Button>
                        <Button onClick={() => setShowFilter(true)} sx={{ backgroundColor: '#6E85A4', marginRight:'5px', color:'white',marginBottom:'10px' }} >
                            Search Meeting
                        </Button>
                    </>
                )}
            </div>
<ToastContainer/>
            {/* Add Meeting Form */}
            {showForm  && !showSubjectForm && !showOfficerForm &&!showResolutionForm &&(
                <form onSubmit={handleSave} className="form-meeting">
                      <h3 style={{ textAlign: 'center', marginBottom: '30px',marginTop:'0px' }}>Add New Meeting</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Meeting Type</label>
                                <Select
                                    value={meetingType}
                                    onChange={(e) => setMeetingType(e.target.value)}
                                    required
                                    style={{ width: '100%', height:'40px'}}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="Residential">Residential</MenuItem>
                                    <MenuItem value="Commercial">Commercial</MenuItem>
                                </Select>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Date To</label>
                                <TextField
                                    type="date"
                                    value={dateto}
                                    onChange={(e) => setDateto(e.target.value)}
                                    required
                                    style={{ width: '100%', height:'40px'}}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Date From</label>
                                <TextField
                                    type="date"
                                    value={datefrom}
                                    onChange={(e) => setDatefrom(e.target.value)}
                                    required
                                    style={{ width: '100%', height:'30px'}}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Place</label>
                                <TextField
                                    size="small"
                                    value={place}
                                    onChange={(e) => setPlace(e.target.value)}
                                    required
                                    fullWidth
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
                                    fullWidth
                                    multiline
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label>Comments</label>
                                <TextField
                                    size="small"
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    fullWidth
                                    multiline
                                    required
                                                                    />
                            </div>
                        </Grid>
                    </Grid>
                    <div className="button-group-bottom">
                        <button type="submit" className="submit">{isEditing ? "Update" : "Save"}</button>
                        <button type="button" onClick={handleClose} className="cancel">Close</button>
                    </div>

 {/* New buttons below Save and Close */}
                       <div className="additional-buttons" style={{ marginTop: '20px' }}>
                       <Button 
                            variant="contained" 
                            sx={{ backgroundColor: '#74858F' }}
                            onClick={() => setShowSubjectForm(true)} // Show Subject Form
                            style={{ marginRight: '8px' }}
                        >
                            Meeting Subject
                        </Button>
                        <Button 
                            variant="contained" 
                            sx={{ backgroundColor: '#74858F' }}
                            onClick={() => setShowOfficerForm(true)} // Show Officer Form
                            style={{ marginRight: '8px' }}
                        >
                            Meeting Officer
                        </Button>
                        <Button 
                            variant="contained" 
                            sx={{ backgroundColor: '#74858F' }}
                            onClick={() => setShowResolutionForm(true)} // Show Resolution Form
                        >
                            Meeting Resolution
                        </Button>
                    </div>

                    {saveMessage && (
                        <div style={{ marginTop: '16px', color: 'green', fontWeight: 'bold' }}>
                            {saveMessage}
                        </div>
                    )}
                </form>
            )}

{!showForm  && !showSubjectForm && !showOfficerForm &&!showResolutionForm && !showFilter &&(
    <div className='meetingtable-container' >
    <MaterialReactTable
        columns={[
            { accessorKey: 'srNo', header: 'SR No.' },
            { accessorKey: 'meetingType', header: 'Meeting Type' },
            { accessorKey: 'datefrom', header: 'Date From' },
            { accessorKey: 'dateto', header: 'Date To' },
            { accessorKey: 'place', header: 'Place' },
            { accessorKey: 'description', header: 'Description' },
            { accessorKey: 'comments', header: 'Comments' },
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
        data={meetings.map((meeting, index) => ({ ...meeting, srNo: index + 1 }))}
        muiTableHeadCellProps={{
            style: {
                backgroundColor: '#E9ECEF',
                color: 'black',
                fontSize: '16px',
            },
        }}
    />   </div>    
)}

             {/* Subject Form */}
            
             {showSubjectForm && (
                <form onSubmit={handleSubjectSave} className="subject-form">
                      <h3 style={{ textAlign: 'center', marginBottom: '30px',marginTop:'0px' }}>Meeting Subject</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <div className="input-group">
                                <label>Subject Type</label>
                                <Select
                                    value={subjectType}
                                    onChange={(e) => setSubjectType(e.target.value)}
                                    required
                                    style={{ width: '100%', height: '40px' }}
                                >
                                    <MenuItem value=""><em>Select Subject</em></MenuItem>
                                    <MenuItem value="Type1">Type 1</MenuItem>
                                    <MenuItem value="Type2">Type 2</MenuItem>
                                </Select>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div className="input-group">
                                <label>Subject</label>
                                <TextField
                                    value={subjectText}
                                    onChange={(e) => setSubjectText(e.target.value)}
                                    required
                                    multiline
                                    fullWidth
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <div className="button-group-bottom">
                        <button type="submit" className="submit">{isEditing ? "Update" : "Save"}</button>
                        <button type="button" onClick={() =>{ handleClose();setShowForm(true);}} className="cancel">Close</button>
                    </div>
                </form>
            )}
            {showForm  && showSubjectForm && !showOfficerForm &&!showResolutionForm &&(
               <div className='officemeetingtable-container' >
            <MaterialReactTable
        columns={[
            { accessorKey: 'srNo', header: 'SR No.' },
            { accessorKey: 'subjectType', header: 'Subject Type' },
            { accessorKey: 'subjectText', header: 'Subject' },
            {
                accessorKey: 'actions',
                header: 'Actions',
                Cell: ({ row }) => (
                    <div>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={() => handleEdit(row.index,true)}
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
        data={subjects.map((subject, index) => ({ ...subject, srNo: index + 1 }))} // Assuming subjects is your data array
        muiTableHeadCellProps={{
            style: {
                backgroundColor: '#E9ECEF',
                color: 'black',
                fontSize: '16px',
            },
    
        }}
    /></div>
            )}
   
             {/* Officer Form */}
             {showOfficerForm && (
                <form onSubmit={handleOfficerSave} className="officer-form">
                      <h3 style={{ textAlign: 'center', marginBottom: '30px',marginTop:'0px' }}>Meeting Officer</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <div className="input-group">
                                <label>Name</label>
                                <TextField
                                    value={officerName}
                                    onChange={(e) => setOfficerName(e.target.value)}
                                    required
                                    fullWidth
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div className="input-group">
                                <label>Description</label>
                                <TextField
                                    value={officerDescription}
                                    onChange={(e) => setOfficerDescription(e.target.value)}
                                    required
                                    multiline
                                    fullWidth
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div className="input-group">
                                <label>Comments</label>
                                <TextField
                                    value={officerComments}
                                    onChange={(e) => setOfficerComments(e.target.value)}
                                    fullWidth
                                    multiline
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <div className="button-group-bottom">
                        <button type="submit" className="submit">Save</button>
                        <button type="button" onClick={() =>{ handleClose();setShowForm(true);}} className="cancel">Close</button>
                    </div>
                </form>
            )}

            {/* Resolution Form */}
            {showResolutionForm && (
                <form onSubmit={handleResolutionSave} className="resolution-form">
                     <h3 style={{ textAlign: 'center', marginBottom: '30px',marginTop:'0px' }}>Meeting Resolution</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <div className="input-group">
                                <label>Meeting Type</label>
                                <Select
                                    value={resolutionMeetingType}
                                    onChange={(e) => setResolutionMeetingType(e.target.value)}
                                    required
                                    style={{ width: '100%', height: '40px' }}
                                >
                                    <MenuItem value=""><em>Select Type</em></MenuItem>
                                    <MenuItem value="Type1">Type 1</MenuItem>
                                    <MenuItem value="Type2">Type 2</MenuItem>
                                </Select>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div className="input-group">
                                <label>Subject</label>
                                <TextField
                                    value={resolutionSubject}
                                    onChange={(e) => setResolutionSubject(e.target.value)}
                                    required
                                    fullWidth
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div className="input-group">
                                <label>Comments</label>
                                <TextField
                                    value={resolutionComments}
                                    onChange={(e) => setResolutionComments(e.target.value)}
                                    fullWidth
                                    multiline
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div className="input-group">
                                <label>Proposed by</label>
                                <TextField
                                    value={proposedBy}
                                    onChange={(e) => setProposedBy(e.target.value)}
                                    required
                                    fullWidth
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div className="input-group">
                                <label>Seconded by</label>
                                <TextField
                                    value={secondedBy}
                                    onChange={(e) => setSecondedBy(e.target.value)}
                                    required
                                    fullWidth
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <div className="button-group-bottom">
                        <button type="submit" className="submit">Save</button>
                        <button type="button" onClick={() =>{ handleClose();setShowForm(true);}} className="cancel">Close</button>
                    </div>
                </form>
            )}

            {/* Search Meeting Form */}
            {showFilter && (
                <form onSubmit={handleSearch} className="filter-form">
                     <h3 style={{ textAlign: 'center', marginBottom: '30px',marginTop:'0px' }}>Search Meeting</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <div className="input-group">
                                <label>Meeting Type</label>
                                <Select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    style={{ width: '230px' ,height:'50px'}}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="Residential">Residential</MenuItem>
                                    <MenuItem value="Commercial">Commercial</MenuItem>
                                </Select>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div className="input-group">
                                <label>Place</label>
                                <TextField
                                    size="small"
                                    value={filterPlace}
                                    onChange={(e) => setFilterPlace(e.target.value)}
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
                    </Grid>
                    <div className="button-group-bottom">
                        <button type="submit" className="submit">Search</button>
                        <button type="button" onClick={handleClose}className="cancel">Cancel</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Meeting;
