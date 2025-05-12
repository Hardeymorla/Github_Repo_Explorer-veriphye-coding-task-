import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  let displayMessage = 'Something went wrong.';

  if (message.includes('Could not resolve to a User')) {
    displayMessage = 'Invalid username. Please try again.';
  } else if (message.includes('API rate limit exceeded')) {
    displayMessage = 'GitHub API rate limit exceeded. Please wait and try again later.';
  }

  return (
    <div className="text-red-600 text-center mt-4">
      ⚠️ {displayMessage}
    </div>
  );
};

export default ErrorMessage;
