// External imports
import Database from "better-sqlite3";
import path from "path";
import fs from 'fs';

const user_db_path = path.join(process.cwd(), "store", "users.db");

/**
 * Creates and defines the user database schema
 */
export function get_db() {
    try {
        fs.readFileSync(user_db_path);
    } catch (err) {
        console.error("Error fetching database - creating new one.");
    }

    const db = new Database(user_db_path, {verbose : console.log });

    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id              TEXT,
            phone           TEXT UNIQUE NOT NULL,
            display_name    TEXT,
            anonymous       INTEGER DEFAULT 0
        );
    `);

    return db;
}
