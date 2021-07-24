import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Clue = styled.p`
  margin: 0;
  width: max-content;
`;

const Answer = styled.input`
  width: ${(props) => props.wordLength}rem;
`;

const Status = styled.span`
  line-height: 1;
`;

const Rung = ({
  clue,
  answer,
  aRef,
  onFocus,
  correct,
  setCorrect,
  wordLength,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value.toLowerCase() === answer.toLowerCase()) {
      setCorrect();
    }
  }, [value]);

  return (
    <>
      <Clue>{clue}</Clue>
      <Answer
        ref={aRef}
        value={value}
        correct={correct}
        onChange={(e) =>
          setValue(e.target.value.toUpperCase().slice(0, wordLength))
        }
        onFocus={onFocus}
        wordLength={wordLength}
      />
      <Status>{correct ? "✅" : ""}</Status>
    </>
  );
};

export default Rung;
