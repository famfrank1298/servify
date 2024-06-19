import { VolunteerSignupRoute } from '@/Routes';
import { Button } from '@/components/ui/button';
import supabase from '@/lib/db/supabase';
import { LoaderIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupButton() {
  const [user, setUser] = useState<any>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();
  }, []);

  const navigate = useNavigate();

  const handleClick = async () => {
    console.log(user);

    if (user) {
      setLoading(true);
      await supabase.auth.signOut();
      setLoading(false);

      window.location.reload();
    } else {
      navigate(VolunteerSignupRoute);
    }
  };

  return (
    <>
      {isLoading && <LoaderIcon />}
      <Button className="absolute right-0 top-0" onClick={handleClick}>
        {user ? 'Logout' : 'Signup/Login'}
      </Button>
    </>
  );
}

