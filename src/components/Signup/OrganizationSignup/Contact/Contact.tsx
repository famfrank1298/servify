import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  OrganizationSignupStoreState,
  useLangStore,
  useOrganizationSignupStore,
  useVolunteerSignupStore,
  VolunteerSignupStoreState,
} from '@/lib/store';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createInputSection } from '@/components/shared/LabelInput/LabelInput';

export default function Contact() {
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
        <CardHeader className="h3">{t('pageStateHeader.contact')}</CardHeader>
        <CardContent className="flex flex-col gap-8">
          {createInputSection(
            'website',
            'servify.com',
            'Website',
            organizationState.info.website,
            organizationState.info,
            organizationState.setInfo
          )}
          {createInputSection(
            'Phone Number',
            '(123) 456-7890',
            t('contactPage.phoneNumber'),
            organizationState.info.phoneNumber,
            organizationState.info,
            organizationState.setInfo
          )}
          {createInputSection(
            'Address',
            '123 Main Street',
            t('contactPage.address'),
            organizationState.info.address,
            organizationState.info,
            organizationState.setInfo
          )}
        </CardContent>
      </Card>
    </>
  );
}

