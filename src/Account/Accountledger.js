import React, { useState } from 'react';
import { Button,TextField, Grid,Select, MenuItem  } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import './account.css';
import { HiMenuAlt2 } from 'react-icons/hi';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const AccountLedger = () => {
    const [showLedgerForm, setShowLedgerForm] = useState(false);
    const [accountLedgers, setAccountLedgers] = useState([]); // State for ledger entries
    const [editingIndex, setEditingIndex] = useState(null); // Track index of the entry being edited
    const [showManageSubGroupOptions, setShowManageSubGroupOptions] = useState(false); // New state
    const [subGroups, setSubGroups] = useState([]); // State for subgroups

    const [showSubGroupForm, setShowSubGroupForm] = useState(false);
    const [showFilterForm, setShowFilterForm] = useState(false);
    
    const [group, setGroup] = useState('');
    const [subgroup, setSubgroup] = useState('');
    const [accountName, setAccountName] = useState('');
    const [yearOpening, setYearOpening] = useState('');
    const [typeCode, setTypeCode] = useState('');
    const [debitCreditCard, setDebitCreditCard] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [subGroupCode, setSubGroupCode] = useState(''); // New state for subgroup code
    const [GroupCode, setGroupCode] = useState('');
    const [groupname, setGroupName] = useState('');
    const [subgroupname, setSubGroupName] = useState('');


    // States for filter form
    const [filterSubGroupName, setFilterSubGroupName] = useState('');
    const [filterGroupName, setFilterGroupName] = useState('');
    const [filterSubGroupCode, setFilterSubGroupCode] = useState('');
    const [filterGroupCode, setFilterGroupCode] = useState('');
    const [subGroupNameChecked, setSubGroupNameChecked] = useState(false);
    const [groupNameChecked, setGroupNameChecked] = useState(false);
    const [subGroupCodeChecked, setSubGroupCodeChecked] = useState(false);
    const [groupCodeChecked, setGroupCodeChecked] = useState(false);
    const issubEditing = editingIndex !== null;


    const handleSubGroupSubmit = (e) => {
        e.preventDefault();
        const newSubGroup = {
            group,
            subgroupname,
            subGroupCode,
        };
    
        if (editingIndex !== null) {
            // Update existing subgroup
            setSubGroups((prev) =>
                prev.map((item, index) => (index === editingIndex ? newSubGroup : item))
            );
            setEditingIndex(null); // Reset editing index
            toast.success('SubGroup Updated successfully!', {
                position: "top-right", 
                autoClose: 5000, 
                hideProgressBar: false, 
                closeOnClick: true,
                 pauseOnHover: true,
                  draggable: true, 
                  progress: undefined, 
               });
            
        } else {
            // Add new subgroup
            setSubGroups((prev) => [...prev, newSubGroup]);
            toast.success('Subgroup Saved successfully!', {
                position: "top-right", 
                autoClose: 5000, 
                hideProgressBar: false, 
                closeOnClick: true,
                 pauseOnHover: true,
                  draggable: true, 
                  progress: undefined, 
               });
        }
        resetForm(); // Reset the form
        setShowSubGroupForm(false);
        setShowManageSubGroupOptions(true);

    };
    

    const handleEditSubGroup = (index) => {
        const subgroupToEdit = subGroups[index];
        setGroup(subgroupToEdit.group); // Set the group for editing
        setSubGroupCode(subgroupToEdit.subGroupCode); // Set the subgroup code for editing
        setSubGroupName(subgroupToEdit.subgroupname); // Set the subgroup name for editing
        setEditingIndex(index); // Set the index to be edited
        setShowSubGroupForm(true); // Show the form for editing
        setShowManageSubGroupOptions(false);
    };
    
    const handleDeleteSubGroup = (index) => {
        setSubGroups((prev) => prev.filter((_, i) => i !== index)); // Remove the subgroup
        toast.success('SubGroup Deleted successfully!', {
            position: "top-right", 
            autoClose: 5000, 
            hideProgressBar: false, 
            closeOnClick: true,
             pauseOnHover: true,
              draggable: true, 
              progress: undefined, 
           });
    };
    const handleAddSubGroupClick = () => {
        console.log("Add Sub Group clicked");
        setShowManageSubGroupOptions(true);
    };

    const handleSearchSubGroupClick = () => {
        console.log("Search Sub Group clicked");
        setShowFilterForm(true);
        setShowSubGroupForm(false);
    };
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // Logic for filtering goes here
    console.log('Filter criteria:', {
        filterSubGroupName,
        filterGroupName,
        filterSubGroupCode,
        filterGroupCode,
        subGroupNameChecked,
        groupNameChecked,
        subGroupCodeChecked,
        groupCodeChecked,
    });
    // Reset filter form
    resetForm();
    setShowFilterForm(false);
    setShowSubGroupForm(false);
};
    const handleAddAccountLedger = (ledgerData) => {
        console.log('Adding Account Ledger:', ledgerData);
        setShowLedgerForm(false);
    };
   
    
    const handleAddOrUpdateAccountLedger = (ledgerData) => {
      if (editingIndex !== null) {
          // Update existing entry
          setAccountLedgers((prev) =>
              prev.map((item, index) => (index === editingIndex ? ledgerData : item))
          );
          setEditingIndex(null); // Reset editing index
          setIsEditing(false); // Reset editing state
          toast.success('Accounts Updated successfully!', {
            position: "top-right", 
            autoClose: 5000, 
            hideProgressBar: false, 
            closeOnClick: true,
             pauseOnHover: true,
              draggable: true, 
              progress: undefined, 
           });
      } else {
          // Add new entry
          setAccountLedgers((prev) => [...prev, ledgerData]);
          toast.success('Accounts Saved successfully!', {
            position: "top-right", 
            autoClose: 5000, 
            hideProgressBar: false, 
            closeOnClick: true,
             pauseOnHover: true,
              draggable: true, 
              progress: undefined, 
           });
      }
      setShowLedgerForm(false);
      resetForm();
  };
  const handleEdit = (index) => {
    const ledger = accountLedgers[index];
    setGroup(ledger.group);
    setSubgroup(ledger.subgroup);
    setAccountName(ledger.accountName);
    setYearOpening(ledger.yearOpening); // Keep as string
    setTypeCode(ledger.typeCode);
    setDebitCreditCard(ledger.debitCreditCard);
    setEditingIndex(index);
    setIsEditing(true); // Set editing state
    setShowLedgerForm(true);
};


