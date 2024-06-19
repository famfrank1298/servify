import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  useLangStore,
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
  const [date, setDate] = useState<Date>();

  const volunteerState = useVolunteerSignupStore<VolunteerSignupStoreState>(
    (state: VolunteerSignupStoreState) => state
  );

  useEffect(() => {
    i18n.changeLanguage(langState.lang);
  }, []);

  useEffect(() => {
    setDate(volunteerState.info.dob);
  }, [volunteerState.info]);

  return (
    <>
      <Card>
        <CardHeader className="h3">{t('pageStateHeader.info')}</CardHeader>
        <CardContent className="flex flex-col gap-8">
          {createInputSection(
            'First Name',
            'John',
            t('infoPage.firstName'),
            volunteerState.info.firstName,
            volunteerState.info,
            volunteerState.setInfo
          )}
          {createInputSection(
            'Last Name',
            'Smith',
            t('infoPage.lastName'),
            volunteerState.info.lastName,
            volunteerState.info,
            volunteerState.setInfo
          )}
          <div className="flex flex-col gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[280px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={volunteerState.info.dob}
                  onSelect={(e: any) => {
                    volunteerState.info.dob = e;
                    volunteerState.setInfo(volunteerState.info);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

