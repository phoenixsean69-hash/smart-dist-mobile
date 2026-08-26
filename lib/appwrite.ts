import {
  Client,
  Account,
  Databases,
  Query,
} from "react-native-appwrite";

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform("smartpay-resident-mobile");

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID =
  process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;

export const COLLECTIONS = {
  residents: "residents",
  residentAccounts: "resident_accounts",
  bills: "bills",
  payments: "payments",
  revenueSources: "revenue_sources",
};