import ReactDOM from "react-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ladderData from "./ladder.txt";

const useHotKeys = (listeners) => {
  const onKeyDown = (event) => {
    const { key } = event;

    listeners[key] && listeners[key]();
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
};

const parseLadderData = (data) => {
  return data.split("\n").map((line) => {
    const firstSpaceIndex = line.indexOf(" ");

    return {
      answer: line.substring(0, firstSpaceIndex),
      clue: line.substring(firstSpaceIndex + 1),
    };
  });
};

const Ladder = styled.div`
  display: grid;
  grid-template-columns: max-content 4rem 1rem;
  grid-column-gap: 1rem;
  grid-row-gap: 0.5rem;
`;

const Clue = styled.p`
  margin: 0;
  width: max-content;
`;

const Answer = styled.input`
  width: 4rem;
`;

const Status = styled.span`
  line-height: 1;
`;

const Rung = ({ clue, answer, aRef, onFocus, onCorrect }) => {
  const [value, setValue] = useState("");
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    setCorrect(value.toLowerCase() === answer.toLowerCase());
  }, [value]);

  useEffect(() => {
    if (correct) {
      onCorrect();
    }
  }, [correct]);

  return (
    <>
      <Clue>{clue}</Clue>
      <Answer
        ref={aRef}
        value={value}
        correct={correct}
        onChange={(e) => setValue(e.target.value.toUpperCase().slice(0, 4))}
        onFocus={onFocus}
      />
      <Status>{correct ? "✅" : ""}</Status>
    </>
  );
};

const App = () => {
  const [ladder, setLadder] = useState(parseLadderData(ladderData));
  const focusedIndexRef = useRef(0);
  const [inputRefs, setInputRefs] = useState([]);
  const inputRefsRef = useRef(inputRefs);

  const focusNext = () => {
    inputRefsRef.current[focusedIndexRef.current + 1]?.current?.focus();
  };
  const focusPrev = () => {
    inputRefsRef.current[focusedIndexRef.current - 1]?.current?.focus();
  };

  useHotKeys({
    ArrowUp: focusPrev,
    ArrowDown: focusNext,
    Enter: focusNext,
  });

  useEffect(() => {
    inputRefsRef.current = inputRefs;
  }, [inputRefs]);

  useEffect(() => {
    const refs = ladder.map(() => React.createRef());

    setInputRefs(refs);
  }, [ladder]);

  return (
    <div>
      <h1>Portland Word Ladder</h1>
      <p>Rules</p>
      <Ladder>
        {ladder.map(({ clue, answer }, index) => (
          <Rung
            key={clue}
            aRef={inputRefs[index]}
            clue={clue}
            answer={answer}
            onCorrect={focusNext}
            onFocus={() => {
              focusedIndexRef.current = index;
            }}
          />
        ))}
      </Ladder>
    </div>
  );
};

const root = document.getElementById("root");
ReactDOM.render(<App />, root);
