import React from "react";
import "./Dashboard.css";
import DoughnutChart from "../Dashboard/DoughnutChart";
import { useNavigate } from 'react-router-dom';



const Dashboard = () => {
  const navigate = useNavigate();

  const handleClick = (type) => {
    switch(type) {
      case 'members':
        navigate('/member/membergroup');
        break;
      case 'property':
        navigate('/property/updateproperty');
        break;
      case 'society':
        navigate('/society/organization');
        break;
      case 'accounts':
        navigate('/account/accountledger');
        break;
        case 'invoices':
          navigate('/invoice/billinvoice');
          break;
          case 'voucher':
            navigate('/voucher/paymentvoucher');
            break;
      default:
        console.log('Unknown card type');
    }
  };
  return (
    <div className="dashboard-container">
      <h1 style={{fontWeight: 500,textAlign:'center'}}>Dashboard Of Housing</h1>

      <div className="dashboardcard-container">
        {/* First row of cards */}
        <div className="dashcard-row">
          <div className="dashcard"style={{
    backgroundColor:'hotpink', // Primary blue
    color: 'white', // Text color
    padding: '16px',
    borderRadius: '8px',
  }}onClick={() => handleClick('members')}>
  
            <h3>Members</h3>
            <p>Members details</p>
          </div>
          <div className="dashcard"style={{
    backgroundColor:'orange', // Primary blue
    color: 'white', // Text color
    padding: '16px',
    borderRadius: '8px',
  }}  onClick={() => handleClick('property')}>
            <h3>Property</h3>
            <p>Property details</p>
          </div>
          <div className="dashcard"style={{
    backgroundColor:'sandybrown', 
    color: 'white', // Text color
    padding: '16px',
    borderRadius: '8px',
  }}  onClick={() => handleClick('society')}>
            <h3>Society</h3>
            <p>Society details</p>
          </div>
        </div>

        {/* second row of cards */}
        <div className="dashcard-row">
          <div className="dashcard"style={{
    backgroundColor:'lightseagreen', // Primary blue
    color: 'white', // Text color
    padding: '16px',
    borderRadius: '8px',
  }}  onClick={() => handleClick('accounts')}>
            <h3>Accounts</h3>
            <p>Accounts count</p>
          </div>
          <div className="dashcard"style={{
    backgroundColor:'mediumpurple', // Primary blue
    color: 'white', // Text color
    padding: '16px',
    borderRadius: '8px',
  }} onClick={() => handleClick('invoices')}>
            <h3>Invoices</h3>
            <p>Invoice details</p>
          </div>
          <div className="dashcard"style={{
    backgroundColor:'plum', // Primary blue
    color: 'white', // Text color
    padding: '16px',
    borderRadius: '8px',
  }} onClick={()=> handleClick('voucher')}>
            <h3>Voucher</h3>
            <p>VoucherDetails</p>
          </div>
        </div>
      </div>

      {/* Doughnut chart */}
      <div className="doughnut-chart">
        <DoughnutChart />
      </div>
    </div>
  );
};

export default Dashboard;






