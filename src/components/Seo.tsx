import { useEffect } from 'react';

const title = 'Shivam Gupta | Backend Engineer';
const description = 'Shivam Gupta is a backend engineer building reliable APIs, scalable systems, and practical web products with Node.js, Express, MongoDB, PostgreSQL, Redis, and React.';
const shortDescription = 'Backend engineer building reliable APIs, scalable systems, and practical web products.';
const email = 'sg946511@gmail.com';

const sameAs = [
  'https://github.com/literalmock',
  'https://www.linkedin.com/in/shivam-gupta-code/',
];

const skills = [
  'Backend engineering',
  'API design',
  'Node.js',
  'Express',
  'MongoDB',
  'PostgreSQL',
  'Redis',
  'React',
  'TypeScript',
  'System design',
  'BullMQ',
  'FFmpeg',
];

const projects = [
  {
    name: 'DevMate',
    url: 'https://github.com/literalmock/DevMate',
    description: 'Developer matching with skill-based discovery, REST APIs, JWT auth, and schema validation.',
    keywords: ['Node.js', 'Express', 'MongoDB', 'Zod'],
  },
  {
    name: 'Clip Captions',
    url: 'https://landing.clipcaptions.video/',
    description: 'Automatic transcription and styled captions for short-form video with word-level sync.',
    keywords: ['React', 'Redis', 'BullMQ', 'FFmpeg'],
  },
  {
    name: 'Password Generator',
    url: 'https://password-generator-eke.pages.dev',
    description: 'Responsive password generator with configurable length and character rules.',
    keywords: ['React', 'Vite', 'CSS'],
  },
];

function canonicalUrl() {
  const url = new URL(window.location.href);
  url.hash = '';
  url.search = '';
  url.pathname = url.pathname.replace(/index\.html$/, '');
  return url.toString();
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function upsertLink(rel: string, href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.rel = rel;
    document.head.appendChild(tag);
  }
  tag.href = href;
}

function upsertJsonLd(id: string, data: unknown) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export default function Seo() {
  useEffect(() => {
    const url = canonicalUrl();
    const personId = `${url}#person`;
    const websiteId = `${url}#website`;
    const workId = `${url}#selected-work`;

    document.title = title;
    upsertLink('canonical', url);
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'author', 'Shivam Gupta');
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', shortDescription);
    upsertMeta('property', 'og:type', 'profile');
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:site_name', 'Shivam Gupta Portfolio');
    upsertMeta('name', 'twitter:card', 'summary');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', shortDescription);

    upsertJsonLd('shivam-profile-jsonld', {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': websiteId,
          url,
          name: 'Shivam Gupta Portfolio',
          description,
          inLanguage: 'en',
          author: { '@id': personId },
        },
        {
          '@type': 'ProfilePage',
          '@id': `${url}#profile-page`,
          url,
          name: title,
          description,
          inLanguage: 'en',
          isPartOf: { '@id': websiteId },
          about: { '@id': personId },
          mainEntity: { '@id': personId },
          hasPart: { '@id': workId },
        },
        {
          '@type': 'Person',
          '@id': personId,
          name: 'Shivam Gupta',
          givenName: 'Shivam',
          familyName: 'Gupta',
          url,
          email: `mailto:${email}`,
          jobTitle: 'Backend Engineer',
          description,
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'IN',
          },
          sameAs,
          knowsAbout: skills,
          hasOccupation: {
            '@type': 'Occupation',
            name: 'Backend Engineer',
            skills: skills.join(', '),
          },
        },
        {
          '@type': 'ItemList',
          '@id': workId,
          name: 'Selected work',
          itemListElement: projects.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: project.url,
            item: {
              '@type': 'CreativeWork',
              name: project.name,
              url: project.url,
              description: project.description,
              keywords: project.keywords,
              creator: { '@id': personId },
            },
          })),
        },
      ],
    });
  }, []);

  return null;
}
