import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { TextField, Grid, Button,Typography,Box } from '@mui/material';
import './investment.css';
import { toWords } from 'number-to-words';

const InvestmentForm = () => {
    
  const [formData, setFormData] = useState({
    saraswatBank: [{ accountNo: '', principal: '', newRenew: '', accruedInterestFY2122: '', accruedInterest: '', interestPaid: '', closingBalance: '', repairFund: '' }],
    mdccBank: [{ accountNo: '', depositDate: '', openingBalance: '', newRenew: '', accruedInterestFY2223: '', accruedInterest: '', interestPaid: '', tds: '', closingBalance: '', maturityDate: '', fund: '' }]
  });
  
  const [subtotals, setSubtotals] = useState({
    saraswatBank: {
      principal: 0,
      newRenew: 0,
      accruedInterestFY2122: 0,
      accruedInterest: 0,
      interestPaid: 0,
      closingBalance: 0
    },
    mdccBank: {
      openingBalance: 0,
      newRenew: 0,
      accruedInterestFY2223: 0,
      accruedInterest: 0,
      interestPaid: 0,
      tds: 0,
      closingBalance: 0
    }
  });
  
  useEffect(() => {
    calculateSubtotals();
  }, [formData.saraswatBank, formData.mdccBank]);
  
    
  const handleInputChange = (e, bank, index, field) => {
    const { value } = e.target;
    const newArray = [...formData[bank]]; // Create a copy of the array
    newArray[index][field] = value; // Update the specific field
    setFormData({ ...formData, [bank]: newArray });
  };
  
  const handleAddRow = (bank) => {
    const newRow = bank === 'saraswatBank'
      ? { accountNo: '', principal: '', newRenew: '', accruedInterestFY2122: '', accruedInterest: '', interestPaid: '', closingBalance: '', repairFund: '' }
      : { accountNo: '', depositDate: '', openingBalance: '', newRenew: '', accruedInterestFY2223: '', accruedInterest: '', interestPaid: '', tds: '', closingBalance: '', maturityDate: '', fund: '' };
    setFormData({ ...formData, [bank]: [...formData[bank], newRow] });
  };
  
    const handleRemoveRow = (bank, index) => {
      setFormData((prevState) => ({
        ...prevState,
        [bank]: prevState[bank].filter((_, i) => i !== index)
      }));
    };

    const calculateSubtotals = () => {
      const saraswatTotals = formData.saraswatBank.reduce((acc, item) => ({
        principal: acc.principal + (parseFloat(item.principal) || 0),
        newRenew: acc.newRenew + (parseFloat(item.newRenew) || 0),
        accruedInterestFY2122: acc.accruedInterestFY2122 + (parseFloat(item.accruedInterestFY2122) || 0),
        accruedInterest: acc.accruedInterest + (parseFloat(item.accruedInterest) || 0),
        interestPaid: acc.interestPaid + (parseFloat(item.interestPaid) || 0),
        closingBalance: acc.closingBalance + (parseFloat(item.closingBalance) || 0)
      }), { principal: 0, newRenew: 0, accruedInterestFY2122: 0, accruedInterest: 0, interestPaid: 0, closingBalance: 0 });
    
      const mdccTotals = formData.mdccBank.reduce((acc, item) => ({
        openingBalance: acc.openingBalance + (parseFloat(item.openingBalance) || 0),
        newRenew: acc.newRenew + (parseFloat(item.newRenew) || 0),
        accruedInterestFY2223: acc.accruedInterestFY2223 + (parseFloat(item.accruedInterestFY2223) || 0),
        accruedInterest: acc.accruedInterest + (parseFloat(item.accruedInterest) || 0),
        interestPaid: acc.interestPaid + (parseFloat(item.interestPaid) || 0),
        tds: acc.tds + (parseFloat(item.tds) || 0),
        closingBalance: acc.closingBalance + (parseFloat(item.closingBalance) || 0)
      }), { openingBalance: 0, newRenew: 0, accruedInterestFY2223: 0, accruedInterest: 0, interestPaid: 0, tds: 0, closingBalance: 0 });
    
      setSubtotals({ saraswatBank: saraswatTotals, mdccBank: mdccTotals });
    };
    const handleGeneratePDF = () => {
      const doc = new jsPDF('p', 'mm', 'a4');
    
      doc.setFontSize(18);
      doc.text('Fixed Deposit as on 31/03/20_____', 105, 20, null, null, 'center');
    
      // Saraswat Bank Table
      doc.setFontSize(12);
      doc.text('Saraswat Bank', 20, 30);
      const saraswatHeaders = [['Account No', 'Principal', 'New / Renew', 'Accrued Interest FY 21-22', 'Accrued Interest', 'Interest Paid', 'Closing Balance', 'Repair Fund']];
      const saraswatBody = formData.saraswatBank.map(item => [
        item.accountNo,
        item.principal,
        item.newRenew,
        item.accruedInterestFY2122,
        item.accruedInterest,
        item.interestPaid,
        item.closingBalance,
        item.repairFund
      ]);
      saraswatBody.push(['Subtotal', subtotals.saraswatBank.principal, subtotals.saraswatBank.newRenew, subtotals.saraswatBank.accruedInterestFY2122, subtotals.saraswatBank.accruedInterest, subtotals.saraswatBank.interestPaid, subtotals.saraswatBank.closingBalance, '']);
      doc.autoTable({
        head: saraswatHeaders,
        body: saraswatBody,
        startY: 35,
        theme: 'grid',
        headStyles: { fillColor: [0, 82, 204], minCellHeight: 7, fontSize: 10 },
        styles: { cellPadding: 2, fontSize: 9, lineColor: [0, 0, 0], lineWidth: 0.5 },
        didDrawCell: (data) => {
          doc.setDrawColor(0);
          doc.setLineWidth(0.5);
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
        }
      });
    
      // MDCC Bank Table
      const finalYSaraswat = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(12);
      doc.text('MDCC Bank', 20, finalYSaraswat);
      const mdccHeaders = [['Account No', 'Deposit Date', 'Opening Balance', 'New / Renew', 'Accrued Interest FY 22-23', 'Accrued Interest', 'Interest Paid', 'TDS', 'Closing Balance', 'Maturity Date', 'Fund']];
      const mdccBody = formData.mdccBank.map(item => [
        item.accountNo,
        item.depositDate,
        item.openingBalance,
        item.newRenew,
        item.accruedInterestFY2223,
        item.accruedInterest,
        item.interestPaid,
        item.tds,
        item.closingBalance,
        item.maturityDate,
        item.fund
      ]);
      mdccBody.push(['Subtotal','', subtotals.mdccBank.openingBalance, subtotals.mdccBank.newRenew, subtotals.mdccBank.accruedInterestFY2223, subtotals.mdccBank.accruedInterest, subtotals.mdccBank.interestPaid, subtotals.mdccBank.tds, subtotals.mdccBank.closingBalance, '', '']);
      doc.autoTable({
        head: mdccHeaders,
        body: mdccBody,
        startY: finalYSaraswat + 5,
        theme: 'grid',
        headStyles: { fillColor: [0, 82, 204], minCellHeight: 7, fontSize: 10 },
        styles: { cellPadding: 2, fontSize: 9, lineColor: [0, 0, 0], lineWidth: 0.5 },
        columnStyles: { 0: { cellWidth: 16 }, 
        1: { cellWidth: 17 },
         2: { cellWidth: 17 }, 
         3: { cellWidth: 17 }, 
         4: { cellWidth: 17 }, 
         5: { cellWidth: 17 }, 
         6: { cellWidth: 17 }, 
         7: { cellWidth: 17 }, 
        8: { cellWidth: 17 }, 
        9: { cellWidth: 17 }, 
        10: { cellWidth: 17 } 
      },
        didDrawCell: (data) => {
          doc.setDrawColor(0);
          doc.setLineWidth(0.5);
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
        }
      });
    // Ensure horizontal scrolling
     doc.internal.pageSize.width = 210; 
    // // A4 width in mm
     doc.internal.pageSize.height = 297; // A4 height in mm
      doc.save('Investmentsheet.pdf');
    };
    
    
    
    return (
      <div className="investment-container">
        <form onSubmit={(e) => e.preventDefault()} className="investment-form">
        <h2 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}>Fixed Deposit Form</h2>
  
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography variant="h6">Saraswat Bank</Typography>
            </Grid>
            <Grid item xs={12}>
              <div className="voucher">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Account No</th>
                      <th>Principal</th>
                      <th>New / Renew</th>
                      <th>Accrued Interest FY 21-22</th>
                      <th>Accrued Interest</th>
                      <th>Interest Paid</th>
                      <th>Closing Balance</th>
                      <th>Repair Fund</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.saraswatBank.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <TextField
                          fullWidth
                          type="text"                           
                           name="accountNo"
                            placeholder="Account No"
                            value={item.accountNo}
                            onChange={(e) => handleInputChange(e, 'saraswatBank', index, 'accountNo')}
                          />
                        </td>
                        <td>
                          <TextField
                            fullWidth
                            name="principal"
                            type="number"
                            placeholder="Principal"
                            value={item.principal}
                            onChange={(e) => handleInputChange(e, 'saraswatBank', index, 'principal')}
                          />
                        </td>
                        <td>
                          <TextField
                            fullWidth
                            type="number"
                            name="newRenew"
                            placeholder="New / Renew"
                            value={item.newRenew}
                            onChange={(e) => handleInputChange(e, 'saraswatBank', index, 'newRenew')}
                          />
                        </td>
                        <td>
                          <TextField
                            fullWidth
                            name="accruedInterestFY2122"
                            type="number"
                            placeholder="Accrued Interest FY 21-22"
                            value={item.accruedInterestFY2122}
                            onChange={(e) => handleInputChange(e, 'saraswatBank', index, 'accruedInterestFY2122')}
                          />
                        </td>
                        <td>
                          <TextField
                            fullWidth
                            name="accruedInterest"
                            type="number"
                            placeholder="Accrued Interest"
                            value={item.accruedInterest}
                            onChange={(e) => handleInputChange(e, 'saraswatBank', index, 'accruedInterest')}
                          />
                        </td>
                        <td>
                          <TextField
                            fullWidth
                            name="interestPaid"
                            type="number"
                            placeholder="Interest Paid"
                            value={item.interestPaid}
                            onChange={(e) => handleInputChange(e, 'saraswatBank', index, 'interestPaid')}
                          />
                        </td>
                        <td>
                          <TextField
                            fullWidth
                            name="closingBalance"
                            type="number"
                            placeholder="Closing Balance"
                            value={item.closingBalance}
                            onChange={(e) => handleInputChange(e, 'saraswatBank', index, 'closingBalance')}
                          />
                        </td>
                        <td>
                          <TextField
                            fullWidth
                            name="repairFund"
                            type="text"
                            placeholder="Repair Fund"
                            value={item.repairFund}
                            onChange={(e) => handleInputChange(e, 'saraswatBank', index, 'repairFund')}
                          />
                        </td>
                        <td>
                          {formData.saraswatBank.length > 1 && (
                           <Button variant="contained" size="small" type="button" onClick={() => handleRemoveRow('saraswatBank', index)}>Remove</Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  <tr style={{ backgroundColor: '#fffacd' }}>
  <td style={{ fontWeight: 'bold' }}>Subtotal</td>
  <td>{subtotals.saraswatBank.principal}</td> 
  <td>{subtotals.saraswatBank.newRenew}</td> 
  <td>{subtotals.saraswatBank.accruedInterestFY2122}</td> 
  <td>{subtotals.saraswatBank.accruedInterest}</td> 
  <td>{subtotals.saraswatBank.interestPaid}</td> 
  <td>{subtotals.saraswatBank.closingBalance}</td>
</tr>

                  </tbody>
                </table>
              </div>
            </Grid>
            <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={() => handleAddRow('saraswatBank')}>Add Row</Button>
            </Grid>
           {/* MDCC Bank Section */}
           <Grid item xs={12}>
            <Typography variant="h6">MDCC Bank</Typography>
          </Grid>
          <Grid item xs={12}>
            <div className="voucher">
              <table className="table">
                <thead>
                  <tr>
                    <th>Account No</th>
                    <th>Deposit Date</th>
                    <th>Opening Balance</th>
                    <th>New / Renew</th>
                    <th>Accrued Interest FY 22-23</th>
                    <th>Accrued Interest</th>
                    <th>Interest Paid</th>
                    <th>TDS</th>
                    <th>Closing Balance</th>
                    <th>Maturity Date</th>
                    <th>Fund</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.mdccBank.map((item, index) => (
                    <tr key={index}>
                      <td>
                      <TextField
                          fullWidth
                          type="text"                           
                           name="accountNo"
                            placeholder="Account No"
                            value={item.accountNo}
                            onChange={(e) => handleInputChange(e, 'mdccBank', index, 'accountNo')}
                          />
                      </td>
                      <td>
                        <TextField
                        size="small"
                          name="depositDate"
                          type="date"
                          placeholder="Deposit Date"
                          value={item.depositDate}
                          onChange={(e) => handleInputChange(e, 'mdccBank', index, 'depositDate')}
                          InputLabelProps={{ shrink: true }}
                          sx={{ width: '100px' }} // Adjust the width as needed
                        />
                      </td>
                      <td>
                        <TextField
                          fullWidth
                          name="openingBalance"
                          type="number"
                          placeholder="Opening Balance"
                          value={item.openingBalance}
                          onChange={(e) => handleInputChange(e, 'mdccBank', index, 'openingBalance')}
                        />
                      </td>
                      <td>
                        <TextField
                          fullWidth
                          name="newRenew"
                          placeholder="New / Renew"
                          value={item.newRenew}
                          onChange={(e) => handleInputChange(e, 'mdccBank', index, 'newRenew')}
                        />
                      </td>
                      <td>
                        <TextField
                          fullWidth
                          name="accruedInterestFY2223"
                          type="number"
                          placeholder="Accrued Interest FY 22-23"
                          value={item.accruedInterestFY2223}
                          onChange={(e) => handleInputChange(e, 'mdccBank', index, 'accruedInterestFY2223')}
                        />
                      </td>
                      <td>
                        <TextField
                          fullWidth
                          name="accruedInterest"
                          type="number"
                          placeholder="Accrued Interest"
                          value={item.accruedInterest}
                          onChange={(e) => handleInputChange(e, 'mdccBank', index, 'accruedInterest')}
                        />
                      </td>
                      <td>
                        <TextField
                          fullWidth
                          name="interestPaid"
                          type="number"
                          placeholder="Interest Paid"
                          value={item.interestPaid}
                          onChange={(e) => handleInputChange(e, 'mdccBank', index, 'interestPaid')}
                        />
                      </td>
                      <td>
                        <TextField
                          fullWidth
                          name="tds"
                          type="number" 
                          placeholder="TDS"
                          value={item.tds}
                          sx={{ width: '90px' }}
                          onChange={(e) => handleInputChange(e, 'mdccBank', index, 'tds')}
                        />
                      </td>
                      <td>
                      <TextField
                        fullWidth
                          name="closingbalance"
                          type="number" 
                          placeholder="Closing Balance"
                          value={item.closingBalance}
                          onChange={(e) => handleInputChange(e, 'mdccBank', index, 'closingBalance')}
                        />
                      </td>
                      <td>
                      <TextField
                      size="small"
                          name="maturitydate"
                          type="date" 
                          placeholder="Maturity Date"
                          value={item.maturitydate}
                          InputLabelProps={{ shrink: true }}
                          sx={{ width: '100px' }} // Adjust the width as needed
                          onChange={(e) => handleInputChange(e, 'mdccBank', index, 'maturitydate')}
                        />
                      </td>
                      <td>
                      <TextField
                        fullWidth
                          name="fund"
                          type="text" 
                          placeholder="fund"
                          value={item.fund}
                          sx={{ width: '90px' }}
                          onChange={(e) => handleInputChange(e, 'mdccBank', index, 'fund')}
                        />
                      </td>
                      <td>                       
                        {formData.mdccBank.length > 1 && (
        <Button variant="contained"size="small" type="button" onClick={() => handleRemoveRow('mdccBank', index)}>Remove</Button>
                        )}
                      </td>
                      </tr>
                       ))}
                       <tr style={{ backgroundColor: '#ffd6cc'}}>
                       <td style={{ fontWeight: 'bold' }}>Subtotal</td>
                       <td></td> {/* For the Account No column */} 
  <td>{subtotals.mdccBank.openingBalance}</td>
  <td>{subtotals.mdccBank.newRenew}</td>
  <td>{subtotals.mdccBank.accruedInterestFY2223}</td>
  <td>{subtotals.mdccBank.accruedInterest}</td>
  <td>{subtotals.mdccBank.interestPaid}</td>
  <td>{subtotals.mdccBank.tds}</td>
  <td>{subtotals.mdccBank.closingBalance}</td>
</tr>
                      </tbody>                   
                     </table>
                     </div>
                     </Grid>
            <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={() => handleAddRow('mdccBank')}>Add Row</Button>
            </Grid>
             <Grid item xs={12}>
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '50px' }}>
                        <Button variant="contained" color="secondary" onClick={handleGeneratePDF}>
                          Generate PDF
                        </Button>
                      </div>
                    </Grid>
</Grid>
        </form>
      </div>
    );
  };
  
export default InvestmentForm;
