import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
    margin-top: 30px;
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

export default function GithubButton(){
    const navigate = useNavigate();
    const onClick = async () => {
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            // redirect to the home page
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    }
    return (
    <Button onClick={onClick}>
        <Logo src="/github-logo.svg" />
        Continue with Github
    </Button>)
}