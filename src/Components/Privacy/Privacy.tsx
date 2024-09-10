/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import Title from "@/Components/Title/Title";
import styles from "@/pages/privacy/styles.module.scss";
import React from "react";
import { Box, Typography } from "@mui/material";


export const Privacy = () =>
{
    const pageTitle = 'Privacy notice';
    const title = `Privacy Notice`;
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={`This is ${pageTitle}`} />
            </Head>
            <main className='bg-gallery'>
                <Box className={styles.wrapper}>
                    <Title title={title} correctClass={'PrivacyNotice'} />
                    <Box className={styles.container}>
                        <Typography variant={'h2'} className={styles.h2}>
                            PROMOTION PRIVACY NOTICE
                        </Typography>
                        <Typography variant={'h3'} className={styles.h3}>
                            Effective Date: July 17th, 2024
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            Plarium Global Ltd and its affiliates (“<strong>Plarium</strong>” or “we”) is dedicated to
                            protecting the privacy
                            rights of our online users (“<strong>users</strong>” or “<strong>you</strong>”).This Promotion
                            Privacy Notice (the “<strong>Notice</strong>”) has
                            been provided to inform you as to the ways we collect, store, use, and manage
                            (“<strong>process</strong>”) your
                            personal information when you participate in the promotions organized by us (“<strong>the
                                Promotion</strong>”).
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            “<strong>Personal information</strong>” means any information relating to an identified or
                            identifiable natural
                            person, thus who can be identified, directly or indirectly, in particular by reference to an
                            identifier such as a name, an identification number, location data, an online identifier or to
                            one or more factors specific to the physical, physiological, genetic, mental, economic, cultural
                            or social identity of that natural person.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            Plarium Privacy Policy and the Terms and Use for our website (collectively, the
                            “<strong>Site</strong>”), or any
                            Plarium game or application (the Site, games and applications are, collectively, the
                            “<strong>Service</strong>”)
                            apply to the use of our Services when participating in the Promotions as well. You can read them
                            here: Plarium Privacy Policy [
                            <a className={styles.a} href="https://plarium.com/en/legal/privacy-and-cookie-policy">
                                https://plarium.com/en/legal/privacy-and-cookie-policy</a>]; Plarium
                            Terms of Use [ <a className={styles.a} href="https://plarium.com/en/legal/terms-of-use/">
                                https://plarium.com/en/legal/terms-of-use/</a>].
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            Please note that the scope of this Notice is limited only to information collected by Plarium
                            through a participation in the Promotion by using the Site or the Service. This Notice does not
                            apply to the practices of third parties that Plarium does not own or control.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            Plarium is the controller of your personal information collected within the Promotion and will
                            process your personal information in accordance with applicable law. If you do not agree to this
                            Privacy Notice, please do not participate in our Promotions.
                        </Typography>
                        <Typography variant={'h3'} className={styles.h3}>
                            Processing of your personal information for the performance of the Promotion
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            If you choose to participate in our Promotions, we ask you to provide your Raid Player Id and
                            Email address as required in <em>the Landing Page of the Promotion and</em> the Promotion
                            Official Rules.
                            We process this information so that you can participate in our Promotions and so that we can
                            send you by Plarium or the Administrator as specified in the Promotion Official Rule Prize
                            Notification, in accordance with the Official Rules agreed between us.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            If you contact us or the Administer via email (e.g., to contact customer support), we will
                            collect your name and email address, as well as any other content included in the email, in
                            order to send you a reply. We may use your personal information submitted in your communications
                            to contact and respond to you.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            Additionally, to send prizes to winners, we may require further information, such as a valid
                            mailing address, email address, and phone number. This data will be used solely for the purpose
                            of prize delivery and will be handled in accordance with our privacy policy.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            In the cases outlined above the legal basis for processing your personal information is the
                            performance of a contract.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            You are under no obligation to provide us with any personal information, but if you don’t
                            provide all relevant information, we may not be able to help respectively you may not be able to
                            participate in the Promotion.
                        </Typography>
                        <Typography variant={'h3'} className={styles.h3}>
                            Processing of your personal information for other purposes
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            Your personal information will be used primary for the purposes of managing and administering
                            the Promotion, including contacting you if you are a winner and to respond to your inquiries as
                            outlined above.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            In addition, we may use user information for the following purposes:

                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            <em>Protecting rights and interests</em>. To protect the safety, rights, property, or security
                            of
                            Plarium, the Service, any third party, or the general public; to detect, prevent or otherwise
                            address fraud, security or technical issues; to prevent or stop activity which may be consider
                            to be, or to pose a risk of being, an illegal or legally actionable activity; to use as evidence
                            in litigation; and to enforce this Notice and our
                            <a className={styles.a} href="https://company.plarium.com/en/terms/terms-of-use/">Promotion</a> Official Rules.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            The legal basis for processing your personal information in this regard is our legitimate
                            interest according to Art. 6 (1) lit. f) GDPR to protect our Site and Services, defend our
                            rights and to prevent and track unauthorized activities.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            <em>Legal compliance</em>. To comply with applicable legal or regulatory obligations, including
                            as part
                            of a judicial proceeding; to respond to a subpoena, warrant, court order, or other legal
                            process; or as part of an investigation or request, whether formal or informal, from law
                            enforcement or a governmental authority.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            The legal basis for processing your personal information in this regard is the compliance with a
                            legal obligation according to Art. 6 (1) lit. c) GDPR.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            <em>Corporate Transaction</em>. We may transfer your personal information to third parties as
                            part of a corporate transaction (Asset Deal).
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            The legal basis for processing your personal information in this regard is our legitimate
                            interest according to Art. 6 (1) lit. f) GDPR to sell our company or merge with other entities
                            or your consent according to Art. 6 (1) lit. a) GDPR as far as legally required.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            <em>Publication of your name as a winner</em>. In case you are a winner of the Promotion we will
                            publish your name on a winner’s list provided you have consented to a respective publication.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            The legal basis for the processing of your personal information in this regard is your consent
                            according to Art. 6 (1) lit. a) GDPR.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            <em>We do not</em> perform automated decision making (including profiling).
                        </Typography>
                        <Typography variant={'h3'} className={styles.h3}>
                            Sharing of personal information with third parties
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            We do not sell the personal information we collect. We do, however, disclose personal
                            information as described in this policy. In the past 12 months, we have disclosed personal
                            information to the following categories of recipients:
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            <u>Other Plarium users</u>. If you win a Promotion, we may share and publish your name with
                            regards to
                            the winner publicly, with other Plarium users in our Services, provided you have given your
                            consent to do so.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            <u>Third parties for legal, fraud prevention, and security purposes</u>. We may share your
                            information
                            with third parties as required by legal or regulatory obligations; as requested by law
                            enforcement or other government officials in connection with an investigation of fraud,
                            intellectual property infringements, or other activity that is illegal or may expose you or us
                            to legal liability; or as Plarium otherwise deems necessary to detect, prevent, or otherwise
                            address fraud, security, technical issues, or other threats to Plarium or others.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            <u> Third-party service providers and Partners</u>. insofar as it is reasonably necessary for
                            the purposes set out in this privacy notice, we may share your personal information with third
                            party companies that perform services on our behalf such as: hosting services, administration of
                            this Promotion and customer service. While providing the services for us, these companies may
                            access your personal information, and are required to use it solely as directed by us for the
                            purpose of our requested service. Under the same conditions, we may partner with a third party
                            including the Administrator as specified in the Promotion Official Rules in order to assist us
                            fulfill our obligations to you under our Promotion Terms of Use.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            <u>Third parties in the context of a merger, acquisition, corporate transaction, or other legal
                                process</u>. We may disclose your information to another entity in connection with, an
                            acquisition or merger, sale or transfer of a business unit or assets, bankruptcy proceeding, or
                            as part of any other similar business transfer.
                        </Typography>
                        <Typography variant={'h3'} className={styles.h3}>
                            International Transfers
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            We may transfer your personal information outside your country of residence, including possibly
                            to countries that do not provide a level of data protection equivalent to your country of
                            residence. Please note that Plarium is located in Israel, a country that is deemed to provide an
                            adequate level of data protection according to an adequacy decision of the European Commission
                            under Art. 45 GDPR. Where Plarium onward transfers your personal information to a company
                            located outside of Israel, or the EU, we will take steps to ensure that your information is
                            given a similar level of protection as that given in Israel or the EU by concluding standard
                            contractual clauses under Art. 46 (2) lit. c) GDPR. You have the right to request from us
                            information about, including a copy of, the contractual safeguards Plarium puts in place to
                            achieve this.
                        </Typography>
                        <Typography variant={'h3'} className={styles.h3}>
                            Data retention
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            We will keep your information for as reasonably necessary for the purposes set out above in
                            accordance with applicable law, generally no longer than 3 years from the date you stopped using
                            our services. To determine the appropriate retention period, we will consider the amount, nature
                            and sensitivity of the personal information, the potential risk of harm from unauthorized use or
                            disclosure of your personal information, the purposes for which we process the personal
                            information and whether we can achieve such purposes through other means, as well as applicable
                            legal and regulatory requirements.
                        </Typography>
                        <Typography variant={'h3'} className={styles.h3}>
                            Security
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            We have implemented technical, physical, managerial and organizational measures designed to
                            secure your personal information from accidental loss and from unauthorized access, use,
                            alteration or disclosure. However, please note that no system or network is 100% secure and we
                            cannot guarantee that unauthorized third parties will never be able to defeat those measures or
                            use, disclose, or alter your personal information for improper purposes.
                        </Typography>
                        <Typography variant={'h3'} className={styles.h3}>
                            Your rights and choices in relation to your personal information
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            Subject to the respective legal requirements, you are entitled to the following data protection
                            rights:
                        </Typography>
                        <Typography variant={'body2'}>
                            You have the right to request information from us about the personal information we hold in
                            relation to you (Art. 15 GDPR) and correct any inaccurate data we hold (Art. 16 GDPR).
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            You also have rights to request that we delete any personal information about you (Art. 17
                            GDPR). However, if you decide to delete or anonymize your personal information, you may no
                            longer be able participate in our Promotions.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            You also have a legal right to ask for a restriction of processing (Art. 18 GDPR) and the right
                            to data portability (Art. 20 GDPR).
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            You also have the right to withdraw your consent, on the basis of which we process your personal
                            information, at any time. However, this does not affect our lawful processing based on your
                            consent before this withdrawal.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            Right of objection (Art. 20 GDPR): You may object to processing based on our legitimate
                            interests, on grounds relating to your particular situation. In this case, we will re-examine
                            the corresponding data processing. You may also object at any time to the processing of your
                            personal information for direct marketing purposes, including profiling, in order to stop such
                            processing.
                        </Typography>
                        <Typography variant={'h3'} className={styles.h3}>
                            US States Residents Rights:
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            You may have certain rights regarding our processing of your personal information under
                            applicable US state law. If our processing of your personal information is governed by such
                            laws, you may have the right to: (1) request that we disclose certain information to you about
                            our collection and use of your Personal Information over the past 12 months; (2) request that we
                            correct inaccurate personal information that we have collected about you; (3) request deletion
                            of your personal information; (4) opt out of “sale” or “share” of your personal information that
                            constitute “selling” or “sharing” of your personal information as those terms are defined under
                            applicable law; (5) Opt-out of targeted advertising. You can opt-out of our use of your personal
                            information for targeted advertising purposes under applicable law; and (6) not be discriminated
                            against for exercising these rights.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            If you or an authorized agent wants to exercise any of these rights, please contact us at:
                            <a className={styles.a_mailto} href="mailto:privacy.support@plarium.com">privacy.support@plarium.com</a> or via <a className={styles.a}
                                href="https://dsr-support.plarium.com/hc/requests/new">https://dsr-support.plarium.com/hc/requests/new</a>.
                            You can
                            freely exercise these rights and choices. Once we receive your request from you, we may verify
                            it through your account or by requesting information sufficient to confirm your identity.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            While we prefer that you contact us in case you have any issue or feel we do not respond
                            adequately to your questions or concerns, please note that you have a right to lodge a complaint
                            with your competent supervisory authority.
                        </Typography>
                        <Typography variant={'h3'} className={styles.h3}>
                            Links to other websites or applications
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            Links from the Plarium Service to third party websites or applications are provided for your
                            convenience. In addition, content in the Service may be hosted by other websites or
                            applications. Any personal information you provide on the linked pages or applications is
                            provided to that third party and is subject to that third party&lsquo;s privacy notice, not
                            ours.
                            These other websites and applications maintain their own policies regarding cookies and the
                            collection and use of personal information. We encourage you to review those policies yourself.
                        </Typography>
                        <Typography variant={'h3'} className={styles.h3}>
                            Policy regarding Minors
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            The terms of our Promotions prohibit users aged under 18 years from participating our Promotions
                            and we do not knowingly collect data relating to minors under the age of 18.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            If we become aware that personal information from a child has been collected, we will deactivate
                            the account and take reasonable measures to promptly delete such data from our records. If you
                            learn about any personal information, we have collected from a child underage 18, please contact
                            us immediately.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            Changes to this Notice
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            Plarium may amend this Notice from time to time. Use of information we collect now is subject to
                            the Notice in effect at the time such information is used. If we make changes in the way we use
                            personal information, we will notify you, such as by posting an announcement on our Service or
                            sending you an email to an email address that you may have provided to us.
                        </Typography>
                        <Typography variant={'h3'} className={styles.h3}>
                            Questions or concerns & contact details
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            In compliance with Art. 27 GDPR, we have appointed Plarium Europe S.A.R.L. as our representative
                            for GDPR purposes in the EU. You may address questions relating to the way we process your
                            personal information either to Plarium at the address identified below, or to our representative
                            at the following address: 9, Allée Scheffer, L-2520 Luxembourg.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            If you have any questions or concerns regarding privacy at Plarium, please contact us at:
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            Email: <a className={styles.a_mailto} href="mailto:privacy.support@plarium.com">privacy.support@plarium.com</a>.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            Postal address: Plarium Global Ltd. (Company number 514563956)
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            2 Abba Eban Blvd.
                        </Typography>
                        <Typography variant={'body2'} className={styles.text}>
                            Herzliya, Israel
                        </Typography>
                    </Box>
                </Box>
            </main>
        </>
    );
}