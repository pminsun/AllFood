import { auth } from "./firebasedb";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

export const reauthenticate = async (email, password) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("현재 사용자가 인증되지 않았습니다.");
  }

  const credential = EmailAuthProvider.credential(email, password);

  try {
    await reauthenticateWithCredential(user, credential);
    return true;
  } catch (error) {
    console.error("Reauthentication failed:", error);
    throw error;
  }
};
