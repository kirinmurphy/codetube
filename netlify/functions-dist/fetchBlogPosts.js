"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const handler = async (event) => {
    var _a;
    try {
        const tag = ((_a = event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.tag) || '';
        const getAllItemsQuery = {
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        };
        const getItemsByTagQuery = Object.assign({ where: {
                tags: {
                    some: {
                        tag: {
                            name: tag,
                        },
                    },
                },
            } }, getAllItemsQuery);
        const query = tag ? getItemsByTagQuery : getAllItemsQuery;
        const blogPosts = await prisma.blogPost.findMany(query);
        console.log('Blog posts fetched:', blogPosts);
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogPosts),
        };
    }
    catch (error) {
        console.error('Error in Netlify function:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ error: "Failed to fetch blog posts", details: error }),
        };
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.handler = handler;
