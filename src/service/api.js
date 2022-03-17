import { db } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";

export const addUsers = async (data, groupid, id01) => {
  await setDoc(doc(db, "users", id01), {
    uid: id01,
    name: data.name01,
    email: data.mail01,
    group: data.group,
    groupId: groupid,
    password: data.password,
  });

  // await setDoc(doc(db, "users", id02), {
  //     uid: id02,
  //     name: data.name02,
  //     email: data.mail02,
  //     group: data.group,
  //     groupId: groupid,
  //     password: data.password
  // });
  // await setDoc(doc(db, "group", groupid), {
  //     groupId: groupid,
  //     name: data.group,
  //     memberName: {memberName01: data.name01,memberName02:data.name02},
  //     memberId: {memberId01: id01,memberId02:id02}
  // });
};

export const readUsers = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("no data");
  }
};

export const updateUserName = async (user, uid, pass) => {
  const docRef = doc(db, "users", uid);
  // const credential = await auth.EmailAuthProvider.credencial(user.email, pass);
  // console.log(credential);

  if (user.name) {
    await updateDoc(docRef, {
      name: user.name,
    });
  }
};

export const setItems = async (item, id) => {
  await addDoc(collection(db, "items"), {
    itemName: item,
    groupId: id,
    status: 0,
  });
};
