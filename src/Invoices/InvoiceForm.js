// src/components/InvoiceForm.js
import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import emailjs from 'emailjs-com';
import { TextField,Grid,Button } from '@mui/material';
import './invoice.css';
import { toWords } from 'number-to-words';
const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    memberName: '',
    billNumber: '',
    billDate: '',
    period: '',
    dueDate: '',
    items: [{ description: '', amount: '' }],
    subTotal: 0,
    amountInWords: '',
    narration: '',
    email: '',
    whatsapp: ''
  });
const [showInvoiceform, setShowInvoiceform] = useState(false);
  // Recalculate SubTotal whenever items change
  useEffect(() => {
    const subTotal = formData.items.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
    setFormData({ ...formData, subTotal });
  }, [formData.items]);

  // Handle form input changes
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];
    newItems[index][name] = value;

    setFormData({
      ...formData,
      items: newItems
    });
  };
  const convertAmountToWords = (amount) => {
    return toWords(amount); // Converts the amount to words
  };
  // Add a new item
  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', amount: '' }]
    });
  };

  // Remove an item
  const handleRemoveItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items: newItems
    });
  };

  // Handle form submission (PDF generation and email sending)
 
const handleGeneratePDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Society Bill', 105, 20, null, null, 'center');

  doc.setFontSize(14);
  doc.text(`Member: ${formData.memberName}`, 20, 30);
  doc.text(`Bill Number: ${formData.billNumber}`, 20, 40);
  doc.text(`Bill Date: ${formData.billDate}`, 20, 50);
  doc.text(`Period: ${formData.period}`, 20, 60);
  doc.text(`Due Date: ${formData.dueDate}`, 20, 70);
  doc.text(`Narration: ${formData.narration}`, 20, 80);

  // Headers and body for the table
  const headers = [['Description', 'Amount']];
  const body = formData.items.map((item, index) => [
    item.description,
    item.amount
  ]);

  // Add table with borders and adjusted header height
  doc.autoTable({
    head: headers,
    body: body,
    startY: 90,
    theme: 'grid',
    headStyles: { fillColor: [0, 82, 204], minCellHeight: 10 }, // Adjust header height
    styles: { cellPadding: 3, fontSize: 10, lineColor: [0, 0, 0], lineWidth: 0.5 }, // Add borders
    didDrawCell: (data) => {
      // Draw border for each cell
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
    }
  });

  // Add Sub-Total and Amount in Words at the end
  const finalY = doc.lastAutoTable.finalY || 90;
  doc.text(`Sub-Total: ₹ ${formData.subTotal}`, 20, finalY + 10);
  doc.text(`Amount in Words: ${formData.amountInWords}`, 20, finalY + 20);
  doc.text(`Remarks: ${formData.narration}`, 20, finalY + 30);

  // Save PDF
  doc.save(`${formData.billNumber}-invoice.pdf`);
};

  // Send the PDF via Email using EmailJS
  // const sendEmail = (email, pdfBlob) => {
  //   const formData = new FormData();
  //   formData.append('file', pdfBlob, `${formData.billNumber}-invoice.pdf`);
  //   formData.append('email', email);
    
  //   // Call EmailJS service to send email
  //   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_USER_ID')
  //     .then((response) => {
  //       alert('Email sent successfully');
  //     })
  //     .catch((error) => {
  //       alert('Error sending email');
  //       console.error(error);
  //     });
  // };

  // Send PDF via WhatsApp (link to Twilio API)
  const sendToWhatsApp = (whatsappNumber, pdfBlob) => {
    const formData = new FormData();
    formData.append('file', pdfBlob, `${formData.billNumber}-invoice.pdf`);
    formData.append('to', whatsappNumber);

    // Send using Twilio (You need to set up Twilio API here)
    // Call to your backend or third-party service that integrates Twilio API
    fetch('/send-whatsapp', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('WhatsApp sent successfully', data);
      alert('WhatsApp message sent successfully');
    })
    .catch(error => {
      console.error('Error sending WhatsApp message', error);
      alert('Error sending WhatsApp message');
    });
  };
