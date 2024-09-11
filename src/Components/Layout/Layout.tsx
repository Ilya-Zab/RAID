import React, { FC, ReactNode } from "react";
import Header from "../Layouts/Header/Header";
import { useMediaQuery } from "@mui/material";
import MobileHeader from "../Layouts/MobileHeader/MobileHeader";
import Footer from "../Layouts/Footer/Footer";
import SingleCreativePopup from "../Popups/SingleCreativePopup";
import GiftList from "@/Components/GiftList/GiftList";
import { useSelector } from "react-redux";
import ModalFindId from "@/Components/ModalFindId/ModalFindId";
import ParallaxEffect from "../ParallaxEffect";
import ModalAbout from "../ModalAbout/ModalAbout";
import { Analytics } from "@vercel/analytics/react";
interface LayoutProps
{
    children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) =>
{
    // @ts-ignore
    const { isOpenGifts, isOpenFindId, isModalUs } = useSelector((state) => state.modal);
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <>
            <ParallaxEffect />
            {!isMobile ? <Header /> : <MobileHeader />}
            <SingleCreativePopup />
            {children}
            <Analytics />
            <Footer />
            {isOpenGifts && <GiftList />}
            {isOpenFindId && <ModalFindId />}
            {isModalUs && <ModalAbout />}
        </>
    )
}

export default Layout;