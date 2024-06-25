import React, { FC } from "react";
import { VoteButtonProps } from "@/types/components/Creative/VoteButtonProps";
import styles from "./styles.module.scss";

const VoteButton: FC<VoteButtonProps> = ({ votes, hasVoted, onVote }) => {
    return (
        <button className={styles["vote-button"]}>
            <div className={styles["vote-button__icon"]}>

                <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5298 0.5C11.8923 0.5 10.4391 1.13439 9.45454 2.22476C8.46996 1.13439 7.01674 0.5 5.37932 0.5C3.95316 0.501694 2.58591 1.05851 1.57747 2.04831C0.569027 3.03811 0.00172553 4.38009 0 5.77987C0 11.5669 8.62401 16.1908 8.99078 16.3852C9.13331 16.4606 9.29267 16.5 9.45454 16.5C9.61642 16.5 9.77578 16.4606 9.91831 16.3852C10.2851 16.1908 18.9091 11.5669 18.9091 5.77987C18.9073 4.38009 18.3401 3.03811 17.3316 2.04831C16.3232 1.05851 14.9559 0.501694 13.5298 0.5ZM13.0823 11.8885C11.9472 12.834 10.7337 13.6849 9.45454 14.4325C8.17537 13.6849 6.9619 12.834 5.82678 11.8885C4.06057 10.4014 1.95612 8.13341 1.95612 5.77987C1.95612 4.88877 2.31677 4.03415 2.95875 3.40406C3.60071 2.77395 4.47142 2.41996 5.37932 2.41996C6.83009 2.41996 8.04451 3.17194 8.54903 4.38311C8.62246 4.55967 8.74781 4.71076 8.90908 4.81712C9.07036 4.92348 9.26025 4.98028 9.45454 4.98028C9.64884 4.98028 9.83873 4.92348 10 4.81712C10.1613 4.71076 10.2866 4.55967 10.3601 4.38311C10.8646 3.17194 12.079 2.41996 13.5298 2.41996C14.4377 2.41996 15.3084 2.77395 15.9504 3.40406C16.5923 4.03415 16.953 4.88877 16.953 5.77987C16.953 8.13341 14.8486 10.4014 13.0823 11.8885Z" fill="url(#paint0_linear_252_5020)" />
                    <defs>
                        <linearGradient id="paint0_linear_252_5020" x1="5.16307" y1="-9.96809" x2="21.1021" y2="-9.78884" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#08A232" />
                            <stop offset="0.333333" stop-color="#2DE6FF" />
                            <stop offset="0.666667" stop-color="#3B57ED" />
                            <stop offset="1" stop-color="#916AFF" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <span className={styles["vote-button__text"]}>{votes}</span>
        </button>
    );
}

export default VoteButton;