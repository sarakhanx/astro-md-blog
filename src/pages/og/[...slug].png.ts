import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import { generateOgImage } from '../../utils/og-image';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props;
  const ogImage = await generateOgImage(post);

  return new Response(ogImage, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};