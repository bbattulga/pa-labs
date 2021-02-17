import db from "database";

export default async function handler(req, res) {
  const result = await db.select("*").orderBy("id", "DESC").from("todos");
  res.json(result);
}
