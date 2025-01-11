
// import React, { useState } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import "../styles/sidebar.css";
// import  MenuItems from '../components/MenuItems';
// import { FaAngleLeft, FaAngleDown, FaAngleUp, FaBars, FaSignOutAlt } from "react-icons/fa";
// import Navbar from '../components/Navbar'

// function Sidebar() {
//   const [collapsed, setCollapsed] = useState(false);
//   const [openSubMenus, setOpenSubMenus] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [logoutMessage, setLogoutMessage] = useState(false);
//   const navigate = useNavigate();

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//     setOpenSubMenus([]);
//   };

//   const toggleSidebarOpen = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   // const toggleSubMenu = (path, event) => {
//   //   event.preventDefault();
//   //   const isOpen = openSubMenus.includes(path);
//   //   setOpenSubMenus(prev => isOpen ? prev.filter(item => item !== path) : [...prev, path]);
//   // };


//   const toggleSubMenu = (path, event) => {
//     event.preventDefault();
//     // If the clicked submenu is already open, close it; else open it
//     setOpenSubMenus(openSubMenus === path ? null : path);
//   };



//   const handleLogOut = (e) => {
//     e.preventDefault();
//     setLogoutMessage(true);
//     setTimeout(() => {
//       setLogoutMessage(false);
//       navigate("/exit");
//     }, 1000); 
//   };

//   const renderSubmenus = (submenus, parentPath = "") => {
//     return (
//       <ul className="submenu">
//         {submenus.map((subItem, subIndex) => {
//           const fullPath = `${parentPath}${subItem.path}`;
//           const isOpen = openSubMenus.includes(fullPath);
//           return (
//             <li key={subIndex}>
//               <Link
//                 to={subItem.path}
//                 className="submenu-link"
//                 onClick={(event) => {
//                   if (subItem.submenus) {
//                     event.preventDefault();
//                     toggleSubMenu(fullPath, event);
//                   } else {
//                     navigate(subItem.path);
//                   }
//                 }}
//               >
//                 <span>{subItem.icon}</span>
//                 <span className="hidden-text">{subItem.title}</span>
//                 &nbsp;&nbsp;
//                 {subItem.submenus && (isOpen ? <FaAngleUp /> : <FaAngleDown />)}
//               </Link>
//               {subItem.submenus && isOpen && renderSubmenus(subItem.submenus, `${fullPath}/`)}
//             </li>
//           );
//         })}
//       </ul>
//     );
//   };

//   return (
//     <div className={`grid-container`}>
//       <section className={`sidebar ${collapsed ? "collapsed" : ""} ${sidebarOpen ? "open" : ""}`}>
//         <div className="sidebar-content">
//           <div className="toggle">
//             <FaAngleLeft
//               style={{
//                 color: "#F3F7EC",
//                 fontSize: "21px",
//                 background: "#0a60bd",
//                 borderRadius: "50%",
//                 padding: "5px",
//               }}
//               onClick={toggleSidebar}
//             />
//           </div>
//         </div>

//         <div className="sidebar-content-items">
//           <div className="sidebar-items">
//             <div className="menu-bar">
//               <div className="menus">
//                 <ul className="menu">
//                   {MenuItems.map((item, index) => (
//                     <li className="main-link" key={index}>
//                       <div className="menu-item">
//                         <Link
//                           to={item.path}
//                           className="menu-link"
//                           onClick={(event) => {
//                             if (item.submenus) {
//                               event.preventDefault();
//                               toggleSubMenu(item.path, event);
//                             } else {
//                               navigate(item.path);
//                             }
//                           }}
//                         >
//                           <i className="menu-icon">{item.icon}</i>
//                           <span className="hidden-text">{item.title}</span>
//                           &nbsp;
//                           {item.submenus && (openSubMenus.includes(item.path) ? <FaAngleUp /> : <FaAngleDown />)}
//                         </Link>
//                         {item.submenus && openSubMenus.includes(item.path) && renderSubmenus(item.submenus, `${item.path}/`)}
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <div className="bottom-content">
//               <ul>
//                 <li>
//                   <Link to="/exit" className="logout-link" onClick={handleLogOut}>
//                     <FaSignOutAlt className="logout-icon" />
//                     <span className="hidden-text">Logout</span>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="sidebar-toggle-btn" onClick={toggleSidebarOpen}>
//           <FaBars />
//         </div>
//       </section>
//       <Navbar/>

//       <main className="main" style={{height:'85vh', border:'1px solid red'}}>
//         {logoutMessage && <div className="logout-message" >User Logged Out!!!</div>}

