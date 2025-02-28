import Link from 'next/link';
import Image from 'next/image';
import { Account } from '../account';
import { Button } from '../ui/button';
import { WalletSelector } from "@/components/WalletSelector";

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="ml-20 mr-20 flex h-20 items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <Link href={'/'}>
            <span className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent hover:from-amber-500 hover:to-amber-700 transition-colors">
              WIW
            </span>
          </Link>
          <Link href={'/create-bet'}>
            <Button className=" bg-amber-400 w-30 ml-7 h-8 font-semibold">Create Event</Button>
          </Link>
          <Link href={'/my-bet'}>
            <Button className=" bg-amber-400 w-30 ml-7 h-8 font-semibold">My Bet</Button>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <WalletSelector />
        </div>
      </nav>
    </div>
  );
}
