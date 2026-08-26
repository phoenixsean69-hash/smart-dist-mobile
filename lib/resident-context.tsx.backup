import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { account, getResidentData } from './appwrite';
import type { Account, Bill, Payment, Resident } from './types';

const demoResident: Resident = {
  $id: 'res-001', userId: 'resident-user-001', firstName: 'Tapiwa', lastName: 'Moyo', phone: '+263771000001', email: 'tapiwa.moyo@example.com', nationalId: '63-100001A63', address: 'House 14, Chiedza Township', ward: 'Ward 1', propertyNumber: 'W1-0014', smsEnabled: true, status: 'active'
};
const demoAccount: Account = { $id: 'acct-001', residentId: 'res-001', accountNumber: 'SP-000001', balance: 0, arrears: 0, credit: 0, status: 'current', lastBillingDate: '2026-07-31T18:06:05Z', lastPaymentDate: '2026-08-13T18:06:05Z' };
const demoBills: Bill[] = [
  { $id: 'bill-001-rates', billNumber: 'BILL-260001', residentId: 'res-001', accountId: 'acct-001', revenueSourceId: 'rev-rates', description: 'August property rates', amount: 55, amountPaid: 55, balanceDue: 0, billingDate: '2026-07-31T18:06:05Z', dueDate: '2026-08-15T18:06:05Z', status: 'paid' },
  { $id: 'bill-001-water', billNumber: 'BILL-260002', residentId: 'res-001', accountId: 'acct-001', revenueSourceId: 'rev-water', description: 'August water charges', amount: 28, amountPaid: 28, balanceDue: 0, billingDate: '2026-07-31T18:06:05Z', dueDate: '2026-08-25T18:06:05Z', status: 'paid' },
];
const demoPayments: Payment[] = [
  { $id: 'pay-002', paymentReference: 'PAY-260002', residentId: 'res-001', accountId: 'acct-001', billId: 'bill-001-water', revenueSourceId: 'rev-water', amount: 28, paymentMethod: 'Cash', channel: 'council_office', currency: 'USD', paymentDate: '2026-08-14T18:06:05Z', status: 'completed', receivedBy: 'staff-revenue', notes: 'Water bill settled.' },
  { $id: 'pay-001', paymentReference: 'PAY-260001', residentId: 'res-001', accountId: 'acct-001', billId: 'bill-001-rates', revenueSourceId: 'rev-rates', amount: 55, paymentMethod: 'EcoCash', channel: 'mobile_money', currency: 'USD', paymentDate: '2026-08-13T18:06:05Z', status: 'completed', receivedBy: 'staff-revenue', notes: 'Property rates settled.' },
];

type ContextValue = { resident: Resident; account: Account; bills: Bill[]; payments: Payment[]; refresh: () => Promise<void>; loading: boolean };
const ResidentContext = createContext<ContextValue | null>(null);

export function ResidentProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState({ resident: demoResident, account: demoAccount, bills: demoBills, payments: demoPayments });
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const user = await account.get();
      const fresh = await getResidentData(user.$id);
      setData(fresh as any);
    } catch {
      // Keep the seeded demo resident visible while the app is offline or before login.
    } finally { setLoading(false); }
  };

  useEffect(() => { refresh(); }, []);
  const value = useMemo(() => ({ ...data, refresh, loading }), [data, loading]);
  return <ResidentContext.Provider value={value}>{children}</ResidentContext.Provider>;
}

export function useResident() {
  const value = useContext(ResidentContext);
  if (!value) throw new Error('useResident must be used inside ResidentProvider');
  return value;
}
