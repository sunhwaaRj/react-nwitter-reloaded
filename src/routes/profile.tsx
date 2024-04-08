import styled from "styled-components";
import { auth, db, storage } from "../firebase"
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Unsubscribe, updateProfile } from "firebase/auth";
import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import Tweet from "../components/tweet";

export interface ITweet {
    id: string;
    photo?: string;
    tweet: string;
    userId: string;
    username: string;
    createdAt: number;
  }

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
`;

const AvatarUpload = styled.label`
    width: 80px;
    overflow: hidden;
    height: 80px;
    border-radius: 50%;
    background-color: #1d9bf0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        height: 60px;
    }
`;

const AvatarImg = styled.img`
    width: 100%;
`;

const AvatarInput = styled.input`
    display: none;
`;

const Name = styled.span`
    font-size: 22px;
`;

const Tweets = styled.div`

`;

export default function Profile(){
    const user = auth.currentUser;
    const [avatar, setAvatar] = useState(user?.photoURL);
    const [tweets, setTweets] = useState<ITweet[]>([]);
    const onAvatarChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if(!user) return;
        if(files && files.length === 1){
            const file = files[0];
            const locationRef = ref(storage, `avatars/${user?.uid}`);
            const result = await uploadBytes(locationRef, file);
            const avatarUrl = await getDownloadURL(result.ref);
            setAvatar(avatarUrl);
            await updateProfile(user, {
                photoURL: avatarUrl,
            });
        }
    };
    /* */
    useEffect(() => {
        let unsubscribe : Unsubscribe | null = null;
        const fetchTweets = async() => {
            const tweetsQuery = query(
                collection(db, "tweets"),
                orderBy("createdAt", "desc"),
                where("userId", "==", user?.uid),
                limit(25),
            );
            unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
                const tweets = snapshot.docs.map((doc) => {
                  const { tweet, createdAt, userId, username, photo } = doc.data();
                  return {
                    tweet,
                    createdAt,
                    userId,
                    username,
                    photo,
                    id: doc.id,
                  };
                });
                setTweets(tweets); // 문서 생성하는 대신 쿼리에 리스너 추가
              });
        };
        fetchTweets();
        return () => {
            unsubscribe && unsubscribe();
          }
    }, []);

    return (
    <Wrapper>
        {/* label은 input의 의미 알려주기 위함 */}
        <AvatarUpload htmlFor="avatar"> 
            {avatar ? (
                <AvatarImg src={avatar}/>
            ) : (
                <svg 
                    data-slot="icon" 
                    fill="currentColor" 
                    viewBox="0 0 20 20" 
                    xmlns="http://www.w3.org/2000/svg" 
                    aria-hidden="true"
                >
                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z">
                </path>
                </svg>
            )}
        </AvatarUpload>
        <AvatarInput 
            onChange={onAvatarChange}
            id="avatar" 
            type="file" 
            accept="image/*" 
        />
        <Name>
            {user?.displayName ? user.displayName : "Anonymous"}
        </Name>
        <Tweets>
            {tweets.map((tweet) => (
                <Tweet key={tweet.id} {...tweet} />
            ))}
        </Tweets>
    </Wrapper>
    )
}