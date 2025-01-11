import React, { useState } from 'react';
import { Button, TextField, Grid,MenuItem ,Select} from '@mui/material';
import './committee.css';
import { MaterialReactTable } from 'material-react-table'; // Import MaterialReactTable
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Committee = () => {
    const [showForm, setShowForm] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [description, setDescription] = useState('');
    const [comments, setComments] = useState('');
    const [datecreated, setDatecreate] = useState('');
    const [dateto, setDateto] = useState('');
    const [datefrom, setDatefrom] = useState('');

    const [resolution, setResolution] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [committee, setCommittee] = useState([]); // State to manage meetings

    const [editIndex, setEditIndex] = useState(null);

    const [chairman, setChairman] = useState('');
    const [coChairman, setCoChairman] = useState('');
    const [secretary, setSecretary] = useState('');
    const [coSecretary, setCoSecretary] = useState('');
    const [treasurer, setTreasurer] = useState('');
    const [coTreasurer, setCoTreasurer] = useState('');
    const [director, setDirector] = useState('');
    const [expertDirector, setexpertDirector] = useState('');


    const handleSave = (e) => {
        e.preventDefault();
    
        const boardData = {
            description,
            comments,
            dateCreated: datecreated,
            dateTo: dateto,
            dateFrom: datefrom,
            resolution,
            chairman,
            coChairman,
            secretary,
            coSecretary,
            treasurer,
            coTreasurer,
            director,
            expertDirector,
        };
    
        if (isEditing && editIndex !== null) {
            // Update existing meeting logic
            const updatedCommittee = committee.map((item, index) =>
                index === editIndex ? boardData : item
            );
            toast.success('Board Of Directors Updated successfully!', {
                position: "top-right", 
                autoClose: 5000, 
                hideProgressBar: false, 
                closeOnClick: true,
                 pauseOnHover: true,
                  draggable: true, 
                  progress: undefined, 
               });
            setCommittee(updatedCommittee);
           
        } else {
            // Add new meeting
            toast.success('Board of Directors Saved successfully!', {
                position: "top-right", 
                autoClose: 5000, 
                hideProgressBar: false, 
                closeOnClick: true,
                 pauseOnHover: true,
                  draggable: true, 
                  progress: undefined, 
               });
            setCommittee([...committee, boardData]);
           
        }
    
        resetFormFields(); // Reset fields after saving
        setShowForm(false);
    };
    const boardData = {
        description,
        comments,
        datecreated: datecreated, // Change these keys to match
        dateto: dateto,
        datefrom: datefrom,
        resolution,
        chairman,
        coChairman,
        secretary,
        coSecretary,
        treasurer,
        coTreasurer,
        director,
        expertDirector,
    };
    
    
    const handleClose = () => {
        // Reset all fields
        setDescription('');
        setComments('');
        setDatecreate('');
        setDateto('');
        setDatefrom('');
        setResolution('');
        // Close the form
        setShowForm(false);
        setShowFilter(false);
    };
    
    const handleEdit = (index) => {
        const meetingToEdit = committee[index];
    
        // Set form fields to the values of the selected meeting
        setDescription(meetingToEdit.description);
        setComments(meetingToEdit.comments);
        setDatecreate(meetingToEdit.dateCreated); // Ensure keys match
        setDateto(meetingToEdit.dateTo);
        setDatefrom(meetingToEdit.dateFrom);
        setResolution(meetingToEdit.resolution);
    
        setEditIndex(index); // Set the edit index here
        setIsEditing(true); // Set editing mode
        setShowForm(true); // Open the form for editing
    };
    
    const handleDelete = (index) => {
        const updatedMeetings = committee.filter((_, i) => i !== index);
        setCommittee(updatedMeetings); // Update the committee state with the new list
        toast.success('Board Of Director deleted successfully!', {
            position: "top-right", 
            autoClose: 5000, 
            hideProgressBar: false, 
            closeOnClick: true,
             pauseOnHover: true,
              draggable: true, 
              progress: undefined, 
           });
    };
    
    const resetFormFields = () => {
        setDescription('');
        setComments('');
        setDatecreate('');
        setDateto('');
        setDatefrom('');
        setResolution('');
        setChairman('');
        setCoChairman('');
        setSecretary('');
        setCoSecretary('');
        setTreasurer('');
        setCoTreasurer('');
        setDirector('');
        setexpertDirector('');
        setEditIndex(null); // Reset edit index
        setIsEditing(false); // Reset editing mode
    };
    

    return (
        <div className="committee-container">
            {!showForm && !showFilter && (
             <h1 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}>Board Of Directors</h1>
            )}
            <div className="button-group-front">
                {!showForm && !showFilter && (
                    <>
                        <Button onClick={() => setShowForm(true)}  sx={{ backgroundColor: '#6E85A4', marginRight:'5px', color:'white',marginBottom:'10px' }} >
                            Add New Board Of Director
                        </Button>
                        <Button onClick={() => setShowFilter(true)}  sx={{ backgroundColor: '#6E85A4', marginRight:'5px', color:'white',marginBottom:'10px' }} >
                            Board Of Director Search
                        </Button>
                    </>
                )}
            </div>
<ToastContainer/>
            {showForm && (
                <form onSubmit={handleSave} className="committee-form">
                    <h3 style={{ textAlign: 'center', marginBottom: '30px',marginTop:'0px' }}>Board Of Directors</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
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
                        <Grid item xs={12} sm={8}>
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
                        <Grid item xs={12} sm={8}>
                            <div className="input-group">
                                <label>Date Created</label>
                                <TextField
                                    type="date"
                                    value={datecreated}
                                    onChange={(e) => setDatecreate(e.target.value)}
                                    required
                                    style={{ width: '250px',marginRight:'40px'}}
                                    InputProps={{ style: { height: '40px' } }}
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
                                    style={{ width: '250px'}}
                                    InputProps={{ style: { height: '40px' } }}
                                />
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
                                    style={{ width: '250px'}}
                                    InputProps={{ style: { height: '40px' } }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div className="input-group">
                                <label>Resolution</label>
                                <Select
                                    value={resolution}
                                    onChange={(e) => setResolution(e.target.value)}
                                    required
                                    style={{ width: '245px', height: '40px' }}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                </Select>
                            </div>
                        </Grid>
                    </Grid>
                    <div className="button-group-bottom">
                        <button type="submit" className="submit">{isEditing ? "Update" : "Save"}</button>
                        <button type="button" className="add officer"style={{ fontSize: '16px', color: 'blue',marginLeft:'20px',marginRight:'20px',borderRadius:'5px' }}>Add Officer</button>
                        <button type="button" onClick={handleClose} className="cancel">Close</button>
                    </div>

                    <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <div className="input-group">
                    <label>Chairman</label>
                    <TextField  
                    size='small'                   
                        value={chairman}
                        onChange={(e) => setChairman(e.target.value)}
                    />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div className="input-group">
                    <label>Co-Chairman</label>
                    <TextField
                    size='small'
                        value={coChairman}
                        onChange={(e) => setCoChairman(e.target.value)}
                    />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div className="input-group">
                    <label>Secretary</label>
                    <TextField
                    size='small'
                        value={secretary}
                        onChange={(e) => setSecretary(e.target.value)}
                    />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div className="input-group">
                    <label>Co-Secretary</label>
                    <TextField
                    size='small'
                        value={coSecretary}
                        onChange={(e) => setCoSecretary(e.target.value)}
                    />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div className="input-group">
                    <label>Treasurer</label>
                    <TextField
                    size='small'
                        value={treasurer}
                        onChange={(e) => setTreasurer(e.target.value)}
                    />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div className="input-group">
                    <label>Co-Treasurer</label>
                    <TextField
                    size='small'
                        value={coTreasurer}
                        onChange={(e) => setCoTreasurer(e.target.value)}
                    />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className="input-group">
                    <label>Director</label>
                    <TextField
                    size='small'
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                    />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div className="input-group">
                    <label>Expert-Director</label>
                    <TextField
                    size='small'
                        value={expertDirector}
                        onChange={(e) => setexpertDirector(e.target.value)}
                    />
                    </div>
                </Grid>
            </Grid>
                </form>
            )}

            {!showForm && !showFilter && (
                <div className='committeetable-container' >
                <MaterialReactTable
                    columns={[
                        { accessorKey: 'srNo', header: 'SR No.' },
                        { accessorKey: 'description', header: 'Description' },
                        { accessorKey: 'comments', header: 'Comments' },
                        { accessorKey: 'dateCreated', header: 'Date Created' },
                        { accessorKey: 'dateFrom', header: 'Date From' },
                        { accessorKey: 'dateTo', header: 'Date To' },                        
                        {accessorKey:'resolution',header:'Resolution'},
                      
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
                    data={committee.map((committee, index) => ({ ...committee, srNo: index + 1 }))}
                    muiTableHeadCellProps={{
                        style: {
                            backgroundColor: '#E9ECEF',
                            color: 'black',
                            fontSize: '16px',
                        },
                    }}
                /></div>
            )}

            {/* Search Meeting Form */}
            {showFilter && (
                <form onSubmit={(e) => e.preventDefault()} className="filter-form">
                  <h3 style={{ textAlign: 'center', marginBottom: '30px',marginTop:'0px' }}>Filter Board Of Director</h3>
                    <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                            <div className="input-group-filter">
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
                        <Grid item xs={12} sm={8}>
                            <div className="input-group-filter">
                                <label>Resolution</label>
                                <Select
                                    value={resolution}
                                    onChange={(e) => setResolution(e.target.value)}
                                    required
                                    style={{ width: '100%', height: '40px' }}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="Plot"></MenuItem>
                                    <MenuItem value="Flat"></MenuItem>
                                </Select>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div className="input-group-filter">
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
                    </Grid>
                    <div className="button-group-bottom-filter">
                        <button type="submit" className="submit">Search</button>
                        <button type="button" onClick={handleClose}className="cancel">Cancel</button>
                    </div>                 
                    </form>
            )}
        </div>
    );
};

export default Committee;
