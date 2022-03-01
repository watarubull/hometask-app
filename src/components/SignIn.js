import { useState ,useCallback } from "react";
import { auth } from "../service/firebase";
import {getAuth, signInWithEmailAndPassword ,signOut} from "firebase/auth";


const SignIn = () => {
    const [inputs,setInputs] = useState({});
    const onInputChange = useCallback(
        event => {
            setInputs({...inputs, [event.target.name]: event.target.value });
        },
        [inputs]
    );
    const register = () => {
        signInWithEmailAndPassword(getAuth(),inputs.email, inputs.password);
    }
    const logOut = () => {
        signOut(getAuth());
    }
    return (
        <>
            <div>SignIn</div>
            <div>
                <p>メールアドレス</p>
                <input
                    name="email"
                    type="email"
                    placeholder="メールアドレス"
                    onChange={onInputChange}
                    value={inputs.email || ''}
                />
                <p>パスワード</p>
                <input
                    name="password"
                    type="password"
                    placeholder="共通パスワード"
                    onChange={onInputChange}
                    value={inputs.password || ''}
                />
                <p>
                    <button
                        type="button"
                        onClick={() => register()}
                    >
                        サインイン
                    </button>
                </p>
                <p>
                    <button
                        type="button"
                        onClick={() => logOut()}
                    >
                        サインアウト
                    </button>
                </p>
            </div>
        </>

    )
}

export default SignIn;


