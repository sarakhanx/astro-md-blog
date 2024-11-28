import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await Astro.glob('./blog/*.{md,mdx}');
  return rss({
    title: 'Your Blog Title',
    description: 'Your blog description',
    site: context.site,
    items: posts.map((post) => ({
      title: post.frontmatter.title,
      pubDate: new Date(post.frontmatter.date),
      description: post.frontmatter.description,
      link: `/blog/${post.file.split('/').pop().split('.')[0]}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}