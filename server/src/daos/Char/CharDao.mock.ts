import { ICharacter } from "../../entities/Chars";
import { getRandomInt } from "@shared";
import { MockDaoMock } from "../MockDb/MockDao.mock";
import { ICharDao } from "./CharDao";

export class CharDao extends MockDaoMock implements ICharDao {
  public async getAll(): Promise<ICharacter[]> {
    try {
      const db = await super.openDb();
      return db.results;
    } catch (err) {
      throw err;
    }
  }

  public async add(name: string): Promise<void> {
    try {
      if (!name) {
        return;
      }
      const db = await super.openDb();
      const char: ICharacter = { id: getRandomInt(), name };
      db.results.push(char);
      await super.saveDb(db);
    } catch (err) {
      throw err;
    }
  }

  public async update(char: ICharacter): Promise<void> {
    // tslint:disable-next-line: no-console
    console.log("TCL: CharDao -> char", char);
    try {
      const db = await super.openDb();
      for (let i = 0; i < db.results.length; i++) {
        if (db.results[i].id === char.id) {
          db.results[i] = char;
          await super.saveDb(db);
          return;
        }
      }
      throw new Error("char not found");
    } catch (err) {
      throw err;
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const db = await super.openDb();
      for (let i = 0; i < db.results.length; i++) {
        if (db.results[i].id === id) {
          db.results.splice(i, 1);
          await super.saveDb(db);
          return;
        }
      }
      throw new Error("char not found");
    } catch (err) {
      throw err;
    }
  }
}
