/**
 * @file /route/api/letterboxd/+server.js
 * 
 * Server route to get letterboxd RSS feed as XML
 */

// External imports
import { json } from "@sveltejs/kit";
import { XMLParser } from "fast-xml-parser";
import { parse } from "svelte/compiler";

export async function GET()
{
    const parser = new XMLParser();

    const res           = await fetch("https://letterboxd.com/sebbb_ch/rss/");
    const raw_xml       = await res.text();
    const parsed_xml    = parser.parse(raw_xml);


    const link_str = parsed_xml.rss.channel.link;
    const contents_arr = parsed_xml.rss.channel.item;

    contents_arr.forEach(element => {
        console.log(element.guid);
    });

    
    var movies = [];
    contents_arr.forEach((element) => {
        if (element.guid.includes("review")) {
            const movie_obj = {
                "title"         : element['letterboxd:filmTitle'],
                "rating"        : element['letterboxd:memberRating'],
                "date"          : element['letterboxd:watchedDate'],
                "review_html"   : element.description,
                /// @todo I can use this id to pull different posters
                "tmdb_id"       : element['tmdb:movieId']
            }
            movies.push(movie_obj);
        }
    });

    return json({
        "profile_link"      : link_str,
        "movie_contents"    : movies
    });
}
