import React, { FC, ReactNode } from "react";
import Header from "../Layouts/Header/Header";
import { useMediaQuery } from "@mui/material";
import MobileHeader from "../Layouts/MobileHeader/MobileHeader";
import Footer from "../Layouts/Footer/Footer";
import SingleCreativePopup from "../Popups/SingleCreativePopup";

interface LayoutProps {
    children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <>
            {!isMobile ? <Header /> : <MobileHeader />}
            <SingleCreativePopup />

            {children}
            {<Footer />}
        </>
    )
}

export default Layout;