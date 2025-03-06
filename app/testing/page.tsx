export default function () {
  type User = { name: string; age: number };
  type PartialUser = Partial<User>;
  type RequiredUser = Required<User>;
  type ReadonlyUser = Readonly<User>;

  type PickUser = Pick<User, "name" | "age">;
  type OmitUser = Omit<User, "name">;
  type Role = "Admin" | "User" | "private";

  type RecordUser = Record<string, string>;

  const roles: RecordUser = { name: "nima" };
  console.log(roles);
}
