import { Query } from "react-native-appwrite";
import {
  databases,
  DATABASE_ID,
  COLLECTIONS,
} from "./appwrite";

export async function getResidentByUserId(userId: string) {
  const result = await databases.listDocuments({
    databaseId: DATABASE_ID,
    collectionId: COLLECTIONS.residents,
    queries: [
      Query.equal("userId", userId),
      Query.equal("status", "active"),
      Query.limit(1),
    ],
  });

  return result.documents[0] ?? null;
}

export async function getResidentAccount(residentId: string) {
  const result = await databases.listDocuments({
    databaseId: DATABASE_ID,
    collectionId: COLLECTIONS.residentAccounts,
    queries: [
      Query.equal("residentId", residentId),
      Query.limit(1),
    ],
  });

  return result.documents[0] ?? null;
}

export async function getResidentBills(residentId: string) {
  const result = await databases.listDocuments({
    databaseId: DATABASE_ID,
    collectionId: COLLECTIONS.bills,
    queries: [
      Query.equal("residentId", residentId),
      Query.orderDesc("dueDate"),
    ],
  });

  return result.documents;
}

export async function getResidentPayments(residentId: string) {
  const result = await databases.listDocuments({
    databaseId: DATABASE_ID,
    collectionId: COLLECTIONS.payments,
    queries: [
      Query.equal("residentId", residentId),
      Query.orderDesc("paymentDate"),
    ],
  });

  return result.documents;
}