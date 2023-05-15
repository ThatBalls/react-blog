import { PicoContainer, FrameSizer } from './Generators.css';

export const PicoWrapper = ({url}) => {
  return (
    <FrameSizer>
      <PicoContainer src={url}></PicoContainer>
    </FrameSizer>
  );
};