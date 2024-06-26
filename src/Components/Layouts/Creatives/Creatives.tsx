import React from "react";
import CreativesList from "@/Components/Creatives/CreativesList";
import styles from "./styles.module.scss";

const Creatives = () => {
    return (
        <div className={styles["creatives-section"]}>
            <div className={styles["creatives-section__block"]}>
                <div className="container">
                    <div className={styles["creatives-section__line"]}></div>
                    <h2 className={styles["creatives-section__tag"]}>
                        <span className="text-gradient">#WeFinallyPlayedIt</span>
                    </h2>
                    <h3 className={styles["creatives-section__title"]}>
                        <span className="text-gradient">Popular</span>
                    </h3>
                </div>
                <CreativesList perPage={5} />
            </div>
            <div className={styles["creatives-section__block"]}>
                <div className="container">
                    <h3 className={styles["creatives-section__title"]}>Latest</h3>
                </div>
                <CreativesList perPage={10} />
            </div>

        </div>
    )
}

export default Creatives;
