import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  OrganizationPageState,
  OrganizationSignupStoreState,
  useLangStore,
  useOrganizationSignupStore,
  useVolunteerSignupStore,
  VolunteerSignupStoreState,
} from '@/lib/store';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createInputSection } from '@/components/shared/LabelInput/LabelInput';
import { cn } from '@/lib/utils';
import { format, setDate } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

export default function Info() {
  const { t, i18n } = useTranslation();
  const langState = useLangStore((state: any) => state);

  const organizationState =
    useOrganizationSignupStore<OrganizationSignupStoreState>(
      (state: OrganizationSignupStoreState) => state
    );

  useEffect(() => {
    i18n.changeLanguage(langState.lang);
  }, []);

  useEffect(() => {}, [organizationState.info]);

  return (
    <>
      <Card>
        <CardHeader className="h3">{t('pageStateHeader.info')}</CardHeader>
        <CardContent className="flex flex-col gap-8">
          {createInputSection(
            'Organization Name',
            'Servify',
            'Organization name',
            organizationState.info.organizationName,
            organizationState.info,
            organizationState.setInfo
          )}
          {createInputSection(
            'Description',
            'Founded in 2024, we found that volunteer software is created by COMPANIES. Why are we charging volunteer orgs money? We should be assisting them. ',
            'Description',
            organizationState.info.description,
            organizationState.info,
            organizationState.setInfo
          )}
          {createInputSection(
            'Mission',
            'We are a non-profit org dedicated to enrichening the volunteering experience.',
            'Mission',
            organizationState.info.mission,
            organizationState.info,
            organizationState.setInfo
          )}
        </CardContent>
      </Card>
    </>
  );
}

