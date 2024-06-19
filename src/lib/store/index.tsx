import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';
export interface Quote {
  content: string;
  author?: string;
  authorSlug?: string;
  dateModified?: string;
  _id?: string;
}

export interface QuoteStoreState {
  quotes: Quote[];
  addQuote: (newQuote: Quote) => void;
  removeAllQuotes: () => void;
}

export const useQuoteStore = create<QuoteStoreState>((set) => ({
  quotes: [],
  addQuote: (newQuote: any) =>
    set((state: any) => ({ quotes: [...state.quotes, newQuote] })),
  removeAllQuotes: () => set({ quotes: [] }),
}));

// Custom storage object
const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

export const useBoundQuoteStore = create<QuoteStoreState>()(
  persist(
    (set, get) => ({
      quotes: [],
      addQuote: (newQuote) => set({ quotes: [...get().quotes, newQuote] }),
      removeAllQuotes: () => set({ quotes: [] }),
    }),
    {
      name: 'quote-storage', // unique name
      storage: createJSONStorage(() => storage),
    }
  )
);

export interface OrganizationInfo {
  organizationName: string;
  password: string;
  description: string;
  email: string;
  address: string;
  phoneNumber: string;
  website: string;
  logo: string;
  banner: string;
  nonProfitForm: string;
  mission: string;
  tags: string[];
  services: string[];
}

export enum OrganizationPageState {
  Register = 'register',
  Info = 'info',
  Contact = 'contact',
  Profile = 'profile',
  Members = 'members',
  Done = 'done',
}
// Custom storage object
export interface OrganizationSignupStoreState {
  info: OrganizationInfo;
  organizationPageState: OrganizationPageState;
  setInfo: (newInfo: OrganizationInfo) => void;
  setOrganizationPageState: (
    organizationPageState: OrganizationPageState
  ) => void;
}

export const organizationStorage = 'organization-storage';

export const organizationInfoDefaults: OrganizationInfo = {
  organizationName: '',
  password: '',
  description: '',
  email: '',
  address: '',
  nonProfitForm: '',
  phoneNumber: '',
  website: '',
  logo: '',
  banner: '',
  mission: '',
  tags: [],
  services: [],
};

export const useOrganizationSignupStore =
  create<OrganizationSignupStoreState>()(
    persist(
      (set, get) => ({
        info: organizationInfoDefaults,
        setInfo: (newInfo: OrganizationInfo) =>
          set({ info: { ...get().info, ...newInfo } }),
        organizationPageState: OrganizationPageState.Register,
        setOrganizationPageState: (organizationPageState) =>
          set({ organizationPageState }),
      }),

      {
        name: organizationStorage, // unique name
        storage: createJSONStorage(() => storage),
      }
    )
  );

export interface VolunteerInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: Date | undefined;
  phoneNumber: string;
  gender: string;
  state: string;
  image: string;
  bio: string;
  address: string;
  favoriteList: string[];
}

export enum VolunteerPageState {
  Register = 'register',
  Info = 'info',
  Contact = 'contact',
  Profile = 'profile',
  Done = 'done',
}
// Custom storage object
export interface VolunteerSignupStoreState {
  info: VolunteerInfo;
  volunteerPageState: VolunteerPageState;
  setInfo: (newInfo: VolunteerInfo) => void;
  setVolunteerPageState: (volunteerPageState: VolunteerPageState) => void;
}

export const useVolunteerSignupStore = create<VolunteerSignupStoreState>()(
  persist(
    (set, get) => ({
      info: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dob: new Date(),
        phoneNumber: '',
        gender: '',
        state: '',
        image: '',
        bio: '',
        address: '',
        favoriteList: [],
      },
      setInfo: (newInfo: VolunteerInfo) =>
        set({ info: { ...get().info, ...newInfo } }),
      volunteerPageState: VolunteerPageState.Register,
      setVolunteerPageState: (volunteerPageState) =>
        set({ volunteerPageState }),
    }),
    {
      name: 'volunteer-storage', // unique name
      storage: createJSONStorage(() => storage),
    }
  )
);
export interface LangStore {
  lang: string;
  setLang: (newLang: string) => void;
}

export const useLangStore = create<LangStore>()(
  persist(
    (set) => ({
      lang: 'en',
      setLang: (newLang) => set({ lang: newLang }),
    }),
    {
      name: 'lang-storage', // unique name
      storage: createJSONStorage(() => storage),
    }
  )
);

