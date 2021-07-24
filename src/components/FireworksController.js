import { Fireworks } from "fireworks-js";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

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

export default FireworksController;
