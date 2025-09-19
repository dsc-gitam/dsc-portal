-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."recruitment_applications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "studentId" TEXT,
    "yearOfStudy" TEXT,
    "branch" TEXT,
    "cgpa" TEXT,
    "selectedRole" TEXT,
    "programmingLanguages" TEXT,
    "githubProfile" TEXT,
    "linkedinProfile" TEXT,
    "whyJoin" TEXT,
    "howContribute" TEXT,
    "previousExperience" TEXT,
    "leadershipExperience" TEXT,
    "selectedTask" TEXT,
    "taskSubmission" TEXT,
    "availability" TEXT,
    "hoursPerWeek" TEXT,
    "passionProject" TEXT,
    "challengeProposal" TEXT,
    "additionalInfo" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "submittedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recruitment_applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."recruitment_applications" ADD CONSTRAINT "recruitment_applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
