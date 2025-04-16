import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

export default function ProtectedRoute({
  children,
  role = 'user',
}: {
  children: JSX.Element;
  role?: 'user' | 'admin';
}) {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setUserRole(data?.role || 'user');
      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  if (!userRole) return <Navigate to="/auth" />;
  if (role === 'admin' && userRole !== 'admin') return <Navigate to="/user" />;

  return children;
}
