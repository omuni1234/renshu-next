import Head from "next/head";
import styles from "./layout.module.css"
import utilStyles from "/styles/utils.module.css"
import Link from "next/link";

const name = "seiya";
export const siteTitle = "next js blog"

function Layout({children, home}) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico"></link>
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                    <img
                    className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
                    src="/images/profile.png"
                    alt="Profile"></img>
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                    <img className={utilStyles.borderCircle} src="/images/profile.png" alt="Profile"></img>
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                )}
            </header>
            <main>
                {children}
            </main>
            {! home && (
                <div>
                    <Link href="/">ホームに戻る</Link>
                </div>
            )}
        </div>
    );
}

export default Layout;