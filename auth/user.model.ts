import pool from "./pgdb";

export interface IUser {
  id: string;
  username: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  dob?: Date;
}

/* Find user by username */
export const findUserByUsername = async (username: string): Promise<IUser | null> => {
  const result = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );
  return result.rows[0] || null;
};

/* Create user */
export const createUser = async (
  username: string,
  fname: string,
  lname: string,
  email: string,
  password: string,
  dob?: Date
): Promise<IUser> => {
  const result = await pool.query(
    `INSERT INTO users (username, fname, lname, email, password, dob)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [username, fname, lname, email, password, dob]
  );

  return result.rows[0];
};

/* Get all users */
export const getAllUsers = async (): Promise<IUser[]> => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};
