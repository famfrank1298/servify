import { createInputSection } from '@/components/shared/LabelInput/LabelInput';
import { Card, CardContent } from '@/components/ui/card';
import {
  OrganizationSignupStoreState,
  useLangStore,
  useOrganizationSignupStore,
} from '@/lib/store';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { t } from 'vitest/dist/reporters-yx5ZTtEV.js';

export default function Register() {
  const { t, i18n } = useTranslation();
  const langState = useLangStore((state: any) => state);

  const organizationState =
    useOrganizationSignupStore<OrganizationSignupStoreState>(
      (state: OrganizationSignupStoreState) => state
    );

  useEffect(() => {
    i18n.changeLanguage(langState.lang);
  }, []);

  return (
    <>
      <Card>
        {/* <CardHeader className="h3">
          <h3>{t('pageStateHeader.register')}</h3>
        </CardHeader>
        <Button onClick={() => registerOAuthProvider(OAuthProvider.Google)}>
        Register with Google{' '}
      </Button> */}
        <CardContent className="flex flex-col gap-2">
          <h3 className="h3 my-4">Register with an email & password</h3>
          {createInputSection(
            'Email',
            'hello@example.com',
            t('registerPage.email'),
            organizationState.info.email,
            organizationState.info,
            organizationState.setInfo
          )}
          {createInputSection(
            'Password',
            '123456987',
            t('registerPage.password'),
            organizationState.info.password,
            organizationState.info,
            organizationState.setInfo
          )}
        </CardContent>
      </Card>
    </>
  );
}

