import type { User } from "@renthob/shared";

type LocalAccount = User & {
  password: string;
};

const ACCOUNTS_KEY = "renthob-local-accounts";
const SESSION_KEY = "renthob-local-session";

const readAccounts = (): LocalAccount[] => {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
  } catch {
    return [];
  }
};

const writeAccounts = (accounts: LocalAccount[]) => {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
};

const publicUser = ({ password: _password, ...user }: LocalAccount): User => user;

export const createLocalAccount = (name: string, email: string, password: string): User => {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = readAccounts();
  const existingIndex = accounts.findIndex((account) => account.email.toLowerCase() === normalizedEmail);
  const account: LocalAccount = {
    uid: existingIndex >= 0 ? accounts[existingIndex].uid : `local-${crypto.randomUUID()}`,
    email: normalizedEmail,
    displayName: name.trim(),
    password,
    role: "renter",
    phone: "",
    state: "",
    verified: false,
    createdAt: existingIndex >= 0 ? accounts[existingIndex].createdAt : new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    accounts[existingIndex] = account;
  } else {
    accounts.push(account);
  }

  writeAccounts(accounts);
  const user = publicUser(account);
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
};

export const loginLocalAccount = (email: string, password: string): User => {
  const normalizedEmail = email.trim().toLowerCase();
  const account = readAccounts().find((item) => item.email.toLowerCase() === normalizedEmail);

  if (!account || account.password !== password) {
    throw new Error("No local account found for those credentials. Please sign up first.");
  }

  const user = publicUser(account);
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
};

export const getLocalSession = (): User | null => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
};

export const clearLocalSession = () => {
  localStorage.removeItem(SESSION_KEY);
};
