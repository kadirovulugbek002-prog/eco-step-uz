import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Recycle, ShoppingBag, Map, Trophy, Leaf, Coins } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEco } from "@/lib/eco-context";

const items = [
  { title: "Bosh sahifa", url: "/", icon: LayoutDashboard },
  { title: "Chiqindi topshirish", url: "/topshirish", icon: Recycle },
  { title: "Eco-Do'kon", url: "/dokon", icon: ShoppingBag },
  { title: "Eko-Xarita", url: "/xarita", icon: Map },
  { title: "Reyting", url: "/reyting", icon: Trophy },
];

export function AppSidebar() {
  const { points } = useEco();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--gradient-primary)] shadow-[var(--shadow-eco)]">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <div className="text-base font-bold tracking-tight text-sidebar-foreground">EcoStep</div>
            <div className="text-[10px] uppercase tracking-widest text-sidebar-foreground/60">Toza Toshkent</div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menyu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-2 rounded-xl bg-sidebar-accent/50 px-3 py-2 group-data-[collapsible=icon]:hidden">
          <Coins className="h-5 w-5 text-[var(--emerald-glow)]" />
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">Eco-Ballar</div>
            <div className="text-lg font-bold text-sidebar-foreground">{points.toLocaleString()}</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}