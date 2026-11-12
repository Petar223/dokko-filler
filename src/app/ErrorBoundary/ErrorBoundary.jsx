import Button from '@mui/material/Button';
import { Component } from 'react';
import EmptyState from '~ui/EmptyState';
import { WebPageSourceCodeIcon } from '~ui/Icons';

/**
 * Catches render errors. Pass `resetKey` (e.g. the pathname) to clear the
 * error automatically when it changes.
 */
class ErrorBoundary extends Component {
  state = { hasError: false, resetKey: this.props.resetKey };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.resetKey !== state.resetKey) {
      return { hasError: false, resetKey: props.resetKey };
    }
    return null;
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <EmptyState
        icon={WebPageSourceCodeIcon}
        color="error"
        title="Ups! Nešto je pošlo naopako."
        description="Došlo je do neočekivane greške. Osvežite stranicu i pokušajte ponovo."
        action={
          // Resetting state alone would re-render the same broken tree.
          <Button variant="contained" onClick={() => window.location.reload()}>
            Osveži stranicu
          </Button>
        }
      />
    );
  }
}

export default ErrorBoundary;
