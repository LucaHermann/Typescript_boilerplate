import { Reducer } from "redux";
import { CharacterActions, CharacterActionType } from "../actions/charActions";

// define character type
export interface ICharacter {
  id: number;
  name: string;
}

// define the character state
export interface ICharacterState {
  readonly characters: ICharacter[];
}

// define initial state
const initialCharacterState: ICharacterState = {
  characters: [],
};

export const characterReducer: Reducer<ICharacterState, CharacterActions> = (state = initialCharacterState, action) => {
  switch (action.type) {
    case CharacterActionType.GET_ALL: {
      return {
        ...state,
        characters: action.characters,
      };
    }
    case CharacterActionType.ADD_ONE: {
      return {
        ...state,
        characters: action.characters,
      };
    }
    case CharacterActionType.UPDATE_ONE: {
      return {
        ...state,
        characters: action.characters,
      };
    }
    case CharacterActionType.DELETE_ONE: {
      return {
        ...state,
        characters: action.characters,
      };
    }
    default:
      return state;
  }
};
