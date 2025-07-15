"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center p-6">
          <Card className="bg-[var(--card)] border-[var(--border)] max-w-2xl w-full">
            <CardHeader>
              <CardTitle className="font-cinzel text-2xl text-red-400 flex items-center space-x-2">
                <span>⚠️</span>
                <span>A RUNTIME EXCEPTION OCCURRED</span>
              </CardTitle>
              <CardDescription className="text-[var(--muted-foreground)] font-cormorant italic">
                The CodeRealm encountered an unexpected error. The Architects are investigating.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-[var(--muted)] border border-red-500/20 rounded-lg">
                <h3 className="font-cinzel font-semibold text-red-400 mb-2">Error Details</h3>
                <p className="text-sm text-[var(--muted-foreground)] font-mono">
                  {this.state.error?.message || 'Unknown error occurred'}
                </p>
                {process.env.NODE_ENV === 'development' && this.state.error?.stack && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-[var(--muted-foreground)]">
                      Stack Trace (Development)
                    </summary>
                    <pre className="mt-2 text-xs text-[var(--muted-foreground)] overflow-auto max-h-32">
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}
              </div>

              <div className="flex space-x-3">
                <Button onClick={this.handleRetry} className="font-cinzel">
                  Try Again
                </Button>
                <Button variant="outline" onClick={this.handleGoHome} className="font-cinzel">
                  Return to Safety
                </Button>
              </div>

              <div className="text-xs text-[var(--muted-foreground)] font-cormorant italic">
                If this error persists, please report it to the Realm Administrators.
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
