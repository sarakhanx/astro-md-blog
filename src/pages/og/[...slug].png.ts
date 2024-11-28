import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import { generateOgImage } from '../../utils/og-image';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug }, // Ensure slug exists in frontmatter
  }));
}

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;

  // Fetch the post by slug
  const post = await getEntry('blog', slug);
  if (!post) {
    return new Response('Not Found', { status: 404 });
  }

  // Generate the OG image
  const ogImage = await generateOgImage(post);

  return new Response(ogImage, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
