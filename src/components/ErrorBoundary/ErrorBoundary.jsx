import Button from '@mui/material/Button';
import { Component } from 'react';
import { WebPageSourceCodeIcon } from '~components/Icons';
import EmptyState from '~shared-components/EmptyState/EmptyState';
import i18n from '~utils/i18n';

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
        title={i18n.t('error.title')}
        description={i18n.t('error.description')}
        action={
          // Resetting state alone would re-render the same broken tree.
          <Button variant="contained" onClick={() => window.location.reload()}>
            {i18n.t('error.reload')}
          </Button>
        }
      />
    );
  }
}

export default ErrorBoundary;
