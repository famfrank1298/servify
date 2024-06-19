import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  OrganizationSignupStoreState,
  OrganizationPageState,
  VolunteerSignupStoreState,
  useLangStore,
  useOrganizationSignupStore,
  useVolunteerSignupStore,
  organizationInfoDefaults,
} from '@/lib/store';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Register from './Register/Register';
import Profile from './Profile/Profile';
import {
  ArrowLeftCircle,
  ArrowRightCircleIcon,
  LoaderIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import supabase from '@/lib/db/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Login from '../Login/Login';
import Info from './Info/Info';
import Contact from './Contact/Contact';
import {
  organizationSignup,
  setOrganizationInfoPhotosToDefaults,
} from '@/lib/db/auth';

export default function VolunteerSignup() {
  const { t, i18n } = useTranslation();
  const langState = useLangStore((state: any) => state);

  const organizationState =
    useOrganizationSignupStore<OrganizationSignupStoreState>(
      (state: OrganizationSignupStoreState) => state
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

  const roadmapButton = (step: number, state: OrganizationPageState) => {
    return (
      <Button
        onClick={() => organizationState.setOrganizationPageState(state)}
        variant={
          organizationState.organizationPageState === state
            ? 'default'
            : 'outline'
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
    switch (organizationState.organizationPageState) {
      case OrganizationPageState.Register:
        return <Register />;
      case OrganizationPageState.Info:
        return <Info />;
      case OrganizationPageState.Contact:
        return <Contact />;
      case OrganizationPageState.Profile:
        return <Profile />;
      case OrganizationPageState.Done:
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

  const signupOrganization = async () => {
    setLoading(true);
    let { error } = await organizationSignup(organizationState.info);
    if (error) {
      console.log(error);
      setSuccess(false);
      setLoading(false);
      organizationState.setInfo(organizationInfoDefaults);
      setOrganizationInfoPhotosToDefaults();
      return;
    }
    setSuccess(true);
    navigate('/org');

    setLoading(false);
  };

  const setCardForward = () => {
    switch (organizationState.organizationPageState) {
      case OrganizationPageState.Register:
        organizationState.setOrganizationPageState(OrganizationPageState.Info);
        break;
      case OrganizationPageState.Info:
        organizationState.setOrganizationPageState(
          OrganizationPageState.Contact
        );
        break;
      case OrganizationPageState.Contact:
        organizationState.setOrganizationPageState(
          OrganizationPageState.Profile
        );
        break;
      case OrganizationPageState.Profile:
        signupOrganization();
        organizationState.setOrganizationPageState(OrganizationPageState.Done);
    }
  };
  const setCardBackward = () => {
    switch (organizationState.organizationPageState) {
      case OrganizationPageState.Info:
        organizationState.setOrganizationPageState(
          OrganizationPageState.Register
        );
        break;
      case OrganizationPageState.Contact:
        organizationState.setOrganizationPageState(OrganizationPageState.Info);
        break;
      case OrganizationPageState.Profile:
        organizationState.setOrganizationPageState(
          OrganizationPageState.Contact
        );
    }
  };

  const carouselButtons = () => {
    return (
      <div className="w-1/2 mx-auto flex justify-between mt-4">
        <Button
          onClick={setCardBackward}
          variant="outline"
          className={
            organizationState.organizationPageState ===
            OrganizationPageState.Register
              ? 'cursor-not-allowed opacity-50'
              : ''
          }
        >
          <ArrowLeftCircle />
        </Button>
        <Button
          className={
            organizationState.organizationPageState ===
            OrganizationPageState.Done
              ? 'cursor-not-allowed opacity-50'
              : ''
          }
          onClick={setCardForward}
          variant={'outline'}
        >
          {organizationState.organizationPageState ===
          OrganizationPageState.Profile ? (
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
          {roadmapButton(1, OrganizationPageState.Register)}
          {roadmapButton(2, OrganizationPageState.Info)}
          {roadmapButton(3, OrganizationPageState.Contact)}
          {roadmapButton(4, OrganizationPageState.Profile)}
        </div>
      </>
    );
  };

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
      <h2 className="h2 text-center">{'Sign up your organization!'}</h2>
      <p className="p text-center mb-8">
        Create events with your organization today!
      </p>
      <div>{selectedTab === 'register' ? roadMapButtons() : null}</div>
      <Tabs
        onValueChange={(e: string) => {
          setSelectedTab(e);
        }}
        defaultValue="register"
        className="w-full"
      >
        {organizationState.organizationPageState ===
        OrganizationPageState.Register
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

