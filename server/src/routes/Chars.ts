import { logger } from "@shared";
import { Request, Response, Router } from "express";
import { BAD_REQUEST, OK } from "http-status-codes";
import { paramMissingError } from "@shared";
import { ParamsDictionary } from "express-serve-static-core";
import { CharDao } from "src/daos/Char/CharDao.mock";
import axios from "axios";
import { ICharacter } from "@entities";

// Init shared
const router = Router();
const userDao = new CharDao();

/******************************************************************************
 *                      Get All Users - "GET /api/chars/all"
 ******************************************************************************/

router.get("/people", async (req: Request, res: Response) => {
  try {
    const response = await axios.get("https://swapi.co/api/people");
    // tslint:disable-next-line: no-console
    console.log("TCL: response", response);
    return res.json(response.data);
  } catch (err) {
    logger.error(err.message, err);
    return err;
  }
});

router.get("/all", async (req: Request, res: Response) => {
  try {
    const users = await userDao.getAll();
    return res.status(OK).json({ users });
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/******************************************************************************
 *                       Add One - "POST /api/chars/add"
 ******************************************************************************/

router.post("/add", async (req: Request, res: Response) => {
  try {
    const user: string = req.body.name;
    // tslint:disable-next-line: no-console
    console.log("TCL: req.body;", req.body.name);
    if (!user) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError,
      });
    }
    await userDao.add(user);
    const users = await userDao.getAll();
    return res.status(OK).json({ users });
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/******************************************************************************
 *                       Update - "PUT /api/chars/update"
 ******************************************************************************/

router.put("/update", async (req: Request, res: Response) => {
  try {
    const user: ICharacter = req.body.character;
    // tslint:disable-next-line: no-console
    console.log("TCL: req.body", req.body);
    if (!user) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError,
      });
    }
    user.id = Number(user.id);
    await userDao.update(user);
    const users = await userDao.getAll();
    return res.status(OK).json({ users });
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/******************************************************************************
 *                    Delete - "DELETE /api/chars/delete/:id"
 ******************************************************************************/

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params as ParamsDictionary;
    await userDao.delete(Number(id));
    const users = await userDao.getAll();
    return res.status(OK).json({ users });
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
