import db from "database";

export default async function handler(req, res) {
  const result = await db("todos").whereIn("id", req.body.ids).del();
  res.send(result);
}
