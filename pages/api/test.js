import database from "../../database";

export default async function (req, res) {
  const result = await database.select("*").from("todos");
  res.send(result);
}
