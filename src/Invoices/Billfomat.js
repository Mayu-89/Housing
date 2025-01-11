import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'
import { TextField, Grid, Button } from '@mui/material';
import './billformat.css';
import { toWords } from 'number-to-words';

const BillForm = () => {
  const [formData, setFormData] = useState({
    memberName: '',
    flat: '',
    billNumber: '',
    billDate: '',
    floor: '',
    wing: '',
    dueDate: '',
    area: '',
    billingPeriod: '',
    particulars: [''],
  amounts: [''],
    subTotal: 0,
    amountInWords: '',
    remarks: '',
  });
  

  useEffect(() => {
    const subTotal = formData.amounts.reduce((total, amount) => total + (parseFloat(amount) || 0), 0);
    setFormData({ ...formData, subTotal, amountInWords: toWords(subTotal) });
  }, [formData.amounts]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "particulars" || name === "amounts") {
      const newArray = formData[name].slice();
      newArray[index] = value;
      setFormData({ ...formData, [name]: newArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
 const convertAmountToWords = (amount) => {
    return toWords(amount); // Converts the amount to words
  };
  const handleAddItem = () => {
    setFormData({ 
      ...formData, 
      particulars: [...formData.particulars, ''],
      amounts: [...formData.amounts, ''],
    });
  };
  
  const handleRemoveItem = (index) => {
    const newParticulars = formData.particulars.filter((_, i) => i !== index);
    // const newAmounts = formData.amounts.filter((_, i) => i !== index);
    setFormData({ 
      ...formData, 
      particulars: newParticulars
      // amounts: newAmounts,
    });
  };



const handleGeneratePDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('MAINTENANCE BILL', 105, 20, null, null, 'center');

  doc.setFontSize(14);
  doc.text(`Member: ${formData.memberName}`, 20, 30);
  doc.text(`FLAT: ${formData.flat}`, 20, 40);
  doc.text(`Bill No.: ${formData.billNumber}`, 150, 40);

  doc.text(`Floor: ${formData.floor}`, 20, 50);
  doc.text(`Date: ${formData.billDate}`, 150, 50);

  doc.text(`Wing: ${formData.wing}`, 20, 60);
  doc.text(`Due Date: ${formData.dueDate}`, 150, 60);

  doc.text(`Area: ${formData.area}`, 20, 70);
  doc.text(`Billing Period: ${formData.billingPeriod}`, 150, 70);

  // Headers and body for the table
  const headers = [['SR NO.', 'PARTICULARS', 'AMOUNT']];
  const body = formData.particulars.map((particular, index) => [
    index + 1,
    particular,
    formData.amounts[index]
  ]);

  // Add table with borders and adjusted header height
  doc.autoTable({
    head: headers,
    body: body,
    startY: 80,
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
  doc.text(`Remarks: ${formData.remarks}`, 20, finalY + 30);

  // Terms and Conditions
  doc.text('Terms & Conditions', 20, finalY + 40);
  doc.text('1. Cheques to be in favour of "WHITE ROSE CHS LTD." & Cheques to be dropped in the cheque drop box.', 20, finalY + 50);
  doc.text('2. Mention your Flat No. and Mobile No. on the reverse of the cheque.', 20, finalY + 60);
  doc.text('3. Non Payment of Bill will attract interest @ 21% PA.', 20, finalY + 70);
  doc.text('4. Errors to be intimated within 7 days to Society Office.', 20, finalY + 80);

  // Bank Details
  doc.text('Bank Details', 20, finalY + 100);
  doc.text('for WHITE ROSE CO-OPERATIVE HOUSING SOCIETY LTD', 20, finalY + 110);
  doc.text('Bank Name: SVC Bank Ltd.', 20, finalY + 120);
  doc.text('A/c No.: 300003000012169', 20, finalY + 130);
  doc.text('Branch & IFS Code: Bandra & SVCB0000003', 20, finalY + 140);
  doc.text('Chairman / Secretary / Manager', 150, finalY + 150);

  // Save PDF
  doc.save('MaintenanceBill.pdf');
};

  return (
    <div className="billformat-container">
      <form onSubmit={(e) => e.preventDefault()} className="bill-form">
      <h3 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}> WHITE ROSE CO-OPERATIVE HOUSING SOCIETY LTD										
Reg. No.: BOM / HSG / 714 OF 1964										
4, PERRY ROAD, BANDRA (WEST), MUMBAI- 400 050										
</h3>
        <h4 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}> Maintenance Bill</h4>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <div className="input-group">
              <label>Member Name</label>
              <TextField
                fullWidth
                type="text"
                name="memberName"
                value={formData.memberName}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="input-group">
              <label>Flat</label>
              <TextField
                type="text"
                name="flat"
                value={formData.flat}
                onChange={(e) => handleInputChange(e)}
                size="small"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="input-group">
              <label>Bill Number</label>
              <TextField
                type="text"
                name="billNumber"
                value={formData.billNumber}
                onChange={(e) => handleInputChange(e)}
                size="small"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="input-group">
              <label>Bill Date</label>
              <TextField
                type="date"
                name="billDate"
                value={formData.billDate}
                onChange={(e) => handleInputChange(e)}
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="input-group">
              <label>Floor</label>
              <TextField
                type="text"
                name="floor"
                value={formData.floor}
                onChange={(e) => handleInputChange(e)}
               size="small"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="input-group">
              <label>Wing</label>
              <TextField
                type="text"
                name="wing"
                value={formData.wing}
                onChange={(e) => handleInputChange(e)}
               size="small"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="input-group">
              <label>Due Date</label>
              <TextField
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={(e) => handleInputChange(e)}
                InputLabelProps={{ shrink: true }}
              
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="input-group">
              <label>Area</label>
              <TextField
                type="text"
                name="area"
                value={formData.area}
                onChange={(e) => handleInputChange(e)}
              size="small"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="input-group">
              <label>Billing Period</label>
              <TextField
                type="date"
                name="billingPeriod"
                value={formData.billingPeriod}
                onChange={(e) => handleInputChange(e)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <label style={{ color: 'Purple', fontWeight: 'bold', fontSize: '20px' }}>Particulars</label>
          </Grid>
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
                     {formData.particulars.map((particular, index) => (
  <tr key={index}>
    <td>{index + 1}</td> {/* Display Serial Number */}
    <td>
      <TextField
        type="text"
        name="particulars"
        placeholder="Item Description"
        value={particular}
        onChange={(e) => handleInputChange(e, index)}
      />
    </td>
    <td>
      <TextField
        type="number"
        name="amounts"
        placeholder="Amount"
        value={formData.amounts[index]}
        onChange={(e) => handleInputChange(e, index)}
      />
    </td>
    <td>
      {formData.particulars.length > 1 && (
        <Button variant="contained" type="button" onClick={() => handleRemoveItem(index)}>Remove</Button>
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
                   <label>Remarks:</label>
                   <TextField
                   fullWidth
                     type="text"
                     name="remarks"
                     multiline
                     value={formData.remarks || "Maintenance bills for 1-Dec-24 to 31-Dec-24"}
                     onChange={(e) => setFormData({ ...formData, narration: e.target.value })}
        
                   />
                 </div></Grid>
          <Grid item xs={12}>
                     < div style={{ display: 'flex', gap: '10px' ,justifyContent:'center',marginTop:'50px'}}>
                     <Button
                     variant="contained"
                     color="secondary"
                     onClick={handleGeneratePDF} // Trigger PDF generation         
                   >
                    Generate PDF
                   </Button>  </div></Grid>
               </Grid>
                  </form>
                  </div>
                );
              };
              
 export default BillForm;