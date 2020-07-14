import { ICharacter } from "src/entities/Chars";

export interface ICharDao {
  getAll: () => Promise<ICharacter[]>;
  add: (name: string) => Promise<void>;
  update: (Char: ICharacter) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export class UserDao implements ICharDao {
  /**
   *
   */
  public async getAll(): Promise<ICharacter[]> {
    // TODO
    return [] as any;
  }

  /**
   *
   * @param user
   */
  public async add(name: string): Promise<void> {
    // TODO
    return {} as any;
  }

  /**
   *
   * @param user
   */
  public async update(char: ICharacter): Promise<void> {
    // TODO
    return {} as any;
  }

  /**
   *
   * @param id
   */
  public async delete(id: number): Promise<void> {
    // TODO
    return {} as any;
  }
}
