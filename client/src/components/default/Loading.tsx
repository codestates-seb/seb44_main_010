import { BeatLoader } from "react-spinners";
import styled from 'styled-components';

export const LoadingContainer = styled.div`
    width: 100vw;
    height: 80vh;
    display:flex;
    justify-content:center;
    align-items:center;
`;

export default function Loading({ isLoading }: { isLoading: boolean }) {
  return (
    <LoadingContainer>
      <BeatLoader
        color="#36d7b7"
        loading={isLoading}
        size={20}
      />
    </LoadingContainer>
  );
}
