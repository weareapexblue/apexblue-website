import Image from 'next/image';
import Link from 'next/link';
import { formatHumanDate } from '@/lib/utils';

export default function BlogCard({ post }) {
  return (
    <article className="panel overflow-hidden rounded-3xl border border-sky-100 shadow-sm dark:border-sky-900">
      <div className="relative h-52">
        <Image
          src={post.image}
          alt={post.imageAlt || 'abstract AI data visualization'}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          {(post.categories || []).map((category) => (
            <Link
              key={`${post.slug}-${category.slug}`}
              href={`/category/${category.slug}/`}
              className="focus-ring rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-950 dark:text-sky-200"
            >
              {category.name}
            </Link>
          ))}
        </div>
        <h3 className="font-display text-xl font-semibold leading-tight">
          <Link href={post.path} className="focus-ring hover:text-sky-600">
            {post.title}
          </Link>
        </h3>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{formatHumanDate(post.date)}</p>
        <p className="text-sm text-muted">{post.excerpt}</p>
        <Link
          href={post.path}
          className="focus-ring inline-flex text-sm font-semibold text-sky-600 hover:text-sky-800"
        >
          Read Article
        </Link>
      </div>
    </article>
  );
}
