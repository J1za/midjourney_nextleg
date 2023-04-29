import React from "react";
import Header from "../common/Header";
import styles from './BaseLayout.module.scss';
interface IBaseLayout {
    children: React.ReactNode
}

function BaseLayout({ children }: IBaseLayout) {
    return (
        <div className={styles.main}>
            <Header />
            <main>
                {children}
            </main>
        </div>
    )
}

export default BaseLayout