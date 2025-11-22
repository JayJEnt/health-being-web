import { useEffect, useState } from 'react';

import { settings } from '../../config';

interface TokenHandlerProps {
  token: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const TokenHandler: React.FC<TokenHandlerProps> = ({ token, onSuccess, onError }) => {
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (processed) return;

    try {
      localStorage.setItem(
        settings.AUTH_TOKEN_KEY,
        JSON.stringify({
          access_token: token,
          token_type: 'Bearer',
        })
      );
      setProcessed(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      if (onError) onError('Failed to save token, ERROR: ' + (err as Error).message);
    }
  }, [processed, onSuccess, onError, token]);

  return null;
};
