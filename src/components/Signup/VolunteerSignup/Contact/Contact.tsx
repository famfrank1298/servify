import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  useLangStore,
  useVolunteerSignupStore,
  VolunteerSignupStoreState,
} from '@/lib/store';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createInputSection } from '@/components/shared/LabelInput/LabelInput';

export default function Contact() {
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
        <CardHeader className="h3">{t('pageStateHeader.contact')}</CardHeader>
        <CardContent className="flex flex-col gap-8">
          {createInputSection(
            'Email',
            'hello@example.com',
            t('contactPage.email'),
            volunteerState.info.email,
            volunteerState.info,
            volunteerState.setInfo
          )}
          {createInputSection(
            'Phone Number',
            '(123) 456-7890',
            t('contactPage.phoneNumber'),
            volunteerState.info.phoneNumber,
            volunteerState.info,
            volunteerState.setInfo
          )}
          {createInputSection(
            'Address',
            '123 Main Street',
            t('contactPage.address'),
            volunteerState.info.address,
            volunteerState.info,
            volunteerState.setInfo
          )}
        </CardContent>
      </Card>
    </>
  );
}