//         <Outlet />
//       </main>
//       {sidebarOpen && (
//         <div className="backdrop open" onClick={toggleSidebarOpen}></div>
//       )}
//     </div>
//   );
// }

// export default Sidebar;







//2 number


import React, { useState } from "react";
 import { Link, Outlet, useNavigate } from "react-router-dom";
 import "./sidebar.css";
 import  MenuItems from '../components/MenuItems';
 import { FaAngleLeft, FaAngleDown, FaAngleUp, FaBars, FaSignOutAlt } from "react-icons/fa";
 import Navbar from '../components/Navbar';

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    setOpenSubMenus([]);
  };

  const toggleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSubMenu = (path, event) => {
    event.preventDefault(); // Prevent the default navigation for submenus
    setOpenSubMenus((prevState) => {
      if (prevState.includes(path)) {
        return prevState.filter(item => item !== path); // Close the submenu
      } else {
        return [...prevState, path]; // Open the submenu
      }
    });
  };
  const handleLogOut = (e) => { 
    navigate("/signin");
    e.preventDefault(); setLogoutMessage(true);
     setTimeout(() => {
       setLogoutMessage(false); 
      // Ensure this path matches the route defined in App.js 
      }, 1000); 
    };
  const renderSubmenus = (submenus, parentPath = "") => {
    return (
      <ul className="submenu">
        {submenus.map((subItem, subIndex) => {
          const fullPath = `${parentPath}${subItem.path}`;
          const isOpen = openSubMenus.includes(fullPath);
          return (
            <li key={subIndex}>
              <Link
                to={subItem.path}
                className="submenu-link"
                onClick={(event) => {
                  if (subItem.submenus) {
                    event.preventDefault();
                    toggleSubMenu(fullPath, event);
                  } else {
                    navigate(subItem.path);
                  }
                }}
              >
                <span>{subItem.icon}</span>
                <span className="hidden-text">{subItem.title}</span>
                &nbsp;&nbsp;
                {subItem.submenus && (isOpen ? <FaAngleUp /> : <FaAngleDown />)}
              </Link>
              {subItem.submenus && isOpen && renderSubmenus(subItem.submenus, `${fullPath}/`)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={`grid-container`}>
      <section className={`sidebar ${collapsed ? "collapsed" : ""} ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <div className="toggle">
            <FaAngleLeft
              style={{
                color: "#F3F7EC",
                fontSize: "21px",
                background: "#0a60bd",
                borderRadius: "50%",
                padding: "5px",
              }}
              onClick={toggleSidebar}
            />
          </div>
        </div>

        <div className="sidebar-content-items">
          <div className="sidebar-items">
            <div className="menu-bar">
              <div className="menus">
                <ul className="menu">
                  {MenuItems.map((item, index) => (
                    <li className="main-link" key={index}>
                      <div className="menu-item">
                        <Link
                          to={item.path}
                          className="menu-link"
                          onClick={(event) => {
                            if (item.submenus) {
                              event.preventDefault();
                              toggleSubMenu(item.path, event);
                            } else {
                              navigate(item.path);
                            }
                          }}
                        >
                          <i className="menu-icon">{item.icon}</i>
                          <span className="hidden-text">{item.title}</span>
                          &nbsp;
                          {item.submenus && (openSubMenus.includes(item.path) ? <FaAngleUp /> : <FaAngleDown />)}
                        </Link>
                        {item.submenus && openSubMenus.includes(item.path) && renderSubmenus(item.submenus, `${item.path}/`)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bottom-content">
              <ul>
                <li>
                  <Link to="/signin" className="logout-link" onClick={handleLogOut}>
                    <FaSignOutAlt className="logout-icon" />
                    <span className="hidden-text">Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="sidebar-toggle-btn" onClick={toggleSidebarOpen}>
          <FaBars />
        </div>
      </section>
      <Navbar/>
      <main className="main" style={{height:'85vh'}}>
        {logoutMessage && <div className="logout-message" >User Logged Out!!!</div>}
        <Outlet />
      </main>
      {sidebarOpen && (
        <div className="backdrop open" onClick={toggleSidebarOpen}></div>
      )}
    </div>
  );
}

export default Sidebar;



//3rd

// import React, { useState } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import "../styles/sidebar.css";
// import MenuItems from '../components/MenuItems';
// import { FaAngleLeft, FaAngleDown, FaAngleUp, FaBars, FaSignOutAlt } from "react-icons/fa";
// import Navbar from '../components/Navbar';

// function Sidebar() {
//   const [collapsed, setCollapsed] = useState(false);
//   const [openSubMenu, setOpenSubMenu] = useState(null); // Track the active menu item that has submenus open
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [logoutMessage, setLogoutMessage] = useState(false);
//   const navigate = useNavigate();

//   // Toggle the sidebar (collapsed)
//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//     setOpenSubMenu(null); // Close any open submenus when collapsing the sidebar
//   };

//   // Toggle the sidebar visibility
//   const toggleSidebarOpen = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   // Toggle the submenu for the clicked menu item
//   const toggleSubMenu = (path, event) => {
//     event.preventDefault();
//     setOpenSubMenu(openSubMenu === path ? null : path); // Toggle the selected submenu
//   };

//   // Handle logout
//   const handleLogOut = (e) => {
//     e.preventDefault();
//     setLogoutMessage(true);
//     setTimeout(() => {
//       setLogoutMessage(false);
//       navigate("/exit");
//     }, 1000);
//   };

//   // Render submenus for a specific menu item
//   const renderSubmenus = (submenus, parentPath = "") => {
//     return (
//       <ul className="submenu">
//         {submenus.map((subItem, subIndex) => {
//           const fullPath = `${parentPath}${subItem.path}`;
//           const isOpen = openSubMenu === fullPath; // Only open if this submenu path is active
//           return (
//             <li key={subIndex}>
//               <Link
//                 to={subItem.path}
//                 className="submenu-link"
//                 onClick={(event) => {
//                   if (subItem.submenus) {
//                     event.preventDefault();
//                     toggleSubMenu(fullPath, event); // Toggle the submenu visibility
//                   } else {
//                     navigate(subItem.path); // Navigate if no submenus
//                   }
//                 }}
//               >
//                 <span>{subItem.icon}</span>
//                 <span className="hidden-text">{subItem.title}</span>
//                 &nbsp;&nbsp;
//                 {subItem.submenus && (isOpen ? <FaAngleUp /> : <FaAngleDown />)} {/* Show expand/collapse icon */}
//               </Link>
//               {/* Render nested submenus if open */}
//               {subItem.submenus && isOpen && renderSubmenus(subItem.submenus, `${fullPath}/`)}
//             </li>
//           );
//         })}
//       </ul>
//     );
//   };

//   return (
//     <div className={`grid-container`}>
//       <section className={`sidebar ${collapsed ? "collapsed" : ""} ${sidebarOpen ? "open" : ""}`}>
//         <div className="sidebar-content">
//           <div className="toggle">
//             <FaAngleLeft
//               style={{
//                 color: "#F3F7EC",
//                 fontSize: "21px",
//                 background: "#0a60bd",
//                 borderRadius: "50%",
//                 padding: "5px",
//               }}
//               onClick={toggleSidebar}
//             />
//           </div>
//         </div>

//         <div className="sidebar-content-items">
//           <div className="sidebar-items">
//             <div className="menu-bar">
//               <div className="menus">
//                 <ul className="menu">
//                   {MenuItems.map((item, index) => (
//                     <li className="main-link" key={index}>
//                       <div className="menu-item">
//                         <Link
//                           to={item.path}
//                           className="menu-link"
//                           onClick={(event) => {
//                             if (item.submenus) {
//                               event.preventDefault();
//                               toggleSubMenu(item.path, event); // Toggle the submenu visibility
//                             } else {
//                               navigate(item.path); // Navigate if no submenus
//                             }
//                           }}
//                         >
//                           <i className="menu-icon">{item.icon}</i>
//                           <span className="hidden-text">{item.title}</span>
//                           &nbsp;
//                           {item.submenus && (openSubMenu === item.path ? <FaAngleUp /> : <FaAngleDown />)} {/* Show expand/collapse icon */}
//                         </Link>
//                         {/* Render submenus only if this item is active */}
//                         {item.submenus && openSubMenu === item.path && renderSubmenus(item.submenus, `${item.path}/`)}
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <div className="bottom-content">
//               <ul>
//                 <li>
//                   <Link to="/exit" className="logout-link" onClick={handleLogOut}>
//                     <FaSignOutAlt className="logout-icon" />
//                     <span className="hidden-text">Logout</span>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="sidebar-toggle-btn" onClick={toggleSidebarOpen}>
//           <FaBars />
//         </div>
//       </section>
//       <Navbar />

//       <main className="main" style={{height: '85vh'}}>
//         {logoutMessage && <div className="logout-message">User Logged Out!!!</div>}
//         <Outlet />
//       </main>
//       {sidebarOpen && (
//         <div className="backdrop open" onClick={toggleSidebarOpen}></div>
//       )}
//     </div>
//   );
// }

// export default Sidebar;
