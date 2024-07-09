import { Box, Button } from "@mui/material";
import styles from "./styles.module.scss";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';

const CustomSwiperNav = styled(Swiper)`
	.swiper-slide-thumb-active img {
		border: 2px solid #fff;
		border-radius: 2px;
	}
`;

const CreativeSwiper = ({ data, nextStep, getCurrentFrame }) =>
{
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (data && data.length > 0) {
            getCurrentFrame(data[activeIndex]);
        }
    }, [activeIndex]);

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    return (
        <Box className={styles.wrapper}>
            <Box className={styles.swiper_wrapper}>
                <Swiper
                    spaceBetween={0}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[FreeMode, Thumbs]}
                    className={`mySwiper2 ${styles.video_swiper__for}`}
                    onSlideChange={handleSlideChange}
                    onSwiper={(swiper) => setActiveIndex(swiper.activeIndex)}
                >
                    {data &&
                        data.map((frame, index) =>
                        {
                            return (
                                <SwiperSlide key={index} className={styles.video_swiper__item2}>
                                    <Image
                                        src={frame.frameUrl}
                                        alt={""}
                                        width={340}
                                        height={605}
                                    />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
                <CustomSwiperNav
                    onSwiper={setThumbsSwiper}
                    spaceBetween={0}
                    slidesPerView={data.length > 5 ? 5 : data.length}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Thumbs]}
                    className={`mySwiper1  ${styles.video_swiper}`}
                >
                    {data &&
                        data.map((frame, index) =>
                        {
                            return (
                                <SwiperSlide key={index} className={styles.video_swiper__item}>
                                    <Image
                                        src={frame.frameUrl}
                                        alt={""}
                                        width={60}
                                        height={60}
                                    />
                                </SwiperSlide>
                            )
                        })
                    }
                </CustomSwiperNav>
            </Box>
            <Button
                type="button"
                variant="contained"
                className={`btn-second btn-second-next`}
                onClick={nextStep}>
                Next
            </Button>
        </Box>
    )
}
export default CreativeSwiper;