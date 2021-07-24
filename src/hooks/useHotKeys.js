import { useEffect } from "react";

const useHotKeys = (listeners) => {
  const onKeyDown = (event) => {
    const { key } = event;

    listeners[key] && listeners[key]();
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [listeners]);
};

export default useHotKeys;
