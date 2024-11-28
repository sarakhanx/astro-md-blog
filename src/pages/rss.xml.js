import rss from '@astrojs/rss';

export async function GET(context) {
  const blog = await context.glob('./blog/*.{md,mdx}');
  return rss({
    title: 'Your Blog Title',
    description: 'Your blog description',
    site: context.site,
    items: blog.map((post) => ({
      title: post.frontmatter.title,
      pubDate: new Date(post.frontmatter.date),
      description: post.frontmatter.description,
      link: post.url,
    })),
  });
}