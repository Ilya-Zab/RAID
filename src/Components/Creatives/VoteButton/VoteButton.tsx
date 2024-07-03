import React, { FC, useEffect, useState } from "react";
import { VoteButtonProps } from "@/types/components/Creative/VoteButtonProps";
import styles from "./styles.module.scss";

const VoteButton: FC<VoteButtonProps> = ({ votes, hasVoted, onVote }) => {

    const [buttonVotes, setButtonVotes] = useState(votes);
    const [hasClicked, setClicked] = useState(hasVoted);

    useEffect(() => {
        setClicked(hasVoted);
        setButtonVotes(votes);
    }, [hasVoted, votes])

    const onClick = () => {
        if (hasClicked) return;
        if (!onVote()) return;
        setButtonVotes((buttonVotes) => buttonVotes + 1);
        setClicked(true);
    }

    return (
        <button aria-label="Vote/Like" className={styles["vote-button"]} onClick={onClick}>
            <div className={styles["vote-button__icon"]}>
                {hasClicked ?
                    <>
                        <svg aria-hidden width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.0298 0.384766C12.3923 0.384766 10.9391 1.01915 9.95455 2.10952C8.96996 1.01915 7.51674 0.384766 5.87932 0.384766C4.45316 0.386459 3.08591 0.943275 2.07747 1.93307C1.06903 2.92287 0.501726 4.26485 0.5 5.66463C0.5 11.4517 9.12401 16.0755 9.49078 16.27C9.63331 16.3453 9.79267 16.3848 9.95455 16.3848C10.1164 16.3848 10.2758 16.3453 10.4183 16.27C10.7851 16.0755 19.4091 11.4517 19.4091 5.66463C19.4073 4.26485 18.8401 2.92287 17.8316 1.93307C16.8232 0.943275 15.4559 0.386459 14.0298 0.384766Z" fill="red" />
                        </svg>
                    </>
                    :
                    <svg aria-hidden width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5298 0.5C11.8923 0.5 10.4391 1.13439 9.45454 2.22476C8.46996 1.13439 7.01674 0.5 5.37932 0.5C3.95316 0.501694 2.58591 1.05851 1.57747 2.04831C0.569027 3.03811 0.00172553 4.38009 0 5.77987C0 11.5669 8.62401 16.1908 8.99078 16.3852C9.13331 16.4606 9.29267 16.5 9.45454 16.5C9.61642 16.5 9.77578 16.4606 9.91831 16.3852C10.2851 16.1908 18.9091 11.5669 18.9091 5.77987C18.9073 4.38009 18.3401 3.03811 17.3316 2.04831C16.3232 1.05851 14.9559 0.501694 13.5298 0.5ZM13.0823 11.8885C11.9472 12.834 10.7337 13.6849 9.45454 14.4325C8.17537 13.6849 6.9619 12.834 5.82678 11.8885C4.06057 10.4014 1.95612 8.13341 1.95612 5.77987C1.95612 4.88877 2.31677 4.03415 2.95875 3.40406C3.60071 2.77395 4.47142 2.41996 5.37932 2.41996C6.83009 2.41996 8.04451 3.17194 8.54903 4.38311C8.62246 4.55967 8.74781 4.71076 8.90908 4.81712C9.07036 4.92348 9.26025 4.98028 9.45454 4.98028C9.64884 4.98028 9.83873 4.92348 10 4.81712C10.1613 4.71076 10.2866 4.55967 10.3601 4.38311C10.8646 3.17194 12.079 2.41996 13.5298 2.41996C14.4377 2.41996 15.3084 2.77395 15.9504 3.40406C16.5923 4.03415 16.953 4.88877 16.953 5.77987C16.953 8.13341 14.8486 10.4014 13.0823 11.8885Z" fill="url(#paint0_linear_252_5020)" />
                        <defs>
                            <linearGradient id="paint0_linear_252_5020" x1="5.16307" y1="-9.96809" x2="21.1021" y2="-9.78884" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#08A232" />
                                <stop offset="0.333333" stopColor="#2DE6FF" />
                                <stop offset="0.666667" stopColor="#3B57ED" />
                                <stop offset="1" stopColor="#916AFF" />
                            </linearGradient>
                        </defs>
                    </svg>
                }
            </div>
            <span aria-label="Votes/Likes" className={styles["vote-button__text"]}>{buttonVotes}</span>
        </button>
    );
}

export default VoteButton;