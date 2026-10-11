-- CreateEnum
CREATE TYPE "SovereignTier" AS ENUM ('EXPLORER', 'SOVEREIGN_KEY', 'IMPERIAL_HONORARY');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('GUEST', 'STAFF', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING_PAYMENT', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "HousekeepingStatus" AS ENUM ('CLEAN_INSPECTED', 'CLEAN_UNINSPECTED', 'TOUCH_UP_REQUIRED', 'DIRTY_DEPARTURE', 'SERVICE_IN_PROGRESS', 'DO_NOT_DISTURB', 'OUT_OF_ORDER');

-- CreateEnum
CREATE TYPE "StaffRole" AS ENUM ('ADMIN', 'GENERAL_MANAGER', 'MAJORDOMO', 'FRONT_DESK', 'HEAD_HOUSEKEEPER', 'HOUSEKEEPING_ATTENDANT', 'SOMMELIER', 'SPA_DIRECTOR');

-- CreateTable
CREATE TABLE "AccommodationCategory" (
    "id" TEXT NOT NULL,
    "sanctuaryId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "squareMeters" DOUBLE PRECISION NOT NULL,
    "squareFeet" DOUBLE PRECISION NOT NULL,
    "maxOccupancy" INTEGER NOT NULL,
    "bedroomsCount" INTEGER NOT NULL,
    "bathroomsCount" INTEGER NOT NULL,
    "bedConfiguration" TEXT NOT NULL,
    "viewOrientation" TEXT NOT NULL,
    "basePriceNightly" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "cleaningFee" DOUBLE PRECISION,
    "cityTaxPerGuest" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "vatRate" DOUBLE PRECISION NOT NULL DEFAULT 10.0,
    "minStayNights" INTEGER NOT NULL DEFAULT 1,
    "mediaData" JSONB NOT NULL,
    "narrative" JSONB NOT NULL,
    "features" JSONB NOT NULL,
    "privileges" JSONB NOT NULL,
    "amenityTags" TEXT[],
    "sensoryCapabilities" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccommodationCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomUnit" (
    "id" TEXT NOT NULL,
    "sanctuaryId" TEXT NOT NULL,
    "accommodationId" TEXT NOT NULL,
    "unitCode" TEXT NOT NULL,
    "floorLevel" TEXT NOT NULL,
    "wing" TEXT,
    "status" "HousekeepingStatus" NOT NULL DEFAULT 'CLEAN_INSPECTED',
    "isOccupied" BOOLEAN NOT NULL DEFAULT false,
    "currentBookingId" TEXT,
    "maintenanceFlag" BOOLEAN NOT NULL DEFAULT false,
    "maintenanceReason" TEXT,
    "lastInspectedAt" TIMESTAMP(3),
    "assignedStaffId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RateRule" (
    "id" TEXT NOT NULL,
    "sanctuaryId" TEXT NOT NULL,
    "accommodationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "multiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "fixedOverridePrice" DOUBLE PRECISION,
    "minimumStayNights" INTEGER NOT NULL DEFAULT 1,
    "closedForArrival" BOOLEAN NOT NULL DEFAULT false,
    "closedForDeparture" BOOLEAN NOT NULL DEFAULT false,
    "sovereignKeyDiscount" DOUBLE PRECISION NOT NULL DEFAULT 10.0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RateRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "bookingReference" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sanctuaryId" TEXT NOT NULL,
    "accommodationId" TEXT NOT NULL,
    "roomUnitId" TEXT,
    "checkInDate" TIMESTAMP(3) NOT NULL,
    "checkOutDate" TIMESTAMP(3) NOT NULL,
    "numberOfNights" INTEGER NOT NULL,
    "adultsCount" INTEGER NOT NULL DEFAULT 1,
    "childrenCount" INTEGER NOT NULL DEFAULT 0,
    "specialRequests" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING_PAYMENT',
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "roomNightlyTotal" DOUBLE PRECISION NOT NULL,
    "experiencesTotal" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "taxesAndServiceTotal" DOUBLE PRECISION NOT NULL,
    "cityTaxTotal" DOUBLE PRECISION NOT NULL,
    "grandTotal" DOUBLE PRECISION NOT NULL,
    "depositPaid" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "balanceDueAtCheckIn" DOUBLE PRECISION NOT NULL,
    "qrCodeData" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingLineItem" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "scheduledTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingLineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentFolio" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "payments" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentFolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HousekeepingTask" (
    "id" TEXT NOT NULL,
    "sanctuaryId" TEXT NOT NULL,
    "roomUnitId" TEXT NOT NULL,
    "taskType" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'STANDARD',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "assignedStaffId" TEXT,
    "checklistData" JSONB NOT NULL,
    "notes" TEXT,
    "scheduledFor" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HousekeepingTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffMember" (
    "id" TEXT NOT NULL,
    "sanctuaryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "StaffRole" NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sanctuary" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "mapUrl" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'Europe/Rome',
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "mediaData" JSONB NOT NULL,
    "editorial" JSONB NOT NULL,
    "arrivalGuide" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sanctuary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiningVenue" (
    "id" TEXT NOT NULL,
    "sanctuaryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cuisineType" TEXT NOT NULL,
    "michelinStars" INTEGER,
    "dressCode" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "mediaData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiningVenue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "sanctuaryId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "pricePerPerson" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "maxPartySize" INTEGER NOT NULL,
    "mediaData" JSONB NOT NULL,
    "narrative" JSONB NOT NULL,
    "scheduleData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "phoneNumber" TEXT,
    "title" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'GUEST',
    "sovereignTier" "SovereignTier" NOT NULL DEFAULT 'EXPLORER',
    "sovereignKeyNumber" TEXT NOT NULL,
    "lifetimeStaysCount" INTEGER NOT NULL DEFAULT 0,
    "lifetimeSpendTotal" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuestProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passportData" JSONB,
    "preferences" JSONB,
    "sensoryPreferences" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuestProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccommodationCategory_slug_key" ON "AccommodationCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "RoomUnit_sanctuaryId_unitCode_key" ON "RoomUnit"("sanctuaryId", "unitCode");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_bookingReference_key" ON "Booking"("bookingReference");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentFolio_bookingId_key" ON "PaymentFolio"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "StaffMember_email_key" ON "StaffMember"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Sanctuary_slug_key" ON "Sanctuary"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Sanctuary_code_key" ON "Sanctuary"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Experience_slug_key" ON "Experience"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_sovereignKeyNumber_key" ON "User"("sovereignKeyNumber");

-- CreateIndex
CREATE UNIQUE INDEX "GuestProfile_userId_key" ON "GuestProfile"("userId");

-- AddForeignKey
ALTER TABLE "AccommodationCategory" ADD CONSTRAINT "AccommodationCategory_sanctuaryId_fkey" FOREIGN KEY ("sanctuaryId") REFERENCES "Sanctuary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomUnit" ADD CONSTRAINT "RoomUnit_sanctuaryId_fkey" FOREIGN KEY ("sanctuaryId") REFERENCES "Sanctuary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomUnit" ADD CONSTRAINT "RoomUnit_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "AccommodationCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomUnit" ADD CONSTRAINT "RoomUnit_assignedStaffId_fkey" FOREIGN KEY ("assignedStaffId") REFERENCES "StaffMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RateRule" ADD CONSTRAINT "RateRule_sanctuaryId_fkey" FOREIGN KEY ("sanctuaryId") REFERENCES "Sanctuary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RateRule" ADD CONSTRAINT "RateRule_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "AccommodationCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_sanctuaryId_fkey" FOREIGN KEY ("sanctuaryId") REFERENCES "Sanctuary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "AccommodationCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_roomUnitId_fkey" FOREIGN KEY ("roomUnitId") REFERENCES "RoomUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingLineItem" ADD CONSTRAINT "BookingLineItem_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentFolio" ADD CONSTRAINT "PaymentFolio_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HousekeepingTask" ADD CONSTRAINT "HousekeepingTask_roomUnitId_fkey" FOREIGN KEY ("roomUnitId") REFERENCES "RoomUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffMember" ADD CONSTRAINT "StaffMember_sanctuaryId_fkey" FOREIGN KEY ("sanctuaryId") REFERENCES "Sanctuary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiningVenue" ADD CONSTRAINT "DiningVenue_sanctuaryId_fkey" FOREIGN KEY ("sanctuaryId") REFERENCES "Sanctuary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_sanctuaryId_fkey" FOREIGN KEY ("sanctuaryId") REFERENCES "Sanctuary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestProfile" ADD CONSTRAINT "GuestProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
