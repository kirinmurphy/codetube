"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const handler = async () => {
    try {
        await prisma.$connect();
        return {
            statusCode: 200,
            body: "Database connected successfully",
        };
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to connect to the database", details: error }),
        };
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.handler = handler;
