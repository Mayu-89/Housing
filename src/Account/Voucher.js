import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';
import {MaterialReactTable} from 'material-react-table';
import './voucher.css'; // Import your custom CSS file

const Voucher = () => {
  const [showNewCashCredit, setShowNewCashCredit] = useState(false);
  const [voucherNo, setVoucherNo] = useState('');
  const [date, setDate] = useState('');
  const [creditAccount, setCreditAccount] = useState('');
  const [debitAccount, setDebitAccount] = useState('');
  const [debitEntries, setDebitEntries] = useState([]);
  const [debitTotal, setDebitTotal] = useState(0);
  const [creditAccountDetail, setCreditAccountDetail] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [creditEntries, setCreditEntries] = useState([]);
  const [creditTotal, setCreditTotal] = useState(0);
  const [voucherDetail, setVoucherDetail] = useState('');
  const [debitAmount, setDebitAmount] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('');
  const [member, setMember] = useState('');
  const [narration, setNarration] = useState('');
// New state for table entries
const [entries, setEntries] = useState([]);
const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null); // Track which record is being edited
  const [records, setRecords] = useState([]);


 /* const [showNewCashDebit, setShowNewCashDebit] = useState(false);
  const [showNewBankCredit, setShowNewBankCredit] = useState(false);
  const [showNewBankDebit, setShowNewBankDebit] = useState(false);
  const [showNewContra, setShowNewContra] = useState(false);*/
  const [showJournalVoucher, setShowJournalVoucher] = useState(false);

  const resetForms = () => {
    setShowNewCashCredit(false);
    setShowJournalVoucher(false);
    setVoucherNo('');
    setDate('');
    setCreditAccount('');
    setVoucherDetail('');
    setDebitAmount('');
    setDebitAccount('');
  setDebitAmount('');
  setDebitEntries([]);
  setDebitTotal(0);
  setCreditAccountDetail('');
  setCreditAmount('');
  setCreditEntries([]);
  setCreditTotal(0);
    setAmount('');
    setTotal(0);
    setMember('');
    setNarration('');
    setEntries([]); // Reset entries if needed
  };
  const addEntry = () => {
    if (debitAmount && amount) {
      const newEntry = {
        debitAmount,
        amount: parseFloat(amount),
      };
      setEntries([...entries, newEntry]);
      setTotal(total + parseFloat(amount)); // Update total
      setDebitAmount(''); // Reset the debit amount field
      setAmount(''); // Reset the amount field
    }
  };
  const addDebitEntry = () => {
    const newEntry = { debitAccount, debitAmount };
    setDebitEntries([...debitEntries, newEntry]);
    setDebitTotal(prevTotal => prevTotal + Number(debitAmount));
    setDebitAmount('');
  };

  const addCreditEntry = () => {
    const newEntry = { creditAccount: creditAccountDetail, creditAmount };
    setCreditEntries([...creditEntries, newEntry]);
    setCreditTotal(prevTotal => prevTotal + Number(creditAmount));
    setCreditAmount('');
  };

 

  const columns = [
    { accessorKey: 'srNo', header: 'SR No',Cell: ({ row }) => row.index + 1 },
    { accessorKey: 'voucherNo', header: 'Voucher No' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'member', header: 'Member' },
    { accessorKey: 'narration', header: 'Narration' },
    {  accessorKey: 'debitAmount', header: 'Debit Amount' },
    { accessorKey: 'amount', header: 'Amount' },
    {
      header: 'Actions',
      Cell: ({ row }) => (
          <div>
              <Button onClick={() => handleEdit(row.original)}>Edit</Button>
              <Button onClick={() => handleDelete(row.original.id)}>Delete</Button>
          </div>
      ),
  },
  ];

  const handleSave = (e) => {
    e.preventDefault();

    const newEntry = {
      voucherNo,
      date,
      creditAccount,
      entries, // Debit and Credit entry values
      total, // Total value for the transaction
      member,
      narration,
    };

    if (isEditing) {
      const updatedEntries = [...entries];
      updatedEntries[selectedIndex] = newEntry; // Replace the updated entry
      setEntries(updatedEntries);
    } else {
      setEntries([...entries, newEntry]); // Add new entry to the list
    }

    resetForms(); // Reset the form after saving
  };

  
  // const handleAddOrUpdateEntry = () => {
  //   const newEntry = {
  //     voucherNo,
  //     date,
  //     amount,
  //     debitAmount,
  //     member,
  //     narration,
  //   };

  //   if (isEditing) {
  //     const updatedEntries = [...entries];
  //     updatedEntries[editingIndex] = newEntry; // Update the entry at the editing index
  //     setEntries(updatedEntries);
  //     setIsEditing(false);
  //     setEditingIndex(null);
  //   } else {
  //     setEntries([...entries, newEntry]);
  //   }

  //   resetForms(); // Reset form after submission or update
  // };

  const handleEdit = (index) => {
    setSelectedIndex(index);
    const entry = entries[index];
    setVoucherNo(entry.voucherNo);
    setDate(entry.date);
    setCreditAccount(entry.creditAccount);
    setDebitAmount(entry.debitAmount);
    setAmount(entry.amount);
    setTotal(entry.total);
    setMember(entry.member);
    setNarration(entry.narration);
    setIsEditing(true);
  };
  const handleDelete = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
  };

  return (
    <div className="voucher-container">
      {!showNewCashCredit && !showJournalVoucher &&(
      <h1 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}>Manage</h1>
      )}
      {!showNewCashCredit && !showJournalVoucher &&(
        <div className="button-group-front">
          <Button onClick={() => { resetForms(); setShowNewCashCredit(true); }} sx={{ backgroundColor: '#6E85A4', marginRight:'5px', color:'white' }} >
            Add New Cash Credit
          </Button>
          <Button onClick={() => { resetForms(); setShowNewCashCredit(true); }} sx={{ backgroundColor: '#6E85A4', marginRight:'5px', color:'white' }} >
            Add New Cash Debit
          </Button>
          <Button onClick={() => { resetForms(); setShowNewCashCredit(true); }} sx={{ backgroundColor: '#6E85A4', marginRight:'5px', color:'white' }} >
            Add New Bank Credit
          </Button>
          <Button onClick={() => { resetForms(); setShowNewCashCredit(true); }}  sx={{ backgroundColor: '#6E85A4', marginRight:'5px', color:'white' }}>
            Add New Bank Debit
          </Button>
          <Button onClick={() => { resetForms(); setShowNewCashCredit(true); }}  sx={{ backgroundColor: '#6E85A4', marginRight:'5px', color:'white' }}>
            New Contra
          </Button>
          <Button onClick={() => { resetForms(); setShowJournalVoucher(true); }} sx={{ backgroundColor: '#6E85A4', marginRight:'5px', color:'white' }}>
            Journal Voucher
          </Button>
        </div>
      )}
