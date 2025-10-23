import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const RegistrationPrompt = () => {
  return (
    <div className="mt-8 p-6 bg-muted/30 rounded-lg border border-border">
      <div className="text-center space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">
            New to TaskFlow Pro?
          </h3>
          <p className="text-sm text-muted-foreground">
            Join thousands of teams already using TaskFlow Pro to manage their projects and collaborate effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-muted-foreground">
          <div className="flex flex-col items-center space-y-1">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold">✓</span>
            </div>
            <span>Free 30-day trial</span>
          </div>
          
          <div className="flex flex-col items-center space-y-1">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold">✓</span>
            </div>
            <span>No credit card required</span>
          </div>
          
          <div className="flex flex-col items-center space-y-1">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold">✓</span>
            </div>
            <span>Cancel anytime</span>
          </div>
        </div>

        <Button
          variant="outline"
          size="lg"
          fullWidth
          asChild
        >
          <Link to="/register">
            Create Free Account
          </Link>
        </Button>

        <p className="text-xs text-muted-foreground">
          Already have an account?{' '}
          <button className="text-primary hover:underline">
            Sign in above
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPrompt;