import { User } from "../../queries/user";

export type UserInfo = Omit<User, "password">;
