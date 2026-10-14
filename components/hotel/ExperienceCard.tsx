import Link from 'next/link';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface ExperienceCardProps {
    id: string;
    slug: string;
    title: string;
    category:
        | 'GASTRONOMY'
        | 'WELLNESS_SPA'
        | 'NAUTICAL_CHARTER'
        | 'HERITAGE_CRAFT';
    tagline: string;
    durationMinutes: number;
    pricePerPerson: number;
    currency: string;
    maxPartySize: number;
    locationDetails: string;
    heroImageUrl: string;
    highlights: string[];
}

export function ExperienceCard({
    slug,
    title,
    category,
    tagline,
    durationMinutes,
    pricePerPerson,
    currency,
    maxPartySize,
    locationDetails,
    heroImageUrl,
    highlights,
}: ExperienceCardProps) {
    const categoryLabels = {
        GASTRONOMY: 'Fine Gastronomy & Cellar',
        WELLNESS_SPA: 'Roman Thermal Spa',
        NAUTICAL_CHARTER: 'Private Riva Yachting',
        HERITAGE_CRAFT: 'Monolithic Provenance',
    };

    return (
        <div className="group bg-white border border-[#e8e4dc] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl">
            <div className="relative aspect-16/10 overflow-hidden bg-[#eeeae2]">
                <img
                    src={heroImageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute top-4 left-4">
                    <Badge variant="gold">
                        {categoryLabels[category] || category}
                    </Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white text-[11px] tracking-wider uppercase drop-shadow-md">
                    <span>{locationDetails}</span>
                    <span>
                        {durationMinutes} Min • Up to {maxPartySize} Patrons
                    </span>
                </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col flex-1 justify-between gap-6">
                <div>
                    <h3 className="font-serif text-2xl text-[#1f1e1d] font-normal tracking-tight group-hover:text-[#8e763b] transition-colors">
                        {title}
                    </h3>

                    <p className="text-xs text-[#6e6b64] font-sans mt-2 leading-relaxed">
                        {tagline}
                    </p>

                    <ul className="mt-4 space-y-1.5 border-t border-[#f0ede6] pt-4">
                        {highlights.slice(0, 3).map(function (item, idx) {
                            return (
                                <li
                                    key={idx}
                                    className="flex items-center gap-2 text-[11px] text-[#55524d] font-sans"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#bfa76f]" />
                                    {item}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="pt-4 border-t border-[#e8e4dc] flex items-center justify-between">
                    <div>
                        <span className="text-[10px] tracking-widest uppercase text-[#8c8881] block">
                            Tariff
                        </span>

                        <span className="font-serif text-xl text-[#1f1e1d]">
                            {currency === 'EUR' ? '€' : currency}{' '}
                            {pricePerPerson.toLocaleString()}
                        </span>

                        <span className="text-[11px] text-[#8c8881] font-sans">
                            {' '}/ patron
                        </span>
                    </div>

                    <Link href={`/experiences#${slug}`}>
                        <Button variant="primary" size="sm">
                            Reserve Experience
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
