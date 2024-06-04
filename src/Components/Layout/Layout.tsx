import React, { FC, ReactNode } from "react";
import Header from "../Layouts/Header/Header";
import { useMediaQuery } from "@mui/material";
import MobileHeader from "../Layouts/MobileHeader/MobileHeader";

interface LayoutProps {
    children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <>
            {/*{!isMobile ? <Header /> : <MobileHeader />}*/}
            {<MobileHeader />}
            { children }
        </>
    )
}

export default Layout;