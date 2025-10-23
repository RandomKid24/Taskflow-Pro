import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import SecurityBadges from './components/SecurityBadges';
import ForgotPasswordForm from './components/ForgetPasswordForm';
import RegistrationPrompt from './components/RegistrationPrompt';
import RegistrationForm from './components/RegistrationForm';

const Login = () => {
  const navigate = useNavigate();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
    setShowRegistration(false);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setShowRegistration(false);
  };
  
  const handleShowRegistration = () => {
    setShowRegistration(true);
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/dashboard" className="inline-flex items-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-elevation-2">
              <Icon name="Zap" size={24} color="white" />
            </div>
            <span className="text-2xl font-bold text-foreground">TaskFlow Pro</span>
          </Link>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              {showForgotPassword ? 'Reset Password' : showRegistration ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-muted-foreground">
              {showForgotPassword 
                ? 'Enter your email to receive a password reset link' 
                : showRegistration 
                ? 'Fill in your details to get started with TaskFlow Pro'
                : 'Sign in to your account to continue'
              }
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-card rounded-xl shadow-elevation-2 border border-border p-8">
          {showForgotPassword ? (
            <ForgotPasswordForm onBack={handleBackToLogin} />
          ) : showRegistration ? (
            <RegistrationForm onBackToLogin={handleBackToLogin} />
          ) : (
            <div className="space-y-6">
              {/* Login Form */}
              <LoginForm onForgotPassword={handleForgotPasswordClick} />
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
              {/* Social Login */}
              <SocialLogin />
            </div>
          )}
        </div>

        {/* Registration Prompt - Only show on main login screen */}
        {!showForgotPassword && !showRegistration && <RegistrationPrompt onRegisterClick={handleShowRegistration} />}

        {/* Security Badges */}
        <SecurityBadges />

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date()?.getFullYear()} TaskFlow Pro. All rights reserved.
          </p>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
              Privacy Policy
            </Link>
            <span className="text-xs text-muted-foreground">•</span>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
              Terms of Service
            </Link>
            <span className="text-xs text-muted-foreground">•</span>
            <Link to="/support" className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
              Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;