import React from "react";
import { Container, ListItem, List, ListContent, Button } from "semantic-ui-react";
import { ICharacter } from "../reducers/charReducers";
import FormExampleForm from "./charForm";

interface IProps {
  characters?: ICharacter[];
  callBackHandler: any;
  callBackHandlerPut: any;
}

const CharacterList: React.SFC<IProps> = props => {
  const characters = props.characters;
  console.log("TCL: characters", characters);

  const deleteThis = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    e.preventDefault();
    props.callBackHandler(id);
    console.log("TCL: deleteThis -> id", id);
  };

  return (
    <Container>
      <List>
        {characters &&
          characters.map(character => {
            return (
              <ListItem key={character.name}>
                <ListContent floated="right">
                  <Button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => deleteThis(e, character.id)}>
                    Delete
                  </Button>
                </ListContent>
                <ListContent floated="left">
                  <FormExampleForm callBackHandler={props.callBackHandlerPut} charToUpdate={character} />
                </ListContent>
                <ListContent>{character.name}</ListContent>
              </ListItem>
            );
          })}
      </List>
    </Container>
  );
};

export default CharacterList;
