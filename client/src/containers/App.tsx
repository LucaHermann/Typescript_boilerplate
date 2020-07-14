import React, { useEffect } from "react";
import { connect } from "react-redux";
import { cssRaw } from "typestyle";
import reactLogo from "./reactLogo.svg";
import nodeLogo from "./nodeLogo.svg";
import CharacterList from "../components/charList";
import FormExampleForm from "../components/charForm";
import * as action from "../actions/charActions";
import { IAppState } from "../store/charStore";
import { ICharacter } from "../reducers/charReducers";

cssRaw(`
  .App {
    text-align: center;
  }

  .App-logo {
    height: 40vmin;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: App-logo-spin infinite 20s linear;
    }
  }

  .App-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .App-link {
    color: #61dafb;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(1000deg);
    }
  }

`);

interface Props {
  characters?: ICharacter[];
  getAll: () => void;
  addOne: (name: string) => void;
  deleteOne: (id: number) => void;
  updateOne: (char: ICharacter) => void;
}

const App: React.FC<Props> = props => {
  console.log("TCL: props", props);
  useEffect(() => {
    props.getAll();
  }, [props]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={reactLogo} className="App-logo" alt="logo" />
        <img src={nodeLogo} className="App-logo" alt="logo" />
        <CharacterList
          characters={props.characters}
          callBackHandler={props.deleteOne}
          callBackHandlerPut={props.updateOne}
        />
        <FormExampleForm callBackHandler={props.addOne} />
      </header>
    </div>
  );
};

const mapStateToProps = (store: IAppState) => {
  return {
    characters: store.characterState.characters,
  };
};

const mapDispatchToProps = {
  getAll: () => action.getAllCharacters(),
  addOne: (name: string) => action.AddOneCharacters(name),
  deleteOne: (id: number) => action.DeleteOneCharacters(id),
  updateOne: (char: ICharacter) => action.UpdateOneCharacters(char),
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
