const { PrismaClient } = require('@prisma/client');

// Initialize PrismaClient for Prisma 7
const prisma = new PrismaClient();

module.exports = prisma;
