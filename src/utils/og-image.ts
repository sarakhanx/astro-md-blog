import satori from 'satori';
import sharp from 'sharp';
import { Resvg } from '@resvg/resvg-js';
import type { CollectionEntry } from 'astro:content';

const FONT_REGULAR = await fetch(
  'https://api.fontsource.org/v1/fonts/inter/latin-400-normal.ttf'
).then(res => res.arrayBuffer());

const FONT_BOLD = await fetch(
  'https://api.fontsource.org/v1/fonts/inter/latin-700-normal.ttf'
).then(res => res.arrayBuffer());

export async function generateOgImage(post: CollectionEntry<'blog'>) {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          letterSpacing: '-.02em',
          backgroundColor: '#1e293b',
          padding: 60,
        },
        children: {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              color: 'white',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: 72,
                    fontWeight: 700,
                    marginBottom: 24,
                    lineHeight: 1.1,
                  },
                  children: post.data.title,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: 28,
                    opacity: 0.8,
                  },
                  children: post.data.description,
                },
              },
            ],
          },
        },
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: FONT_REGULAR,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: FONT_BOLD,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return pngBuffer;
}