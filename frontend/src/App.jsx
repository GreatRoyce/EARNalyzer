// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../src/components/LandingPage/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Security from "./pages/Security";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import TermsOfService from "./pages/TermsOfService";
import About from "./pages/About";
import LegalNotice from "./pages/LegalNotice";
import CombinedPolicies from "./pages/CombinedPolicies";
import HowItWorks from "./pages/HowItWorks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/security" element={<Security />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/legal" element={<LegalNotice />} />
      <Route path="/policies" element={<CombinedPolicies />} />

      {/* Protected Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
