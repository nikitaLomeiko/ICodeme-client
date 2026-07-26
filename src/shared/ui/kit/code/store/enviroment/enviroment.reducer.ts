import { EnviromentAction, IStateProvider } from "./types";

export function initEnviroment(): IStateProvider {
  return {
    copied: false,
    fontSize: 12,
    showSearch: false,
    sidebarOpen: true,
    sidebarWidth: 300,
  };
}

export function enviromentReducer(
  state: IStateProvider,
  action: EnviromentAction,
): IStateProvider {
  switch (action.type) {
    case "TOGGLE_SIDEBAR": {
      return { ...state, sidebarOpen: !state.sidebarOpen };
    }
    case "TOGGLE_SEARCH": {
      return { ...state, showSearch: !state.showSearch };
    }
    case "TOGGLE_COPIED":
      return { ...state, copied: !state.copied };
    case "SET_FONT_SIZE":
      return { ...state, fontSize: action.size };
    case "SET_SIDEBAR_WIDTH":
      return { ...state, sidebarWidth: action.width };
    default:
      return state;
  }
}
