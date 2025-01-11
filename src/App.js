// import React, { useState,useEffect } from "react";
// import { ProSidebarProvider } from 'react-pro-sidebar';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import SignIn from './components/SignIn';
// import SidebarComponent from './components/SidebarComponent';
// import Title from './components/Title';
// import Membergroup from './Member/Membergroup';
// import Document from './Documents/Document';
// import Newproperty from './Property/Newproperty';
// import Organization from './Society/Organization';
// import Meeting from './Society/Meeting';
// import Committee from './Society/Committee';
// import AccountLedger from './Account/Accountledger';
// import Voucher from './Account/Voucher';
// import Voucherreport from './Report/Voucherreport';
// import Cashbook from './Report/Cashbook';
// import Bankbook from './Report/Bankbook';
// import Terizmanagement from './Report/Terizmanagement';
// import Profitloss from "./Report/Profitloss";
// import Ledger from "./Report/Ledger";
// import Balancesheet from "./Report/Balancesheet";
// import Memberproperty from "./Report/Memberproperty";
// import Accountwisemember from "./Report/Accountwisemember";
// import Reportprefences from "./Report/Reportprefences";
// import Plotregistered from "./Report/Plotregistered";
// import Membercontribution from "./Member/Membercontribution";
// import Layout from './Layout';
// // import { Dashboard } from "@mui/icons-material";
// import Dashboard from "./Dashboard/Dashboard";

// // import SidebarMenu from "./components/SidebarMenu";
// // import Sidebar from "./components/Sidebar";

// const App = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open by default
//     const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status

//     const toggleSidebar = () => {
//         setIsSidebarOpen(prevState => !prevState);
//     };
//     useEffect(() => {
//          // Check if the user is already logged in
//           const user = sessionStorage.getItem('user');
//          if (user) { setIsAuthenticated(true); } 
//         }, []);
//     const handleLogin = () => {
//         setIsAuthenticated(true); // Update authentication status
//         sessionStorage.setItem('user', 'loggedIn');
//     };

//     const handleLogout = () => {
//         setIsAuthenticated(false); // Reset authentication status to false
//         sessionStorage.removeItem('user');
//     };

//     return (
//         <ProSidebarProvider>
//             <Router>
//             <Layout>
//                 <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
//                     {isAuthenticated ? (
//                         <div>
//                             {/* Sidebar and Main Content only when user is authenticated */}
//                             <SidebarComponent toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} onLogout={handleLogout} />
//                             <div className="main-content">
//                                 <Title isSidebarOpen={isSidebarOpen} onLogout={handleLogout} />
//                                 <div style={{ flex:'1',overflow:'auto',paddingTop: '80px',marginLeft:'20px'}}>
//                                     <Routes>
//                                         {/* Define all the routes for your main app */}
//                                         <Route path="/dashboard" element={<Dashboard />} />
//                                         <Route path="/membergroup" element={<Membergroup />} />
//                                         <Route path="/documents" element={<Document />} />
//                                         <Route path="/membercontribution" element={<Membercontribution />} />
//                                         <Route path="/newproperty" element={<Newproperty />} />
//                                         <Route path="/organization" element={<Organization />} />
//                                         <Route path="/meeting" element={<Meeting />} />
//                                         <Route path="/committee" element={<Committee />} />
//                                         <Route path="/accountledger" element={<AccountLedger />} />
//                                         <Route path="/voucher" element={<Voucher />} />
//                                         <Route path="/voucherreport" element={<Voucherreport />} />
//                                         <Route path="/cashbook" element={<Cashbook />} />
//                                         <Route path="/bankbook" element={<Bankbook />} />
//                                         <Route path="/terizmanagement" element={<Terizmanagement />} />
//                                         <Route path="/profitloss" element={<Profitloss />} />
//                                         <Route path="/ledger" element={<Ledger />} />
//                                         <Route path="/balancesheet" element={<Balancesheet />} />
//                                         <Route path="/memberproperty" element={<Memberproperty />} />
//                                         <Route path="/accountwisemember" element={<Accountwisemember />} />
//                                         <Route path="/reportprefences" element={<Reportprefences />} />
//                                         <Route path="/plotregistered" element={<Plotregistered />} />
//                                         {/* Redirect default to /membergroup or any other page */}
//                                         <Route path="/" element={<Navigate to="/" />} />
//                                     </Routes>
//                                 </div>
//                             </div>
//                         </div>
//                     ) : (
//                         <Routes>
//                             {/* If not authenticated, show the SignIn page */}
//                             <Route path="/" element={<SignIn onLogin={handleLogin} />} />
//                             {/* If logged out, redirect to SignIn page */}
//                             <Route path="*" element={<Navigate to="/" />} />
//                         </Routes>
//                     )}
//                 </div>
//                 </Layout>
//             </Router>
//         </ProSidebarProvider>
//     );
// };

//  export default App;






 import React, { useState,useEffect,useContext } from "react";
