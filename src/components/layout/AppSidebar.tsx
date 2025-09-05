import { NavLink, useLocation } from "react-router-dom";
import {
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
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar className="w-64 border-r border-border">
      <SidebarContent className="bg-card">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg shadow-sm">
            <Monitor className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-card-foreground">
              Avix
            </h1>
            <p className="text-xs text-muted-foreground">
              Smart Poultry Monitoring
            </p>
          </div>
        </div>

        <SidebarGroup className="flex-1 py-4">
          <SidebarGroupLabel className="text-card-foreground font-medium px-4 py-2 text-sm mb-2">
            Monitoramento
          </SidebarGroupLabel>

          <SidebarGroupContent className="px-2">
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) =>
                        `sidebar-menu-button flex items-center w-full px-3 py-3 rounded-md transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-md ${
                          isActive ? "active" : ""
                        }`
                      }
                      title={item.description}
                    >
                      <item.icon className="menu-icon w-5 h-5 flex-shrink-0 mr-3" />
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="menu-text text-sm font-medium truncate">
                          {item.title}
                        </span>
                        <span className="menu-text text-xs opacity-75 truncate">
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
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">U</span>
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-medium text-card-foreground truncate">
                Usuário Demo
              </p>
              <p className="text-xs text-muted-foreground truncate">
                demo@avix.com
              </p>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}