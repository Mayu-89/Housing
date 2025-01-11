 
 import React, { useState } from 'react';
 import { Grid, TextField, Button, Paper,MenuItem,Select } from '@mui/material';
 import { MaterialReactTable } from 'material-react-table';
 import { toast, ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 import './journal.css';
 import {jsPDF} from 'jspdf';
 import 'jspdf-autotable';
 
  const ReceiptVoucherForm = () => {
   // Receipt Voucher states
  const [receiptDate, setReceiptDate] = useState('');
  const [memberName, setMemberName] = useState('');
  const [amountReceived, setAmountReceived] = useState('');
  const [refBill, setRefBill] = useState('');
  const [drBank, setDrBank] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [instNo, setInstNo] = useState('');
  const [instDate, setInstDate] = useState('');
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [narrationReceipt, setNarrationReceipt] = useState('Maintenance charges received');
  const [showReceiptVoucher, setShowReceiptVoucher] = useState(false);

    const [pdfPreview, setPdfPreview] = useState(null);
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [entries, setEntries] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
  
    const handleSubmitReceiptVoucher = (event) => {
      event.preventDefault();
    
      // Validation check
      if (!receiptDate || !memberName || !amountReceived || !drBank || !transactionType || !instNo || !instDate || !narrationReceipt) {
        alert("Please fill in all fields.");
        return;
      }
    
      const newReceiptEntry = {
        srNo: entries.length + 1,
        receiptDate,
        memberName,
        amountReceived,
        refBill,
        drBank,
        transactionType,
        instNo,
        instDate,
        bankName,
        branchName,
        narrationReceipt,
      };
    
      // Update or Add entry based on editingIndex
      if (editingIndex !== null) {
        const updatedEntries = [...entries];
        updatedEntries[editingIndex] = newReceiptEntry;
        setEntries(updatedEntries);
        toast.success("Receipt Voucher updated successfully");
      } else {
        setEntries([...entries, newReceiptEntry]);
        toast.success("Receipt Voucher added successfully");
      }
      // Reset form and close
      handleCloseReceiptVoucher();
      setShowReceiptVoucher(true);
    };
    
    const handleEditReceiptVoucher = (index) => {
      const entry = entries[index];
      setReceiptDate(entry.receiptDate);
      setMemberName(entry.memberName);
      setAmountReceived(entry.amountReceived);
      setRefBill(entry.refBill);
      setDrBank(entry.drBank);
      setTransactionType(entry.transactionType);
      setInstNo(entry.instNo);
      setInstDate(entry.instDate);
      setBankName(entry.bankName);
      setBranchName(entry.branchName);
      setNarrationReceipt(entry.narrationReceipt);
      setEditingIndex(index);
      setShowReceiptVoucher(true);
    };
    
    const handleDeleteReceiptVoucher = (index) => {
      const updatedEntries = entries.filter((_, i) => i !== index);
      setEntries(updatedEntries);
      toast.success("Receipt Voucher deleted successfully");
    };
     // Close Receipt Voucher form
     const handleCloseReceiptVoucher = () => {
      setReceiptDate('');
      setMemberName('');
      setAmountReceived('');
      setRefBill('');
      setDrBank('');
      setTransactionType('');
      setInstNo('');
      setInstDate('');
      setBankName('');
      setBranchName('');
      setNarrationReceipt('');
      setEditingIndex(null);
      setShowReceiptVoucher(false);
    };
    /* receiptvouchertable*/
    const receiptColumns = [
        { accessorKey: 'srNo', header: 'SR No' },
        { accessorKey: 'receiptDate', header: 'Receipt Date' },
        { accessorKey: 'memberName', header: 'Member Name' },
        { accessorKey: 'amountReceived', header: 'Amount Received' },
        { accessorKey: 'narrationReceipt', header: 'Narration' },
        {
          accessorKey: 'actions',
          header: 'Actions',
          Cell: ({ row }) => (
            <div>
              <Button color="primary" variant="contained" onClick={() => handleEditReceiptVoucher(row.index)}>
                Edit
              </Button>
              <Button color="secondary" variant="contained" onClick={() => handleDeleteReceiptVoucher(row.index)}>
                Delete
              </Button>
            </div>
          ),
        },
      ];

      const generatePDFContent = (doc) => {
          doc.setFontSize(18);
          doc.text('Receipt Voucher Report', 14, 20);
      
          let yPosition = 30;
      
          // Loop through your data (entries) and add it to the PDF
          entries.forEach((entry, index) => {
            doc.setFontSize(12);
            doc.text(`Receipt No: ${entry.srNo}`, 14, yPosition);
            yPosition += 10;
      
            doc.text(`Receipt Date: ${entry.receiptDate}`, 14, yPosition);
            yPosition += 10;
      
            doc.text(`Member Name: ${entry.memberName}`, 14, yPosition);
            yPosition += 10;
      
            doc.text(`Amount Received: ${entry.amountReceived}`, 14, yPosition);
            yPosition += 10;
      
            doc.text(`Narration: ${entry.narrationReceipt}`, 14, yPosition);
            yPosition += 15; // Extra space between each entry
      
            // Add a horizontal line between records (Optional)
            doc.setLineWidth(0.5);
            doc.line(14, yPosition, 200, yPosition); // Horizontal line
            yPosition += 5;
          });
          
        };
      
        const previewPDF = () => {
          const doc = new jsPDF();
           generatePDFContent(doc);
      
          // // Convert the PDF to base64 string for preview
          // const pdfBase64 = doc.output('datauristring');
          // setPdfPreview(pdfBase64);  // Save the base64 string to state for previewing
        };
      
        const generatePDF = () => {
          const doc = new jsPDF();
          generatePDFContent(doc);
      
          // Save the PDF
          doc.save('ReceiptVoucherReport.pdf');
        };
    return (
        <div className="voucher-container">
              {/* Show Form Button */}
              {!showReceiptVoucher && (
                      <div className="button-group-front-voucher">                      
                <Button onClick={() => setShowReceiptVoucher(true)} sx={{ backgroundColor: '#6E85A4', color: 'white' }}>
                Receipt Voucher
              </Button>
              </div>
              )}
       {/* Receipt Voucher Form */}
            {showReceiptVoucher && (
              <form onSubmit={handleSubmitReceiptVoucher} className="voucher-form">
                <h2 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}>Receipt Voucher</h2>
                <Grid container spacing={2}>
                  {/* Receipt Date */}
                  <Grid item xs={12} sm={6}>
                    <div className="input-group">
                      <label>Date</label>
                      <TextField
                        size="small"
                        type="date"
                        value={receiptDate}
                        onChange={(e) => setReceiptDate(e.target.value)}               
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  </Grid>
                  {/* CR (Member Name) */}
                  <Grid item xs={12} sm={6}>
                    <div className="input-group">
                      <label>CR - Name of Member</label>
                      <TextField
                        size="small"
                        value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}            
                      />
                    </div>
                  </Grid>
                  {/* Amount Received */}
                  <Grid item xs={12} sm={6}>
                    <div className="input-group">
                      <label>Amount Received</label>
                      <TextField
                        size="small"
                        type="number"
                        value={amountReceived}
                        onChange={(e) => setAmountReceived(e.target.value)}             
                      />
                    </div>
                  </Grid>
                  {/* Reference Bill */}
                  <Grid item xs={12} sm={6}>
                    <div className="input-group">
                      <label>Ref: Previous O/S Bills</label>             
                        <Select
                          size="small"
                          value={refBill}
                          onChange={(e) => setRefBill(e.target.value)}
                          className="custom-select" 
                        >
                          <MenuItem value="bill1">Bill 1</MenuItem>
                          <MenuItem value="bill2">Bill 2</MenuItem>
                          <MenuItem value="bill3">Bill 3</MenuItem>
                        </Select>              
                    </div>
                  </Grid>
                  {/* DR Bank (Select Bank) */}
                  <Grid item xs={12} sm={6}>
                    <div className="input-group">
                      <label>DR - Bank</label>               
                        <Select
                          size="small"
                          value={drBank}
                          onChange={(e) => setDrBank(e.target.value)}
                          className="custom-select" 
                        >
                          <MenuItem value="MDCC Bank">MDCC Bank</MenuItem>
                          <MenuItem value="Saraswat Bank">Saraswat Bank</MenuItem>
                          <MenuItem value="Cash">Cash</MenuItem>
                        </Select>              
                    </div>
                  </Grid>
                  {/* Transaction Type */}
                  <Grid item xs={12} sm={6}>
                    <div className="input-group">
                      <label>Transaction Type</label>                 
                        <Select
                        size="small"
                          value={transactionType}
                          onChange={(e) => setTransactionType(e.target.value)}
                          className="custom-select" 
                        >
                          <MenuItem value="NEFT">NEFT</MenuItem>
                          <MenuItem value="IMPS">IMPS</MenuItem>
                          <MenuItem value="UPI">UPI</MenuItem>
                          <MenuItem value="Cheque">Cheque</MenuItem>
                        </Select>
                     
                    </div>
                  </Grid>
      
                  {/* Instrument No (Cheque No. / Txn No.) */}
                  <Grid item xs={12} sm={6}>
                    <div className="input-group">
                      <label>Inst. No. (Cheque / Txn No.)</label>
                      <TextField
                        size="small"
                        value={instNo}
                        onChange={(e) => setInstNo(e.target.value)}
                        
                      />
                    </div>
                  </Grid>
      
                  {/* Instrument Date */}
                  <Grid item xs={12} sm={6}>
                    <div className="input-group">
                      <label>Inst. Date</label>
                      <TextField
                        size="small"
                        type="date"
                        value={instDate}
                        onChange={(e) => setInstDate(e.target.value)}
                        
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  </Grid>
      
                  {/* Bank Name and Branch */}
                  <Grid item xs={12} sm={6}>
                    <div className="input-group">
                      <label>Bank Name</label>
                      <TextField
                        size="small"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}            
                      />
                    </div>
                  </Grid>
      
                  <Grid item xs={12} sm={6}>
                    <div className="input-group">
                      <label>Branch</label>
                      <TextField
                        size="small"
                        value={branchName}
                        onChange={(e) => setBranchName(e.target.value)}           
                      />
                    </div>
                  </Grid>
      
                  {/* Narration */}
                  <Grid item xs={12} sm={12}>
                    <div className="input-group">
                      <label>Narration</label>
                      <TextField
                        size="small"
                        value={narrationReceipt || "Maintenance charges received"} // Default text
                        onChange={(e) => setNarrationReceipt(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                      />
                    </div>
                  </Grid>
      
                  {/* Buttons */}
                  <Grid item xs={12}>
                    <div className="button-group-bottom">
                    <button type="submit" className="submit">
                        {editingIndex !== null ? 'Update' : 'Save'}
                      </button>
                      <button type="button" className="cancel" onClick={handleCloseReceiptVoucher}>
                        Close
                      </button>
                    </div>
                  </Grid>
                </Grid>
            <Grid item xs={12}>
                  < div style={{ display: 'flex', gap: '10px' ,justifyContent:'center',marginTop:'50px'}}>
                  <Button
                  variant="contained"
                  color="secondary"
                //   onClick={previewPDF} // Trigger PDF generation
                
                >
                  Preview Report
                </Button>
                <Button variant="contained" color="success"
                //  onClick={generatePDF} 
               >
                  Generate Report
                </Button>
                </div>
                </Grid>
              </form>
            )}
            {!showReceiptVoucher && (
            <Paper style={{ marginTop: '20px', padding: '10px', maxWidth: '1000px', margin: '0 auto' }}>
              <MaterialReactTable columns={receiptColumns} data={entries} />
            </Paper>
            )}
              <ToastContainer />
      </div>
    );
  };
  
  export default ReceiptVoucherForm;
                      
                                      
  