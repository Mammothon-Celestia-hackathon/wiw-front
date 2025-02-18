import Header from '@/components/layout/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who is Winner',
};

export default function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <header className="border-b">
        <Header />
      </header>
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="container relative">{children}</div>
      </main>
    </div>
  );
}
