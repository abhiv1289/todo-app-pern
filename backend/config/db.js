import Pool from "pg";

const pool = new Pool.Pool({
  user: "todo_app_user",
  host: "localhost",
  database: "todo_app_db",
  password: "todo_app_@123",
  port: 5432,
});

export default pool;
