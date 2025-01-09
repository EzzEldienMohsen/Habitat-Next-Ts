import { verifyAuth } from '@/actions/authActions';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Habitat Next Ts',
  description:
    'this is a version from the habitat project that uses NextJs and Typescript',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  const result = await verifyAuth(token);

  if (!result.user) {
    redirect('/'); // Redirect unauthorized users to the homepage
  }

  return <>{children}</>;
}
