import { LayoutDashboard, Bot, Send, DollarSign, Workflow, Brain } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Agents", url: "/agents", icon: Bot },
  { title: "Outreach", url: "/outreach", icon: Send },
  { title: "Revenue", url: "/revenue", icon: DollarSign },
  { title: "SEO Delivery", url: "/seo", icon: Workflow },
  { title: "Strategy", url: "/strategy", icon: Brain },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-sidebar">
        <div className="flex items-center gap-2 px-3 py-4 border-b border-sidebar-border">
          <div className="grid h-8 w-8 place-items-center rounded bg-gradient-primary text-primary-foreground font-bold text-sm shadow-glow-primary">
            E
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-wide">ETHINX</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Ops Console</p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Command</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active}>
                      <NavLink
                        to={item.url}
                        end
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent"
                        activeClassName="bg-sidebar-accent text-primary font-medium"
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto px-3 pb-4">
            <div className="rounded-md border border-sidebar-border bg-background/40 p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Region</p>
              <p className="mt-1 text-sm font-semibold text-primary">Adelaide · SA</p>
              <p className="mt-1 text-[10px] text-muted-foreground">Exclusive targeting active</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
