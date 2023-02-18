import { Routes, Route } from "react-router-dom";
import Home from "../Page/Home";
import UserDetails from "../Page/UserDetails";


export default function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<UserDetails />} />
        </Routes>
    );
}
