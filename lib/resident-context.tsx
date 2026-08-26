import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  account,
  getResidentData,
} from "./appwrite";

import type {
  Account as ResidentAccount,
  Bill,
  Payment,
  Resident,
} from "./types";

type ResidentContextValue = {
  resident: Resident | null;
  account: ResidentAccount | null;
  bills: Bill[];
  payments: Payment[];
  loading: boolean;
  authenticated: boolean;
  refresh: () => Promise<void>;
};

const ResidentContext =
  createContext<ResidentContextValue | null>(null);


export function ResidentProvider({
  children,
}: PropsWithChildren) {

  const [resident, setResident] =
    useState<Resident | null>(null);

  const [residentAccount, setResidentAccount] =
    useState<ResidentAccount | null>(null);

  const [bills, setBills] =
    useState<Bill[]>([]);

  const [payments, setPayments] =
    useState<Payment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [authenticated, setAuthenticated] =
    useState(false);


  const refresh = async () => {

    setLoading(true);

    try {

      const user =
        await account.get();

      setAuthenticated(true);

      const data =
        await getResidentData(user.$id);

      setResident(data.resident);

      setResidentAccount(data.account);

      setBills(data.bills);

      setPayments(data.payments);

    } catch (error) {

      console.log(
        "Resident backend error:",
        error
      );

      setAuthenticated(false);

      setResident(null);

      setResidentAccount(null);

      setBills([]);

      setPayments([]);

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    refresh();

  }, []);


  const value =
    useMemo(
      () => ({
        resident,
        account: residentAccount,
        bills,
        payments,
        loading,
        authenticated,
        refresh,
      }),
      [
        resident,
        residentAccount,
        bills,
        payments,
        loading,
        authenticated,
      ]
    );


  return (
    <ResidentContext.Provider value={value}>
      {children}
    </ResidentContext.Provider>
  );
}


export function useResident() {

  const value =
    useContext(ResidentContext);

  if (!value) {
    throw new Error(
      "useResident must be used inside ResidentProvider"
    );
  }

  return value;
}
