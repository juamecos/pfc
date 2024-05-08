// ErrorBoundaries/ErrorBoundary.jsx
import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught in ErrorBoundary:", error, errorInfo);
        this.setState({ errorInfo });
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
                    <h1 className="text-3xl font-semibold mb-4 text-red-600">Oops! Something went wrong.</h1>
                    <p className="mb-4 text-lg">We're sorry for the inconvenience. Please try again or contact support.</p>
                    {this.state.error && <pre className="text-sm bg-gray-200 p-4 rounded mb-4">{this.state.error.toString()}</pre>}
                    {this.state.errorInfo && (
                        <details className="bg-gray-200 p-4 rounded mb-4">
                            <summary className="cursor-pointer mb-2">Click for error details</summary>
                            <pre className="text-sm">{this.state.errorInfo.componentStack}</pre>
                        </details>
                    )}
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
                        onClick={this.handleRetry}
                    >
                        Retry
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
