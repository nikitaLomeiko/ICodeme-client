import { ActionDispatch, createContext, useReducer } from "react";
import { enviromentReducer, initEnviroment } from "./enviroment.reducer";
import { EnviromentAction, IStateProvider } from "./types";

interface UseEnviromentReturn {
  enviroment: IStateProvider;
  dispatch: ActionDispatch<[action: EnviromentAction]>;
}

interface IProps {
  children: React.ReactNode;
}

export const enviromentContext = createContext<UseEnviromentReturn | null>(
  null,
);

export const EnviromentProvider: React.FC<IProps> = ({ children }) => {
  const [enviroment, dispatch] = useReducer(
    enviromentReducer,
    null,
    initEnviroment,
  );

  return (
    <enviromentContext.Provider value={{ enviroment, dispatch }}>
      {children}
    </enviromentContext.Provider>
  );
};
