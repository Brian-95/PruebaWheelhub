import { Router, Request, Response } from "express";
import { AppDataSource } from "../database";
import { User } from "../entity/User";
import { createHash } from "crypto";

const router = Router();

interface CreateUserBody {
  username: string;
  password: string;
}

router.post(
  "/create",
  async (
    req: Request<unknown, unknown, CreateUserBody>,
    res: Response
  ): Promise<void> => {
    const { username, password, ...rest } = req.body;

    if (typeof username !== "string" || typeof password !== "string" || Object.keys(rest).length > 0) {
      res.status(400).json({ status: 400, message: "Campos inválidos" });
      return;
    }

    const hashedPassword = createHash("sha256").update(password).digest("hex");

    const userRepo = AppDataSource.getRepository(User);
    const user = userRepo.create({ username, password: hashedPassword });
    await userRepo.save(user);

    res.status(200).json({ status: 200, message: "El usuario se creó correctamente" });
  }
);

export default router;
