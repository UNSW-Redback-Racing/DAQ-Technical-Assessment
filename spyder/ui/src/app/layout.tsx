import { Roboto } from "next/font/google";
import { Metadata } from "next"
import { ThemeProvider } from "@/components/custom/theme-provider";
import './globals.css'

export const metadata: Metadata = {
    title: 'DAQ Technical Assessment',
    description: 'Next js web application for DAQ Technical Assessment',
}

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

/**
 * RootLayout component that provides the main layout for the application.
 * 
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout - in this case it is the page itself.
 * @returns {JSX.Element} The rendered RootLayout component.
 */
export default function RootLayout({
        children,
    }: {
        children: React.ReactNode
    }) {

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${roboto.className}`}>
                <ThemeProvider> {/* Provides the dark/light next js theming for the web page */}
                    <noscript>You need to enable JavaScript to run this app.</noscript>
                    <div id="root">{children}</div>
                </ThemeProvider>
            </body>
        </html>
    )
}