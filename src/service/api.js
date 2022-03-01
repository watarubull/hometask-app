import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export const addUsers = async(data,groupid,id01,id02) =>{
    await setDoc(doc(db, "users", id01), {
        uid: id01,
        name: data.name01,
        email: data.mail01,
        group: data.group,
        groupId: groupid,
        password: data.password
    });
    await setDoc(doc(db, "users", id02), {
        uid: id02,
        name: data.name02,
        email: data.mail02,
        group: data.group,
        groupId: groupid,
        password: data.password
    });
    await setDoc(doc(db, "group", groupid), {
        groupId: groupid,
        name: data.group,
        memberName: {memberName01: data.name01,memberName02:data.name02},
        memberId: {memberId01: id01,memberId02:id02}
    });
}
