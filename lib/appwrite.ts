import {
  Client,
  Account,
  Databases,
  Query,
} from "react-native-appwrite";

import type {
  Resident,
  Account as ResidentAccount,
  Bill,
  Payment,
} from "./types";

const endpoint =
  process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;

const projectId =
  process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;

const databaseId =
  process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;

if (!endpoint) {
  throw new Error(
    "Missing EXPO_PUBLIC_APPWRITE_ENDPOINT"
  );
}

if (!projectId) {
  throw new Error(
    "Missing EXPO_PUBLIC_APPWRITE_PROJECT_ID"
  );
}

if (!databaseId) {
  throw new Error(
    "Missing EXPO_PUBLIC_APPWRITE_DATABASE_ID"
  );
}

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform("smartpay-resident-mobile");

export const account = new Account(client);

export const databases = new Databases(client);

export const DATABASE_ID = databaseId;

export const COLLECTIONS = {
  residents: "residents",
  residentAccounts: "resident_accounts",
  bills: "bills",
  payments: "payments",
  revenueSources: "revenue_sources",
} as const;


/* ============================================
   AUTHENTICATION
============================================ */

export async function getCurrentUser() {
  try {
    return await account.get();
  } catch {
    return null;
  }
}

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
  try {
    await account.deleteSession({
      sessionId: "current",
    });
  } catch {
    // No active session.
  }
}


/* ============================================
   RESIDENT
============================================ */

export async function getResidentByUserId(
  userId: string
): Promise<Resident | null> {

  const result =
    await databases.listDocuments<Resident>({
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


/* ============================================
   ACCOUNT
============================================ */

export async function getResidentAccount(
  residentId: string
): Promise<ResidentAccount | null> {

  const result =
    await databases.listDocuments<ResidentAccount>({
      databaseId: DATABASE_ID,
      collectionId: COLLECTIONS.residentAccounts,
      queries: [
        Query.equal("residentId", residentId),
        Query.limit(1),
      ],
    });

  return result.documents[0] ?? null;
}


/* ============================================
   BILLS
============================================ */

export async function getResidentBills(
  residentId: string
): Promise<Bill[]> {

  const result =
    await databases.listDocuments<Bill>({
      databaseId: DATABASE_ID,
      collectionId: COLLECTIONS.bills,
      queries: [
        Query.equal("residentId", residentId),
        Query.orderDesc("dueDate"),
      ],
    });

  return result.documents;
}


/* ============================================
   PAYMENTS
============================================ */

export async function getResidentPayments(
  residentId: string
): Promise<Payment[]> {

  const result =
    await databases.listDocuments<Payment>({
      databaseId: DATABASE_ID,
      collectionId: COLLECTIONS.payments,
      queries: [
        Query.equal("residentId", residentId),
        Query.orderDesc("paymentDate"),
      ],
    });

  return result.documents;
}


/* ============================================
   COMPLETE RESIDENT DATA
============================================ */

export async function getResidentData(
  userId: string
) {

  const resident =
    await getResidentByUserId(userId);

  if (!resident) {
    throw new Error(
      "This Appwrite account is not registered as a resident."
    );
  }

  const [
    residentAccount,
    bills,
    payments,
  ] = await Promise.all([
    getResidentAccount(resident.$id),
    getResidentBills(resident.$id),
    getResidentPayments(resident.$id),
  ]);

  if (!residentAccount) {
    throw new Error(
      "Resident account record was not found."
    );
  }

  return {
    resident,
    account: residentAccount,
    bills,
    payments,
  };
}
