import React, { FC, ReactNode } from "react";
import Header from "../Layouts/Header/Header";
import { useMediaQuery } from "@mui/material";
import MobileHeader from "../Layouts/MobileHeader/MobileHeader";
import Footer from "../Layouts/Footer/Footer";
import SingleCreativePopup from "../Popups/SingleCreativePopup";
import GiftList from "@/Components/GiftList/GiftList";
import { useSelector } from "react-redux";
import ModalFindId from "@/Components/ModalFindId/ModalFindId";
<<<<<<< HEAD
=======
import ModalPrivacyNotice from "@/Components/ModalPrivacyNotice/ModalPrivacyNotice";
import ModalRules from "@/Components/ModalRules/ModalRules";
import ModalAboutUs from "../ModalAboutUs/ModalAboutUs";
import ParallaxEffect from "../ParallaxEffect";
>>>>>>> 6b4f171686482b51c59f6f51054f9ef97035d35c

interface LayoutProps {
    children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    // @ts-ignore
    const { isOpenGifts, isOpenFindId, ModalAboutUs } = useSelector((state) => state.modal);
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <>
            <ParallaxEffect />
            {!isMobile ? <Header /> : <MobileHeader />}
            <SingleCreativePopup />
            {children}
            <Footer />
            {isOpenGifts && <GiftList />}
            {isOpenFindId && <ModalFindId />}
            {ModalAboutUs && <ModalAboutUs />}
        </>
    )
}

export default Layout;