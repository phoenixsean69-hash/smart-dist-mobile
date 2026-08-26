export type Resident = {
  $id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  nationalId?: string;
  address: string;
  ward: string;
  propertyNumber?: string;
  smsEnabled: boolean;
  status: string;
};

export type Account = {
  $id: string;
  residentId: string;
  accountNumber: string;
  balance: number;
  arrears: number;
  credit: number;
  status: string;
  lastBillingDate?: string;
  lastPaymentDate?: string;
};

export type Bill = {
  $id: string;
  billNumber: string;
  residentId: string;
  accountId: string;
  revenueSourceId: string;
  description: string;
  amount: number;
  amountPaid: number;
  balanceDue: number;
  billingDate: string;
  dueDate: string;
  status: string;
};

export type Payment = {
  $id: string;
  paymentReference: string;
  residentId: string;
  accountId: string;
  billId: string;
  revenueSourceId: string;
  amount: number;
  paymentMethod: string;
  channel: string;
  currency: string;
  paymentDate: string;
  status: string;
  receivedBy: string;
  notes?: string;
};
