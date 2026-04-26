/**
 * @file /library_content/letterboxd/+server.js
 * 
 * Server route to get letterboxd RSS feed as XML
 */

// External imports
import { json } from "@sveltejs/kit";
import { XMLParser } from "fast-xml-parser";

export async function GET()
{
    const parser = new XMLParser();

    const res = await fetch("https://letterboxd.com/sebbb_ch/rss/");
    const raw_xml = await res.text();
    const parsed_xml = parser.parse(raw_xml);

    return json(parsed_xml);
}
