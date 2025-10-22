import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/home";
import TutorialPage from "@/pages/tutorial";
import TipPage from "@/pages/tip";
import BrandPage from "@/pages/brand";
import SearchPage from "@/pages/search";
import SobrePage from "@/pages/sobre";
import PrivacidadePage from "@/pages/privacidade";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/tutorial/:slug" component={TutorialPage} />
      <Route path="/dica/:slug" component={TipPage} />
      <Route path="/marca/:slug" component={BrandPage} />
      <Route path="/buscar" component={SearchPage} />
      <Route path="/sobre" component={SobrePage} />
      <Route path="/privacidade" component={PrivacidadePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
