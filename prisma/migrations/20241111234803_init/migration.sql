-- CreateTable
CREATE TABLE "DnsValidationHistory" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,
    "spf" BOOLEAN,
    "dkim" BOOLEAN,
    "dmarc" BOOLEAN,
    "is_checked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DnsValidationHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DnsValidationHistory_domain_key" ON "DnsValidationHistory"("domain");
