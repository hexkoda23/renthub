
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/Home";
import { RenthobSearch } from "./pages/RenthobSearch";
import { RenthobPropertyDetails } from "./pages/RenthobPropertyDetails";
import { ListProperty } from "./pages/ListProperty";
import { JoinAgent } from "./pages/JoinAgent";
import { AIAdvisor } from "./pages/AIAdvisor";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { AuthGuard } from "./components/auth/AuthGuard";
import { CreateListing } from "./pages/CreateListing";
import { HandoverFlow } from "./pages/HandoverFlow";
import { Dashboard } from "./pages/Dashboard";
import { About } from "./pages/info/About";
import { Contact } from "./pages/info/Contact";
import { PrivacyTerms } from "./pages/info/PrivacyTerms";
import { HelpCenter } from "./pages/info/HelpCenter";
import { VerificationInfo } from "./pages/info/VerificationInfo";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<RenthobSearch />} />
          <Route path="/listings" element={<RenthobSearch />} />
          <Route path="/property/:id" element={<RenthobPropertyDetails />} />
          <Route path="/listings/:id" element={<RenthobPropertyDetails />} />
          <Route path="/list-property" element={<ListProperty />} />
          <Route path="/join-agent" element={<JoinAgent />} />
          <Route path="/ai-advisor" element={<AIAdvisor />} />
          <Route path="/renthob-ai" element={<AIAdvisor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<Register />} />
          
          <Route path="/handover" element={<HandoverFlow />} />
          
          {/* Info Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyTerms />} />
          <Route path="/terms" element={<PrivacyTerms />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/verification" element={<VerificationInfo />} />
          
          {/* Protected Routes */}
           <Route element={<AuthGuard />}>
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/listings/create" element={<CreateListing />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
