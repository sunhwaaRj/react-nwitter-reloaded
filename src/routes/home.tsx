import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Home(){
    const Navigate = useNavigate();
    const logOut = () => {
        auth.signOut();
        Navigate("/login");
    }
    return (
    <h1>
        <button onClick={logOut}>logOut</button>
    </h1>
    );
}