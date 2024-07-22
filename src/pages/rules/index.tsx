import React from "react";
import styles from "./styles.module.scss";
import { Box, Typography } from "@mui/material";
import Head from "next/head";

const Rules = () =>
{
    const pageTitle = 'Privacy notice';
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={`This is ${pageTitle}`} />
            </Head>
            <Box className={`${styles["rules-page"]} bg-gallery`}>
                <Box className={styles.container}>
                    <Typography variant="h2" className={styles.h2}>
                        Raid: Shadow Legends “I Finally Played It Promotion”
                    </Typography>
                    <Typography variant="h2" className={styles.h2}>
                        Promotion Official Rules
                    </Typography>
                    <Typography variant="h2" className={styles.h2}>
                        NO PURCHASE NECESSARY TO ENTER OR TO WIN A PRIZE. A PURCHASE DOES NOT IMPROVE YOUR CHANCES OF
                        WINNING.
                    </Typography>
                    <Typography variant="h2" className={styles.h2}>
                        OPEN ONLY TO LEGAL RESIDENTS OF THE UNITED STATES AND THE DISTRICT OF COLUMBIA (EXCLUDING NEW
                        YORK AND FLORIDA) AND THE UNITED KINGDOM, WHO ARE AT LEAST 18 YEARS OF AGE AT ENTRY.
                    </Typography>
                    <Typography variant="h2" className={styles.h2}>
                        OPEN ONLY TO NEW USERS (WHO DOWNLOADED RAID: SHADOW LEGENDS AFTER July 1st, 2024 at 12:00 AM
                        Eastern Time)
                    </Typography>
                    <Typography variant="h2" className={styles.h2}>
                        VOID WHERE PROHIBITED BY LAW
                    </Typography>
                    <ul className={styles.ul}>
                        <li className={styles.li}>
                            <Typography variant={'body2'} className={styles.text}>
                                1. <u>Promotion Description</u>. The following Prize Promotion Official Rules (“<strong>Official
                                    Rules</strong>”)
                                apply to the”<strong>Raid: Shadow Legend I Finally Played It</strong>”
                                (&ldquo;<strong>Promotion</strong>&ldquo;). By participating in
                                the Promotion, each entrant unconditionally accepts and agrees to comply with and abide
                                by these Official Rules and the decisions of the Promotion sponsor, Plarium Global Ltd.,
                                located at 2 Abba Eban Blvd., 4672520, Herzliya Pituach and its affiliates
                                (collectively, “<strong>Plarium</strong>”), which shall be final and binding in all
                                respects (without
                                prejudice to the Entrant’s legal rights and remedies available to them under applicable
                                law).
                            </Typography>
                        </li>
                        <li className={styles.li}>
                            <Typography variant={'body2'} className={styles.text}>
                                2. <u>Promotion Period</u>. The Promotion begins on July 17th 2024 at 12:01 a.m. Eastern
                                Time
                                (“Start Date”) and ends on September 30th, 2024 at 11:59 p.m. (“End Date”) (from Start
                                Date to End Date referred to as, the &ldquo;Promotion Period&ldquo;).
                            </Typography>
                            <Typography variant={'body2'} className={styles.text}>
                                Promotion period includes the following stages:
                            </Typography>
                            <Typography variant={'body2'} className={styles.text}>
                                -From July 17, 2024 till August 17, 2024 - Active part of the Promotion, when Entrants
                                of the Promotion perform the Actions necessary to participate in the Promotion in
                                accordance with clause 6 of these Rules,
                            </Typography>
                            <Typography variant={'body2'} className={styles.text}>
                                -From August 18, 2024 till August 31, 2024 - Moderation period and Winner selection
                                period, when Administrator of the Promotion selects Winners,
                            </Typography>
                            <Typography variant={'body2'} className={styles.text}>
                                -From September 1, 2024 till September 30, 2024 - Administrator and Real Prize
                                Fulfillment Service Provider notify Winners about the prize won and send/deliver the
                                Prizes to the Winners of the Promotion.
                            </Typography>
                        </li>
                        <li className={styles.li}>
                            <Typography variant={'body2'} className={styles.text}>
                                3. <u>Promotion Type</u>: Draw among Entrants that download or log in to the game “Raid:
                                Shadow
                                Legends” (the “<strong>Game</strong>” or “<strong>RAID</strong>”) during the Promotion
                                Period in the form as described in
                                section 6.3 below and subject to the terms set forth in these Official Rules herein. The
                                Promotion will be available for participation in the following Landing Page
                                wefinallyplayedit.plarium.com (“<strong>Landing Page</strong>”).
                            </Typography>
                        </li>
                        <li className={styles.li}>
                            <Typography variant={'body2'} className={styles.text}>
                                4. <u>Entrant Eligibility</u>. The Promotion is open only to legal residents of (1) the
                                United
                                States and the District of Columbia, <strong><u>EXCLUDING NEW YORK AND
                                    FLORIDA</u></strong>, and (2) the United
                                Kingdom of Great Britain and Northern Ireland, who are <strong><u>at least eighteen (18)
                                    years old</u></strong>
                                at the time of entry (“<strong>Entrant</strong>”) who meet the Entry Requirements
                                specified in these
                                Official Rules and section 6 below (“<strong>Eligible Entrant</strong>”). The Promotion
                                is open only to
                                New Users (as defined in section 7 below) with an active Raid: Shadow Legends game
                                account (“<strong>Game Account</strong>”) and an active Raid player Id (“<strong>Raid
                                    Player Id</strong>”). The Promotion
                                and the Game/s are subject to all applicable national, federal, state, and local laws
                                and regulations and is void where prohibited. Participation constitutes entrant’s full
                                and unconditional agreement to these Official Rules and Sponsor’s and Administrator’s
                                decisions, which are final and binding in all matters related to the Game. Winning a
                                Prize is contingent upon fulfilling all requirements set forth herein.
                            </Typography>
                        </li>
                        <li className={styles.li}>
                            <Typography variant={'body2'} className={styles.text}>
                                5. <u>Sponsor and Administrator</u>: The Promotion is sponsored by Plarium Global Ltd.,
                                2
                                Abba
                                Eban Blvd, 4672520 Herzliya Pituach, Israel
                                (“<strong>Plarium</strong>”). <strong>Administrator</strong>: Derfit
                                Enterprises Limited (Reg.num.: HE352715 VAT number: CY10352715D Address: Pavlou
                                Valdesaridi, 2A, 1st Floor, 6018, Larnaca, Cyprus). <strong>Real Prize Fulfillment
                                    Service
                                    Provider</strong>: PRIZE PROFESSIONALS LTD. (Company number 14481077 Address: Hereworx
                                House, 119
                                Winter Road, Southsea, United Kingdom, PO4 8DS).
                            </Typography>
                        </li>
                        <li className={styles.li}>
                            <Typography variant={'body2'} className={styles.text}>
                                6. <u>How to Enter (“ <strong>Eligibility Requirements</strong>”)</u>: To participate in
                                the
                                Promotion and be an Eligible Entrant, an Entrant should:
                            </Typography>
                            <ul className={styles.ul}>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        6.1. Have an active Raid Player Id and an active Game
                                        Account <strong>OR</strong> download the Game to
                                        mobile device and/or to PC device (where applicable) (the
                                        “<strong>Device</strong>”) and open an
                                        active Raid Player Id and an active Game Account (“<strong>Game Account</strong>”
                                        and “ <strong>Raid
                                            Player Id</strong>”). Entry is open also to <u>New Users</u> that downloaded the
                                        Game after July
                                        1st, 2024 at 12:01 a.m Eastern Time. Downloading the Game is subject to the
                                        terms and limitations specified in section 7 below (“<strong>New User</strong>”);
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        6.2. Users will click on the influencer link provided on a PC or Mobile Device.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        6.3. Enter the Landing Page and register for the Promotion with a valid Raid
                                        Player
                                        ID. Information on how to find your Raid Player ID can be found on the support
                                        page for the game available here:
                                        <a href="https://raid-support.plarium.com/hc/en-us/articles/360014057059-How-do-I-find-my-game-ID"
                                            className={styles.a}>
                                            https://raid-support.plarium.com/hc/en-us/articles/360014057059-How-do-I-find-my-game-ID
                                        </a>-.
                                        By entering the Promotion with a Player Id in accordance with this section, the
                                        Entrant will be required to confirm that they have read and accepted these
                                        Official Rules and that they meet the Eligibility requirements as set out in
                                        section 4 above.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        6.4. During the Promotion Period and until the End Date, every Entrant that
                                        registered on the Landing Page (following section 6.1 - 6.3 above).
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        6.5. The users also need to create a video with Plarium filters and hashtag or
                                        upload
                                        the already made content to the landing page. By submitting the content Entrant
                                        will be entered into the draw.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        6.6. The content can be submitted within the Active part of the Promotion from
                                        July
                                        17, 2024 till August 17, 2024.
                                    </Typography>
                                </li>
                            </ul>
                            <Typography variant={'body2'} className={styles.text}>
                                Top 12 videos that have the most likes will win one of the Real Prizes listed in section
                                9. Other eligible users will be entered into the draw.
                            </Typography>
                            <ul className={styles.ul}>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        6.7. Amazon gift cards and in-game items listed in section 9 are allocated
                                        randomly.
                                        No skill is required, and no skill will impact the Eligible Entrants’ chances of
                                        being a Potential Winner rewarded with a Prize. Chances are only impacted by the
                                        number of Eligible Entrants and the number of available Prizes remaining for the
                                        Promotion Period and as described in section 9 below.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        6.8. Only new users can win prizes but existing users can still participate.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        <strong>
                                            6.9. Only <u>ONE entry</u> is available for every Eligible Entrant.
                                        </strong>
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        6.10. Potential Winner of the Game will be provided with specific directions for
                                        validation and redemption of a Prize rewarded (provided he has won), as set
                                        forth in clause 10 below. All potential winners are subject to verification
                                        before any prize will be awarded.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        6.11. Administrator is responsible for the functionality of the Game/s and the
                                        Landing
                                        Page.
                                    </Typography>
                                </li>
                            </ul>
                        </li>
                        <li className={styles.li}>
                            <Typography variant={'body2'} className={styles.text}>
                                <u>
                                    7. Limitations and Restrictions of Participation
                                </u>:
                            </Typography>
                            <ul className={styles.ul}>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        <strong>
                                            7.1. Participation is OPEN TO <u>NEW USERS. A “New User” is defined as
                                                a</u> user
                                            that<br /><br />
                                            (a) downloaded the Game for the first time <u>after July 1</u> , 2024 at
                                            12.00 am
                                            Eastern Time (US); and<br /><br />
                                            (b) enter through influencer links<br /><br />
                                            (c) opened a Game Account within the Promotion Period; and<br /><br />
                                            (d) has a valid Player Id at the time of Entry; and<br /><br />
                                            (e) did not have an active Game Account or a Player Id before July 1t,
                                            2024.<br /><br />
                                            FOR THE AVOIDANCE OF DOUBT, AN EXISTING USER WHO RE-INSTALLS THE GAME AFTER
                                            July
                                            1st , 2024 WILL NOT BE COUNTED AS A “NEW USER” FOR THE PURPOSE OF THE
                                            PROMOTION
                                            AND SUCH USERS SHALL NOT BE ELIGIBLE FOR ANY PRIZE(S). Only New Users that
                                            installed the Game for the first time on their Device and opened a Game
                                            Account
                                            in accordance with section 6 above can enter the Promotion. Neither Plarium
                                            nor
                                            Administrator shall be held responsible or liable if the Game was previously
                                            installed on a Device prior to July 1st , 2024 or re-installed on a Device.
                                            In
                                            this case, an Entrant shall not be considered an Eligible Entrant and may be
                                            disqualified subject to clause 10 below.
                                        </strong>
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        7.2. Downloading the Game and Game Accounts are free, but subject to the <a
                                            href="https://company.plarium.com/en/terms/terms-of-use/" className={styles.a}>
                                            Terms of Use
                                        </a>&nbsp;
                                        of Plarium. Entrants can download the Game with a direct link to from the
                                        relevant app store by clicking the banner located on the Promotion Landing Page
                                        or from the direct link under each influencer video or alternatively download
                                        the Game directly from the designated app store (on Google Play™ for Android, on
                                        App Store® for iOS), or with PlariumPlay <a
                                            href="https://plarium.com/en/plarium-play/" className={styles.a}>
                                            https://plarium.com/en/plarium-play/</a> (all
                                        together will be referred hereunder as “<strong>Store</strong>”). <strong>By
                                            downloading the Game to a
                                            Device from a Store, the Entrant will be subject and may be required to accept
                                            the Store’s Terms and Conditions/Terms of Use or any applicable Store’s Privacy
                                            Policy.</strong> Visit <a
                                                href="https://plarium.com/" className={styles.a}>https://plarium.com/</a> to
                                        follow the links and
                                        instructions to download the
                                        Game and create a Game Account or Plarium Id.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        7.3. <strong>ONLY ONE ENTRY IS PERMITTED PER PERSON</strong>. Entry must be made
                                        by
                                        the Entrant, only
                                        in the manner described in this Official Rules and subject to the Eligibility
                                        Requirements. Any attempt by an Entrant to obtain more than one entry by using
                                        multiple/different email addresses, identities, registrations, logins or any
                                        other methods, or by tampering with the entry process or the operation of the
                                        Promotion, including but not limited to the use of any Device to automate the
                                        entry process, is prohibited and any entries that have been submitted in this
                                        manner will be void. In the event a dispute regarding the identity of the
                                        individual who actually submitted an entry cannot be resolved, the affected
                                        entry(ies) will be deemed ineligible.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        7.4. Plarium or the Administrator reserves the right to disqualify or prohibit
                                        an
                                        Entrant from participating in the Promotion, in the event an Entrant is found to
                                        be tampering with the entry process or the operation of the Promotion, to be
                                        acting in violation of these Promotion Rules, or to be acting in an
                                        unsportsmanlike or disruptive manner, or with the intent to disrupt or undermine
                                        the legitimate operation of the Promotion, or to annoy, abuse, threaten or
                                        harass any other person. Plarium reserves the right to seek damages and other
                                        remedies from any such Entrant to the fullest extent permitted by law.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        7.5. Plarium or the Administrator reserves the right to disqualify any Entrant
                                        or
                                        prohibit an Entrant from winning a Prize or disqualify a Potential Winner, if:
                                        (i) an Entrant or Potential Winner is found to be ineligible to participate in
                                        the Promotion subject to section 4 and/or 6 to these Official Rules; (ii) it
                                        determines that an Entrant is attempting to undermine the legitimate operation
                                        of the Promotion by cheating, hacking, deception, or other unfair playing
                                        practices (including the use of automated quick entry programs) or intending to
                                        annoy, abuse, threaten or harass any other Entrants or Plarium’s or
                                        Administrator’s representatives. No mechanically reproduced, illegible,
                                        incomplete, forged, software-generated or other automated multiple entries will
                                        be accepted. If a dispute as to the identity of the individual who actually
                                        submitted an entry cannot be resolved, the affected entry will be deemed
                                        ineligible.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        7.6. Employees, officers, directors, representatives, and agents of Plarium, the
                                        Administrator, Real Prize Fulfillment Service Provider and their affiliated
                                        companies, subsidiaries, and the advertising and promotion agencies which
                                        conduct this Promotion (collectively, “<strong>Promotion Entities</strong>”) and
                                        each of their
                                        immediate family members (i.e. spouse, parent, child, sibling, and their
                                        respective spouses and the “steps” of each, regardless of where they reside) and
                                        persons living in the same household of each, whether or not related, are not
                                        eligible to enter the Promotion.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        7.7. Moderation: The Administrator moderates videos uploaded by users during the
                                        moderation period specified in clause 2. If the Administrator believes that the
                                        video does not comply with the Official Rules and/or the current legislation,
                                        the video is removed by the Moderator from the site.
                                    </Typography>
                                    <ul className={styles.ul}>
                                        <li className={styles.li}>
                                            <Typography variant={'body2'} className={styles.text}>
                                                7.7.1. Criteria by which the Administrator has the right to reject the
                                                video:
                                            </Typography>
                                            <Typography variant={'body2'} className={styles.text}>
                                                -Any sensitive content which may cause offense to a viewer, particularly
                                                in relation to
                                                religion, race, gender, politics, sexuality, disability, or with regard
                                                to language that
                                                is considered obscene, vulgar, or taboo,
                                            </Typography>
                                            <Typography variant={'body2'} className={styles.text}>
                                                -Any content which may cause direct or indirect risks for the brand
                                                reputation,
                                                including naming certain brands of competitors, comparing with
                                                competitors in a negative
                                                way, any items of competitors in the photo, putting the brand in a
                                                negative context,
                                            </Typography>
                                            <Typography variant={'body2'} className={styles.text}>
                                                -Any form nudity and violence, sadistic remarks towards imagery
                                                depicting the suffering
                                                of humans and animals,
                                            </Typography>
                                            <Typography variant={'body2'} className={styles.text}>
                                                -Any pieces of content that breach the current legislation.
                                            </Typography>
                                            <Typography variant={'body2'} className={styles.text}>
                                                -Any content which is not relevant to the topic of the current event.
                                            </Typography>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className={styles.li}>
                            <Typography variant={'body2'} className={styles.text}>
                                8. <u>Prizes:</u>
                            </Typography>
                            <ul className={styles.ul}>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        8.1. Available Prizes for Potential Winners are: (1) Rare, Epic & Legendary
                                        Champions, Packages (“<strong>In-Game Items</strong>”); (2) Amazon.com Gift
                                        Cards and (3) Real
                                        Prizes, in the value and number as described in the table below.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        8.2. Top 12 videos submitted by Entrants in accordance to clause 6.5 that have
                                        the
                                        most likes will win one of the real prizes listed in section 9. All other prizes
                                        including Amazon gift cards and in-game items listed in section 9 will be
                                        allocated randomly. All Participants have an equal chance of winning any type of
                                        Prize.
                                    </Typography>
                                </li>
                            </ul>
                        </li>
                        <li className={styles.li}>
                            <Typography variant={'body2'} className={styles.text}>
                                9. <u>Number of Prizes, Value and Approximate Odds</u>
                            </Typography>
                            <ul className={styles.ul}>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        9.1. The total number and type of the Prizes available during the Promotion
                                        Period
                                        are as follows:
                                    </Typography>

                                </li>
                            </ul>
                        </li>
                    </ul>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tr}>
                                <th className={styles.th}>Type of Item</th>
                                <th className={styles.th}>Nr.</th>
                                <th className={styles.th}>Item</th>
                                <th className={styles.th}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={styles.tr}>
                                <td rowSpan={4} className={styles.td}>Real Prizes</td>
                                <td className={styles.td}></td>
                                <td className={styles.td}>Gaming console</td>
                                <td className={styles.td}>5</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>Drone</td>
                                <td className={styles.td}>4</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>Projector</td>
                                <td className={styles.td}>2</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>Immersive headset</td>
                                <td className={styles.td}>1</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}>Amazon.com Gift Cards</td>
                                <td className={styles.td}></td>
                                <td className={styles.td}>Amazon gift card $200</td>
                                <td className={styles.td}>10</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td rowSpan={12} className={styles.td}>Rare, Epic & Legendary Champions</td>
                                <td className={styles.td}></td>
                                <td className={styles.td}>Minaya</td>
                                <td className={styles.td}>5</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>Astralon</td>
                                <td className={styles.td}>5</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>Nethril</td>
                                <td className={styles.td}>5</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>Vogoth</td>
                                <td className={styles.td}>15</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>Warden</td>
                                <td className={styles.td}>15</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>WuJi</td>
                                <td className={styles.td}>15</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>Colwyn</td>
                                <td className={styles.td}>20</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>Huntress</td>
                                <td className={styles.td}>20</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>Candleguard</td>
                                <td className={styles.td}>20</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>AutoBattleTickets x50 1 Energy Refill</td>
                                <td className={styles.td}>500</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td rowSpan={13} className={styles.td}>Packages</td>
                                <td className={styles.td}></td>
                                <td className={styles.td}>Energy Refill</td>
                                <td className={styles.td}>500</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>XP +100% 1 day</td>
                                <td className={styles.td}>250</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>XP+100% 3 days</td>
                                <td className={styles.td}>250</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>XP brew Random*25</td>
                                <td className={styles.td}>250</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>XP brew Magic*20</td>
                                <td className={styles.td}>250</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>XP Brew Force*20</td>
                                <td className={styles.td}>250</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>XP Brew Spirit*20</td>
                                <td className={styles.td}>250</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>XP Brew Void*15</td>
                                <td className={styles.td}>250</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>Rank up chicken 2*6</td>
                                <td className={styles.td}>250</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>Rank up chicken 3*3</td>
                                <td className={styles.td}>250</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>Skill Tome Rare*2</td>
                                <td className={styles.td}>400</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>Skill Tome Epic 1</td>
                                <td className={styles.td}>250</td>
                            </tr>
                            <tr className={styles.tr}>
                                <td className={styles.td}></td>
                                <td className={styles.td}>Skill Tome Legendary</td>
                                <td className={styles.td}>50</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className={styles.tr}>
                                <td colSpan={2} className={styles.td}>Total</td>
                                <td className={styles.td}></td>
                                <td className={styles.td}>3842</td>
                            </tr>
                        </tfoot>
                    </table>
                    <ul>
                        <li className={styles.li}>
                            <ul>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        9.2. Total ARV (Approximate Retail Value) of Gift Cards and Real Prizes: USD
                                        ($20,000) worth Real Prizes and Amazon.com Gift Cards.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        9.3. Prizes that will remain by the End of the Promotion due to failure to
                                        validate
                                        Potential Winners or disqualification of Potential Winners (in accordance with
                                        section 10 below, or as otherwise detailed in these Official Rules), will not be
                                        further awarded.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        9.4. For every Entrant, the odds of winning an Amazon Card or an In-game item is
                                        dependent on and impacted by the number of Eligible Entrants each Activity days
                                        and the remaining Prizes to be allocated until the End Date of the Promotion.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        9.5. Prizes:
                                    </Typography>
                                    <ul className={styles.ul}>
                                        <li className={styles.li}>
                                            <Typography variant={'body2'} className={styles.text}>
                                                9.5.1. Real prizes are awarded to the Winners on condition of the
                                                provision of
                                                all reliable data and documents listed in section 10 necessary for the
                                                Administrator and Real Prize Fulfillment Service Provider to fulfill
                                                their
                                                obligations.
                                            </Typography>
                                        </li>
                                        <li className={styles.li}>
                                            <Typography variant={'body2'} className={styles.text}>
                                                9.5.2. In-Game Items and Amazon.com Gift Cards will be provided in a
                                                digital
                                                form, such as a digital code (“Digital Code”) that will be required to
                                                be
                                                inserted in the relevant account to redeem the Prize (In-Game Items or
                                                Amazon.com Gift Cards) (a Digital Code for Game Accounts for In-Game
                                                Items and a
                                                Digital Code for Amazon Accounts for Amazon.com Gift Cards).
                                            </Typography>
                                        </li>
                                        <li className={styles.li}>
                                            <Typography variant={'body2'} className={styles.text}>
                                                9.5.3 Winners of Real Prizes will be contacted by email
                                                notification. <br /><br />
                                                Only the type and quantity of Prizes described in these Official Rules
                                                will be
                                                awarded. No cash or other substitution, assignment or transfer of any
                                                prizes
                                                permitted, except Plarium reserves the right to substitute comparable
                                                prize(s)
                                                of equal or higher value if any Prize listed is unavailable, in whole or
                                                in
                                                part, for any reason. Prizes will be awarded only if a Potential Winner
                                                fully
                                                complies with these Official Rules and Eligibility Requirements. Winners
                                                are
                                                responsible for all federal, state, and local taxes and fees associated
                                                with
                                                prize receipt and/or use.
                                            </Typography>
                                        </li>
                                    </ul>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        9.6. Plarium makes no warranties, and hereby disclaims any and all warranties,
                                        express or implied, concerning any prize furnished in connection with the
                                        Promotion. WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, SUCH PRIZES ARE
                                        PROVIDED “AS IS” WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, AND
                                        PLARIUM HEREBY DISCLAIMS ALL SUCH WARRANTIES, INCLUDING BUT NOT LIMITED TO, THE
                                        IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND/OR
                                        NON-INFRINGEMENT
                                    </Typography>
                                </li>
                            </ul>
                        </li>
                        <li className={styles.li}>
                            <Typography variant={'body2'} className={styles.text}>
                                10. <u>Prize Redemption and Verification of Potential Winners</u>:
                            </Typography>
                            <ul className={styles.ul}>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        10.1. Potential Winners will receive an email notification in case of winning a
                                        prize
                                        (“Winner Notification”). Potential Winners should follow the directions to
                                        redeem the Prize as provided in the Winner Notification. Potential Winners will
                                        be required execute an Affidavit of Eligibility, a Liability Release, and (where
                                        imposing such condition is legal) a Publicity Release and any other applicable
                                        forms required by tax authorities and/or Sponsor, Administrator and/or Real
                                        Prize Fulfillment Service Provider (collectively, “Prize Claim Documents”) as a
                                        condition of being awarded with a Real Prize. The Potential Winners will be
                                        required to sign and return to Administrator and/or Real Prize Fulfillment
                                        Service Provider, within seven (7) days of the date notice or attempted notice
                                        is sent, Prize Claim Documents in order to claim his/her prize and fulfill any
                                        such other requirements as determined by Administrator and/or Real Prize
                                        Fulfillment Service Provider . If any Potential Winner cannot be contacted or
                                        fails to sign and return Prize Claim Documents within the required time period,
                                        a Potential Winner forfeits Real Prize.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        10.2. The Sponsor or Administrator will validate the Potential Winner within
                                        approximately ten (10) days following the Winner Notification. A Potential
                                        Winner who satisfies all the of the necessary requirements in these Official
                                        Rules (i.e., valid Player Id, Eligibility Requirements, Prize Claim Documents
                                        Requirements and alike) and receives a notice from the Administrator upon the
                                        successful verification/validation will be considered a “<strong>Verified
                                            Winner</strong>”.
                                        Verified Winners will be provided with a confirmation by e-mail and 1) the
                                        Digital Code or 2) Prize Claim Documents that will be sent directly to the
                                        verified and valid e-mail as provided by the Potential Winner in accordance with
                                        clause 10.1 above. All Digital Code Prizes will be awarded digitally and only
                                        after a Potential Winner is confirmed and validated by the Sponsor or
                                        Administrator. All Real Prizes will be delivered by Real Prize Fulfillment
                                        Service Provider until September 30.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        10.3. <strong>
                                            ALL POTENTIAL WINNERS ARE SUBJECT TO VERIFICATION BY SPONSOR OR
                                            ADMINISTRATOR,
                                            WHOSE DECISIONS ARE FINAL AND BINDING. <u>
                                                AN ENTRANT IS NOT A WINNER OF ANY PRIZE,
                                                EVEN IF THE GAME SHOULD SO INDICATE, UNLESS AND UNTIL ENTRANT’S ELIGIBILITY
                                                AND
                                                THE POTENTIAL WIN HAVE BEEN VERIFIED OR VALIDATED IN ACCODANCE WITH THESE
                                                OFFICIAL RULES, AND THE ENTRANT HAS BEEN NOTIFIED THAT
                                                VERIFICATION/VALIDATION
                                                PROCESS IS COMPLETED IN A RETURN E-MAIL FROM ADMINISTRATOR.
                                            </u> SPONSOR OR THE
                                            ADMINISTRATOR WILL NOT ACCEPT SCREEN SHOTS OR OTHER EVIDENCE OF A WIN IN
                                            LIEU OF
                                            ITS VALIDATION PROCESS.
                                        </strong>
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        10.4. Any acceptance and redemption of an <u>Amazon.com Gift Card Prize</u> by a
                                        Verified
                                        Winner and the use of the Amazon.com Gift Card and Account is subject to
                                        Amazon.com Terms and Conditions. By accepting and redeeming the Amazon.com Gift
                                        Card Prize, the Verified Winner acknowledges, agrees and accepts to be bound by
                                        Amazon.com Gift Card <a
                                            href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GNG9PXYZUMQT72QK"
                                            className={styles.a}>Terms
                                            and Conditions</a>.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        10.5. Verified Winners may be required also to execute Prize Claim Documents by
                                        the
                                        Sponsor or Administrator as a condition to be rewarded with a Prize. In the
                                        event that:
                                    </Typography>
                                    <ul className={styles.ul}>
                                        <li className={styles.li}>
                                            <Typography variant={'body2'} className={styles.text}>
                                                (I) a Verified Winner is required to provide a signed Prize Claim
                                                Document
                                                and
                                                refuses to sign and return all Prize Claim Documents within an
                                                appropriate
                                                period specified in the Prize Notification (7 days from Prize
                                                Notification)
                                                or fails to reply to the Prize Notification with the required
                                                information
                                                and/or the Prize Claim Documents within the specified period within the
                                                Prize Notification; or
                                            </Typography>
                                        </li>
                                        <li className={styles.li}>
                                            <Typography variant={'body2'} className={styles.text}>
                                                (II) the Potential Winner provided an invalid e-mail for Prize
                                                Notification;
                                                or
                                            </Typography>
                                        </li>
                                        <li className={styles.li}>
                                            <Typography variant={'body2'} className={styles.text}>
                                                (III) the Potential Winner is found to be ineligible in accordance with
                                                these
                                                Official Rules and the Eligibility Requirements set herein; the
                                                Potential/Verified Winner may be disqualified, and the Sponsor may find
                                                another Potential Winner in his place.
                                            </Typography>
                                        </li>
                                    </ul>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        10.6. Plarium shall have no liability if the email with the Prize is lost,
                                        intercepted, or not received by a Verified Winner for any reason outside the
                                        control and responsibility of Sponsor and/or the Administrator, including if a
                                        wrong email address is provided by the Verified Winner/Entrant at the time of
                                        registration to the Game. If any Potential Winner is found to be ineligible, or
                                        if he or she has not fully complied with these Official Rules or declines the
                                        Prize for any reason prior to award, such Potential Winner will be disqualified.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        10.7. Receiving a prize is contingent upon compliance with these Official Rules.
                                        Administrator is an independent judging organization whose decisions as to the
                                        administration and operation of theGame and the selection of Potential Winners
                                        are final and binding in all matters related to the Game.
                                    </Typography>
                                </li>
                            </ul>
                        </li>
                        <li className={styles.li}>
                            <Typography variant={'body2'} className={styles.text}>
                                11. <u>General Conditions</u>:
                            </Typography>
                            <ul className={styles.ul}>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        11.1. <u>Intellectual Property</u>. By participating the Promotion, every
                                        Entrant
                                        hereby
                                        agrees to Plarium’s general terms regarding intellectual property as specified
                                        in the <a href="https://company.plarium.com/en/terms/terms-of-use/"
                                            className={styles.a}>Terms of
                                            Use</a>,
                                        including and without derogating, Plarium’s intellectual
                                        property rights in the Services, underlying technology, designs, marks,
                                        trademarks, logos, and service marks displayed and/or all information and
                                        content available on or through the Service and in the course of this Promotion,
                                        including any Intellectual Property rights incorporated in the Prize and the
                                        designs thereto (“<strong>Marks</strong>”). You are not permitted to use these
                                        Marks without our
                                        prior written consent or the consent of such third parties which may own the
                                        Marks. All Intellectual Property included in the Prize and the Promotion
                                        (including printed characters, graphics, storylines) are owned by Plarium. You
                                        further acknowledge and agree that you shall have no ownership or other property
                                        interest and that all rights in the Services and any derivatives are owned by
                                        Plarium. You may not otherwise use, copy, print, display, perform, reproduce,
                                        publish, license, post, transmit, modify, create derivative works of, reverse
                                        engineer, disassemble, decompile, adapt, distribute, transfer, sell, buy, or
                                        exploit our Intellectual Property or any of its features in whole or in part
                                        without our prior written authorization.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        11.2. Plarium reserves the right to suspend, or terminate the Promotion if it
                                        determines, in its sole discretion, that the Promotion is technically impaired
                                        or corrupted or that fraud or technical problems, failures or malfunctions or
                                        other causes beyond Plarium’s control have destroyed or severely undermined or
                                        to any degree impaired the integrity, administration, security, proper play
                                        and/or feasibility of the Promotion as contemplated herein.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        11.3. <u>Publicity</u>: Except where prohibited, participation in the Promotion
                                        and
                                        the Game constitutes Entrant’s consent to Sponsor&lsquo;s use of Verified
                                        Winner’s
                                        name, likeness, photograph, voice, opinions, biographical information, hometown,
                                        and state for reporting purposes and promotional purposes related to Plarium’s
                                        games or similar promotions in any media without further payment or
                                        consideration for a period of 5 years.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        11.4. In the event Plarium is prevented from awarding prizes or continuing with
                                        the
                                        Promotion as contemplated herein by any event beyond its control, including but
                                        not limited to fire, flood, natural or man-made epidemic of health of other
                                        means, earthquake, explosion, labor dispute or strike, act of God or public
                                        enemy, satellite or equipment failure, riot or civil disturbance, terrorist
                                        threat or activity, war (declared or undeclared) or any federal state or local
                                        government law, order, or regulation, public health crisis, order of any court
                                        or jurisdiction, or other cause not reasonably within Plarium’s control (each a
                                        “Force Majeure” event or occurrence), then Plarium shall have the right to
                                        suspend, or terminate the Promotion. Only the type and quantity of prizes
                                        described in these Official Rules will be awarded.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        11.5. As permitted by applicable laws. The invalidity or unenforceability of any
                                        provision of these rules shall not affect the validity or enforceability of any
                                        other provision. In the event that any provision is determined to be invalid or
                                        otherwise unenforceable or illegal, these rules shall otherwise remain in effect
                                        and shall be construed in accordance with their terms as if the invalid or
                                        illegal provision were not contained herein.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        11.6. Data rates may apply if an Entrant download and play Raid on his mobile
                                        device.
                                        not all mobile telephone/wireless providers carry the service necessary to
                                        participate in this promotion. Entrants should consult their wireless
                                        provider&lsquo;s
                                        pricing plans. mobile entry is not required to enter or win a prize in this
                                        Promotion.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        11.7. <u>Promotion Conditions</u>. The Promotion is subject to all applicable
                                        federal,
                                        state
                                        and local laws. By participating, Entrants agree to be fully and unconditionally
                                        bound by these Official Rules and the decisions of Plarium, and waive any right
                                        to claim ambiguity in any Promotion or these Official Rules.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        11.8. <u>Limitation of Liability</u>. By entering the Promotion winners and
                                        Entrants
                                        agree to
                                        release and hold harmless Plarium and its subsidiaries, affiliates, advertising
                                        and promotion agencies, partners, representatives, agents, successors, assigns,
                                        employees, officers and directors from any liability, illness, injury, death,
                                        loss, litigation, claim or damage that may occur, directly or indirectly,
                                        whether caused by negligence or not, from (i) such Entrant&lsquo;s participation
                                        in
                                        the Promotion and/or his/her acceptance, possession, use, or misuse of any prize
                                        or any portion thereof, (ii) technical failures of any kind, including but not
                                        limited to the malfunctioning of any computer, cable, network, hardware or
                                        software; (iii) the unavailability or inaccessibility of any transmissions or
                                        telephone or Internet service; (iv) unauthorized human intervention in any part
                                        of the entry process or the Promotion; (v) electronic or human error which may
                                        occur in the administration of the Promotion or the processing of entries; (vi)
                                        failure to supply the prize or any part thereof, by reason of any by reason of
                                        any act of God, fire, natural disaster accident, or act of government, or any
                                        other cause beyond Plarium&lsquo;s sole control (vii). prize’s quality or
                                        fitness for
                                        a particular purpose. Without limiting the generality of the foregoing, Plarium
                                        is not responsible for incomplete, illegible, misdirected, misprinted, late,
                                        lost, damaged, stolen, or postage-due submissions or prize notifications; or for
                                        lost, interrupted, inaccessible or unavailable networks, servers, satellites,
                                        Internet service providers, websites, or other connections; or for
                                        miscommunications, failed, jumbled, scrambled, delayed, or misdirected computer,
                                        telephone or cable transmissions; or for any technical malfunctions, failures,
                                        difficulties or other errors of any kind or nature; or for failure of delivery
                                        of the Prize resulted by a third party service provider and the currier; or for
                                        the incorrect or inaccurate capture of information, or the failure to capture
                                        any information.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        11.9. <u>Applicable Laws</u>. The Official Rules and any disputes or differences
                                        arising in
                                        connection to them shall be governed by and interpreted under the laws of
                                        Israel. The
                                        Sponsor, the Administrator and all Participants hereby submit to the exclusive
                                        jurisdiction of the English Courts in order to resolve any disputes. You hereby
                                        agree to
                                        the binding <a
                                            href="https://company.plarium.com/en/terms/arbitration-agreement/"
                                            className={styles.a}>Arbitration
                                            Agreement</a>.
                                        In any circumstances where the foregoing Arbitration
                                        Agreement permits the parties to litigate in court, the parties hereby agree to
                                        submit
                                        to the personal jurisdiction of the courts located within Tel Aviv-Jaffa,
                                        Israel, for
                                        such purpose and you hereby waive all defenses of lack of personal jurisdiction
                                        and
                                        forum non-conveniens with respect to venue and jurisdiction in the courts of Tel
                                        Aviv-Jaffa, Israel.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        11.10. If a dispute as to the identity of the individual who actually submitted
                                        an
                                        entry cannot
                                        be resolved to Plarium’s satisfaction, the affected entry will be deemed
                                        ineligible.
                                    </Typography>
                                </li>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        11.11. <u>Privacy Policy and Terms of Use</u>. By entering the Promotion and
                                        downloading the
                                        Game, each Entrant acknowledges that they have access to Plarium&lsquo;s <a
                                            href="https://company.plarium.com/en/terms/terms-of-use/" className={styles.a}>Terms
                                            of Use</a>&nbsp;
                                        and <a href="https://company.plarium.com/en/terms/privacy-and-cookie-policy/"
                                            className={styles.a}>Privacy
                                            Policy</a>,
                                        and that any of the Entrant’s information made available to
                                        Plarium and/or the Agency in connection with the Promotion and for the execution
                                        and performance of the Promotion will be treated in accordance with the
                                        Promotion Privacy Notice available here:&nbsp;
                                        <a href="https://docs.google.com/document/d/1XTcJMXmt0LdUGR5MmWvJ8NlncTe7WvHXSNhx5rSt7rQ/edit#heading=h.gjdgxs"
                                            className={styles.a}>PROMOTION
                                            PRIVACY NOTICE</a>.
                                    </Typography>
                                </li>
                            </ul>
                            <Typography variant={'body2'} className={styles.text}>
                                These Official Rules shall supersede any contradictory terms contained in the Terms of
                                Use.
                            </Typography>
                            <ul className={styles.ul}>
                                <li className={styles.li}>
                                    <Typography variant={'body2'} className={styles.text}>
                                        11.12. <u>Social Disclaimer</u>. Participants should understand that they
                                        provide their
                                        information to Plarium, limited (email, PlayerID) to the Administrator but not
                                        to other
                                        third parties such as social networks (Facebook, Google, Apple or any similar).
                                        This
                                        promotion is in no way sponsored, endorsed, administered or associated with any
                                        social
                                        network as such. Entrants hereby agree to indemnify these social networks from
                                        any and
                                        all liability related to this Promotion.
                                    </Typography>
                                </li>
                            </ul>
                        </li>
                        <li className={styles.li}>
                            <Typography variant={'body2'} className={styles.text}>
                                12. <u>Official Rules</u>: These Official Rules will be posted on
                                wefinallyplayedit.plarium.com during the Promotion Period.
                            </Typography>
                        </li>
                    </ul>
                </Box>
            </Box>
        </>

    )
}

export default Rules;