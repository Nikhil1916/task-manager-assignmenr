import { Request, Response } from "express";
import User from "../models/user.model";
import { registerSchema, loginSchema } from "../validators/auth.schema";
import { signToken } from "../utils/jwt";

export async function register(req: Request, res: Response) {
  try {
    const parsed = registerSchema.safeParse(req.body);
    console.log(parsed);
    if (!parsed.success) {
      console.log(parsed);
      return res.status(400).json({
        message: parsed.error.issues[0].message,
        property: parsed?.error?.issues?.[0]?.path?.[0]
      });
    }

    const { username, email, password } = parsed.data;
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({
        message: "User already exists",
      });

    const user = new User({
      email,
      username,
      password,
    });

    await user.save();

    // console.log(user);

    const token = signToken(user?.id);

    res.status(201).json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (e: any) {
    console.log(e);
    return res.status(422).json({
      message: e?.message,
      msg: "not able to create user",
    });
  }
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: parsed.error.issues[0].message,
      property: parsed?.error?.issues?.[0]?.path?.[0]
    });
  }

  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const compare = await user.comparePassword(password);
  if (!compare) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken(user.id);
  res.json({
    token,
    user: { id: user.id, username: user.username, email: user.email },
  });
}
