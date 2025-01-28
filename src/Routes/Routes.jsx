import { createBrowserRouter } from "react-router-dom";
import Layout from '../Layout';
import Login from "@/pages/Auth/Login";
import PublicRoute from "./PublicRoute";
import Home from "@/pages/Home/Home";
import AddCampaign from '../pages/AddCampaign/AddCampaign';
import PrivateRoute from "./PrivateRoute";
import Campaign from "@/pages/Campaign/Campaign";
import Notfound from "@/pages/Notfound/Notfound";
import MyCampaign from "@/pages/MyCampaign/MyCampaign";
import UpdateCampaign from "@/pages/UpdateCampaign/UpdateCampaign";
import MyDonations from '../pages/MyDonations/MyDonations';
import AllCampaigns from "@/pages/AllCampaigns/AllCampaigns";
import Register from '../pages/Auth/Register';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '*',
                element: <Notfound />   
            },
            {
                path: '/auth',
                children: [
                    {
                        path: 'login',
                        element: (
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        )
                    },
                    {
                        path: 'register',
                        element: (
                            <PublicRoute>
                                <Register />
                            </PublicRoute>
                        )
                    }
                ]
            },
            {
                path: '/addcampaign',
                element: (
                    <PrivateRoute>
                        <AddCampaign />
                    </PrivateRoute>
                )
            },
            {
                path: '/campaign/:id',
                element: (
                    <PrivateRoute>
                        <Campaign />
                    </PrivateRoute>
                )
            },
            {
                path: '/mycampaign',
                element: (
                    <PrivateRoute>
                        <MyCampaign />
                    </PrivateRoute>
                )
            },
            {
                path: '/updateCampaign/:id',
                element: (
                    <PrivateRoute>
                        <UpdateCampaign />
                    </PrivateRoute>
                )
            },
            {
                path: '/mydonations',
                element: (
                    <PrivateRoute>
                        <MyDonations />
                    </PrivateRoute>
                )
            },
            {
                path: '/campaigns',
                element: <AllCampaigns />
            }
        ]
    }
])