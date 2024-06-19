import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  VolunteerPageState,
  VolunteerSignupStoreState,
  useLangStore,
  useVolunteerSignupStore,
} from '@/lib/store';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Register from './Register/Register';
import Info from './Info/Info';
import Contact from './Contact/Contact';
import Profile from './Profile/Profile';
import {
  ArrowLeftCircle,
  ArrowRightCircleIcon,
  LoaderIcon,
} from 'lucide-react';
import { volunteerSignup } from '@/lib/db/auth';
import { useNavigate } from 'react-router-dom';
import supabase from '@/lib/db/supabase';
import { getUsersName } from '@/lib/utils';
import SignupButton from '../SignupButton/SignupButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Login from '../Login/Login';

export default function VolunteerSignup() {
  const { t, i18n } = useTranslation();
  const langState = useLangStore((state: any) => state);

  const volunteerState = useVolunteerSignupStore<VolunteerSignupStoreState>(
    (state: VolunteerSignupStoreState) => state
  );

  const [isLoading, setLoading] = useState(false);
  const [successs, setSuccess] = useState(false);
  const [user, setUser] = useState<any>();
  const [selectedTab, setSelectedTab] = useState<string>('register');

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    if (!user) {
      getUser();
    }
  }, []);

  useEffect(() => {
    i18n.changeLanguage(langState.lang);
  }, []);

  const roadmapButton = (step: number, state: VolunteerPageState) => {
    return (
      <Button
        onClick={() => volunteerState.setVolunteerPageState(state)}
        variant={
          volunteerState.volunteerPageState === state ? 'default' : 'outline'
        }
        className="relative"
      >
        {step}
        <span className="absolute small -bottom-2	transform -translate-y-[-100%] text-primary">
          {t(`pageState.${state}`)}
        </span>
      </Button>
    );
  };

  const showCurrentCard = () => {
    switch (volunteerState.volunteerPageState) {
      case VolunteerPageState.Register:
        return <Register />;
      case VolunteerPageState.Info:
        return <Info />;
      case VolunteerPageState.Contact:
        return <Contact />;
      case VolunteerPageState.Profile:
        return <Profile />;
      case VolunteerPageState.Done:
        return (
          <div>
            {successs ? (
              <p className="p text-center">Success</p>
            ) : (
              <>
                <p className="p text-center">Failed to login</p>
              </>
            )}
          </div>
        );
    }
  };

  const navigate = useNavigate();

  const signUpUser = async () => {
    setLoading(true);
    let { error } = await volunteerSignup(volunteerState.info);

    if (error) {
      console.log(error);
      setSuccess(false);
      setLoading(false);
      return;
    }

    setSuccess(true);
    navigate('/events');

    setLoading(false);
  };

  const setCardForward = () => {
    switch (volunteerState.volunteerPageState) {
      case VolunteerPageState.Register:
        volunteerState.setVolunteerPageState(VolunteerPageState.Info);
        break;
      case VolunteerPageState.Info:
        volunteerState.setVolunteerPageState(VolunteerPageState.Contact);
        break;
      case VolunteerPageState.Contact:
        volunteerState.setVolunteerPageState(VolunteerPageState.Profile);
        break;
      case VolunteerPageState.Profile:
        signUpUser();
        volunteerState.setVolunteerPageState(VolunteerPageState.Done);
    }
  };
  const setCardBackward = () => {
    switch (volunteerState.volunteerPageState) {
      case VolunteerPageState.Info:
        volunteerState.setVolunteerPageState(VolunteerPageState.Register);
        break;
      case VolunteerPageState.Contact:
        volunteerState.setVolunteerPageState(VolunteerPageState.Info);
        break;
      case VolunteerPageState.Profile:
        volunteerState.setVolunteerPageState(VolunteerPageState.Contact);
    }
  };

  const carouselButtons = () => {
    return (
      <div className="w-1/2 mx-auto flex justify-between mt-4">
        <Button
          onClick={setCardBackward}
          variant="outline"
          className={
            volunteerState.volunteerPageState === VolunteerPageState.Register
              ? 'cursor-not-allowed opacity-50'
              : ''
          }
        >
          <ArrowLeftCircle />
        </Button>
        <Button
          className={
            volunteerState.volunteerPageState === VolunteerPageState.Done
              ? 'cursor-not-allowed opacity-50'
              : ''
          }
          onClick={setCardForward}
          variant={'outline'}
        >
          {volunteerState.volunteerPageState === VolunteerPageState.Profile ? (
            <span className="flex gap-2 items-center">
              Submit
              <ArrowRightCircleIcon />
            </span>
          ) : (
            <ArrowRightCircleIcon />
          )}
        </Button>
      </div>
    );
  };

  const roadMapButtons = () => {
    return (
      <>
        <div className="flex justify-between gap-8 mb-14 relative w-1/2 mx-auto">
          <div className="absolute w-full h-4 bg-secondary top-[50%] transform translate-y-[-50%]"></div>
          {roadmapButton(1, VolunteerPageState.Register)}
          {roadmapButton(2, VolunteerPageState.Info)}
          {roadmapButton(3, VolunteerPageState.Contact)}
          {roadmapButton(4, VolunteerPageState.Profile)}
        </div>
      </>
    );
  };

  console.log(user);
  const tabsList = (
    <TabsList className="w-full">
      <TabsTrigger className="w-full" value="register">
        Register
      </TabsTrigger>
      <TabsTrigger className="w-full" value="login">
        Login
      </TabsTrigger>
    </TabsList>
  );

  return (
    <section className="mx-auto w-3/4 py-12">
      <h2 className="h2 text-center">{t('volunteerSignupHeader')}</h2>
      <p className="p text-center mb-8">
        {user
          ? t('loggedIn') + ' ' + getUsersName(user) + '! ' + t('loggedIn2')
          : t('volunteerSignupPara')}
      </p>
      <div>{selectedTab === 'register' ? roadMapButtons() : null}</div>
      <Tabs
        onValueChange={(e: string) => {
          setSelectedTab(e);
        }}
        defaultValue="register"
        className="w-full"
      >
        {volunteerState.volunteerPageState === VolunteerPageState.Register
          ? tabsList
          : null}
        <TabsContent value="register">
          {isLoading ? <LoaderIcon /> : showCurrentCard()}
        </TabsContent>
        <TabsContent value="login">
          <Login />
        </TabsContent>
      </Tabs>

      {selectedTab === 'register' ? carouselButtons() : null}
    </section>
  );
}

