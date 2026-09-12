import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Simple static pages: home, about, block-captains, radio-club, donate, contact
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    updated: z.coerce.date(),
    description: z.string().optional(),
  }),
});

// Training offerings (e.g. fall-2026.md)
const training = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/training' }),
  schema: z.object({
    title: z.string(),
    updated: z.coerce.date(),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    class_dates: z.array(z.coerce.date()),
    location: z.string(),
    registration_url: z.string().url(),
    status: z.enum(['open', 'waitlist', 'closed']),
    capacity: z.number().int().positive().optional(),
  }),
});

const announcements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/announcements' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date(),
    pinned: z.boolean().default(false),
  }),
});

const meetings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/meetings' }),
  schema: z.object({
    title: z.string(),
    updated: z.coerce.date(),
    date: z.coerce.date(),
    time: z.string(),
    location: z.string(),
    agenda_url: z.string().url().optional(),
    zoom_url: z.string().url().optional(),
  }),
});

// Media-first gallery: albums of photos from events/trainings/meetings
const gallery = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gallery' }),
  schema: z.object({
    title: z.string(),
    updated: z.coerce.date(),
    date: z.coerce.date(),
    kind: z.enum(['training', 'event', 'meeting', 'other']),
    cover: z.string(),
    photos: z.array(
      z.object({
        src: z.string(),
        alt: z.string(),
        caption: z.string().optional(),
        credit: z.string().optional(),
      })
    ),
  }),
});

export const collections = { pages, training, announcements, meetings, gallery };
