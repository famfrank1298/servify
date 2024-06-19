import { createInputSection } from '@/components/shared/LabelInput/LabelInput';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { OAuthProvider, registerOAuthProvider } from '@/lib/db/auth';
import {
  useLangStore,
  useVolunteerSignupStore,
  VolunteerSignupStoreState,
} from '@/lib/store';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { t } from 'vitest/dist/reporters-yx5ZTtEV.js';

export default function Register() {
  const { t, i18n } = useTranslation();
  const langState = useLangStore((state: any) => state);

  const volunteerState = useVolunteerSignupStore<VolunteerSignupStoreState>(
    (state: VolunteerSignupStoreState) => state
  );

  useEffect(() => {
    i18n.changeLanguage(langState.lang);
  }, []);

  return (
    <>
      <Card>
        <CardHeader className="h3">
          <h3>{t('pageStateHeader.register')}</h3>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Button onClick={() => registerOAuthProvider(OAuthProvider.Google)}>
            Register with Google{' '}
          </Button>
          <h3 className="h3 my-4">Or sign up using email</h3>
          {createInputSection(
            'Email',
            'hello@example.com',
            t('registerPage.email'),
            volunteerState.info.email,
            volunteerState.info,
            volunteerState.setInfo
          )}
          {createInputSection(
            'Password',
            '123456987',
            t('registerPage.password'),
            volunteerState.info.password,
            volunteerState.info,
            volunteerState.setInfo
          )}
        </CardContent>
      </Card>
    </>
  );
}

