import React, {useContext } from "react";
import { AuthContext } from '../context/AuthProvider';
// import { auth } from "../service/firebase";
// import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
    const value = useContext(AuthContext);
// const [currentUser, setCurrentUser] = useState(null);

    // useEffect(() => {
    //     // onAuthStateChanged(auth,(user) => {
    //     //     if (user) {
    //     //         setCurrentUser(user.uid);
    //     //         console.log(user);
    //     //     }else{
    //     //         setCurrentUser(null);
    //     //     }
    //     // }) 
    // }, [currentUser]);
    console.log(value.userName)
    return (
        <div>Home{value.userName}</div>
    )
}

export default Home;