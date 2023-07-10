import React from "react";
export const useDelayedState = (initialState: any, condition: boolean) => {
  const [{ state, loaded }, setState] = React.useState({
    state: null,
    loaded: false,
  });

  React.useEffect(() => {
    if (!loaded && condition) setState({ state: initialState, loaded: true });
  }, [condition, loaded]);

  const updateState = (newState: any) => {
    if (!loaded) return;
    setState({ state: newState, loaded });
  };

  return [state, updateState];
};
