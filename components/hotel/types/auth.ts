export interface SovereignPrivilegePill {
    id: string;
    label: string;
    sublabel: string;
    iconType: 'majordomo' | 'sensory' | 'cellar' | 'hotline';
}

export interface AuthMastheadData {
    brandName: string;
    brandSub: string;
    enclavesPillText: string;
    quoteBadgeText: string;
    editorialQuote: string;
    editorialNarrative: string;
    bgImageUrl: string;
    bgImageAlt: string;
    patronPrivilegesHeader: string;
    patronPrivilegesSub: string;
    privileges: SovereignPrivilegePill[];
    sovereignKeyRefNotice: string;
}

export interface AuthLoginFormData {
    eyebrow: string;
    securityBadge: string;
    headline: string;
    subheadline: string;
    activeTab: 'sign-in' | 'sign-up';
    signInTabLabel: string;
    signUpTabLabel: string;
    identifierLabel: string;
    identifierPlaceholder: string;
    identifierHelpText: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    magicLinkText: string;
    rememberDeviceLabel: string;
    forgotPasswordText: string;
    submitButtonLabel: string;
    dividerText: string;
    appleAuthLabel: string;
    conciergeAuthLabel: string;
    invitationBadge: string;
    invitationHeadline: string;
    invitationSubheadline: string;
    invitationPlaceholder: string;
    invitationButtonLabel: string;
    securityFooterNotice: string;
    conciergeDeskLabel: string;
    legalSanctuaryLabel: string;
}

export interface PatronEndorsementData {
    quote: string;
    authorName: string;
    folioCode: string;
    avatarUrl: string;
    avatarAlt: string;
}

export interface SovereignPrivilegeItem {
    id: string;
    label: string;
    description: string;
    iconType: 'keyless' | 'cellar' | 'majordomo';
}

export interface RegisterDossierData {
    dossierBadge: string;
    enclaveLocation: string;
    coordinatesDisplay: string;
    manifestoQuote: string;
    heroImageUrl: string;
    heroImageAlt: string;
    privilegesHeading: string;
    privilegesSubheading: string;
    privileges: SovereignPrivilegeItem[];
    endorsement: PatronEndorsementData;
    protocolNotice: string;
}

export interface SanctuaryChoiceOption {
    id: string;
    code: string;
    label: string;
    region: string;
}

export interface OlfactoryChoiceOption {
    id: string;
    label: string;
    notes: string;
}

export interface CellarChoiceOption {
    id: string;
    label: string;
    provenance: string;
}

export interface RegisterFormInitialValues {
    honorific: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneCountryCode: string;
    phoneNumber: string;
    passkey: string;
    conciergePin: string;
    selectedSanctuaryIds: string[];
    selectedAromaId: string;
    selectedCellarId: string;
    invitationToken: string;
    agreeSwissPrivacy: boolean;
    agreeSensorySync: boolean;
}

export interface RegisterFormData {
    registryBadge: string;
    signInPromptText: string;
    signInLinkText: string;
    headline: string;
    subheadline: string;
    expeditedTitle: string;
    appleAuthLabel: string;
    conciergeAuthLabel: string;
    section1Number: string;
    section1Title: string;
    section1Sub: string;
    section2Number: string;
    section2Title: string;
    section2Sub: string;
    section3Number: string;
    section3Title: string;
    section3Sub: string;
    section4Number: string;
    section4Title: string;
    section4Sub: string;
    sanctuaryOptions: SanctuaryChoiceOption[];
    aromaOptions: OlfactoryChoiceOption[];
    cellarOptions: CellarChoiceOption[];
    initialValues: RegisterFormInitialValues;
    submitCtaLabel: string;
    encryptionAssuranceText: string;
}