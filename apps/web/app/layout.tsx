import "remirror/styles/all.css";
import "@courselit/page-blocks/styles.css";
import "@courselit/components-library/styles.css";
import "@courselit/page-primitives/styles.css";
import "../styles/globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { getSiteInfo, getFullSiteSetup } from "@ui-lib/utils";
import { getAddressFromHeaders } from "@/app/actions";
import * as fonts from "@/lib/fonts";
import { generateThemeStyles } from "@/lib/theme-styles";
import { SITE_SETTINGS_DEFAULT_TITLE } from "@ui-config/strings";

export async function generateMetadata(): Promise<Metadata> {
    const address = await getAddressFromHeaders(headers);
    let siteInfo: Awaited<ReturnType<typeof getSiteInfo>> = null as any;
    try {
        siteInfo = await getSiteInfo(address);
    } catch (err: any) {
        console.error(
            "[layout] generateMetadata: getSiteInfo failed, using defaults:",
            err?.message,
        );
    }

    return {
        title: `${siteInfo?.title || SITE_SETTINGS_DEFAULT_TITLE}`,
        description: siteInfo?.subtitle || "",
        openGraph: {
            title: `${siteInfo?.title || SITE_SETTINGS_DEFAULT_TITLE}`,
            description: siteInfo?.subtitle || "",
            images: [
                {
                    url: siteInfo?.logo?.file as any,
                    alt: siteInfo?.logo?.caption || "",
                },
            ],
        },
        twitter: {
            title: `${siteInfo?.title || SITE_SETTINGS_DEFAULT_TITLE}`,
            description: siteInfo?.subtitle || "",
            images: [
                {
                    url: siteInfo?.logo?.file as any,
                    alt: siteInfo?.logo?.caption || "",
                },
            ],
        },
        generator: "CourseLit",
        applicationName: "CourseLit",
    };
}

interface RootLayoutProps {
    children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
    const address = await getAddressFromHeaders(headers);
    let siteSetup: Awaited<ReturnType<typeof getFullSiteSetup>> = null as any;
    try {
        siteSetup = await getFullSiteSetup(address);
    } catch (err: any) {
        console.error(
            "[layout] RootLayout: getFullSiteSetup failed, rendering without theme:",
            err?.message,
        );
    }
    const themeStyles = siteSetup?.theme
        ? generateThemeStyles(siteSetup.theme)
        : "";

    return (
        <html suppressHydrationWarning>
            <head>
                <style>{themeStyles}</style>
            </head>
            <body
                className={`${fonts.openSans.variable} ${fonts.montserrat.variable} ${fonts.lato.variable} ${fonts.poppins.variable} ${fonts.sourceSans3.variable} ${fonts.raleway.variable} ${fonts.notoSans.variable} ${fonts.merriweather.variable} ${fonts.inter.variable} ${fonts.alegreya.variable} ${fonts.roboto.variable} ${fonts.mulish.variable} ${fonts.nunito.variable} ${fonts.rubik.variable} ${fonts.playfairDisplay.variable} ${fonts.oswald.variable} ${fonts.ptSans.variable} ${fonts.workSans.variable} ${fonts.robotoSlab.variable} ${fonts.sourceSerif4.variable} ${fonts.bebasNeue.variable} ${fonts.quicksand.variable} font-sans ${fonts.inter.className}`}
            >
                {children}
            </body>
        </html>
    );
}
