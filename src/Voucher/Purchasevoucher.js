import React, { useState } from 'react';
import { Grid, TextField, Button, Paper,MenuItem,Select } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './journal.css';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
const PurchaseVoucherForm = () => {
  
  const [Purchasedate, setPurchaseDate] = useState('');
  const [crName, setCrName] = useState('');
  const [amountBill, setAmountBill] = useState('');
  const [billNo, setBillNo] = useState('');
  const [drName, setDrName] = useState('');
  const [amount, setAmount] = useState('');
  const [tdsPayable, setTdsPayable] = useState('');
  const [sgst, setSgst] = useState('');
  const [cgst, setCgst] = useState('');
  const [customerNo, setCustomerNo] = useState('');
  const [billPeriod, setBillPeriod] = useState('');
  const [billDate, setBillDate] = useState('');
  const [narrationpurchase, setNarrationpurchase] = useState('');
  const [purchaseData, setPurchaseData] = useState([]);  // Data for MaterialReactTable
   const [showPurchaseVoucher, setShowPurchaseVoucher] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

 const [pdfPreview, setPdfPreview] = useState(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
 

  const handlePurchaseSubmit = (e) => {
    e.preventDefault();
  
    // Check if we're editing an existing row or adding a new one
    const newRow = {
      Purchasedate,
      crName,
      billNo,
      amountBill,
      drName,
      amount,
      tdsPayable,
      sgst,
      cgst,
      customerNo,
      billPeriod,
      billDate,
      narrationpurchase,
    };
  
    if (editingIndex !== null) {
      // If editing, update the row
      const updatedData = [...purchaseData];
      updatedData[editingIndex] = newRow;
      setPurchaseData(updatedData);
      setEditingIndex(null); // Reset editing state
      toast.success("Purchasedata updated sucessfully");
    } else {
      // If adding, append new row
      setPurchaseData([...purchaseData, newRow]);
      toast.success("Purchasedata added sucessfully");
    }
  
    // Reset form fields
    resetForm();
  };
  
  const resetForm = () => {
    setPurchaseDate('');
    setCrName('');
    setBillNo('');
    setAmountBill('');
    setDrName('');
    setAmount('');
    setTdsPayable('');
    setSgst('');
    setCgst('');
    setCustomerNo('');
    setBillPeriod('');
    setBillDate('');
    setNarrationpurchase('');
    setShowPurchaseVoucher(false);
  };
  
  const handlepurchaseEdit = (index) => {
    const row = purchaseData[index];
    setPurchaseDate(row.purchaseDate);
    setCrName(row.crName);
    setBillNo(row.billNo);
    setAmountBill(row.amountBill);
    setDrName(row.drName);
    setAmount(row.amount);
    setTdsPayable(row.tdsPayable);
    setSgst(row.sgst);
    setCgst(row.cgst);
    setCustomerNo(row.customerNo);
    setBillPeriod(row.billPeriod);
    setBillDate(row.billDate);
    setNarrationpurchase(row.narrationpurchase);
    setEditingIndex(index);
  };
  
  const handlepurchaseDelete = (index) => {
    const updatedData = purchaseData.filter((_, i) => i !== index);
    setPurchaseData(updatedData);
    toast.success("Purchasedata deleted sucessfully");
  };
  
  // Columns for MaterialReactTable
  const purchasecolumns = [
    { accessorKey: 'srNo', header: 'SR No' },
    { accessorKey: 'Purchasedate', header: 'Date' },
    { accessorKey: 'crName', header: 'Creditor / Invoice Generator' },
    { accessorKey: 'billNo', header: 'Bill No.' },
    { accessorKey: 'amountBill', header: 'Amount of Bill' },
    { accessorKey: 'drName', header: 'Head / Ledger' },
    { accessorKey: 'amount', header: 'Amount' },
    { accessorKey: 'tdsPayable', header: 'TDS Payable' },
    { accessorKey: 'sgst', header: 'SGST @ 9%' },
    { accessorKey: 'cgst', header: 'CGST @ 9%' },
    { accessorKey: 'customerNo', header: 'Customer No.' },
    { accessorKey: 'billPeriod', header: 'Bill Period' },
    { accessorKey: 'billDate', header: 'Bill Date' },
    { accessorKey: 'narrationpurchase', header: 'Narration' },
    {
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <div>
          <Button variant="contained" onClick={() => handlepurchaseEdit(row.index)} color="primary">
            Edit
          </Button>
          <Button variant="contained" onClick={() => handlepurchaseDelete(row.index)} color="secondary">
            Delete
          </Button>
        </div>
      ),
    },
  ];
  
  return (
    <div className="voucher-container">
          {/* Show Form Button */}
          {!showPurchaseVoucher && (
                  <div className="button-group-front-voucher">              
          <Button onClick={() => setShowPurchaseVoucher(true)} sx={{ backgroundColor: '#6E85A4', color: 'white' }}>
            Purchase Voucher
          </Button>
          </div>
          )}
    {/*Purchase Voucher */}
    {showPurchaseVoucher && (
             <form onSubmit={handlePurchaseSubmit} className="purchase-form">
             <h2 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}>Purchase Voucher</h2>
             <Grid container spacing={2}>
             <Grid item xs={12} sm={6}>
             <div className="input-group">
                  <label>Date</label>
                  <TextField
                      size="small"
                    type="date" 
                    value={Purchasedate} 
                    onChange={(e) => setPurchaseDate(e.target.value)} 
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
    </Grid>
    <Grid item xs={12} sm={6}>
                 <div className="input-group">
                  <label>CR: Name of Creditor / Invoice Generator</label>
                  <TextField
                      size="small"
                    type="text" 
                    value={crName} 
                    onChange={(e) => setCrName(e.target.value)} 
                    placeholder="Enter Creditor Name"
                  />
                </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div className="input-group">
                  <label>Ref: Bill No.</label>
                  <select 
                 fullWidth
                  value={billNo} 
                  onChange={(e) => setBillNo(e.target.value)}
                  style={{ width: '220px',height:'35px' }}
                >
                    <option value="">Select Bill</option>
                    <option value="bill1">Bill 1</option>
                    <option value="bill2">Bill 2</option>
                    <option value="bill3">Bill 3</option>
                  </select>
                </div>
    </Grid>
                <Grid item xs={12} sm={6}>
                <div className="input-group">
                  <label>Amount of Bill</label>
                  <TextField 
                      size="small"
                    type="number" 
                    value={amountBill} 
                    onChange={(e) => setAmountBill(e.target.value)} 
                    placeholder="Enter Amount"
                  />
                </div>
                </Grid>
               
    <Grid item xs={12} sm={6}>
                <div className="input-group">
                  <label>DR: Name of Head / Ledger / Expenses Ledger</label>
                  <TextField 
                  size="small"
                    type="text" 
                    value={drName} 
                    onChange={(e) => setDrName(e.target.value)} 
                    placeholder="Enter Ledger Name"
                  />
                </div>
    </Grid>
    <Grid item xs={12} sm={6}>
                <div className="input-group">
                  <label>Amount</label>
                  <TextField 
                      size="small"
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    placeholder="Enter Amount"
                  />
                </div>
    </Grid>
    <Grid item xs={12} sm={6}>
                <div className="input-group">
                  <label>CR: TDS Payable</label>
                  <TextField
                      size="small"
                    type="number" 
                    value={tdsPayable} 
                    onChange={(e) => setTdsPayable(e.target.value)} 
                    placeholder="Enter TDS Payable"
                  />
                </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div className="input-group">
                  <label>Rate as per PAN CARD</label>
                  <TextField
                      size="small" 
                    type="number" 
                    value={sgst} 
                    onChange={(e) => setSgst(e.target.value)} 
                    placeholder="Enter SGST Rate"
                  />
                </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div className="input-group">
                  <label>SGST @ 9%</label>
                  <TextField 
                      size="small"
                    type="number" 
                    value={sgst} 
                    onChange={(e) => setSgst(e.target.value)} 
                    placeholder="Enter SGST Amount"
                  />
                </div>
    </Grid>
    <Grid item xs={12} sm={6}>
                <div className="input-group">
                  <label>CGST @ 9%</label>
                  <TextField 
                      size="small"
                    type="number" 
                    value={cgst} 
                    onChange={(e) => setCgst(e.target.value)} 
                    placeholder="Enter CGST Amount"
                  />
                </div>
    </Grid>
    <Grid item xs={12} sm={6}>
                <div className="input-group">
                  <label>Customer No.</label>
                  <TextField
                      size="small"
                    type="text" 
                    value={customerNo} 
                    onChange={(e) => setCustomerNo(e.target.value)} 
                    placeholder="Enter Customer Number"
                  />
                </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div className="input-group">
                  <label>Bill No.</label>
                  <select 
                 fullWidth
                  value={billNo} 
                  onChange={(e) => setBillNo(e.target.value)}
                  style={{ width: '220px',height:'35px' }}
                >
                    <option value="">Select Bill</option>
                    <option value="bill1">Bill 1</option>
                    <option value="bill2">Bill 2</option>
                    <option value="bill3">Bill 3</option>
                  </select>
                </div>
    </Grid>
    <Grid item xs={12} sm={6}>
                <div className="input-group">
                  <label>Bill Date</label>
                  <TextField 
                  size="small"
                    type="date" 
                    value={billDate} 
                    onChange={(e) => setBillDate(e.target.value)} 
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
    </Grid>
                <Grid item xs={12} sm={6}>
                <div className="input-group">
                  <label>Bill Period</label>
                  <TextField 
                  size="small"
                    type="text" 
                    value={billPeriod} 
                    onChange={(e) => setBillPeriod(e.target.value)} 
                    placeholder="Enter Bill Period"
                  />
                </div>
    </Grid>
    
    <Grid item xs={12} sm={8}>
                <div className="input-group">
                  <label>Narration: Details of Bill</label>
                  <TextField
                    value={narrationpurchase} 
                    onChange={(e) => setNarrationpurchase(e.target.value)} 
                    placeholder="Enter Details"
                    multiline
                    rows={4}
                    fullWidth
                  />
                </div>
    </Grid>
    <Grid item xs={12}>
                <div className="button-group-bottom">
                <button type="submit" className="submit">
                      {editingIndex !== null ? 'Update' : 'Save'}
                    </button>
                  <button type="button"  className="cancel" onClick={resetForm}>
          Close
        </button></div>
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
          {!showPurchaseVoucher && (
          <Paper style={{ marginTop: '20px', padding: '10px', maxWidth: '1000px', margin: '0 auto' }}>
            <MaterialReactTable columns={purchasecolumns} data={purchaseData} />
          </Paper>
          )}
            <ToastContainer />
    </div>
  );
};

export default PurchaseVoucherForm;
					
									
