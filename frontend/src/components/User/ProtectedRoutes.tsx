import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { User } from "../../models/user";

interface ProtectedRoutesProps {
    loggedInUser: User | null,
}

export default function ProtectedRoutes({ loggedInUser }: ProtectedRoutesProps) {
    return loggedInUser ? <Outlet /> : <Navigate to="/" />;
}