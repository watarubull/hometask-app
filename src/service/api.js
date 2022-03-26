import { db } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
} from "firebase/firestore";

export const addUsers = async (data, groupid, id01) => {
  await setDoc(doc(db, "users", id01), {
    uid: id01,
    name: data.name01,
    email: data.mail01,
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
  await setDoc(doc(db, "group", groupid), {
    groupId: groupid,
    groupName: data.group,
  });
};

export const readUsers = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const docElm = doc(db, "group", docSnap.data().groupId);
    const docElmSnap = await getDoc(docElm);
    return { userData: docSnap.data(), groupData: docElmSnap.data() };
  } else {
    console.log("no data");
  }
};

export const updateUserName = async (user, uid) => {
  const docRef = doc(db, "users", uid);
  // const credential = await auth.EmailAuthProvider.credencial(user.email, pass);
  // console.log(credential);

  if (user.name) {
    await updateDoc(docRef, {
      name: user.name,
    });
  }
};

export const updateGroupName = async (groupName, groupId) => {
  const docRef = doc(db, "group", groupId);
  // const credential = await auth.EmailAuthProvider.credencial(user.email, pass);
  // console.log(credential);

  if (groupName.group) {
    await updateDoc(docRef, {
      groupName: groupName.group,
    });
  }
};

export const setItems = async (item, id) => {
  let flag = true;

  const itemRef = collection(db, "items");
  const q = query(
    itemRef,
    where("itemName", "==", item),
    where("groupId", "==", id)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (item) => {
    await setDoc(doc(db, "items", item.data().groupId), {
      status: 0,
    });
    console.log(item.data().groupId);
    flag = false;
  });
  if (flag) {
    await addDoc(collection(db, "items"), {
      itemName: item,
      groupId: id,
      status: 0,
    });
  }
};

export const getUser = (uid) => {
  const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
    console.log(doc.data());
  });
};
