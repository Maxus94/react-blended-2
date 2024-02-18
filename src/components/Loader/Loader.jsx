import { Overlay } from 'components/Overlay/Overlay.styled';
import { BeatLoader } from 'react-spinners';

export const Loader = () => {
  return (
    <Overlay>
      <BeatLoader color="#8396a3" />
    </Overlay>
  );
};
