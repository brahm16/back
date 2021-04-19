/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import Login from "./screens/Login";
import Register from "./screens/Register";
import ForgetPassword from "./screens/ForgetPassword";
import ResetPassword from "./screens/ResetPassword";
import Test from "Test";
import User from "layouts/User/User";
import Owner from "layouts/Owner/Owner";
import AdminRoute from "./Routes/AdminRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import OwnerRoute from "./Routes/OwnerRoute";
import UserProfile from "views/UserProfile";
import Admin from "layouts/Admin/Admin";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";
import routesOwner from "routesOwner";
import routesUser from "routesUser"

import logo from "assets/img/react-logo.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { getCookie } from "helpers/auth";
import Dashboard from "views/Dashboard";
import Allimages from "layouts/Admin/Images/Allimages";
import DashboardUser from "views/User/DashboardUser";
import DashboardOwner from "views/Owner/DashboardOwner";
import Products from "views/Products";
import Circuits from "views/Circuits";
import Events from "views/Events";
import Guests from "views/Guests";
import Places from "views/Places";
import Services from "views/Services";
import Contacts from "views/Contacts";
import AllUsers from "views/AllUsers";

import ProductsOwner from "views/Owner/ProductsOwner";
import EventsOwner from "views/Owner/EventsOwner";
import CircuitsOwner from "views/Owner/CircuitsOwner";
import ServicesOwner from "views/Owner/ServicesOwner";
import ProductsUser from "views/User/ProductsUser";
import OrdersUser from "views/User/OrdersUser";
import EventUser from "views/User/EventUser";
import GuestHouseUser from "views/User/GuestHouseUser";
import 'react-toastify/dist/ReactToastify.css';
import Allcontacts from "layouts/Admin/contacts/Allcontacts";
import Allproducts from "layouts/Admin/products/Allproducts";
import Allevents from "layouts/Admin/events/Allevents";
import AllCastronomy from "layouts/Admin/castronomy/allCastronomy";
import AllJeux from "layouts/Admin/jeux/allJeux";

