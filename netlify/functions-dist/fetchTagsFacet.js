"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const handler = async () => {
    try {
        const tags = await prisma.tag.findMany({
            include: {
                _count: {
                    select: {
                        posts: true,
                    },
                },
            },
        });
        const tagsWithCount = tags
            .map(tag => ({
            id: tag.id,
            name: tag.name,
            readableName: tag.name.replace(/_/g, ' '),
            count: tag._count.posts,
        }))
            .sort((a, b) => b.count - a.count);
        return {
            statusCode: 200,
            body: JSON.stringify(tagsWithCount),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch tags facet" }),
        };
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.handler = handler;
