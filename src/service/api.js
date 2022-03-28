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

  const itemRef = collection(db, "group");
  const q = query(itemRef, where("groupId", "==", groupid));
  const querySnapshot = await getDocs(q);
  let groupData;
  querySnapshot.forEach((doc) => {
    groupData = doc.id;
  });

  if (!groupData) {
    await setDoc(doc(db, "group", groupid), {
      groupId: groupid,
      groupName: data.group,
    });
  }
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

  if (user) {
    await updateDoc(docRef, {
      name: user,
    });
  }
};

export const updateGroupName = async (groupName, groupId) => {
  const docRef = doc(db, "group", groupId);
  // const credential = await auth.EmailAuthProvider.credencial(user.email, pass);
  // console.log(credential);

  if (groupName) {
    await updateDoc(docRef, {
      groupName: groupName,
    });
  }
};

export const setItems = async (item, id) => {
  const itemRef = collection(db, "items");
  const q = query(
    itemRef,
    where("itemName", "==", item),
    where("groupId", "==", id)
  );
  const querySnapshot = await getDocs(q);
  let itemData;
  querySnapshot.forEach((doc) => {
    itemData = doc.id;
  });
  if (!itemData) {
    await addDoc(collection(db, "items"), {
      itemName: item,
      groupId: id,
      status: 0,
    });
  } else {
    await updateDoc(doc(db, "items", itemData), {
      status: 0,
    });
  }
};

export const getUser = (uid) => {
  const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
    console.log(doc.data());
  });
};
