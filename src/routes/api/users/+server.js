/**
 * @file /route/api/users/+server.js
 * 
 * Server routes to write to and query database
 */

// External imports
import { json } from "@sveltejs/kit";

// Internal imports
import {get_db} from '$lib/server/database.js';

/**
 * 
 * @returns 
 */
export async function GET() 
{
    get_db();
    return json({"status" : "ok"});
}

/**
 * 
 * @returns 
 */
export async function POST( {request} )
{
    console.log("This is the post route");

    const tel = await request.json();
    const db = get_db();

    const stmt = db.prepare(`INSERT INTO users (id, phone) VALUES ('foobar_id', ${tel.tel})`);
    try {
        stmt.run();
        console.log("Inserted into database");
    } catch (err) {
        console.error("Error inserting into user database:", err);
    }

    return json({"status" : "ok"});
}