const handleDelete = (index) => {
    setAccountLedgers((prev) => prev.filter((_, i) => i !== index));
    toast.success('Account Deleted successfully!', {
        position: "top-right", 
        autoClose: 5000, 
        hideProgressBar: false, 
        closeOnClick: true,
         pauseOnHover: true,
          draggable: true, 
          progress: undefined, 
       });
};

const resetForm = () => {
  setGroup('');
  setSubgroup('');
  setAccountName('');
  setYearOpening(''); // Change from null to ''
  setTypeCode('');
  setDebitCreditCard('');
  setSubGroupCode('');
  setFilterSubGroupName('');
  setFilterGroupName('');
  setFilterSubGroupCode('');
  setFilterGroupCode('');
  setGroupCode('');
  setSubGroupNameChecked(false);
  setGroupNameChecked(false);
  setSubGroupCodeChecked(false);
  setGroupCodeChecked(false);
  setGroupName('');
  setSubGroupName('');
};


    return (
        <div className="account-container">
            {!showLedgerForm && !showSubGroupForm && !showFilterForm && !showManageSubGroupOptions &&(
         <h1 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}>Ledger Account Management</h1>
      )}
   <div className="button-group-front" >
    {!showLedgerForm && !showSubGroupForm && !showFilterForm && !showManageSubGroupOptions && (
        <>
            <Button onClick={() => setShowLedgerForm(true)}  sx={{ backgroundColor: '#6E85A4', marginRight:'5px', color:'white',marginBottom:'10px' }}  >
                Add Account Ledger
            </Button>
            <Button onClick={() => setShowManageSubGroupOptions(true)}  sx={{ backgroundColor: '#6E85A4', marginRight:'5px', color:'white',marginBottom:'10px' }} >
    Add Sub Group
</Button>
            <Button onClick={() => setShowFilterForm(true)}  sx={{ backgroundColor: '#6E85A4', marginRight:'5px', color:'white',marginBottom:'10px' }} >
                Add Filter
            </Button>
        </>
    )}</div>
    {/* Manage Sub Groups section */}

{showManageSubGroupOptions && (
                <div className="manage-sub-group">
               <h2 style={{ textAlign: 'center', marginTop: '0px', marginBottom: '40px' }}>Manage Sub Group</h2>
                <Button onClick={() => {
                    setShowSubGroupForm(true); 
                    setShowManageSubGroupOptions(false); // Hide manage options when adding
                }}  sx={{ backgroundColor: '#6E85A4', marginRight:'5px', color:'white',marginBottom:'10px' }} >
                    Add New Account Sub
                </Button>
                <Button onClick={() => {
                    setShowFilterForm(true); 
                    setShowManageSubGroupOptions(false); // Hide manage options when filtering
                }}  sx={{ backgroundColor: '#6E85A4', marginRight:'5px', color:'white',marginBottom:'10px' }} >
                    Search Sub Group
                </Button>
            </div>
            )}
