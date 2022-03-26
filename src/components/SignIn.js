import { useState, useCallback } from "react";
import { auth } from "../service/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [inputs, setInputs] = useState({});
  const onInputChange = useCallback(
    (event) => {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    },
    [inputs]
  );
  const register = () => {
    signInWithEmailAndPassword(auth, inputs.email, inputs.password)
      .then((userCredential) => {
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };
  return (
    <>
      <dl className="input-area">
        <dt className="title">メールアドレス</dt>
        <dd className="item">
          <input
            name="email"
            type="email"
            placeholder="メールアドレス"
            onChange={onInputChange}
            value={inputs.email || ""}
          />
        </dd>
        <dt className="title">パスワード</dt>
        <dd className="item">
          <input
            name="password"
            type="password"
            placeholder="共通パスワード"
            onChange={onInputChange}
            value={inputs.password || ""}
          />
        </dd>
      </dl>
      <p className="submit">
        <button type="button" onClick={() => register()}>
          サインイン
        </button>
      </p>
    </>
  );
};

export default SignIn;
