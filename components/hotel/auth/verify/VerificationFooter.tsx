import { VerificationPageData } from './VerificationHeader';

export interface VerificationFooterProps {
    data: VerificationPageData['footer'];
    className?: string;
}

export function VerificationFooter({
    data,
    className = '',
}: VerificationFooterProps) {
    const {
        copyrightNotice,
        legalNotice,
        hardwareAttestationNotice,
        conciergeDeskText,
        conciergeDeskTel,
    } = data;

    return (
        <footer
            aria-label="Sovereign Legal Disclosures"
            className={`w-full bg-[#fcf9f4] border-t border-[#e8e4dc] py-6 px-4 sm:px-8 lg:px-12 text-[10px] font-mono uppercase tracking-[0.18em] text-[#78756d] select-none ${className}`}
        >
            <div className="max-w-360 mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
                <span>{copyrightNotice}</span>

                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[#55524b]">
                    <span>{legalNotice}</span>

                    <span className="hidden sm:inline text-[#ded9ce]">
                        •
                    </span>

                    <span>{hardwareAttestationNotice}</span>

                    <span className="hidden sm:inline text-[#ded9ce]">
                        •
                    </span>

                    <a
                        href={`tel:${conciergeDeskTel}`}
                        className="text-[#8e763b] hover:text-[#1f1e1d] transition-colors underline font-sans font-semibold"
                    >
                        {conciergeDeskText}
                    </a>
                </div>
            </div>
        </footer>
    );
}
