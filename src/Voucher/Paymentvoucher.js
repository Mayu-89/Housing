import React, { useState } from 'react';
import { Grid, TextField, Button, Paper,MenuItem,Select } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './journal.css';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';


const PaymentVoucherForm = () => {
  /*Payment voucher */
    const [paymentDate, setPaymentDate] = useState('');
    const [drNamepayment, setDrNamepayment] = useState('');
    const [amountPaidDr, setAmountPaidDr] = useState('');
    const [billNopayment, setBillNopayment] = useState('');
    const [crBank, setCrBank] = useState('');
    const [drName,setDrName] = useState('');
    const [amountPaidCr, setAmountPaidCr] = useState('');
    const [transactionTypepayment, setTransactionTypepayment] = useState('');
    const [instNopayment, setInstNopayment] = useState('');
    const [txnNo, setTxnNo] = useState('');
    const [instDatepayment, setInstDatepayment] = useState('');
    const [narrationpayment, setNarrationpayment] = useState('');
    const [paymentData, setPaymentData] = useState([]);
    const [showPaymentVoucher, setShowPaymentVoucher] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [pdfPreview, setPdfPreview] = useState(null);
    const [isPreviewing, setIsPreviewing] = useState(false);
  const [entries, setEntries] = useState([]);
  // Handle form submission for saving or updating the data
  const handlePaymentSubmit = (e) => {
      e.preventDefault();
  
      const newRow = {
        paymentDate,
        drNamepayment,
        amountPaidDr,
        billNopayment,
        crBank,
        drName,
        amountPaidCr,
        transactionTypepayment,
        instNopayment,
        txnNo,
        instDatepayment,
        narrationpayment
      };
  
      if (editingIndex !== null) {
        // Update the existing row
        const updatedData = [...paymentData];
        updatedData[editingIndex] = newRow;
        setPaymentData(updatedData);
        setEditingIndex(null); // Reset editing state
        toast.success("Payment updated sucessfully!!!")
      } else {
        // Add a new row
        setPaymentData([...paymentData, newRow]);
        toast.success("Payment added sucessfully!!!")
      }
  
      // Reset form fields
      resetpaymentForm();
    };
  
    // Reset form fields
    const resetpaymentForm = () => {
      setPaymentDate('');
      setDrNamepayment('');
      setAmountPaidDr('');
      setBillNopayment('');
      setCrBank('');
      setDrName('');
      setAmountPaidCr('');
      setTransactionTypepayment('');
      setInstNopayment('');
      setTxnNo('');
      setInstDatepayment('');
      setNarrationpayment('');
      setShowPaymentVoucher(false);
    };
  
    // Handle editing a row
    const handlepaymentEdit = (index) => {
      const row = paymentData[index];
      setPaymentDate(row.paymentDate);
      setDrNamepayment(row.drNamepayment);
      setAmountPaidDr(row.amountPaidDr);
      setBillNopayment(row.billNopayment);
      setCrBank(row.crBank);
      setDrName(row.drName);
      setAmountPaidCr(row.amountPaidCr);
      setTransactionTypepayment(row.transactionTypepayment);
      setInstNopayment(row.instNopayment);
      setTxnNo(row.txnNo);
      setInstDatepayment(row.instDatepayment);
      setNarrationpayment(row.narrationpayment);
      setEditingIndex(index);
    };
  
    // Handle deleting a row
    const handlepaymentDelete = (index) => {
      const updatedData = paymentData.filter((_, i) => i !== index);
      setPaymentData(updatedData);
      toast.success("Payment deleted sucessfully!!!");
    };
  
    // Columns for MaterialReactTable
    const paymentcolumns = [
      { accessorKey: 'srNo', header: 'SR No' },
      { accessorKey: 'paymentDate', header: 'Date' },
      { accessorKey: 'drNamepayment', header: 'Name of Creditor / Expense Head' },
      { accessorKey: 'amountPaidDr', header: 'Amount Paid Dr' },
      { accessorKey: 'billNopayment', header: 'Previous O/S Bills Raised' },
      { accessorKey: 'crBank', header: 'Bank' },
      { accessorKey: 'drName', header: 'DrName' },
      { accessorKey: 'amountPaidCr', header: 'Amount Paid Cr' },
      { accessorKey: 'transactionTypepayment', header: 'Transaction Type' },
      { accessorKey: 'instNopayment', header: 'Inst. No.' },
      { accessorKey: 'txnNo', header: 'Cheque No. / Txn No.' },
      { accessorKey: 'instDatepayment', header: 'Inst. Date' },
      { accessorKey: 'narrationpayment', header: 'Narration' },
      {
        accessorKey: 'actions',
        header: 'Actions',
        Cell: ({ row }) => (
          <div>
            <Button onClick={() => handlepaymentEdit(row.index)} color="primary">
              Edit
            </Button>
            <Button onClick={() => handlepaymentDelete(row.index)} color="secondary">
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
        { !showPaymentVoucher &&(
                      <div className="button-group-front-voucher">             
              <Button onClick={() => setShowPaymentVoucher(true)} sx={{ backgroundColor: '#6E85A4', color: 'white' }}>
                Payment Voucher
              </Button>           
              </div>
              )}
    { /* Payment voucher */ }
    { showPaymentVoucher && (
    <form onSubmit={handlePaymentSubmit} className="payment-form">
          <h2 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}>Payment Voucher</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <div className="input-group">
            <label>Date</label>
              <TextField
                size="small"
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
            <div className="input-group">
            <label>DR:Name of Creditor</label>
              <TextField
                size="small"
                type="text"
                value={drName}
                onChange={(e) => setDrName(e.target.value)}     
              />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
            <div className="input-group">
            <label>Amount Paid DR</label>
              <TextField
                size="small"
                type="number"
                value={amountPaidDr}
                onChange={(e) => setAmountPaidDr(e.target.value)}
              
              />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
            <div className="input-group">
            <label>BillNoPayment</label>
              <select
                value={billNopayment}
                onChange={(e) => setBillNopayment(e.target.value)}
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
            <label>CrBank</label>
              <select
                value={crBank}
                onChange={(e) => setCrBank(e.target.value)}
                style={{ width: '50%', height: '35px' }}
              >
                <option value="">Select Bank</option>
                <option value="MDCC Bank">MDCC Bank</option>
                <option value="Saraswat Bank">Saraswat Bank</option>
                <option value="Cash">Cash</option>
              </select>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
            <div className="input-group">
            <label>Amount Paid CR</label>
              <TextField
                size="small"
                type="number"
                value={amountPaidCr}
                onChange={(e) => setAmountPaidCr(e.target.value)}
           
              />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
            <div className="input-group">
            <label>Transaction Type Payment</label>
              <select
                value={transactionTypepayment}
                onChange={(e) => setTransactionTypepayment(e.target.value)}
                style={{ width: '50%', height: '35px' }}
              >
                <option value="">Select Transaction Type</option>
                <option value="NEFT">NEFT</option>
                <option value="IMPS">IMPS</option>
                <option value="UPI">UPI</option>
                <option value="Cheque">Cheque</option>
              </select>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
            <div className="input-group">
            <label>Inst.No</label>
              <TextField
                size="small"
                type="text"
                value={instNopayment}
                onChange={(e) => setInstNopayment(e.target.value)}
           
              />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
            <div className="input-group">
            <label>Cheque No./Txn No.</label>
              <TextField
                size="small"
                type="text"
                value={txnNo}
                onChange={(e) => setTxnNo(e.target.value)}
              />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
            <div className="input-group">
            <label>Inst.Date</label>
              <TextField
                size="small"
                type="date"
                value={instDatepayment}
                onChange={(e) => setInstDatepayment(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </div>
            </Grid>
            <Grid item xs={12} sm={8}>
            <div className="input-group">
            <label>Narration</label>
              <TextField
                size="small"
                value={narrationpayment|| "Paid Security Charges / Housekeeping Charges / Electricity Charges / Water Charges / Manager Charges / Repair charges / Purchase of items "}
                onChange={(e) => setNarrationpayment(e.target.value)}
                fullWidth
                multiline
                rows={4}
              /></div>
            </Grid>
            <Grid item xs={12}>
            <div className="button-group-bottom">
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '50px' }}>
              <button type="submit" className="submit">
                      {editingIndex !== null ? 'Update' : 'Save'}
                    </button>
                  <button type="button"  className="cancel" onClick={resetpaymentForm}>
          Close
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
            //    onClick={generatePDF} 
              >
                Generate Report
              </Button>
              </div>
              </Grid>
              </Grid>
        </form>
    )}
    {!showPaymentVoucher && (
     <Paper style={{ marginTop: '20px', padding: '10px', maxWidth: '1000px', margin: '0 auto' }}>
            <MaterialReactTable
              columns={paymentcolumns}
              data={paymentData}
            />
          </Paper>
    )}
            <ToastContainer />
    </div>
  );
};

export default PaymentVoucherForm;
