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
import AllCastronomy from "layouts/Admin/castronomy/allCastronomy";
import AllJeux from "layouts/Admin/jeux/allJeux";
import Login from "screens/Login";
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import CircuitsOwner from "views/Owner/CircuitsOwner";
import ContactsOwner from "views/Owner/ContactsOwner";
import DashboardOwner from "views/Owner/DashboardOwner";
import EventsOwner from "views/Owner/EventsOwner";
import ProductsOwner from "views/Owner/ProductsOwner";
import ServicesOwner from "views/Owner/ServicesOwner";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/owner",
  },
  {
    path: "/profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/owner",
  },

  {
    path: "/products",
    name: "Products",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: ProductsOwner,
    layout: "/owner",
  },
  {
    path: "/events",
    name: "Events",
    rtlName: "إخطارات",
    icon: "tim-icons icon-calendar-60",
    component: EventsOwner,
    layout: "/owner",
  },
 
  {
    path: "/circuits",
    name: "Circuit",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-map-big",
    component: CircuitsOwner,
    layout: "/owner",
  },
  {
    path: "/gastronomy",
    name: "Gastronomy",
    rtlName: "طباعة",
    icon: "tim-icons icon-bullet-list-67",
    component: AllCastronomy,
    layout: "/owner",
  },
  {
    path: "/jeux",
    name: "Jeux",
    rtlName: "طباعة",
    icon: "tim-icons icon-bullet-list-67",
    component: AllJeux,
    layout: "/owner",
  },
  {
    path: "/contact",
    name: "Contact",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-badge",
    component: ContactsOwner,
    layout: "/owner",
  },
];
export default routes;
