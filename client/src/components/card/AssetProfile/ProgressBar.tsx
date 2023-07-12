import styled from "styled-components";

interface ProgressBarProps {
  bgcolor: string;
  completed: number;
}

const Container = styled.div`
  height: 6rem;
  width: 95%;
  background-color: #e0e0de;
  border-radius: 50px;
`;

const Filler = styled.div<{completed: number; bgcolor: string}>`
  height: 100%;
  width: ${({completed}) => `${completed}%`};
  background-color: ${({bgcolor}) => bgcolor};
  border-radius: inherit;
  text-align: right;
  transition-duration: 3s;
`;

const Label = styled.p`
  color: white;
  text-align: center;
  font-size: 3rem;
  padding-top: 1rem;
`;

const ProgressBar: React.FC<ProgressBarProps> = ({bgcolor, completed}) => {
  return (
    <Container>
      <Filler completed={completed} bgcolor={bgcolor}>
        <Label>{`${completed}%`}</Label>
      </Filler>
    </Container>
  );
};

export default ProgressBar;
