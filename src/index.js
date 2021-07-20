import ReactDOM from "react-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Fireworks } from "fireworks-js";
import ladderData from "../data/ladder.txt";
import settings from "../data/settings.yaml";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Helvetica, sans-serif;
    margin: 0 auto;
    max-width: 800px;
  }

  h1 {
    margin-top: 4rem;
    margin-bottom: 3rem;
  }

  h2 {
    margin-top: 3rem;
  }

  h3 {
    margin-top: 2rem;
  }

  p {
    line-height: 1.5;
  }
`;

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

const FireworksContainer = styled.div`
  pointer-events: ${(props) => (props.emit ? "all" : "none")};

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const FireworksController = ({ emit }) => {
  const [fireworks, setFireworks] = useState();

  const containerRef = useCallback((node) => {
    if (node !== null) {
      const fireworks = new Fireworks(node, {
        // options
        mouse: {
          move: true,
        },
        delay: {
          min: 5,
          max: 5,
        },
        speed: 10,
        autoresize: true,
      });

      setFireworks(fireworks);
    }
  }, []);

  useEffect(() => {
    if (fireworks && emit) {
      fireworks.start();
    }
  }, [emit, fireworks]);

  return <FireworksContainer ref={containerRef} emit={emit} />;
};

const Ladder = styled.div`
  display: grid;
  grid-template-columns: max-content ${(props) => props.wordLength}rem 1rem;
  grid-column-gap: 1rem;
  grid-row-gap: 0.5rem;

  margin-bottom: 4rem;
`;

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

const App = () => {
  const [ladder, setLadder] = useState(parseLadderData(ladderData));
  const [answers, setAnswers] = useState([]);
  const focusedIndexRef = useRef(0);
  const [inputRefs, setInputRefs] = useState([]);
  const inputRefsRef = useRef(inputRefs);

  /**
   * Get the word with the longest length
   */
  const wordLength = ladder.reduce((longest, current) => {
    if (current.answer.length > longest.answer.length) {
      return current;
    }

    return longest;
  }).answer.length;

  const focusNext = () => {
    inputRefsRef.current[focusedIndexRef.current + 1]?.current?.focus();
  };
  const focusPrev = () => {
    inputRefsRef.current[focusedIndexRef.current - 1]?.current?.focus();
  };
  const setCorrect = (index) => {
    setAnswers([...answers.slice(0, index), true, ...answers.slice(index + 1)]);
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
    setAnswers(ladder.map(() => false));
  }, [ladder]);

  return (
    <div>
      <FireworksController emit={answers.every((answer) => answer === true)} />
      <GlobalStyle />
      <h1>{settings.title}</h1>
      <h2>The Rules</h2>
      <p>{settings.rules}</p>
      <h3>For Example:</h3>
      <pre>{settings.example}</pre>
      <p></p>
      <h2>The Ladder</h2>
      <Ladder wordLength={wordLength}>
        {ladder.map(({ clue, answer }, index) => (
          <Rung
            key={clue}
            aRef={inputRefs[index]}
            clue={clue}
            answer={answer}
            correct={answers[index]}
            setCorrect={() => {
              setCorrect(index);
              focusNext();
            }}
            onFocus={() => {
              focusedIndexRef.current = index;
            }}
            wordLength={wordLength}
          />
        ))}
      </Ladder>
    </div>
  );
};

const root = document.getElementById("root");
ReactDOM.render(<App />, root);
