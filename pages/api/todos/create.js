import db from "database";

export default async function handler(req, res) {
  delete req.body.id;
  const id = await db("todos").insert(req.body).returning("id");
  res.send(id);
}
