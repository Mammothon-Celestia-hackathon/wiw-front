import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(
  address: string,
  prefixLen: number = 6,
  postfixLen: number = 4
) {
  if (!address) return "";
  const start = address.slice(0, prefixLen);
  const end = address.slice(-postfixLen);
  return `${start}...${end}`;
}

export function formatNumber(num: number, char: string = ",") {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, char);
}

export function timeAgo(date: Date, now: Date = new Date()) {
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
    }
  }

  return 'just now';
}

export function weiToEther(wei: string | number): string {
  const value = typeof wei === 'string' ? wei : wei.toString();
  return (Number(value) / 1e18).toString();
}

export function etherToWei(ether: string | number): string {
  const value = typeof ether === 'string' ? ether : ether.toString();
  return (Number(value) * 1e18).toString();
}

export function shortenTxHash(hash: string, length: number = 6): string {
  if (!hash) return "";
  return `${hash.slice(0, length)}...${hash.slice(-length)}`;
}