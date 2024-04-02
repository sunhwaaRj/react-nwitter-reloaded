import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const Button  = styled.span`
    margin-top: 10px;
    background-color: white;
    color: black;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    width: 100%;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

const Logo = styled.img`
    height: 25px;
`;

export default function GoogleButton(){
    const navigate = useNavigate();
    const onClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            // redirect to the home page
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <Button onClick={onClick}>
            <Logo src="/google-logo.svg" />
            Continue with Google
        </Button>
    )
}