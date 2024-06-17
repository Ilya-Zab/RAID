import { Box, IconButton, Typography } from "@mui/material";
import { FC } from "react";
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import styles from './styles.module.scss';

export const SocialShare: FC = () =>
{
    return (
        <Box className={styles.SocialShare}>
            <Box className={styles.SocialShare__text}>
                <Typography component={'h3'}>
                    Share on social networks
                </Typography>
                <Typography component={'h3'}>
                    and <span className="text-gradient">get an extra votes</span>
                </Typography>
            </Box>
            <ul className={styles.SocialShare__socials}>
                <TwitterShareButton
                    url={"https://www.youtube.com"}
                    aria-label="share via twitter"
                >
                    <span className={styles.SocialShare__shareBtn}>
                        <svg width="17" height="17" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.9818 0.348633H15.3713L10.1509 6.31527L16.2923 14.4345H11.4836L7.71726 9.51024L3.4077 14.4345H1.01671L6.6005 8.05253L0.708984 0.348633H5.63977L9.04422 4.84962L12.9818 0.348633ZM12.1431 13.0043H13.4672L4.92031 1.70377H3.49944L12.1431 13.0043Z" fill="white" />
                        </svg>
                    </span>
                </TwitterShareButton>
                <FacebookShareButton
                    url={"https://www.youtube.com"}
                    aria-label="share via facebook"
                >
                    <span className={styles.SocialShare__shareBtn}>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 0C3.80562 0 0 3.80562 0 8.5C0 12.4862 2.74448 15.8311 6.44674 16.7498V11.0976H4.69404V8.5H6.44674V7.38072C6.44674 4.48766 7.75608 3.1467 10.5964 3.1467C11.135 3.1467 12.0642 3.25244 12.4443 3.35784V5.71234C12.2437 5.69126 11.8952 5.68072 11.4624 5.68072C10.0688 5.68072 9.5302 6.20874 9.5302 7.58132V8.5H12.3066L11.8296 11.0976H9.5302V16.9378C13.7391 16.4295 17.0003 12.8459 17.0003 8.5C17 3.80562 13.1944 0 8.5 0Z" fill="white" />
                        </svg>
                    </span>
                </FacebookShareButton>
                <button
                    className="btn-reset"
                    aria-label="share via TikTok"
                >
                    <span className={styles.SocialShare__shareBtn}>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0924 0H9.22738V11.5797C9.22738 12.9594 8.12548 14.0928 6.7542 14.0928C5.38292 14.0928 4.281 12.9594 4.281 11.5797C4.281 10.2246 5.35844 9.11592 6.68075 9.06667V6.15943C3.76677 6.20868 1.41602 8.59855 1.41602 11.5797C1.41602 14.5855 3.81575 17 6.7787 17C9.74161 17 12.1413 14.5609 12.1413 11.5797V5.64202C13.2188 6.43044 14.5411 6.89855 15.9368 6.9232V4.01594C13.782 3.94203 12.0924 2.16811 12.0924 0Z" fill="white" />
                        </svg>

                    </span>
                </button>
                <button
                    className="btn-reset"
                    aria-label="get video link"
                >
                    <span className={styles.SocialShare__shareBtn}>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_462_3414)">
                                <path d="M11.141 2.75127C12.1567 1.73127 13.6428 1.71002 14.4652 2.53594C15.2897 3.36327 15.2677 4.85927 14.2506 5.87927L12.5343 7.60265C12.4376 7.70298 12.3843 7.83725 12.3857 7.97655C12.3871 8.11584 12.4431 8.24901 12.5418 8.34738C12.6404 8.44574 12.7738 8.50142 12.9131 8.50243C13.0524 8.50344 13.1865 8.4497 13.2865 8.35277L15.0035 6.6294C16.3572 5.27011 16.5272 3.10048 15.2182 1.78582C13.9077 0.470441 11.7424 0.641858 10.3873 2.00115L6.95474 5.44861C5.60112 6.8079 5.43112 8.97752 6.74012 10.2915C6.78901 10.3423 6.84753 10.3829 6.91228 10.4109C6.97702 10.4389 7.04669 10.4537 7.11722 10.4545C7.18775 10.4552 7.25773 10.442 7.32307 10.4154C7.38842 10.3889 7.44782 10.3495 7.49781 10.2998C7.54781 10.25 7.58739 10.1908 7.61425 10.1256C7.64112 10.0604 7.65473 9.99047 7.65429 9.91994C7.65385 9.8494 7.63936 9.77966 7.61169 9.71479C7.58401 9.64991 7.54369 9.59119 7.49308 9.54207C6.66858 8.71473 6.69124 7.21873 7.7077 6.19873L11.141 2.75127Z" fill="white" />
                                <path d="M10.2599 6.70801C10.1603 6.60816 10.0252 6.55196 9.88415 6.55176C9.74315 6.55156 9.60784 6.60738 9.50799 6.70695C9.40814 6.80652 9.35193 6.94167 9.35173 7.08268C9.35153 7.22369 9.40736 7.359 9.50692 7.45885C10.3314 8.28618 10.3095 9.78147 9.2923 10.8022L5.85901 14.2489C4.84255 15.2689 3.35647 15.2902 2.53409 14.4643C1.70959 13.6369 1.73226 12.1409 2.74872 11.1209L4.46572 9.39755C4.51497 9.34811 4.554 9.28946 4.58059 9.22493C4.60717 9.16041 4.62079 9.09128 4.62066 9.02149C4.62053 8.9517 4.60665 8.88263 4.57982 8.8182C4.55299 8.75378 4.51374 8.69527 4.4643 8.64601C4.41486 8.59676 4.3562 8.55772 4.29168 8.53114C4.22715 8.50456 4.15802 8.49094 4.08824 8.49107C4.01845 8.4912 3.94937 8.50508 3.88495 8.53191C3.82052 8.55873 3.76201 8.59799 3.71276 8.64743L1.99576 10.3708C0.642132 11.7308 0.472132 13.8997 1.78113 15.2144C3.09155 16.5305 5.25692 16.3583 6.61197 14.9991L10.0453 11.5516C11.3989 10.193 11.5689 8.02197 10.2599 6.70801Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_462_3414">
                                    <rect width="17" height="17" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                    </span>
                </button>
            </ul >
        </Box>
    )
}