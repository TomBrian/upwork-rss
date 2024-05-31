import * as cheerio from "cheerio";
import chalk from "chalk";
import moment from "moment";
import axios from "axios";
import { Email } from "./email";

/**
 * A namespace for UpworkRSS related helper functions
 */
export namespace UpworkRSS {
  /**
   * Extract data from the request's xml response
   * @param items The xml response from the request
   * @param $ The cheerio object
   * @returns An array of post objects
   */
  export async function extractData(items: any, $: any): Promise<any[]> {
    const postArray: any[] = [];
    items.each((i: number, el: any) => {
      const title = $(el).find("title").text();
      const description = $(el).find("description").text();
      // extract the hourly range, posted on, category, skills and country from the description
      const hourlyRange = description.match(/<b>Hourly Range<\/b>: (.*?)\n/);
      const budget = description.match(/<b>Budget<\/b>: (.*?)\n/);
      const postedOn = description.match(/<b>Posted On<\/b>: (.*?)<br \/>/)[1];
      const d = new Date(postedOn);
      // use moment to get the minutes/hours from now
      const datefromNow = moment(d).fromNow();
      const category = description.match(/<b>Category<\/b>: (.*?)<br \/>/);
      const skills = description.match(/<b>Skills<\/b>:(.*?) \n<br \/>/);
      const country = description.match(/<b>Country<\/b>: (.*?)<br \/>/);
      const link = $(el).find("link").text();
      const pubDate = $(el).find("pubDate").text();
      postArray.push({
        title,
        description,
        link,
        pubDate,
        hourlyRange,
        budget,
        postedOn: datefromNow,
        category,
        skills,
        country,
      });
    });
    return postArray;
  }
  /**
   * Fetch RSS feed from Upwork
   * @param url The url to fetch the RSS feed from
   * @returns The RSS feed
   */
  export async function getRSS(rssUrl: string, title: string): Promise<any[]> {
    console.log(chalk.bgMagenta("Fetching RSS feed"));
    const response = await axios.get(rssUrl);
    const posts = response.data;
    // get post description with cheerio
    const $ = cheerio.load(posts, { xmlMode: true });
    // split posts into single posts based on the <item> tag
    const items = $("item");
    const postArray = await extractData(items, $);
    postArray.forEach((post) => {
      const timeFromNow = post.postedOn;
      // guard clause to block the alert if the job is more than an hour old
      if (timeFromNow.indexOf("minutes") === -1) return;
      // check if the job is less than 5 minutes old
      const minutes = parseInt(timeFromNow.split("minutes")[0]);
      console.log(minutes);
      console.log(typeof minutes);
      // send an alert if the job is less than 5 minutes old
      if (minutes < 5 || minutes === 5) {
        sendAlert(post, title);
      }
    });
    return postArray;
  }

  /**
   * send alert for a job post
   * @param post
   * @param title
   * @param interval
   * @returns
   */

  export async function sendAlert(post: any, title: string): Promise<void> {
    console.log(title, post.title);
    try {
      await Email.sendEmail(
        process.env.ALERT_EMAIL_ADDRESSES || "",
        "Posted just now " + post.title,
        post.description
      );
    } catch (error) {
      console.log(chalk.red("An error occurred while sending the alert"));
    }
  }

  /**
   * Keyword filters
   * @param unfilteredKeywords;
   * @returns the keywords
   */

  export const filterKeywords = (unfilteredKeywords: string[]): string[] => {
    let keywords: string[];
    console.log(unfilteredKeywords);
    const tagFreeKeywords = unfilteredKeywords.map((keyword) => {
      if (!keyword) return [];
      const filteredKeyword = keyword.replace(/<[^>]*>/g, "");
      // split the keywords by comma
      const splitKeywords = filteredKeyword.split(",");
      // remove white spaces from the keywords
      const trimmedKeywords = splitKeywords.map((keyword) => keyword.trim());
      // remove empty strings from the keywords
      const cleanedKeywords = trimmedKeywords.filter(
        (keyword) => keyword !== ""
      );
      // add the cleaned keywords to the keywords array
      return cleanedKeywords;
    });
    keywords = tagFreeKeywords.flat();
    return keywords;
  };
}
