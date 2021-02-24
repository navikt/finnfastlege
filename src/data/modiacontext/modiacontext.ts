import { Reducer } from "redux";
/* eslint-disable prefer-object-spread */
import {
  PUSHER_MODIACONTEXT,
  PUSH_MODIACONTEXT_FEILET,
  MODIACONTEXT_PUSHET,
  HENTER_AKTIVENHET,
  HENT_AKTIVENHET_FEILET,
} from "./modiacontext_actions";

export interface ModiaContextState {
  pushet: boolean;
  pusher: boolean;
  pushingFeilet: boolean;
  henterEnhet: boolean;
  hentingEnhetFeilet: boolean;
  data: any;
}

export const initialState: ModiaContextState = {
  pushet: false,
  pusher: false,
  pushingFeilet: false,
  henterEnhet: false,
  hentingEnhetFeilet: false,
  data: {},
};

const modiacontext: Reducer<ModiaContextState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case PUSH_MODIACONTEXT_FEILET: {
      return {
        ...state,
        pushet: false,
        pusher: false,
        pushingFeilet: true,
      };
    }
    case PUSHER_MODIACONTEXT: {
      return {
        ...state,
        pushet: false,
        pusher: true,
        pushingFeilet: false,
      };
    }
    case MODIACONTEXT_PUSHET: {
      return {
        ...state,
        pushet: true,
        pusher: false,
        pushingFeilet: false,
      };
    }
    case HENT_AKTIVENHET_FEILET: {
      return {
        ...state,
        henterEnhet: false,
        hentingEnhetFeilet: true,
      };
    }
    case HENTER_AKTIVENHET: {
      return {
        ...state,
        henterEnhet: true,
        hentingEnhetFeilet: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default modiacontext;
