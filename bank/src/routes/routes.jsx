import React, { Children } from "react";
import Home from "../screens/Home";
import Login from "../screens/Login";
import MainLayout from "../screens/Layout";
import DashboardPage from "../screens/Home";
import TransfersPage from "../screens/Transfers";


const routes =[
    {
        path : "/",
        element:<Login/>,
    },{
        element: <MainLayout/>, // This wraps all protected routes with sidebar
        children: [
          {
            path: "/home",
            element: <DashboardPage/>,
          },
          {
            path:"/transfers",
            element:<TransfersPage/>
          }
        
        ],
      },
    ];
export default routes;