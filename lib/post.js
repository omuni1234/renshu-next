import path from "path";
import fs from "fs";
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";


const postsDirectory = path.join(process.cwd(), "posts");
// console.log(postsDirectory);

export function getPostsData() {
  // /posts配下のファイル名を取得
  const fileNames = fs.readdirSync(postsDirectory);
  // console.log(fileNames);
  const allPostsData = fileNames.map((fileName) => {
    // idを取得するためにファイル名の拡張子を除外
    const id = fileName.replace(/\.md$/, "");

    //マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    //投稿のメタデータ部分を解析
    const matterResult = matter(fileContents);

    //idとデータを返す。
    return {
      id,
      ...matterResult.data,
    };
  });
  // console.log(allPostsData);
  //投稿を日付でソートする
  return allPostsData;
}

// getStaticPath return で使うpathを取得
export function getAllPostsIds(){
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map(fileName =>{   
        return {
            params : {
                id : fileName.replace(/\.md$/, ""),
            }
        }
    })
    /*[
        {
            params : {
                id : で使うpathを取得
        },
        ...
    ] */
}

// idに基づいてブログの投稿データを返す
export async function getPostData(id){
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContent);

    const blogContent = await remark()
    .use(html)
    .process(matterResult.content);

    const blogContentHTML = blogContent.toString();

    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    }
}