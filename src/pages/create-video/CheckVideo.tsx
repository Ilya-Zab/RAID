import { Box, FabClassKey, IconButton } from "@mui/material"
import styles from './styles.module.scss';
import { FC } from "react";
import { z } from "zod";
import { downloadVideo } from "@/utils";

export const CheckVideoSchema = z.object({
    videoUrl: z.string(),
    onDownload: z.function().args(z.void()).returns(z.void()),
    prevStep: z.function().args(z.void()).returns(z.void()),
});

export type CheckVideoProps = z.infer<typeof CheckVideoSchema>;

const CheckVideo: FC<CheckVideoProps> = ({ videoUrl, onDownload, prevStep }) =>
{
    return (
        <Box className={styles.wrapper}>
            <video
                autoPlay
                loop
                // muted
                className={styles.video}
            >
                <source
                    src={videoUrl}
                    type="video/mp4"
                />
            </video>
            <Box className={styles.checkVideo__buttons}>
                <IconButton
                    className={`${styles.button} ${styles['button-rew']}`}
                    onClick={() => onDownload()}
                >
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_b_184_739)">
                            <rect width="50" height="50" rx="25" fill="url(#paint0_linear_184_739)" fill-opacity="0.4" />
                            <rect x="0.5" y="0.5" width="49" height="49" rx="24.5" stroke="white" />
                            <path d="M19.3657 24.2253C19.2079 24.0736 19.1192 23.8678 19.1192 23.6532C19.1192 23.4386 19.2079 23.2328 19.3657 23.0811C19.5235 22.9293 19.7375 22.8441 19.9607 22.8441C20.1839 22.8441 20.3979 22.9293 20.5557 23.0811L24.16 26.5481V18.8077C24.16 18.5935 24.2485 18.388 24.406 18.2366C24.5636 18.0851 24.7772 18 25 18C25.2228 18 25.4364 18.0851 25.594 18.2366C25.7515 18.388 25.84 18.5935 25.84 18.8077V26.5481L29.4457 23.0804C29.6035 22.9287 29.8175 22.8434 30.0407 22.8434C30.2639 22.8434 30.4779 22.9287 30.6357 23.0804C30.7935 23.2321 30.8822 23.4379 30.8822 23.6525C30.8822 23.8671 30.7935 24.0729 30.6357 24.2246L25.5957 29.0708C25.5177 29.1461 25.4249 29.2058 25.3228 29.2466C25.2207 29.2873 25.1113 29.3083 25.0007 29.3083C24.8901 29.3083 24.7807 29.2873 24.6786 29.2466C24.5765 29.2058 24.4837 29.1461 24.4057 29.0708L19.3657 24.2253ZM31.16 30.3846H18.84C18.6172 30.3846 18.4036 30.4697 18.246 30.6212C18.0885 30.7727 18 30.9781 18 31.1923C18 31.4065 18.0885 31.612 18.246 31.7634C18.4036 31.9149 18.6172 32 18.84 32H31.16C31.3828 32 31.5964 31.9149 31.754 31.7634C31.9115 31.612 32 31.4065 32 31.1923C32 30.9781 31.9115 30.7727 31.754 30.6212C31.5964 30.4697 31.3828 30.3846 31.16 30.3846Z" fill="white" />
                        </g>
                        <defs>
                            <filter id="filter0_b_184_739" x="-24" y="-24" width="98" height="98" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="12" />
                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_184_739" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_184_739" result="shape" />
                            </filter>
                            <linearGradient id="paint0_linear_184_739" x1="33.9907" y1="-23.0556" x2="71.0516" y2="1.76567" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#00DED4" />
                                <stop offset="1" stop-color="#0292BF" />
                            </linearGradient>
                        </defs>
                    </svg>

                </IconButton>
                <IconButton onClick={() => prevStep()} className={`${styles.button} ${styles['button-download']}`}>
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_b_586_1694)">
                            <rect width="50" height="50" rx="25" fill="url(#paint0_linear_586_1694)" fillOpacity="0.4" />
                            <rect x="0.5" y="0.5" width="49" height="49" rx="24.5" stroke="white" />
                        </g>
                        <path d="M14.6087 29V21.7273H17.478C18.0272 21.7273 18.496 21.8255 18.8842 22.022C19.2749 22.2161 19.572 22.492 19.7756 22.8494C19.9815 23.2045 20.0845 23.6224 20.0845 24.103C20.0845 24.5859 19.9804 25.0014 19.772 25.3494C19.5637 25.6951 19.2618 25.9602 18.8665 26.1449C18.4735 26.3295 17.9976 26.4219 17.4389 26.4219H15.5178V25.1861H17.1903C17.4839 25.1861 17.7277 25.1458 17.9219 25.0653C18.116 24.9848 18.2604 24.8641 18.3551 24.7031C18.4522 24.5421 18.5007 24.3421 18.5007 24.103C18.5007 23.8615 18.4522 23.6579 18.3551 23.4922C18.2604 23.3265 18.1148 23.201 17.9183 23.1158C17.7242 23.0282 17.4792 22.9844 17.1832 22.9844H16.1463V29H14.6087ZM18.5362 25.6903L20.3438 29H18.6463L16.8778 25.6903H18.5362ZM21.1712 29V21.7273H26.0717V22.995H22.7088V24.728H25.8196V25.9957H22.7088V27.7322H26.0859V29H21.1712ZM28.9313 29L26.8503 21.7273H28.53L29.7338 26.7805H29.7942L31.1223 21.7273H32.5605L33.8851 26.7912H33.949L35.1529 21.7273H36.8326L34.7516 29H33.253L31.8681 24.245H31.8113L30.4299 29H28.9313Z" fill="#F1F1F1" />
                        <defs>
                            <filter id="filter0_b_586_1694" x="-24" y="-24" width="98" height="98" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="12" />
                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_586_1694" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_586_1694" result="shape" />
                            </filter>
                            <linearGradient id="paint0_linear_586_1694" x1="33.9907" y1="-23.0556" x2="71.0516" y2="1.76567" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00DED4" />
                                <stop offset="1" stopColor="#0292BF" />
                            </linearGradient>
                        </defs>
                    </svg>
                </IconButton>
            </Box>
        </Box>
    )
}

export default CheckVideo;