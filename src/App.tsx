import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Temperatura from "./pages/Temperatura";
import Aquecedor from "./pages/Aquecedor";
import Conversao from "./pages/Conversao";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          } />
          <Route path="/temperatura" element={
            <AppLayout>
              <Temperatura />
            </AppLayout>
          } />
          <Route path="/aquecedor" element={
            <AppLayout>
              <Aquecedor />
            </AppLayout>
          } />
          <Route path="/conversao" element={
            <AppLayout>
              <Conversao />
            </AppLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
