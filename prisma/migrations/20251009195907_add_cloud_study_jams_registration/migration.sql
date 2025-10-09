-- CreateTable
CREATE TABLE "public"."cloud_study_jams_registrations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT,
    "fullName" TEXT,
    "gender" TEXT,
    "graduationYear" TEXT,
    "hasLaptop" TEXT,
    "newAccountVerified" TEXT,
    "skillsBoostEmail" TEXT,
    "profileUrl" TEXT,
    "termsAccepted" TEXT,
    "dataAcknowledgement" TEXT,
    "completionAgreement" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "submittedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cloud_study_jams_registrations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."cloud_study_jams_registrations" ADD CONSTRAINT "cloud_study_jams_registrations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
