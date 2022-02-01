/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled/macro';
import { keyframes } from '@emotion/react';
import * as colors from 'styles/colors';
import * as mq from 'styles/media-queries';
import { Dialog as ReachDialog } from '@reach/dialog';
import { FaSpinner } from 'react-icons/fa';

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});
const FieldsWrapper = styled.div({
  marginBottom: '2rem',
});

const TextAreaLable = styled.label({
  color: colors.base,
});
const CustomInput = styled.input({
  // backgroundColor: colors.base,
  background: 'rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)',
  border: 'none',
  borderRadius: '0px',
  marginBottom: '10px',
  padding:'11px 11px',
 

  '::placeholder': {
    color: colors.gray10
  }

});
const TextAreaContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  
});
const LoadingButton = styled.button({
  textAlign: 'center',
  fontWeight: 'bold',
  color: colors.base,
  fontSize: '0.6rem',
  minHeight: '38px',
  minWidth: '78px',
  border: '0',
  background: `url('Assets/Buttons/transparent-button-over.svg')`,
  backgroundSize: '100% 100%',
});

const Loader = styled.div({
  display: 'inline-block',
  width: '1.5rem',
  height: '1.5rem',
  verticalAlign: '-0.4em',
  border: '0.2em solid currentColor',
  borderRightColor: 'transparent',
  borderRadius: '50%',
  animation: '0.75s linear infinite spinner-border',
});

const TextArea = styled.textarea({
  maxWidth: '100%',
  minHeight: '300px',
  padding: '1rem',
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)',
  border: 'none',
  borderRadius: '0px',

});
const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: colors.base,
  color: colors.text,
  border: `1px solid ${colors.gray10}`,
  cursor: 'pointer',
});

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});
Spinner.defaultProps = {
  'aria-label': 'loading',
};

const buttonVariants = {
  primary: {
    background: colors.indigo,
    color: colors.base,
  },
  secondary: {
    background: colors.gray,
    color: colors.text,
  },
};
const Button = styled.button(
  {
    padding: '10px 15px',
    border: '0',
    lineHeight: '1',
    borderRadius: '3px',
  },
  ({ variant = 'primary' }) => buttonVariants[variant],
);

const inputStyles = {
  border: '1px solid #f1f1f4',
  background: '#f1f2f7',
  padding: '8px 12px',
};

const Input = styled.input({ borderRadius: '1px' }, inputStyles);

const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  [mq.small]: {
    width: '100%',
    margin: '10vh auto',
  },
});

const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

function FullPageSpinner() {
  return (
    <div
      css={{
        fontSize: '4em',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
    </div>
  );
}

const errorMessageVariants = {
  stacked: { display: 'block' },
  inline: { display: 'inline-block' },
};

function ErrorMessage({ error, variant = 'stacked', ...props }) {
  return (
    <div role="alert" css={[{ color: colors.danger }, errorMessageVariants[variant]]} {...props}>
      <span>There was an error: </span>
      <pre css={[{ whiteSpace: 'break-spaces', margin: '0', marginBottom: -5 }, errorMessageVariants[variant]]}>
        {error.message}
      </pre>
    </div>
  );
}

function FullPageErrorFallback({ error }) {
  return (
    <div
      role="alert"
      css={{
        color: colors.danger,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  );
}

export {
  FullPageErrorFallback,
  ErrorMessage,
  CircleButton,
  Spinner,
  Button,
  Input,
  Dialog,
  FormGroup,
  FullPageSpinner,
  LoadingButton,
  Loader,
  TextArea,
  TextAreaContainer,
  FieldsWrapper,
  CustomInput,
  TextAreaLable,
};
