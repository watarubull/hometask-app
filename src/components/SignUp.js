import { useState ,useCallback } from "react";
import * as Api from "../service/api";
import { auth } from "../service/firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import shortid from "shortid";

const SignUp = () => {
    const [inputs,setInputs] = useState({});

    const register = async() => {
        console.log(inputs);
        const initialState = shortid.generate();
        await createUserWithEmailAndPassword(auth,inputs.mail01,inputs.password);
        const user01 = auth.currentUser.uid;
        await createUserWithEmailAndPassword(auth,inputs.mail02,inputs.password);
        const user02 = auth.currentUser.uid;
        Api.addUsers(inputs,initialState,user01,user02);
    }

    const onInputChange = useCallback(
        event => {
            setInputs({...inputs, [event.target.name]: event.target.value });
        },
        [inputs]
    );

    return (
        <>
            <h1>ユーザ登録</h1>
            <div>
                <p>グループ名</p>
                <input
                    name="group"
                    type="text"
                    onChange={onInputChange}
                    value={inputs.group || ''}
                />
                <p>メンバー1</p>
                <input
                    name="name01"
                    type="text"
                    placeholder="名前"
                    onChange={onInputChange}
                    value={inputs.name01 || ''}
                />
                <input
                    name="mail01"
                    type="email"
                    placeholder="メールアドレス"
                    onChange={onInputChange}
                    value={inputs.mail01 || ''}
                />
                <p>メンバー2</p>
                <input
                    name="name02"
                    type="text"
                    placeholder="名前"
                    onChange={onInputChange}
                    value={inputs.name02 || ''}
                />
                <input
                    name="mail02"
                    type="email"
                    placeholder="メールアドレス"
                    onChange={onInputChange}
                    value={inputs.mail02 || ''}
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
                        登録
                    </button>
                </p>
            </div>
        </>
    );
};

export default SignUp;