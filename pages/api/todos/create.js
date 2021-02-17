import db from "database";

export default async function handler(req, res) {
  const id = await db.insert(req.body).into("todos").returning("id");
  res.send(id);
}
