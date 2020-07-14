const usingMockDb = "true";
let userDaoPath = "./User/UserDao";

if (usingMockDb === "true") {
  userDaoPath += ".mock";
}

// tslint:disable:no-var-requires
export const { UserDao } = require(userDaoPath);
