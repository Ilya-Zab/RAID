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
                muted
                className={styles.video}
            >
                <source
                    src={videoUrl}
                    type="video/mp4"
                />
            </video>
            <Box className={styles.checkVideo__buttons}>
                <IconButton
                    className={`${styles.button} ${styles['button-download']}`}
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
                <IconButton onClick={() => prevStep()} className={`${styles.button} ${styles['button-rew']}`}>
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_b_586_1694)">
                            <rect width="50" height="50" rx="25" fill="url(#paint0_linear_586_1694)"
                                  fillOpacity="0.4"/>
                            <rect x="0.5" y="0.5" width="49" height="49" rx="24.5" stroke="white"/>
                        </g>
                        <path
                            d="M16.0296 29V21.7273H18.8989C19.4481 21.7273 19.9169 21.8255 20.3051 22.022C20.6958 22.2161 20.9929 22.492 21.1965 22.8494C21.4024 23.2045 21.5054 23.6224 21.5054 24.103C21.5054 24.5859 21.4012 25.0014 21.1929 25.3494C20.9846 25.6951 20.6827 25.9602 20.2874 26.1449C19.8944 26.3295 19.4185 26.4219 18.8598 26.4219H16.9387V25.1861H18.6112C18.9048 25.1861 19.1486 25.1458 19.3428 25.0653C19.5369 24.9848 19.6813 24.8641 19.776 24.7031C19.8731 24.5421 19.9216 24.3421 19.9216 24.103C19.9216 23.8615 19.8731 23.6579 19.776 23.4922C19.6813 23.3265 19.5357 23.201 19.3392 23.1158C19.1451 23.0282 18.9001 22.9844 18.6041 22.9844H17.5672V29H16.0296ZM19.9571 25.6903L21.7646 29H20.0672L18.2987 25.6903H19.9571ZM22.5921 29V21.7273H27.4926V22.995H24.1297V24.728H27.2405V25.9957H24.1297V27.7322H27.5068V29H22.5921ZM35.132 24.2734H33.5766C33.5482 24.0722 33.4902 23.8935 33.4026 23.7372C33.315 23.5786 33.2026 23.4437 33.0653 23.3324C32.9279 23.2211 32.7693 23.1359 32.5894 23.0767C32.4118 23.0175 32.2189 22.9879 32.0106 22.9879C31.6341 22.9879 31.3063 23.0814 31.0269 23.2685C30.7475 23.4531 30.5309 23.723 30.377 24.0781C30.2232 24.4309 30.1462 24.8594 30.1462 25.3636C30.1462 25.8821 30.2232 26.3177 30.377 26.6705C30.5333 27.0232 30.7511 27.2895 31.0305 27.4695C31.3098 27.6494 31.633 27.7393 31.9999 27.7393C32.2059 27.7393 32.3965 27.7121 32.5716 27.6577C32.7492 27.6032 32.9066 27.5239 33.0439 27.4197C33.1813 27.3132 33.2949 27.1842 33.3849 27.0327C33.4772 26.8812 33.5411 26.7083 33.5766 26.5142L35.132 26.5213C35.0918 26.8551 34.9912 27.1771 34.8302 27.4872C34.6715 27.795 34.4573 28.0708 34.1874 28.3146C33.9199 28.5561 33.6003 28.7479 33.2286 28.8899C32.8593 29.0296 32.4414 29.0994 31.9751 29.0994C31.3264 29.0994 30.7464 28.9527 30.235 28.6591C29.726 28.3655 29.3235 27.9406 29.0276 27.3842C28.734 26.8279 28.5873 26.1544 28.5873 25.3636C28.5873 24.5705 28.7364 23.8958 29.0347 23.3395C29.333 22.7831 29.7378 22.3594 30.2492 22.0682C30.7606 21.7746 31.3358 21.6278 31.9751 21.6278C32.3965 21.6278 32.7871 21.687 33.1469 21.8054C33.5091 21.9238 33.8299 22.0966 34.1093 22.3239C34.3886 22.5488 34.6159 22.8246 34.7911 23.1513C34.9687 23.478 35.0823 23.852 35.132 24.2734Z"
                            fill="#F1F1F1"/>
                        <defs>
                            <filter id="filter0_b_586_1694" x="-24" y="-24" width="98" height="98"
                                    filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="12"/>
                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_586_1694"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_586_1694"
                                         result="shape"/>
                            </filter>
                            <linearGradient id="paint0_linear_586_1694" x1="33.9907" y1="-23.0556" x2="71.0516"
                                            y2="1.76567" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00DED4"/>
                                <stop offset="1" stopColor="#0292BF"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </IconButton>
            </Box>
        </Box>
    )
}

export default CheckVideo;