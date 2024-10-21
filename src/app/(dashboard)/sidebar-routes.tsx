'use client';

import { CreditCard, Crown, Home, MessageCircleQuestion } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { usePaywall } from '@/features/subscriptions/hooks/use-paywall';

import { SidebarItem } from './sidebar-item';

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const { shouldBlock, triggerPaywall, isLoading } = usePaywall();

  return (
    <div className="flex flex-col gap-y-4 flex-1">
      <div className="px-3">
        {shouldBlock && (
          <>
            <Button
              onClick={triggerPaywall}
              disabled={isLoading}
              className="w-full rounded-xl border-none hover:bg-white hover:opacity-75 transition"
              variant="outline"
              size="lg"
            >
              <Crown className="mr-2 size-4 fill-yellow-500 text-yellow-500" />
              Upgrade to Image AI Pro
            </Button>

            <div className="px-3">
              <Separator />
            </div>
          </>
        )}
      </div>

      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem href="/" label="Home" icon={Home} isActive={pathname === '/'} />
      </ul>

      <div className="px-3">
        <Separator />
      </div>

      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem href={pathname} label="Billing" icon={CreditCard} onClick={() => {}} />

        <SidebarItem href="mailto:contact@example.com" label="Get Help" icon={MessageCircleQuestion} />
      </ul>
    </div>
  );
};
