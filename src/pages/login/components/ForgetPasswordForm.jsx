import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ForgotPasswordForm = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/?.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Reset Link Sent
          </h3>
          <p className="text-sm text-muted-foreground">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Please check your email and follow the instructions to reset your password.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={onBack}
            fullWidth
          >
            Back to Sign In
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Didn't receive the email? Check your spam folder or{' '}
            <button
              onClick={() => setIsSuccess(false)}
              className="text-primary hover:underline"
            >
              try again
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Reset Your Password
        </h3>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e?.target?.value);
            setError('');
          }}
          error={error}
          required
          autoComplete="email"
        />

        <div className="space-y-3">
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            fullWidth
          >
            Back to Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;