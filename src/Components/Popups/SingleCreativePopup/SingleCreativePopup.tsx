import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import SingleCreative from "@/Components/Creatives/SingleCreative";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const SingleCreativePopup = () => {

    const searchParams = useSearchParams();
    const creativeId = searchParams.get('creative');
    const router = useRouter();

    useEffect(() => {
        if (creativeId) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [creativeId]);

    const onClose = (evt) => {
        const currentQuery = { ...router.query };
        if (currentQuery.creative) delete currentQuery.creative;
        router.push(
            {
                query: currentQuery,
            },
            null,
            { shallow: true }
        );
    }

    if (!creativeId) return;

    return (
        <div className={styles['single-creative-popup']} >
            <div className={styles['single-creative-popup__bg']} onClick={onClose}></div>
            <div className={styles['single-creative-popup__content']}>
                <SingleCreative creativeId={+creativeId} />
                <button
                    className={styles['single-creative-popup__close']}
                    aria-label="Close creative"
                    onClick={onClose}
                >
                    <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.8496 1.94971L1.95012 11.8492" stroke="white" stroke-width="2" stroke-linecap="round" />
                        <path d="M1.95117 1.94971L11.8507 11.8492" stroke="white" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default SingleCreativePopup;