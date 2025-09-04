import { useState, useEffect } from "react";
import { Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Theme = "light" | "dark";
type Palette = "sereno" | "terra";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "light";
    }
    return "light";
  });

  const [palette, setPalette] = useState<Palette>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("palette") as Palette) || "sereno";
    }
    return "sereno";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Apply theme
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Apply palette
    root.classList.remove("theme-sereno", "theme-terra");
    root.classList.add(`theme-${palette}`);
    
    // Save preferences
    localStorage.setItem("theme", theme);
    localStorage.setItem("palette", palette);
  }, [theme, palette]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const changePalette = (newPalette: Palette) => {
    setPalette(newPalette);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="w-9 h-9 p-0"
        >
          {theme === "light" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          <span className="sr-only">Alternar tema</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="font-medium">
          Aparência
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={toggleTheme}>
          {theme === "light" ? (
            <>
              <Moon className="mr-2 h-4 w-4" />
              Tema Escuro
            </>
          ) : (
            <>
              <Sun className="mr-2 h-4 w-4" />
              Tema Claro
            </>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="font-medium text-xs">
          Paleta de Cores
        </DropdownMenuLabel>
        
        <DropdownMenuItem 
          onClick={() => changePalette("sereno")}
          className={palette === "sereno" ? "bg-accent" : ""}
        >
          <div className="flex items-center mr-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          Sereno
          {palette === "sereno" && (
            <span className="ml-auto text-xs">✓</span>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => changePalette("terra")}
          className={palette === "terra" ? "bg-accent" : ""}
        >
          <div className="flex items-center mr-2">
            <div className="w-3 h-3 rounded-full bg-lime-600 mr-1" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
          </div>
          Terra
          {palette === "terra" && (
            <span className="ml-auto text-xs">✓</span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}