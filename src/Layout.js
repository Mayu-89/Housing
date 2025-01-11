import React from 'react';
import { useLocation } from 'react-router-dom';
import SidebarComponent from './components/SidebarComponent'; // Adjust the path as necessary

const Layout = ({ children }) => {
    const appBackgroundStyle = {
        backgroundImage: 'url(https://i.postimg.cc/pTrxZqM7/slider3.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '93vh',
        flex: 1,
        flexDirection: 'column',
        overflow: 'hidden'
    };

    const blankBackgroundStyle = {
        backgroundColor: 'white',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    };

    const location = useLocation(); // Get the current route

    // Define paths where a blank background is needed
    const blankBackgroundPaths = ['/signin', '/dashboard','/membergroup', '/documents','/membercontribution','/newproperty','/organization','/meeting','/committee'
        ,'/accountledger','/voucher','/voucherreport','/cashbook','/bankbook','/terizmanagement','/profitloss','/ledger','/balancesheet','/memberproperty','/accountwisemember','/reportprefences','/plotregistered'
    ];

    return (
        <div style={blankBackgroundPaths.includes(location.pathname) ? blankBackgroundStyle : appBackgroundStyle}>
            {children}
        </div>
    );
};

export default Layout;
