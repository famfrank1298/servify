import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import supabase from '@/lib/db/supabase';
import { delay } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const form = document.querySelector('form')!;
    const formData = new FormData(form);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.get('email')!,
      password: formData.get('password')!,
    });

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }

    toast({
      variant: 'default',
      title: 'Welcome ' + data.user?.email + '!',
    });

    await delay(1000);

    navigate('/events');
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="h2">Login</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <Input name="email" className="mb-4 mt-2" type="email" />
          <label className="">Password</label>
          <Input name="password" className="mb-4 mt-2" type="password" />
          <Button
            type="submit"
            className="w-full"
            variant="default"
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