<div className="form-voucher">
{showJournalVoucher && !showNewCashCredit &&(
    <form onSubmit={handleSave}>
      <h3 style={{ marginBottom: '20px', textAlign: 'center', marginTop: '0px' }}>
            {isEditing ? 'Edit Journal Voucher' : 'New Journal Voucher'}
          </h3>
       <h3 style={{ marginBottom: '20px',textAlign:'center', marginTop:'0px'}}>Journal Voucher</h3>
  <Grid container spacing={1}>
    <Grid item xs={12} sm={4}>
      <div className="input-group">
        <label>Voucher No</label>
        <TextField 
          size="small"
          value={voucherNo} 
          onChange={(e) => setVoucherNo(e.target.value)} 
          fullWidth
        />
      </div>
    </Grid>  
    <Grid item xs={12} sm={4}>
      <div className="input-group">
        <label>Date</label>
        <TextField 
          size="small"
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          InputLabelProps={{ shrink: true }} 
          fullWidth
        />
      </div>
    </Grid>
    <Grid item xs={12} sm={12}>
        <label style={{ color: 'purple',fontWeight:'bold' }}>Debit Account Detail</label>  
    </Grid>
    <Grid item xs={12} sm={6}>
      <div className="input-group">
        <label>Debit Account</label>
        <Select 
          size="small"
          value={debitAccount} 
          style={{ width: '80%' }} 
          onChange={(e) => setDebitAccount(e.target.value)} 
        >
          <MenuItem value="Account1">Account 1</MenuItem>
          <MenuItem value="Account2">Account 2</MenuItem>
          {/* Add more accounts as needed */}
        </Select>
      </div>
    </Grid>
    <Grid item xs={12} sm={4}>
      <div className="input-group">
        <label>Amount</label>
        <TextField 
          size="small"
          value={debitAmount} 
          onChange={(e) => setDebitAmount(e.target.value)} 
          type="number" 
        />
      </div>
    </Grid>
    <Grid item xs={12} sm={2}>
   <Button variant="contained" color="primary" onClick={addDebitEntry}>
        Add Debit
      </Button></Grid>
    <Grid item xs={12} sm={12}>
      <div className="voucher">
        <table className="table">
          <thead>
            <tr>
              <th>Debit Account</th>
              <th>Debit Amount</th>
            </tr>
          </thead>
          <tbody>
            {debitEntries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.debitAccount}</td>
                <td>{entry.debitAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Grid>
    <Grid item xs={12} sm={4}>
      <div className="input-group">
        <label>Debit Total</label>
        <TextField 
          size="small"
          value={debitTotal} 
          onChange={(e) => setDebitTotal(e.target.value)} 
          type="number" 
          readOnly // Make this read-only
        />
      </div>
    </Grid>
    <Grid item xs={12} sm={12}>
        <label style={{ color: 'green',fontWeight:'bold' }}>Credit Account Detail</label>
    </Grid>
    <Grid item xs={12} sm={6}>
      <div className="input-group">
        <label>Credit Account</label>
        <Select 
          size="small"
          value={creditAccountDetail} 
          style={{ width: '80%' }} 
          onChange={(e) => setCreditAccountDetail(e.target.value)} 
        >
          <MenuItem value="Account1">Account 1</MenuItem>
          <MenuItem value="Account2">Account 2</MenuItem>
          {/* Add more accounts as needed */}
        </Select>
      </div>
    </Grid> 
    <Grid item xs={12} sm={4}>
      <div className="input-group">
        <label>Amount</label>
        <TextField 
          size="small"
          value={creditAmount} 
          onChange={(e) => setCreditAmount(e.target.value)} 
          type="number" 
        />
      </div>
    </Grid>
    <Grid item xs={12} sm={2}>
    <Button variant="contained" color="primary" onClick={addCreditEntry}>
        AddCredit
      </Button></Grid>
    <Grid item xs={12} sm={12}>
      <div className="voucher">
        <table className="table">
          <thead>
            <tr>
              <th>Credit Account</th>
              <th>Credit Amount</th>
            </tr>
          </thead>
          <tbody>
            {creditEntries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.creditAccount}</td>
                <td>{entry.creditAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Grid>
    <Grid item xs={12} sm={4}>
      <div className="input-group">
        <label>Credit Total</label>
        <TextField 
          size="small"
          value={creditTotal} 
          onChange={(e) => setCreditTotal(e.target.value)} 
          type="number" 
          readOnly // Make this read-only
        />
      </div>
    </Grid>
    <Grid item xs={12} sm={8}>
      <div className="input-group">
        <label>Member</label>
        <Select 
          size="small"
          value={member} 
          style={{ width: '100%' }} 
          onChange={(e) => setMember(e.target.value)} 
        >
          <MenuItem value="Member1">Member 1</MenuItem>
          <MenuItem value="Member2">Member 2</MenuItem>
          {/* Add more members as needed */}
        </Select>
      </div>
    </Grid>
    <Grid item xs={12} sm={12}>
      <div className="input-group">
        <label>Narration</label>
        <TextField 
          fullWidth
          value={narration} 
          onChange={(e) => setNarration(e.target.value)} 
          multiline 
          rows={4} 
        />
      </div>
    </Grid>
  </Grid>
  <div className="button-group-bottom">
    <button type="submit" className="submit">
    {isEditing ? 'Update' : 'Save'}
    </button>
    <button type="button" onClick={resetForms} className="cancel">
      Close
    </button>
  </div>
</form>
)}
</div>
{!showNewCashCredit && !showJournalVoucher &&(
  <div className='vouchertable-container' >
        <MaterialReactTable
          className="material-react-table" // Apply the class here
          columns={columns}
          data={records} // Pass the records as data for the table
          muiTableHeadCellProps={{
            style: {
              backgroundColor: '#E9ECEF',
              color: 'black',
              fontSize: '16px',
            },
          }}
        />
      </div>
)}
      {/* <div className="form-container"> */}
        {showNewCashCredit && (
             <form onSubmit={handleSave}>
                <h3 style={{ marginBottom: '20px',textAlign:'center',marginTop:'0' }}>
                {isEditing ? 'Edit New Cash Debit' : 'New Cash Debit'}</h3>
               <div className="form-section">         
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <div className="input-group">
              <label>Voucher No</label>
                <TextField 
                size="small"
                  value={voucherNo} 
                  onChange={(e) => setVoucherNo(e.target.value)} 
                  style={{ marginleft: '10px'}}
                />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
              <div className="input-group">
              <label>Date</label>
                <TextField 
                  size="small"
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                  style={{ marginRight: '10px'}}
                />
                </div>
              </Grid>
              <Grid item xs={12} sm={8}>
              <div className="input-group">              
                  <label>Credit Account</label>
                  <Select 
                   size="small"
                    value={creditAccount} 
                    onChange={(e) => setCreditAccount(e.target.value)}
                    style={{ width: '70%' ,marginleft: '40px'}}
                  >
                    <MenuItem value="Account1">Account 1</MenuItem>
                    <MenuItem value="Account2">Account 2</MenuItem>
                    {/* Add more accounts as needed */}
                  </Select>
                </div>
              </Grid>
              <Grid item xs={12} sm={8}>
              <div className="input-group">
              <label style={{ color: 'blue' }}>Voucher Detail</label>
              </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="input-group">
                  <label>Debit Account</label>
                  <Select 
                    size="small"
                    value={debitAmount} 
                    style={{ width: '80%' }}
                    onChange={(e) => setDebitAmount(e.target.value)}
                  >
                    <MenuItem value="Account1">Account 1</MenuItem>
                    <MenuItem value="Account2">Account 2</MenuItem>
                    {/* Add more accounts as needed */}
                  </Select>
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
              <div className="input-group">
              <label>Amount</label>
                <TextField 
                   size="small"
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  type="number" 
                />
                </div>
              </Grid>
              <Grid item xs={12} sm={2}>
              <Button variant="contained" size="small" color="primary" onClick={addEntry}>
                    Add
                  </Button></Grid>              
               {/* Display the entries in a simple table */}
               <Grid item xs={12}>
<div className="voucher">
  <table className="table">
    <thead>
      <tr>
        <th>Debit Account</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      {entries.map((entry, index) => (
        <tr key={index}>
          <td>{entry.debitAmount}</td>
          <td>{entry.amount}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
              </Grid>
              <Grid item xs={12} sm={4}>
              <div className="input-group">
              <label>Total</label>
                <TextField 
                 size="small"
                  value={total} 
                  onChange={(e) => setTotal(e.target.value)} 
                  type="number" 
                  readOnly // Make this read-only
                />
                </div>
              </Grid>
              <Grid item xs={12} sm={8}>
              <div className="input-group">
                <label>Member</label>
                  <Select 
                   size="small"
                    value={member} 
                    style={{ width: '100%' }}
                    onChange={(e) => setMember(e.target.value)}
                  >
                    <MenuItem value="Member1">Member 1</MenuItem>
                    <MenuItem value="Member2">Member 2</MenuItem>
                    {/* Add more members as needed */}
                  </Select>
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
              <div className="input-group">
              <label>Narration</label>
                <TextField 
                  fullWidth
                  value={narration} 
                  onChange={(e) => setNarration(e.target.value)} 
                  multiline 
                  rows={4} 
                />
                </div>
              </Grid>
            </Grid>
            <div className="button-group-bottom">
            <button type="submit" className="submit">
    {isEditing ? 'Update' : 'Save'}
    </button>
              <button type="button" onClick={resetForms}className="cancel">
                Close
              </button>
            </div>
            </div>
          </form>
        )}
      </div>
    // </div>
  );
};

export default Voucher;
