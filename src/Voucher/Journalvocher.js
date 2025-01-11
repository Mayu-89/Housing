import React, { useState } from 'react';
import { Grid, TextField, Button, Paper,MenuItem,Select } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './journal.css';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';

const JournalVoucherForm = () => {
  const [journalDate, setJournalDate] = useState('');
  const [debitName, setDebitName] = useState('');
  const [debitAmount, setDebitAmount] = useState('');
  const [creditName, setCreditName] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [narration, setNarration] = useState('');
  const [entries, setEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); 
  const [showJournalVoucher, setShowJournalVoucher] = useState(false);
 
  const [pdfPreview, setPdfPreview] = useState(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
 


 
  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!journalDate || !debitName || !debitAmount || !creditName || !creditAmount || !narration) {
      alert("Please fill in all fields.");
      return;
    }

    // New entry object
    const newEntry = {
      srNo: entries.length + 1,
      journalDate,
      debitName,
      debitAmount,
      creditName,
      creditAmount,
      narration,
    };

    console.log("New Entry:", newEntry); // Debugging to see if the new entry is correct

    // If editing, update the entry, otherwise add a new one
    if (editingIndex !== null) {
      const updatedEntries = [...entries];
      updatedEntries[editingIndex] = newEntry;
      setEntries(updatedEntries);
      setEditingIndex(null);
      toast.success("Voucher updated successfully");
    } else {
      setEntries([...entries, newEntry]);
      toast.success("Voucher added successfully");
    }
    handleClose();
  };

  // Edit handler
  const handleEdit = (index) => {
    const entry = entries[index];
    setJournalDate(entry.journalDate);
    setDebitName(entry.debitName);
    setDebitAmount(entry.debitAmount);
    setCreditName(entry.creditName);
    setCreditAmount(entry.creditAmount);
    setNarration(entry.narration);
    setEditingIndex(index);
    setShowJournalVoucher(true);
  };

  // Delete handler
  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    toast.success("Voucher deleted successfully");
  };
  const handleClose = () => {
    // Reset the form values to their initial state
    setJournalDate('');
    setDebitName('');
    setDebitAmount('');
    setCreditName('');
    setCreditAmount('');
    setNarration('');
    setEditingIndex(null);
    // Hide the form by setting the flag to false
    setShowJournalVoucher(false);
  };


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
  const columns = [
    { accessorKey: 'srNo', header: 'SR No' },
    { accessorKey: 'journalDate', header: 'Date' },
    { accessorKey: 'debitName', header: 'Dr. Name' },
    { accessorKey: 'debitAmount', header: 'Dr. Amount' },
    { accessorKey: 'creditName', header: 'Cr. Name' },
    { accessorKey: 'creditAmount', header: 'Cr. Amount' },
    { accessorKey: 'narration', header: 'Narration' },
    {
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <div>
          <Button color="primary" variant="contained" onClick={() => handleEdit(row.index)}>
            Edit
          </Button>
          <Button color="secondary" variant="contained" onClick={() => handleDelete(row.index)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  console.log("Entries in state:", entries); // Debugging to see the entries state

  return (
    <div className="voucher-container">
      {/* Show Form Button */}
      {!showJournalVoucher && (
              <div className="button-group-front-voucher">      
        <Button onClick={() => setShowJournalVoucher(true)} sx={{ backgroundColor: '#6E85A4', color: 'white' }}>
          Journal Voucher
        </Button>     
      </div>
      )}
     


      {/* Journal Voucher Form */}
      {showJournalVoucher && (
        <form onSubmit={handleSubmit} className="voucher-form">
          <h2 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}>Journal Voucher</h2>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
          <div className="input-group">
            <label>Date</label>
            <TextField          
              type="date"
              value={journalDate}
              fullWidth
              onChange={(e) => setJournalDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={8}>
          <div className="input-group">
          <label>Debit Name</label>
            <TextField
             size="small"
              value={debitName}
              onChange={(e) => setDebitName(e.target.value)}   
              fullWidth          
            />
          </div>
          </Grid>
          <Grid item xs={12} sm={8}>
          <div className="input-group">
          <label>Debit Amount</label>
            <TextField
            size="small"
              type="number"
              value={debitAmount}
              onChange={(e) => setDebitAmount(e.target.value)}   
              fullWidth        
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={8}>
          <div className="input-group">
          <label>Credit Name</label>
            <TextField
          size="small"
              value={creditName}
              onChange={(e) => setCreditName(e.target.value)}    
              fullWidth        
            />
          </div>
          </Grid>
          <Grid item xs={12} sm={8}>
          <div className="input-group">
          <label>Credit Amount</label>
            <TextField
           size="small"
              type="number"
              value={creditAmount}
              onChange={(e) => setCreditAmount(e.target.value)}   
              fullWidth         
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="input-group">
          <label>Narration</label>
            <TextField
              size="small"
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
          </div>
        </Grid>
            <Grid item xs={12}>
            <div className="button-group-bottom">
            <button type="submit" className="submit">
                  {editingIndex !== null ? 'Update' : 'Save'}
                </button>
              <button type="button"  className="cancel" onClick={handleClose}>
      Close
    </button></div>
            </Grid> 
            <Grid item xs={12}>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '50px' }}>
          {/* Preview Button */}
          <Button
            variant="contained"
            color="secondary"
            onClick={previewPDF} // Trigger PDF generation
          >
            Preview Report
          </Button>

          {/* Generate Button */}
          <Button
            variant="contained"
            color="success"
            onClick={generatePDF} 
            // disabled={!pdfPreview}
          >
            Generate Report
          </Button>
          {pdfPreview && (
                <div>
                    <h2>PDF Preview</h2>
                    <iframe src={pdfPreview} width="100%" height="500px" title="PDF Preview" />
                </div>
            )}
        </div>
      </Grid>
          </Grid>
        </form>
      )}

{!showJournalVoucher && (
        <Paper style={{ marginTop: '20px', padding: '10px', maxWidth: '1000px', margin: '0 0' }}>
          <MaterialReactTable columns={columns} data={entries} />
        </Paper>
      )}
      <ToastContainer />
    </div>
  );
};

export default JournalVoucherForm;
