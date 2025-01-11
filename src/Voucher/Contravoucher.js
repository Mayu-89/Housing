import React, { useState } from 'react';
import { Grid, TextField, Button, Paper,MenuItem,Select } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './journal.css';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';

const ContraVoucherForm = () => {
  {/* Contravoucher*/}
  const [contraDate, setContraDate] = useState('');
    const [crBankcontra, setCrBankcontra] = useState('');
    const [amountWithdrawnCr, setAmountWithdrawnCr] = useState('');
    const [billNocontra, setBillNocontra] = useState('');
    const [drLedger, setDrLedger] = useState('');
    const [amountWithdrawnDr, setAmountWithdrawnDr] = useState('');
    const [transactionTypecontra, setTransactionTypecontra] = useState('');
    const [instNocontra, setInstNocontra] = useState('');
    const [txnNocontra, setTxnNocontra] = useState('');
    const [instDatecontra, setInstDatecontra] = useState('');
    const [bankNamecontra, setBankNamecontra] = useState('');
    const [branchNamecontra, setBranchNamecontra] = useState('');
    const [narrationcontra, setNarrationcontra] = useState('');
    const [contraData, setContraData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
    const [showContraVoucher, setShowContraVoucher] = useState(false);

  const handleContraSubmit = (e) => {
      e.preventDefault();
  
      const newRow = {
        contraDate,
        crBankcontra,
        amountWithdrawnCr,
        billNocontra,
        drLedger,
        amountWithdrawnDr,
        transactionTypecontra,
        instNocontra,
        txnNocontra,
        instDatecontra,
        bankNamecontra,
        branchNamecontra,
        narrationcontra,
      };
  
      if (editingIndex !== null) {
        // Update the existing row
        const updatedData = [...contraData];
        updatedData[editingIndex] = newRow;
        setContraData(updatedData);
        setEditingIndex(null); // Reset editing state
        toast.success("Contra updated Sucessfully!!!");
      } else {
        // Add a new row
        setContraData([...contraData, newRow]);
        toast.success("contra added sucessfully!!!")
      }
  
      // Reset form fields
      resetcontraForm();
    };
  
    // Reset form fields
    const resetcontraForm = () => {
      setContraDate('');
      setCrBankcontra('');
      setAmountWithdrawnCr('');
      setBillNocontra('');
      setDrLedger('');
      setAmountWithdrawnDr('');
      setTransactionTypecontra('');
      setInstNocontra('');
      setTxnNocontra('');
      setInstDatecontra('');
      setBankNamecontra('');
      setBranchNamecontra('');
      setNarrationcontra('');
      setShowContraVoucher(false);
    };
  
    // Handle editing a row
    const handlecontraEdit = (index) => {
      const row = contraData[index];
      setContraDate(row.contraDate);
      setCrBankcontra(row.crBankcontra);
      setAmountWithdrawnCr(row.amountWithdrawnCr);
      setBillNocontra(row.billNocontra);
      setDrLedger(row.drLedger);
      setAmountWithdrawnDr(row.amountWithdrawnDr);
      setTransactionTypecontra(row.transactionTypecontra);
      setInstNocontra(row.instNocontra);
      setTxnNocontra(row.txnNocontra);
      setInstDatecontra(row.instDatecontra);
      setBankNamecontra(row.bankNamecontra);
      setBranchNamecontra(row.branchNamecontra);
      setNarrationcontra(row.narrationcontra);
      setEditingIndex(index);
    };
  
    // Handle deleting a row
    const handlecontraDelete = (index) => {
      const updatedData = contraData.filter((_, i) => i !== index);
      setContraData(updatedData);
      toast.success("contra deleted sucessfully!!!")
    };
  
    // Columns for MaterialReactTable
    const contracolumns = [
      { accessorKey: 'srNo', header: 'SR No' },
      { accessorKey: 'contraDate', header: 'Date' },
      { accessorKey: 'crBankcontra', header: 'Bank from which Cash was Debited' },
      { accessorKey: 'amountWithdrawnCr', header: 'Amount Withdrawn (CR)' },
      { accessorKey: 'billNocontra', header: 'Previous O/S Bills Raised' },
      { accessorKey: 'drLedger', header: 'Ledger: Bank / Cash where Money was Deposited' },
      { accessorKey: 'amountWithdrawnDr', header: 'Amount Withdrawn (DR)' },
      { accessorKey: 'transactionTypecontra', header: 'Transaction Type' },
      { accessorKey: 'instNocontra', header: 'Inst. No.' },
      { accessorKey: 'txnNocontra', header: 'Cheque No. / Txn No.' },
      { accessorKey: 'instDatecontra', header: 'Inst. Date' },
      { accessorKey: 'bankNamecontra', header: 'Bank Name' },
      { accessorKey: 'branchNamecontra', header: 'Branch Name' },
      { accessorKey: 'narrationcontra', header: 'Narration' },
      {
        accessorKey: 'actions',
        header: 'Actions',
        Cell: ({ row }) => (
          <div>
            <Button onClick={() => handlecontraEdit(row.index)} color="primary">
              Edit
            </Button>
            <Button onClick={() => handlecontraDelete(row.index)} color="secondary">
              Delete
            </Button>
          </div>
        ),
      },
    ];
  
  return (
    <div className="voucher-container">
          {/* Show Form Button */}
          {!showContraVoucher &&(
                  <div className="button-group-front-voucher">      
          <Button onClick={() => setShowContraVoucher(true)} sx={{ backgroundColor: '#6E85A4', color: 'white' }}>
            Contra Voucher
          </Button>
          </div>
          )}
    {/*Contra voucher */}
    { showContraVoucher && (
        <form onSubmit={handleContraSubmit} className="contra-form">
      <h2 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}>Contra Voucher</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <div className="input-group">
        <label>Date</label>
          <TextField
            size="small"
            type="date"
            value={contraDate}
            onChange={(e) => setContraDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          /></div>
        </Grid>
        <Grid item xs={12} sm={6}>
        <div className="input-group">
        <label>Cr Bank</label>
          <select
            value={crBankcontra}
            onChange={(e) => setCrBankcontra(e.target.value)}
            style={{ width: '50%', height: '35px' }}
          >
            <option value="">Select Bank</option>
            <option value="MDCC Bank">MDCC Bank</option>
            <option value="Saraswat Bank">Saraswat Bank</option>
            <option value="Cash">Cash</option>
          </select></div>
        </Grid>
        <Grid item xs={12} sm={6}>
        <div className="input-group">
        <label>Amount Withdrawn (CR)</label>
          <TextField
            size="small"
            type="number"
            value={amountWithdrawnCr}
            onChange={(e) => setAmountWithdrawnCr(e.target.value)}        
          /></div>
        </Grid>
        <Grid item xs={12} sm={6}>
        <div className="input-group">
        <label>Bill Contra</label>
          <select
            value={billNocontra}
            onChange={(e) => setBillNocontra(e.target.value)}
            style={{ width: '50%', height: '35px' }}
          >
            <option value="">Select Bill</option>
            <option value="bill1">Bill 1</option>
            <option value="bill2">Bill 2</option>
            <option value="bill3">Bill 3</option>
          </select></div>
        </Grid>
        <Grid item xs={12} sm={6}>
        <div className="input-group">
        <label>Dr.Ledge</label>
          <select
            value={drLedger}
            onChange={(e) => setDrLedger(e.target.value)}
            style={{ width: '50%', height: '35px' }}
          >
            <option value="">Select Ledger</option>
            <option value="MDCC Bank">MDCC Bank</option>
            <option value="Saraswat Bank">Saraswat Bank</option>
            <option value="Cash">Cash</option>
          </select></div>
        </Grid>
        <Grid item xs={12} sm={6}>
        <div className="input-group">
        <label>Amount Withdrawn (DR)</label>
          <TextField
            size="small"       
            type="number"
            value={amountWithdrawnDr}
            onChange={(e) => setAmountWithdrawnDr(e.target.value)}     
          /></div>
        </Grid>
        <Grid item xs={12} sm={6}>
        <div className="input-group">
        <label>Transaction Type</label>
          <select
            value={transactionTypecontra}
            onChange={(e) => setTransactionTypecontra(e.target.value)}
            style={{ width: '50%', height: '35px' }}
          >
            <option value="">Select Transaction Type</option>
            <option value="NEFT">NEFT</option>
            <option value="IMPS">IMPS</option>
            <option value="UPI">UPI</option>
            <option value="Cheque">Cheque</option>
          </select></div>
        </Grid>
        <Grid item xs={12} sm={6}>
        <div className="input-group">
        <label>Inst.No</label>
          <TextField
            size="small"
            type="text"
            value={instNocontra}
            onChange={(e) => setInstNocontra(e.target.value)}      
          /></div>
        </Grid>
        <Grid item xs={12} sm={6}>
        <div className="input-group">
        <label>Cheque No. /Txn No.</label>
          <TextField
            size="small"
            type="text"
            value={txnNocontra}
            onChange={(e) => setTxnNocontra(e.target.value)}       
          /></div>
        </Grid>
        <Grid item xs={12} sm={6}>
        <div className="input-group">
        <label>Inst.Date</label>
          <TextField
            size="small"
            type="date"
            value={instDatecontra}
            onChange={(e) => setInstDatecontra(e.target.value)}     
            InputLabelProps={{
              shrink: true,
            }}
          /></div>
        </Grid>
        <Grid item xs={12} sm={6}>
        <div className="input-group">
        <label>Bank Name</label>
          <TextField
            size="small"
            value={bankNamecontra}
            onChange={(e) => setBankNamecontra(e.target.value)}       
          /></div>
        </Grid>
        <Grid item xs={12} sm={6}>
        <div className="input-group">
        <label>Branch Name</label>
          <TextField
            size="small"
            value={branchNamecontra}
            onChange={(e) => setBranchNamecontra(e.target.value)}         
          /></div>
        </Grid>
        <Grid item xs={12} sm={8}>
        <div className="input-group">
        <label>Narration</label>
          <TextField
            size="small"
            value={narrationcontra|| "Details for cash withdrawal / transfer"}
            onChange={(e) => setNarrationcontra(e.target.value)}
            fullWidth
            multiline
            rows={4}
          /></div>
        </Grid>
        <Grid item xs={12}>
        <div className="button-group-bottom">
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '50px' }}>
            <button variant="contained" color="primary" className="submit">
              {editingIndex !== null ? 'Update' : 'Save'}
            </button>
            <button variant="contained" color="secondary" className="cancel" onClick={resetcontraForm}>
              Cancel
            </button></div>
          </div>
        </Grid>
    
      <Grid item xs={12}>
            < div style={{ display: 'flex', gap: '10px' ,justifyContent:'center',marginTop:'50px'}}>
            <Button
            variant="contained"
            color="secondary"
            // onClick={previewPDF} // Trigger PDF generation
          
          >
            Preview Report
          </Button>
          <Button variant="contained" color="success" 
        //   onClick={generatePDF} 
         >
            Generate Report
          </Button>
          </div>
          </Grid>
          </Grid>
    </form>
      )}
      { !showContraVoucher&&(
        <Paper style={{ marginTop: '20px', padding: '10px', maxWidth: '1000px', margin: '0 auto' }}>
        <MaterialReactTable
          columns={contracolumns}
          data={contraData}
        />
      </Paper>
      )}
        <ToastContainer />
    </div>
  );
};

export default ContraVoucherForm;
					
									
