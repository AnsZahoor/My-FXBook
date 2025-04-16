import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({ title: 'Login Failed', description: error.message, variant: 'destructive' });
        return;
      }

      const user = data.user;
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }

      toast({ title: 'Logged in', description: `Welcome back, ${email}` });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast({ title: 'Signup Failed', description: error.message, variant: 'destructive' });
        return;
      }

      toast({ title: 'Signup Successful', description: 'Please verify your email.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleAuth} className="w-full max-w-md space-y-4 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <div>
          <Label>Email</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full">{isLogin ? 'Login' : 'Sign Up'}</Button>
        <p className="text-sm text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
}
