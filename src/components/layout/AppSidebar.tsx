import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Home,
  Thermometer,
  Flame,
  Scale,
  Settings,
  Monitor
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigationItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: Home,
    description: "Visão geral dos aviários" 
  },
  { 
    title: "Temperatura do Aviário", 
    url: "/temperatura", 
    icon: Thermometer,
    description: "Monitoramento térmico" 
  },
  { 
    title: "Aquecedor", 
    url: "/aquecedor", 
    icon: Flame,
    description: "Sistema de aquecimento" 
  },
  { 
    title: "Conversão Peso x Ração", 
    url: "/conversao", 
    icon: Scale,
    description: "Análise de performance" 
  },
  { 
    title: "Configurações", 
    url: "/configuracoes", 
    icon: Settings,
    description: "Configurar sistema" 
  },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className="w-64">
      <SidebarContent className="bg-sidebar border-sidebar-border">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-primary rounded-lg shadow-sm">
            <Monitor className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-sidebar-foreground">
              Avix
            </h1>
            <p className="text-xs text-sidebar-foreground/70">
              Smart Poultry Monitoring
            </p>
          </div>
        </div>

        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="text-sidebar-foreground/80 font-medium px-4 py-3">
            Monitoramento
          </SidebarGroupLabel>

          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-11 px-3 mb-1">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) =>
                        isActive 
                          ? "bg-primary text-primary-foreground font-medium shadow-sm flex items-center w-full" 
                          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-fast flex items-center w-full"
                      }
                      title={item.description}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <div className="flex flex-col ml-3 min-w-0">
                        <span className="text-sm font-medium truncate">
                          {item.title}
                        </span>
                        <span className="text-xs opacity-70 truncate">
                          {item.description}
                        </span>
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">U</span>
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                Usuário Demo
              </p>
              <p className="text-xs text-sidebar-foreground/70 truncate">
                demo@avix.com
              </p>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}