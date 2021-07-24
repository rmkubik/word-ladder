import styled from "styled-components";

const Ladder = styled.div`
  display: grid;
  grid-template-columns: max-content ${(props) => props.wordLength}rem 1rem;
  grid-column-gap: 1rem;
  grid-row-gap: 0.5rem;

  margin-bottom: 4rem;
`;

export default Ladder;
