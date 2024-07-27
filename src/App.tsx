import { useEffect, useState } from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import {
  OrganizationSignupStoreState,
  Quote,
  QuoteStoreState,
  VolunteerSignupStoreState,
  useBoundQuoteStore,
  useLangStore,
  useOrganizationSignupStore,
  useQuoteStore,
  useVolunteerSignupStore,
} from '@/lib/store';
import { useRandomQuote } from './lib/hooks';
import Nav from './components/layout/Nav/Nav';
import { Button } from './components/ui/button';
import SignupButton from './components/Signup/SignupButton/SignupButton';
import { kill } from 'process';
import {
  addUserInfo,
  getVolunteer,
  uploadOrganizationPhotos,
} from './lib/db/auth';

// example of a custom hook
export default function App() {
  const [rehydrated, setRehydrated] = useState(false);
  const langState = useLangStore((state: any) => state);
  const quoteState = useQuoteStore<QuoteStoreState>((state: any) => state);
  const persistentQuoteState = useBoundQuoteStore<QuoteStoreState>(
    (state: any) => state
  );

  // ensure your useEffects are for their respective data

  // ensure your useEffects are for their respective data

  const volunteerState = useVolunteerSignupStore<VolunteerSignupStoreState>(
    (state: VolunteerSignupStoreState) => state
  );

  const organizationState =
    useOrganizationSignupStore<OrganizationSignupStoreState>(
      (state: OrganizationSignupStoreState) => state
    );

  return (
    <main>
      <Button
        onClick={() => {
          console.log(volunteerState.info);
          addUserInfo(volunteerState.info);
        }}
      >
        Add Volunteer Info
      </Button>
      <Button
        onClick={() => {
          uploadOrganizationPhotos(organizationState.info);
        }}
      >
        Add Organization Photos
      </Button>
      <Button
        onClick={() => {
          getVolunteer();
        }}
      >
        Get user ID
      </Button>
      <a href="/org">Orgs page</a>
      <a href="/profile">Profile page</a>

      <SignupButton />
    </main>
  );
}

