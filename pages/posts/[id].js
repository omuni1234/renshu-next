import Layout from "../../components.js/Layout";
import { getAllPostsIds } from "../../lib/post";
import { getPostData } from "../../lib/post"
import utilStyle from "../../styles/utils.module.css"
import Head from "next/head";

export async function getStaticPaths(){
    const paths = getAllPostsIds();
    return {
        paths,
        fallback: false,
    };
}
export async function getStaticProps({params}){
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        },
    }
}

export default function Post({postData}) {
    return (
        <div>
            <Layout>
                <Head>
                    <title>{postData.title}</title>
                </Head>
                 <article className={utilStyle.headingX1}>
                {postData.title}
                </article>
                <br />
                <div className={utilStyle.lightText}>
                {postData.data}
                </div>
                <br />
                <div dangerouslySetInnerHTML={{__html: postData.blogContentHTML}}/>
            </Layout>
        </div>
    );
}