import { ProSidebarProvider } from 'react-pro-sidebar';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import { createMuiTheme } from "@mui/material";
import Membergroup from './Member/Membergroup';
import Document from './Documents/Document';
import Newproperty from './Property/Newproperty';
import Organization from './Society/Organization';
import Meeting from './Society/Meeting';
import Committee from './Society/Committee';
import AccountLedger from './Account/Accountledger';
import Voucher from './Account/Voucher';
import Voucherreport from './Report/Voucherreport';
import Cashbook from './Report/Cashbook';
import Bankbook from './Report/Bankbook';
import Terizmanagement from './Report/Terizmanagement';
import Profitloss from "./Report/Profitloss";
import Ledger from "./Report/Ledger";
import Balancesheet from "./Report/Balancesheet";
import Memberproperty from "./Report/Memberproperty";
import Accountwisemember from "./Report/Accountwisemember";
import Reportprefences from "./Report/Reportprefences";
import Plotregistered from "./Report/Plotregistered";
import Membercontribution from "./Member/Membercontribution";
// import { Dashboard } from "@mui/icons-material";
import Dashboard from "./Dashboard/Dashboard";
import Member from './Member/Member';
import Property from './Property/Property';
import Updateproperty from './Property/Updateproperty';
import Society from './Society/Society';
import Reports from './Report/Reports';
import Account from './Account/Account';
import Sidebar from "./components/Sidebar";
import JournalVoucherForm from "./Voucher/Journalvocher";
import ReceiptVoucherForm from "./Voucher/Receiptvoucher";
import PurchaseVoucherForm from"./Voucher/Purchasevoucher";
import PaymentVoucherForm from "./Voucher/Paymentvoucher";
import ContraVoucherForm from "./Voucher/Contravoucher";
import InvoiceForm from "./Invoices/InvoiceForm";
import BillForm from "./Invoices/Billfomat";
import Incomeform from "./Invoices/Incomeform";
import BalanceForm from "./Invoices/Balancesheet";
import InvestmentForm from "./Invoices/Investmentsheet";
import AuditReportForm from "./Invoices/Auditreport";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

    const [toggleDark, settoggleDark] = useState(false);
    const myTheme = createMuiTheme({
        // Theme settings
        palette: {
            type: toggleDark ? "dark" : "light",
        },
    });
    
  
    const handleLogin = (username, password, setUsername, setPassword) => {
        if (username === 'user' && password === 'active') {
            setIsAuthenticated(true);  // Successful login
        } else {
            setUsername('');  // Clear the username field
            setPassword('');  // Clear the password field
            alert('Invalid credentials!');
        }
    };
    
    // const exitApp = () => {
    //   console.log("Exiting app...");
    //   setIsAuthenticated(false); 
    // };
    return (
        
            <div className="App">
                <Router>
                     {isAuthenticated ? ( 
                        <ProSidebarProvider>
                            <Routes>
                                <Route path="/" element={<Sidebar />}>
                                    {/* Define all the routes for your main app */}
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/member" element={<Member />} />
                                    <Route path="/property" element={<Property />} />
                                    <Route path="/society" element={<Society />} />
                                    <Route path="/reports" element={<Reports />} />
                                    <Route path="/account" element={<Account />} />
                                    <Route path="/member/membergroup" element={<Membergroup />} />
                                    <Route path="/member/documents" element={<Document />} />
                                    <Route path="/member/member-contribution" element={<Membercontribution />} />
                                    {/* <Route path="/property/newproperty" element={<Newproperty />} /> */}
                                    <Route path="/property/updateproperty" element={<Updateproperty />} />
                                    <Route path="/society/organization" element={<Organization />} />
                                    <Route path="/society/meeting" element={<Meeting />} />
                                    <Route path="/society/committee" element={<Committee />} />
                                    <Route path="/account/accountledger" element={<AccountLedger />} />
                                     {/* <Route path="/account/voucher" element={<Voucher />} /> */}
                                     <Route path="/voucher/journalvoucher" element={<JournalVoucherForm />} />
                                     <Route path="/voucher/receiptvoucher" element={<ReceiptVoucherForm />} />
                                     <Route path="/voucher/purchasevoucher" element={<PurchaseVoucherForm />} />
                                     <Route path="/voucher/paymentvoucher" element={<PaymentVoucherForm />} />
                                     <Route path="/voucher/contravoucher" element={<ContraVoucherForm />} />
                                    <Route path="/invoice/billinvoice" element={<InvoiceForm />} />
                                    <Route path="/invoice/billformat" element={<BillForm/>} />
                                    <Route path="/invoice/incomeexpendituresheet" element={<Incomeform/>} />
                                    <Route path="/invoice/balancesheet" element={<BalanceForm/>} />
                                    <Route path="/invoice/auditreport" element={<AuditReportForm/>} />
                                    <Route path="/invoice/investmentsheet" element={<InvestmentForm/>} />
                                    {/* <Route path="/reports/voucherreport" element={<Voucherreport />} />
                                    <Route path="/reports/cashbook" element={<Cashbook />} />
                                    <Route path="/reports/bankbook" element={<Bankbook />} />
                                    <Route path="/reports/terizmanagement" element={<Terizmanagement />} />
                                    <Route path="/reports/profitloss" element={<Profitloss />} />
                                    <Route path="/reports/ledger" element={<Ledger />} />
                                    <Route path="/reports/balancesheet" element={<Balancesheet />} />
                                    <Route path="/reports/memberproperty" element={<Memberproperty />} />
                                    <Route path="/reports/accountwisemember" element={<Accountwisemember />} />
                                    <Route path="/reports/reportprefences" element={<Reportprefences />} />
                                    <Route path="/reports/plotregistered" element={<Plotregistered />} /> */}
                                </Route>
                                {/* Redirect to dashboard if authenticated */}
                                <Route path="*" element={<Navigate to="/dashboard" />} />
                            </Routes>
                        </ProSidebarProvider>
                     ) : ( 
                         <Routes>
                            <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
                            {/* Redirect to sign-in if not authenticated */}
                             <Route path="*" element={<Navigate to="/signin" />} />
                        </Routes> 
                     )} 
                </Router>
            </div>
        
    );
}

export default App;
