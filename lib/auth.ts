import { ID } from "react-native-appwrite";
import { account } from "./appwrite";

export async function login(
  email: string,
  password: string
) {
  return account.createEmailPasswordSession({
    email,
    password,
  });
}

export async function logout() {
  await account.deleteSession({
    sessionId: "current",
  });
}

export async function getCurrentUser() {
  try {
    return await account.get();
  } catch {
    return null;
  }
}