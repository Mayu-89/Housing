import {FaUser, FaUsers, FaFileAlt, FaDollarSign, FaBuilding, FaCalendarDay, FaChartBar, FaBook, FaBalanceScale, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AccountCircle as AccountCircleIcon, Description as DescriptionIcon, Assessment as AssessmentIcon,Login as LoginIcon }from '@mui/icons-material';

 const MenuItems = [
  // {
  //   title: "Sign In",
  //    icon : <LoginIcon />,
   
  //       path: "/signin",
  //     },
    
  {
    title: "Dashboard",
     icon : <DashboardIcon />,
   
        path: "/dashboard",
      },
    
  
  {
    title: "Members",
    path: '/member',
    icon: <FaUsers />,
    submenus: [
      {
        title: "Member Group",
        path: "/member/membergroup",
        icon: <FaUsers />,
      },
      {
        title: "Documents",
        path: "/member/documents",
        icon: <FaFileAlt />,
      },
      {
        title: "Member Contribution",
        path: "/member/member-contribution",
        icon: <FaDollarSign />,
      },
    ],
  },
  {
    title: "Property",
    path: '/property',
    icon: <FaBuilding />,
    submenus: [
      // {
      //   title: "Property",
      //   path: "/property/newproperty",
      //   icon: <FaBuilding />,
      // },
      {
        title: "Property",
        path: "/property/updateproperty",
        icon: <FaBuilding />,
      },
    ],
  },
  {
    title: "Society",
    path:'/society',
    icon: <FaUsers />,
    submenus: [
      {
        title: "Organization",
        path: "/society/organization",
        icon: <FaBuilding />,
      },
      {
        title: "Meeting",
        path: "/society/meeting",
        icon: <FaCalendarDay />,
      },
      {
        title: "Managing Committee",
        path: "/society/committee",
        icon: <FaUsers />,
      },
    ],
  },
  {
    title: "Account",
    path:'/account',
    icon: <AccountCircleIcon  />,
    submenus: [
      {
        title: "Account Ledger",
        path: "/account/accountledger",
        icon: <AssessmentIcon />,
      },
      // {
      //   title: "Voucher",
      //   path: "/account/voucher",
      //   icon: <DescriptionIcon />,
      // },
      // {
      //   title: "JournalVoucher",
      //   path: "/account/journalvoucher",
      //   icon: <DescriptionIcon />,
      // },
    ],
  },
  {
    title: "Voucher",
    path:'/voucher',
    icon: <DescriptionIcon />,
    submenus: [
      {
        title: "Journal Voucher",
        path: "/voucher/journalvoucher",
        icon: <DescriptionIcon />,
      },
      {
        title: "Receipt Voucher",
        path: "/voucher/receiptvoucher",
        icon: <DescriptionIcon />,
      },
      {
        title: "Purchase Voucher",
        path: "/voucher/purchasevoucher",
        icon: <DescriptionIcon />,
      },
      {
        title: "Payment Voucher",
        path: "/voucher/paymentvoucher",
        icon: <DescriptionIcon />,
      },
      {
        title: "Contra Voucher",
        path: "/voucher/contravoucher",
        icon: <DescriptionIcon />,
      },
     
    ],
  },
  // {
  //   title: "Reports",
  //   path:"/reports",
  //   icon: <FaChartBar />,
  //   submenus: [
  //     {
  //       title: "Voucher Report",
  //       path: "/reports/voucherreport",
  //       icon: <FaFileAlt />,
  //     },
  //     {
  //       title: "Plot Registered",
  //       path: "/reports/plotregistered",
  //       icon: <FaBuilding />,
  //     },
  //     {
  //       title: "Cash Book",
  //       path: "/reports/cashbook",
  //       icon: <FaDollarSign />,
  //     },
  //     {
  //       title: "Bank Book",
  //       path: "/reports/bankbook",
  //       icon: <FaDollarSign />,
  //     },
  //     {
  //       title: "Teriz Management",
  //       path: "/reports/terizmanagement",
  //       icon: <FaUsers />,
  //     },
  //     {
  //       title: "Profit and Loss",
  //       path: "/reports/profitloss",
  //       icon: <FaChartBar />,
  //     },
  //     {
  //       title: "Ledger",
  //       path: "/reports/ledger",
  //       icon: <FaBook />,
  //     },
  //     {
  //       title: "Balance Sheet",
  //       path: "/reports/balancesheet",
  //       icon: <FaBalanceScale />,
  //     },
  //     {
  //       title: "Member Property",
  //       path: "/reports/memberproperty",
  //       icon: <FaUsers />,
  //     },
  //     {
  //       title: "Account-wise Member List",
  //       path: "/reports/accountwisemember",
  //       icon: <FaUsers />,
  //     },
  //     {
  //       title: "Report Preferences",
  //       path: "/reports/reportprefences",
  //       icon: <FaCog />,
  //     },
  //     {
  //       title: "Account-wise Member Contribution",
  //       path: "/reports/accountwisemembercontribution",
  //       icon: <FaDollarSign />,
  //     },
    // ],
  // },
  {
    title: "Invoice",
    path:'/invoice',
    icon: <DescriptionIcon />,
    submenus: [
      {
        title: "Bill Invoice",
        path: "/invoice/billinvoice",
        icon: <DescriptionIcon />,
      },
      {
        title: "Bill Format",
        path: "/invoice/billformat",
        icon: <DescriptionIcon />,
      },
      {
        title: "Income ExpenditureSheet",
        path: "/invoice/incomeexpendituresheet",
        icon: <DescriptionIcon />,
      },
      {
        title: "Balance Sheet",
        path: "/invoice/balancesheet",
        icon: <DescriptionIcon />,
      },
      {
        title: "Audit Report",
        path: "/invoice/auditreport",
        icon: <DescriptionIcon />,
      },
      {
        title: "Investement Sheet",
        path: "/invoice/investmentsheet",
        icon: <DescriptionIcon />,
      },
    ],
  },
  
];


export default MenuItems;