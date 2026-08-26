import { Account as AppwriteAccount, Client, Databases, Query } from 'react-native-appwrite';
import type { Account, Bill, Payment, Resident } from './types';

const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ?? 'https://syd.cloud.appwrite.io/v1';
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ?? 'smart-pay';
const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID ?? 'smartpay-db';

export const COLLECTIONS = {
  residents: 'residents',
  accounts: 'resident_accounts',
  bills: 'bills',
  payments: 'payments',
};

export const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId);

export const account = new AppwriteAccount(client);
export const databases = new Databases(client);

export async function getResidentData(userId: string) {
  const residentResult = await databases.listDocuments(
    databaseId,
    COLLECTIONS.residents,
    [Query.equal('userId', userId), Query.limit(1)],
  );

  if (!residentResult.documents[0]) throw new Error('Resident profile not found.');
  const resident = residentResult.documents[0] as unknown as Resident;

  const accountResult = await databases.listDocuments(
    databaseId,
    COLLECTIONS.accounts,
    [Query.equal('residentId', resident.$id), Query.limit(1)],
  );

  const billsResult = await databases.listDocuments(
    databaseId,
    COLLECTIONS.bills,
    [Query.equal('residentId', resident.$id), Query.orderDesc('billingDate')],
  );

  const paymentsResult = await databases.listDocuments(
    databaseId,
    COLLECTIONS.payments,
    [Query.equal('residentId', resident.$id), Query.orderDesc('paymentDate')],
  );

  return {
    resident,
    account: (accountResult.documents[0] as unknown as Account) ?? null,
    bills: billsResult.documents as unknown as Bill[],
    payments: paymentsResult.documents as unknown as Payment[],
  };
}

export { databaseId };
