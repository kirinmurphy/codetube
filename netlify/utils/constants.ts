export const GLOBAL_CACHE_EXPIRY = 60 * 60 * 24 * 6; // 1 week

export enum QueryCacheKeys {
  HOMEPAGE_CACHE_KEY = 'homepage_data',
  BLOG_POST_CACHE_KEY = 'blog_post_data',
  TAG_FACET_CACHE_KEY = 'tag_facet_data'
}