const handleClose = () =>{
 setShowInvoiceform(true);
};
  return (
    <div className="invoice-container">
     
      < form onSubmit={(e) => e.preventDefault()} className="invoice-form">
          <h2 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}>Create Invoice</h2>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
          <div className="input-group"> 
          <label>Member Name</label>
          <TextField
          fullWidth
            type="text"
            name="memberName"
            value={formData.memberName}
            onChange={(e) => setFormData({ ...formData, memberName: e.target.value })}
          />
        </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="input-group"> 
          <label>Bill Number:</label>
          <TextField
          size="small"
            type="text"
            name="billNumber"
            value={formData.billNumber}
            onChange={(e) => setFormData({ ...formData, billNumber: e.target.value })}
          />
        </div></Grid>
        <Grid item xs={12} sm={6}>
          <div className="input-group"> 
          <label>Bill Date:</label>
          <TextField
              size="small"
            type="date"
            name="billDate"
            value={formData.billDate}
            onChange={(e) => setFormData({ ...formData, billDate: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div></Grid>
        <Grid item xs={12} sm={6}>
          <div className="input-group"> 
          <label>Period:</label>
          <TextField
              size="small"
            type="date"
            name="period"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div></Grid>
        <Grid item xs={12} sm={6}>
        <div className="input-group"> 
          <label>Due Date:</label>
          <TextField
              size="small"
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div></Grid>

        <label style={{ color: 'Dark Green',fontWeight:'bold' ,fontSize:'20px'}}>Items</label>
        {/* Table for Items */}
        <Grid item xs={12} sm={12}>
        <div className="voucher">
          <table className="table">
            <thead>
              <tr>
                <th>SR NO.</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td> {/* Display Serial Number */}
                  <td>
                    <TextField
                      type="text"
                      name="description"
                      placeholder="Item Description"
                      value={item.description}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </td>
                  <td>
                    <TextField
                      type="number"
                      name="amount"
                      placeholder="Amount"
                      value={item.amount}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </td>
                  <td>
                    {formData.items.length > 1 && (
                      <Button  variant="contained" type="button" onClick={() => handleRemoveItem(index)}>Remove</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <Button variant="contained" type="button" onClick={handleAddItem}>Add Item</Button>
          </table>
        </div>
        <Grid item xs={12} sm={4}>
          <div className="input-group"> 
            <label>SubTotal</label>
            <TextField
              type="number"
              name="subTotal"
              value={formData.subTotal}
              InputProps={{
                readOnly: true,
                style: { backgroundColor: '#f0f0f0' }, // Set the background color here
              }}
            />
          </div>
        </Grid>
        </Grid>

        <Grid item xs={12} sm={8}>
        <div className="input-group"> 
          <label>Amount in Words:</label>
          <TextField
              size="small"
          fullWidth
            type="text"
            name="amountInWords"
            value={convertAmountToWords(formData.subTotal)}
            onChange={(e) => setFormData({ ...formData, amountInWords: e.target.value })}
            InputProps={{
              readOnly: true,
              style: { backgroundColor: '#f0f0f0' }, // Set the background color here
            }}
          />
        </div></Grid>
        <Grid item xs={12} sm={8}>
          <div className="input-group"> 
          <label>Narration:</label>
          <TextField
          fullWidth
            type="text"
            name="narration"
            multiline
            value={formData.narration || "Maintenance bills for 1-Dec-24 to 31-Dec-24"}
            onChange={(e) => setFormData({ ...formData, narration: e.target.value })}
          />
        </div></Grid>

        <Grid item xs={12} sm={8}>
          <div className="input-group"> 
          <label>Email Address:</label>
          <TextField
              size="small"
              fullWidth
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div></Grid>

        {/* <Grid item xs={12} sm={8}>
          <div className="input-group"> 
          <label>WhatsApp Number:</label>
          <TextField
              size="small"
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
          />
        </div></Grid> */}
        <Grid item xs={12}>
            < div style={{ display: 'flex', gap: '10px' ,justifyContent:'center',marginTop:'50px'}}>
            <Button
            variant="contained"
            color="secondary"
            onClick={handleGeneratePDF} // Trigger PDF generation         
          >
           Generate PDF
          </Button>  
          {/* <Button
            variant="contained"
            color="secondary"   
            onClick={sendEmail}     
          >
           Send Email
          </Button> */}
          {/* <Button 
            variant="contained"
            className="cancel"   
            onClick={handleClose}        
          >
           Cancel
          </Button>          */}
          </div>      
    </Grid>
    </Grid>
    </form>
    </div>
  );
};

export default InvoiceForm;
