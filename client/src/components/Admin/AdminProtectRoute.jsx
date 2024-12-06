import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


export default function AdminProtectRoute() {
 const {currentUser} = useSelector(state => state.user);

return currentUser && currentUser.role === 'recruiter' ? (
    <Outlet/>
):(
    <Navigate   to='/sign-in' />
)
}
