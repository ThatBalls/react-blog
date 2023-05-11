import { LinkButtonStyles } from './LinkButton.css';

export const LinkButton = ({ href, children }) => {
  return (
    <LinkButtonStyles href={href}>{children}</LinkButtonStyles>
  );
}