// Actions are payloads of information that send data from your applciation to your store.
// They are the only source of information for the store.
import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import axios from "axios";

// import character typing
import { ICharacter, ICharacterState } from "../reducers/charReducers";

// create actions constants
export enum CharacterActionType {
  GET_ALL = "GET_ALL",
  GET_ONE = "GET_ONE",
  UPDATE_ONE = "UPDATE_ONE",
  DELETE_ONE = "DELETE_ONE",
  ADD_ONE = "ADD_ONE",
}

// interface for get all action type
export interface ICharacterGetAllAction {
  type: CharacterActionType.GET_ALL;
  characters: ICharacter[];
}

export interface ICharacterGetOneAction {
  type: CharacterActionType.GET_ONE;
  character: ICharacter[];
}

export interface ICharacterUpdateOneAction {
  type: CharacterActionType.UPDATE_ONE;
  characters: ICharacter[];
}

export interface ICharacterDeleteOneAction {
  type: CharacterActionType.DELETE_ONE;
  characters: ICharacter[];
}

export interface ICharacterAddOneAction {
  type: CharacterActionType.ADD_ONE;
  characters: ICharacter[];
}

/*
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ...
*/
export type CharacterActions =
  | ICharacterGetAllAction
  | ICharacterAddOneAction
  | ICharacterDeleteOneAction
  | ICharacterGetOneAction
  | ICharacterUpdateOneAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllCharacters: ActionCreator<ThunkAction<
  Promise<any>,
  ICharacterState,
  null,
  ICharacterGetAllAction
>> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get("http://localhost:8080/api/chars/all", {
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
      });
      console.log("TCL: response", response);
      dispatch({
        characters: response.data.users,
        type: CharacterActionType.GET_ALL,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const AddOneCharacters: ActionCreator<ThunkAction<
  Promise<any>,
  ICharacterState,
  string,
  ICharacterAddOneAction
>> = (name: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/chars/add`,
        { name },
        { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } },
      );
      console.log("TCL: response", response);
      dispatch({
        characters: response.data.users,
        type: CharacterActionType.ADD_ONE,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const UpdateOneCharacters: ActionCreator<ThunkAction<
  Promise<any>,
  ICharacterState,
  ICharacter,
  ICharacterUpdateOneAction
>> = (character: ICharacter) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/chars/update`,
        { character },
        { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } },
      );
      console.log("TCL: response", response);
      dispatch({
        characters: response.data.users,
        type: CharacterActionType.UPDATE_ONE,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const DeleteOneCharacters: ActionCreator<ThunkAction<
  Promise<any>,
  ICharacterState,
  number,
  ICharacterDeleteOneAction
>> = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/chars/delete/${id}`, {
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
      });
      console.log("TCL: response", response);
      dispatch({
        type: CharacterActionType.DELETE_ONE,
        characters: response.data.users,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