<ToastContainer/>
{showFilterForm && !showSubGroupForm && !showManageSubGroupOptions &&(
                <form onSubmit={handleFilterSubmit} className="filter-form">
                 <h3 style={{ textAlign: 'center', marginTop: '0px', marginBottom: '30px' }}>Filter Sub Group</h3>
                    <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <div className="input-group">    
                        <label>Sub Group Name</label>                 
                            <TextField
                                value={filterSubGroupName}
                                onChange={(e) => setFilterSubGroupName(e.target.value)}
                                required
                                size="small"                               
                            />
                        </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className ="input-group">   
                                <label>Group Name</label>                           
                            <TextField
                                value={filterGroupName}
                                onChange={(e) => setFilterGroupName(e.target.value)}
                                required
                                size="small"
                                                            />
                        </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="input-group">
                                    <label>Sub Group Code</label>
                            <TextField
                                value={filterSubGroupCode}
                                onChange={(e) => setFilterSubGroupCode(e.target.value)}
                                enable={subGroupCodeChecked}
                               size="small"
                            />
                        </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="input-group">
                                <label> Group Code</label>
                            <TextField
                                value={filterGroupCode}
                                onChange={(e) => setFilterGroupCode(e.target.value)}
                                enable={groupCodeChecked}
                                size="small"
                            />
                        </div>
                        </Grid>
                    </Grid>
                    <div className="button-group-bottom">
                        <button type="submit" className="submit">Search</button>
                        <button type="button" onClick={() => { 
                setShowFilterForm(false); 
                setShowManageSubGroupOptions(false); // Hide manage options on cancel
            }} className="cancel">Cancel</button>
                    </div>
                </form>
            )}

{showSubGroupForm && !showManageSubGroupOptions && (
    <form onSubmit={handleSubGroupSubmit} className="subgroup-form">
       <h3 style={{ textAlign: 'center', marginTop: '0px', marginBottom: '30px' }}>
  {issubEditing ? "Edit Sub Group" : "Add New Sub Group"}</h3>
         <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
      <div className="input-group">
        <label >Group</label>
        <Select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          required
          style={{ width: '100%', height: '40px' }}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="Group 1">Group 1</MenuItem>
          <MenuItem value="Group 2">Group 2</MenuItem>
        </Select>
      </div>
      </Grid>   
      
      <Grid item xs={12} sm={8}>
      <div className="input-group">
        <label>Sub Group Code</label>
        <TextField
          value={subGroupCode}
          onChange={(e) => setSubGroupCode(e.target.value)}
          required
          style={{ width: '100%' }}
          size='small'
        />
      </div>
      </Grid> 
                <Grid item xs={12} sm={8}>
      <div className="input-group">
        <label>Sub Group Name</label>
        <TextField
          value={subgroupname}
          onChange={(e) => setSubGroupName(e.target.value)}
          required
          style={{ width: '100%',fontWeight:'bold' }}
          size='small'
        />
      </div>
</Grid>
</Grid>
      <div className="button-group-bottom">
        <button type="submit" className="submit">{issubEditing ? "Update" : "Save"}</button>
        <button type="button" onClick={() => { 
                setShowSubGroupForm(false); 
                setShowManageSubGroupOptions(true); // Hide manage options on cancel
                resetForm(); 
            }} className="cancel">Cancel</button>
      </div>
    </form>
)}
  {/* Material React Table for Sub Groups */}
  {!showSubGroupForm && !showLedgerForm && !showFilterForm && showManageSubGroupOptions &&(
    <div className='subgrouptable-container' >
    <MaterialReactTable
        columns={[
            { accessorKey: 'srNo', header: 'SR No',Cell: ({ row }) => row.index + 1 },
            { accessorKey: 'group', header: 'Group Name' },
            { accessorKey: 'subGroupCode', header: 'Sub Group Code' },
            { accessorKey: 'subgroupname', header: 'Sub Group Name' },
            {
                accessorKey: 'actions',
                header: 'Actions',
                Cell: ({ row }) => (
                    <div>
                        <Button  color="primary" variant="contained" onClick={() => handleEditSubGroup(row.index)}>Edit</Button>
                        <Button  color="secondary" variant="contained" onClick={() => handleDeleteSubGroup(row.index)}>Delete</Button>
                    </div>
                ),
            },
        ]}
        data={subGroups.map((subGroup, index) => ({ ...subGroup, srNo: index + 1 }))}
    /></div>
)}
            {/* Add Account Ledger Form */}
            {showLedgerForm && (
                <AccountLedgerForm
                    onSubmit={handleAddOrUpdateAccountLedger}          
                    onClose={() => setShowLedgerForm(false)}
                    group={group}
                    setGroup={setGroup}
                    subgroup={subgroup}
                    setSubgroup={setSubgroup}
                    accountName={accountName}
                    setAccountName={setAccountName}
                    yearOpening={yearOpening}
                    setYearOpening={setYearOpening}
                    typeCode={typeCode}
                    setTypeCode={setTypeCode}
                    debitCreditCard={debitCreditCard}
                    setDebitCreditCard={setDebitCreditCard}
                    isEditing={isEditing} // Pass down the isEditing state
                />
            )}
 {/* Material React Table to display entries */}
 {!showLedgerForm && !showSubGroupForm && !showFilterForm && !showManageSubGroupOptions &&(
   <div className='accounttable-container' >
 <MaterialReactTable
                columns={[
                  {
                    accessorKey: 'srNo',
                    header: 'SR No',
                    Cell: ({ row }) => row.index + 1, // SR No based on row index
                },
                    { accessorKey: 'group', header: 'Group' },
                    { accessorKey: 'subgroup', header: 'Subgroup' },
                    { accessorKey: 'accountName', header: 'Account Name' },
                    { accessorKey: 'yearOpening', header: 'Year Opening' },
                    { accessorKey: 'typeCode', header: 'Type Code' },
                    { accessorKey: 'debitCreditCard', header: 'Debit/Credit Card' },
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
                data={accountLedgers.map((ledger, index) => ({ ...ledger, srNo: index + 1 }))}
            /></div>
              )}
        </div>
            
    );
};