const DashAdmin = ({match}) => {
  var ps;
const cc=getCookie("role");
const user=getCookie("user");
console.log("aaa"+cc);
console.log(user);
  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Admin";
  };
  return(
    <BackgroundColorContext.Consumer>
    {({ color, changeColor }) => (
      <React.Fragment>
        <div className="wrapper">
         
          <Sidebar
            routes={routes}
            logo={{
              outterLink: "http://localhost:3003",
              text: "HawasBia",
              imgSrc: logo, 
            }}
            toggleSidebar={toggleSidebar}
          />
          <div className="main-panel" ref={mainPanelRef} data={color}>
            <AdminNavbar
              brandText={getBrandText(location.pathname)}
              toggleSidebar={toggleSidebar}
              sidebarOpened={sidebarOpened}
              role={cc}
            />
            <Switch>
        <Route path={match.path}  exact={true}  component={Dashboard} />
        <Route path={`${match.path}/profile`} exact={true} component={UserProfile} />
        <Route path={`${match.path}/images`} exact={true} component={Allimages} />
        <Route path={`${match.path}/users`} exact={true} component={AllUsers} />  
        <Route path={`${match.path}/products`} exact={true} component={Allproducts} />
        <Route path={`${match.path}/circuits`} exact={true} component={Circuits} />
        <Route path={`${match.path}/events`} exact={true} component={Allevents} />
        <Route path={`${match.path}/guests`} exact={true} component={Guests} />
        <Route path={`${match.path}/places`} exact={true} component={Places} />
        <Route path={`${match.path}/services`} exact={true} component={Services} />
        <Route path={`${match.path}/contacts`} exact={true} component={Allcontacts} />
        <Route path={`${match.path}/gastronomy`} exact={true} component={AllCastronomy} />
        <Route path={`${match.path}/jeux`} exact={true} component={AllJeux} />









    </Switch> 

            {
              // we don't want the Footer to be rendered on map page
              location.pathname === "/admin/maps" ? null : <Footer fluid />
            }
          </div>
        </div>
        <FixedPlugin bgColor={color} handleBgClick={changeColor} />
      </React.Fragment>
    )}
  </BackgroundColorContext.Consumer>
   
    
  );
};
const DashOwner = ({match}) => {
  var ps;

  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routesOwner) => {
    return routesOwner.map((prop, key) => {
      if (prop.layout === "/owner") {
        return (
          <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Owner";
  };
  return(
    <BackgroundColorContext.Consumer>
    {({ color, changeColor }) => (
      <React.Fragment>
        <div className="wrapper">
         
          <Sidebar
            routes={routesOwner}
            logo={{
              outterLink: "http://localhost:3003",
              text: "HawasBia",
              imgSrc: logo, 
            }}
            toggleSidebar={toggleSidebar}
          />
          <div className="main-panel" ref={mainPanelRef} data={color}>
            <AdminNavbar
              brandText={getBrandText(location.pathname)}
              toggleSidebar={toggleSidebar}
              sidebarOpened={sidebarOpened}
            />
            <Switch>
        <Route path={match.path}  exact={true}  component={DashboardOwner} />
        <Route path={`${match.path}/profile`} exact={true} component={UserProfile} />
        <Route path={`${match.path}/products`} exact={true} component={Allproducts} />
        <Route path={`${match.path}/events`} exact={true} component={Allevents} />
        <Route path={`${match.path}/circuits`} exact={true} component={CircuitsOwner} />
        <Route path={`${match.path}/services`} exact={true} component={ServicesOwner} />
        <Route path={`${match.path}/gastronomy`} exact={true} component={AllCastronomy} />
        <Route path={`${match.path}/jeux`} exact={true} component={AllJeux} />

    </Switch> 

            {
              // we don't want the Footer to be rendered on map page
              location.pathname === "/admin/maps" ? null : <Footer fluid />
            }
          </div>
        </div>
        <FixedPlugin bgColor={color} handleBgClick={changeColor} />
      </React.Fragment>
    )}
  </BackgroundColorContext.Consumer>
   
    
  );
};
const DashUser = ({match}) => {
  var ps;

  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routesUser) => {
    return routesUser.map((prop, key) => {
      if (prop.layout === "/subscriber") {
        return (
          <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "HawasBia";
  };
  return(
    <BackgroundColorContext.Consumer>
    {({ color, changeColor }) => (
      <React.Fragment>
        <div className="wrapper">
         
          <Sidebar
            routes={routesUser}
            logo={{
              outterLink: "http://localhost:3003",
              text: "HawasBia",
              imgSrc: logo, 
            }}
            toggleSidebar={toggleSidebar}
          />
          <div className="main-panel" ref={mainPanelRef} data={color}>
            <AdminNavbar
              brandText={getBrandText(location.pathname)}
              toggleSidebar={toggleSidebar}
              sidebarOpened={sidebarOpened}
            />
            <Switch>
        <Route path={match.path}  exact={true}  component={DashboardUser} />
        <Route path={`${match.path}/profile`} exact={true} component={UserProfile} />
        <Route path={`${match.path}/products`} exact={true} component={ProductsUser} />
        <Route path={`${match.path}/orders`} exact={true} component={OrdersUser} />
        <Route path={`${match.path}/events`} exact={true} component={EventUser} />
        <Route path={`${match.path}/guests`} exact={true} component={GuestHouseUser} />









    </Switch> 

            {
              // we don't want the Footer to be rendered on map page
              location.pathname === "/admin/maps" ? null : <Footer fluid />
            }
          </div>
        </div>
        <FixedPlugin bgColor={color} handleBgClick={changeColor} />
      </React.Fragment>
    )}
  </BackgroundColorContext.Consumer>
   
    
  );
};

ReactDOM.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Switch>
          <Route path="/login"  render={(props) => <Login {...props} />} />

          <Route
            path="/register"
           
            render={(props) => <Register {...props} />}
          />
          <Route
            path="/users/password/forget"
            
            render={(props) => <ForgetPassword {...props} />}
          />

          <Route
            path="/users/password/reset/:token"
            
            render={(props) => <ResetPassword {...props} />}
          />
       
         

          <Route path="/rtl" render={(props) => <RTLLayout {...props} />} />
          <Route path="/test" render={(props)=> <Test {...props} />} />
          <PrivateRoute path="/subscriber" component={DashUser} />
          <AdminRoute path="/admin"   component={DashAdmin} />
          <OwnerRoute path='/owner' component={DashOwner}  /> 


          <Redirect from="/" to="/login" />
        </Switch>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>,
  document.getElementById("root")
);
