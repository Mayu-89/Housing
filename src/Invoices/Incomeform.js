import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { TextField, Grid, Button } from '@mui/material';
import './income.css';
import { toWords } from 'number-to-words';

const IncomeExpendureForm = () => {
  const [formData, setFormData] = useState({
    items: [{ description: '', amount2023: '', expenditure: '', amount2024: '', income: '' }],
    subTotal: 0,
    place: '',
    societyName: '',
    date: '',
  });

  const [showIncomeform, setShowIncomeform] = useState(false);

  // Recalculate SubTotal whenever items change
  useEffect(() => {
    const subTotal = formData.items.reduce((total, item) => total + (parseFloat(item.amount2023) || 0) + (parseFloat(item.amount2024) || 0), 0);
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
      items: [...formData.items, { description: '', amount2023: '', expenditure: '', amount2024: '', income: '' }]
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
  
    doc.setFontSize(16);
  
    // Title - breaking it into two lines for better readability
    doc.text('INCOME & EXPENDITURE STATEMENT', 105, 20, null, null, 'center');
    doc.text('FOR THE YEAR ENDED 31ST MARCH 20___', 105, 30, null, null, 'center');
  
    // Headers
    const headers = [
      [
        { content: 'SR NO.', rowSpan: 2 }, 
        { content: '31.03.2024 Amount', rowSpan: 2 }, 
        { content: 'Expenditure', rowSpan: 2 }, 
        { content: '', rowSpan: 2 }, 
        { content: '31.03.2023 Amount', rowSpan: 2 }, 
        { content: '', rowSpan: 2 }, 
        { content: 'Income', rowSpan: 2 }, 
        { content: '', rowSpan: 2 }, 
        { content: '31.03.2024 Amount', rowSpan: 2 }
      ]
    ];
  
    // Body
    const body = formData.items.map((item, index) => [
      index + 1,
      item.amount2024 || "0",
      item.expenditure || "0",
      '',
      item.amount2023 || "0",
      item.amount2023_again || "0",
      item.income || "0",
      '',
      item.amount2024_again || "0"
    ]);
  
    // Add table with borders and adjusted header height
    doc.autoTable({
      head: headers,
      body: body,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [0, 82, 204], minCellHeight: 12 }, // Adjust header height
      styles: { cellPadding: 3, fontSize: 10, lineColor: [0, 0, 0], lineWidth: 0.5 }, // Add borders
      didDrawCell: (data) => {
        // Draw border for each cell
        doc.setDrawColor(0);
        doc.setLineWidth(0.5);
        doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
      }
    });
  
    // Add Sub Total, Place, Date, and Society Name at the end
    const finalY = doc.lastAutoTable.finalY || 50;
    doc.text(`Sub Total: ₹ ${formData.subTotal}`, 20, finalY + 10);
    doc.text(`Place: ${formData.place}`, 20, finalY + 20);
    doc.text(`Date: ${formData.date}`, 20, finalY + 30);
    doc.text(`Name of Society: ${formData.societyName}`, 20, finalY + 40);
  
    // Save PDF
    doc.save(`${formData.societyName}-income.pdf`);
  };
  
  
  return (
    <div className="income-container">
      <form onSubmit={(e) => e.preventDefault()} className="income-form">
        <h3 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}>INCOME & EXPENDITURE STATEMENT FOR THE YEAR ENDED 31ST MARCH 20___</h3>

        <Grid container spacing={3}>
        <label style={{ color: 'Dark Green', fontWeight: 'bold', fontSize: '20px' }}></label>
        {/* Table for Items */}
        <Grid item xs={12} sm={12}>
          <div className="voucher">
          <table className="table">
  <thead>
    <tr>
      <th>SR NO.</th>
      <th>31.03.2024 <br/>Amount</th>
      <th>Expenditure</th>
      <th>Blank</th>
      <th>31.03.2023 <br/>Amount</th>
      <th>31.03.2023 <br/>Amount</th>
      <th>Income</th>
      <th>Blank</th>
      <th>31.03.2024 <br/>Amount</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {formData.items.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td> {/* Display Serial Number */}
        
        {/* 31.03.2024 Amount */}
        <td>
          <TextField
            type="number"
            name="amount2024"
            placeholder="Amount"
            value={item.amount2024}
            onChange={(e) => handleInputChange(e, index)}
          />
        </td>

        {/* Expenditure */}
        <td>
          <TextField
            name="expenditure"
            placeholder="Expenditure"
            value={item.expenditure}
            onChange={(e) => handleInputChange(e, index)}
          />
        </td>

        {/* Empty Column */}
        <td></td>

        {/* 31.03.2023 Amount */}
        <td>
          <TextField
            type="number"
            name="amount2023"
            placeholder="Amount"
            value={item.amount2023}
            onChange={(e) => handleInputChange(e, index)}
          />
        </td>

        {/* 31.03.2023 Amount (again) */}
        <td>
          <TextField
            type="number"
            name="amount2023_again"
            placeholder="Amount"
            value={item.amount2023_again}
            onChange={(e) => handleInputChange(e, index)}
          />
        </td>

        {/* Income */}
        <td>
          <TextField
            name="income"
            placeholder="Income"
            value={item.income}
            onChange={(e) => handleInputChange(e, index)}
          />
        </td>

        {/* Empty Column */}
        <td></td>

        {/* 31.03.2024 Amount (again) */}
        <td>
          <TextField
            type="number"
            name="amount2024_again"
            placeholder="Amount"
            value={item.amount2024_again}
            onChange={(e) => handleInputChange(e, index)}
          />
        </td>

        {/* Action - Remove Item */}
        <td>
          {formData.items.length > 1 && (
            <Button variant="contained" type="button" onClick={() => handleRemoveItem(index)}>
              Remove
            </Button>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

<Button variant="contained" type="button" onClick={handleAddItem}>
  Add Item
</Button>

          </div>
        </Grid>

        <Grid item xs={12} sm={8}>
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

        <Grid item xs={12} sm={8}>
          <div className="input-group">
            <label>Place:</label>
            <TextField
              size="small"
              name="place"
              value={formData.place}
              onChange={(e) => setFormData({ ...formData, place: e.target.value })}
            />
          </div>
        </Grid>

        {/* Input for Society Name */}
        <Grid item xs={12} sm={8}>
          <div className="input-group">
            <label>Name of Society:</label>
            <TextField
            fullWidth
              size="small"
              type="text"
              name="societyName"
              value={formData.societyName}
              onChange={(e) => setFormData({ ...formData, societyName: e.target.value })}
            />
          </div>
        </Grid>

        {/* Input for Date */}
        <Grid item xs={12} sm={6}>
          <div className="input-group">
            <label>Date:</label>
            <TextField
              size="small"
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '50px' }}>
            <Button variant="contained" color="secondary" onClick={handleGeneratePDF}>
              Generate PDF
            </Button>
          </div>
        </Grid></Grid>
      </form>
    </div>
  );
};

export default IncomeExpendureForm;