const AccountLedgerForm = ({
    onSubmit,
    onClose,
    group,
    setGroup,
    subgroup,
    setSubgroup,
    accountName,
    setAccountName,
    yearOpening,
    setYearOpening,
    typeCode,
    setTypeCode,
    debitCreditCard,
    setDebitCreditCard,
    isEditing,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const ledgerData = { group, subgroup, accountName, yearOpening, typeCode, debitCreditCard };
    onSubmit(ledgerData);
};

    return (
        <form onSubmit={handleSubmit} className="form">
            <h3 style={{ textAlign: 'center', marginTop: '0', marginBottom: '30px' }}>
            {isEditing ? "Edit Account Ledger" : "Add Account Ledger"}</h3>
            <div className="form-flex">
                    <div className="form-section">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <div className="input-group">
                        <label>Group</label>
                        <Select
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                            required
                            style={{ width: '100%', height: '40px' }}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="Group 1">Group 1</MenuItem>
                            <MenuItem value="Group 2">Group 2</MenuItem>
                            {/* Add more options as needed */}
                        </Select>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div className="input-group">
                        <label>Subgroup</label>
                        <Select
                            value={subgroup}
                            onChange={(e) => setSubgroup(e.target.value)}
                            required
                            style={{ width: '100%', height: '40px' }}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="Subgroup 1">Subgroup 1</MenuItem>
                            <MenuItem value="Subgroup 2">Subgroup 2</MenuItem>
                            {/* Add more options as needed */}
                        </Select>
                    </div>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <div className="input-group">
                        <label>Account Name</label>
                        <TextField 
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            required
                            style={{ width: '100%'}}
                             size='small'
                        />
                    </div>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <div className="input-group">
                        <label>Year Opening</label>
                        <TextField
                            size="small"
                            value={yearOpening}
                            onChange={(e) => setYearOpening(e.target.value)}
                            required
                        />
                    </div>
                </Grid>
                <Grid item xs={12} sm={8}>
                <div className="input-group">
                        <label>Type Code</label>
                        <Select
                        size='small'
                            value={typeCode}
                            onChange={(e) => setTypeCode(e.target.value)}
                            required
                            style={{ width: '50%', height: '40px' }}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="BalanceSheet">BalanceSheet</MenuItem>
                            <MenuItem value="Profit-loss">Profit-loss</MenuItem>
                            <MenuItem value="Business">Business</MenuItem>
                            {/* Add more options as needed */}
                        </Select>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div className="input-group">
                        <label>Debit/Credit Card</label>
                        <Select
                        size='small'
                            value={debitCreditCard}
                            onChange={(e) => setDebitCreditCard(e.target.value)}
                            required
                            style={{ width: '50%', height: '40px' }}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="Card 1">Card 1</MenuItem>
                            <MenuItem value="Card 2">Card 2</MenuItem>
                            {/* Add more options as needed */}
                        </Select>
                    </div>
                </Grid>
            </Grid>
            </div>
            </div>
            <div className="button-group-bottom">
                <button type="submit" className="submit">{isEditing ? "Update" : "Save"}</button>
                <button type="button" onClick={onClose} className="cancel">Close</button>
            </div>
        </form>
    );
};

export default AccountLedger;
