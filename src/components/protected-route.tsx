import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({
    children,
} : {
    children: React.ReactNode;
}){
    const user = auth.currentUser; // 로그인 사용자의 정보

    if(user === null){
        return <Navigate to = "/login" />
    }
    return children;
}