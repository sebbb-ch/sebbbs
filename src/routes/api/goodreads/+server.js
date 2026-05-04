/**
 * @file /routes/api/goodreads/+server.js
 * 
 * Server route to get goodreads RSS feed as XML
 */

// External imports
import { json } from "@sveltejs/kit";
import { XMLParser } from "fast-xml-parser";

export async function GET()
{
    const parser = new XMLParser();

    const res = await fetch("https://www.goodreads.com/user/updates_rss/162816828");
    const raw_xml = await res.text();
    const parsed_xml = parser.parse(raw_xml);

    return json(parsed_xml);
}
