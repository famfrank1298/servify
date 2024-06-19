import React, { useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Building, Check, FerrisWheelIcon, Merge, Trophy } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import { useTranslation } from 'react-i18next';
import { useLangStore } from '@/lib/store';

interface Feature {
  logo: JSX.Element;
  name: string;
  description: string;
}

export default function Signup() {
  const { t, i18n } = useTranslation();
  const langState = useLangStore((state: any) => state);

  useEffect(() => {
    i18n.changeLanguage(langState.lang);
  }, []);

  const volunteerFeatures: Feature[] = [
    {
      logo: <FerrisWheelIcon />,
      name: t('ferris'),
      description: t('ferrisDescription'),
    },
    {
      logo: <Check />,
      name: t('register'),
      description: 'Register with ease with just one click.',
    },
    {
      logo: <Merge />,
      name: t('join'),
      description: 'Register with ease with just one click.',
    },
    {
      logo: <Trophy />,
      name: t('compete'),
      description: 'Register with ease with just one click.',
    },
  ];

  const organizationFeatures: Feature[] = [
    {
      logo: <Building />,
      name: t('nonprofit'),
      description: t('nonprofitDescription'),
    },
  ];
  const createFeature = (
    logo: JSX.Element,
    name: string,
    description: string
  ) => {
    const createDescription = (description: string) => {
      return (
        <HoverCard>
          <HoverCardTrigger className="block relative cursor-pointer bg-secondary w-8 h-8 p-2 rounded-[50%]">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              ?
            </span>
          </HoverCardTrigger>
          <HoverCardContent>{description}</HoverCardContent>
        </HoverCard>
      );
    };

    return (
      <tr className="w-full flex justify-between items-center">
        <td>{logo}</td>
        <td>{name}</td>
        <td>{createDescription(description)}</td>
      </tr>
    );
  };

  return (
    <section className="signup px-4 mx-auto">
      <div className="mb-8">
        <h2 className="h2 text-center">{t('start')}</h2>
        <p className="small text-center">{t('startDesc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <h3 className="h3">{t('signup')}</h3>
            <p className="text-sm">{t('signupDesc')}</p>
          </CardHeader>
          <CardContent className="space-y-2">
            {volunteerFeatures.map((feature) =>
              createFeature(feature.logo, feature.name, feature.description)
            )}
          </CardContent>
          <CardFooter>
            <a href="/volunteer-signup" className="block w-full">
              <Button className="w-full">{t('volunteerButton')}</Button>
            </a>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="h3">{t('signupO')}</h3>
            <p className="text-sm">{t('signupDescO')}</p>
          </CardHeader>
          <CardContent className="space-y-2">
            {organizationFeatures.map((feature) =>
              createFeature(feature.logo, feature.name, feature.description)
            )}
          </CardContent>
          <CardFooter className="">
            <a href="/organization-signup" className="block w-full">
              <Button className="w-full">{t('organizationButton')}</Button>
            </a>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

