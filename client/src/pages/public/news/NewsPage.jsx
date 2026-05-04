import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/ui/HeroSection';
import { NEWS } from '@/data/news';
import { pageTransition, staggerContainer, staggerItem, fadeUp } from '@/lib/motion/variants';
import styles from './NewsPage.module.css';
import campusHero from '@/assets/images/tools/campus.webp';

const formatDate = (dateStr) => {
	const date = new Date(dateStr);
	return date.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
};

export default function NewsPage() {
	const categories = useMemo(() => {
		const unique = new Map();
		NEWS.forEach((item) => {
			const value = item.category.toLowerCase().trim();
			if (!unique.has(value)) {
				unique.set(value, item.category.trim());
			}
		});

		return [{ value: 'all', label: 'All' }, ...Array.from(unique.entries()).map(([value, label]) => ({ value, label }))];
	}, []);
	const [activeCategory, setActiveCategory] = useState('all');

	const filteredNews = useMemo(() => {
		if (activeCategory === 'all') return NEWS;
		return NEWS.filter((item) => item.category.toLowerCase().trim() === activeCategory);
	}, [activeCategory]);

	const featured = NEWS.find((item) => item.featured) || NEWS[0];

	return (
		<motion.main
			className={styles.page}
			variants={pageTransition}
			initial="hidden"
			animate="visible"
			exit="exit"
		>
			<HeroSection
				title="News & Announcements"
				subtitle="Stay up to date with MIU highlights, academic milestones, and campus events."
				image={campusHero}
				breadcrumbs={[
					{ label: 'Home', path: '/' },
					{ label: 'News' }
				]}
			/>

			<section className={styles.section}>
				<div className={styles.container}>
					<motion.header className={styles.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
						<span className={styles.eyebrow}>Featured</span>
						<h2 className={styles.title}>Campus Spotlight</h2>
						<p className={styles.subtitle}>
							Discover the latest achievements, research breakthroughs, and upcoming opportunities.
						</p>
					</motion.header>

					<motion.article
						className={styles.featuredCard}
						variants={fadeUp}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-80px' }}
					>
						<div className={styles.featuredImageWrap}>
							<img src={featured.image} alt={featured.title} className={styles.featuredImage} />
							<div className={styles.featuredOverlay} />
							<span className={styles.featuredBadge}>Featured</span>
						</div>
						<div className={styles.featuredContent}>
							<span className={styles.meta}>{featured.category} • {formatDate(featured.date)}</span>
							<h3 className={styles.featuredTitle}>{featured.title}</h3>
							<p className={styles.featuredExcerpt}>{featured.excerpt}</p>
							<button className={styles.readMoreButton} type="button">Read More</button>
						</div>
					</motion.article>
				</div>
			</section>

			<section className={styles.sectionAlt}>
				<div className={styles.container}>
					<motion.div
						className={styles.filterRow}
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						<div>
							<h2 className={styles.title}>Latest Updates</h2>
							<p className={styles.subtitle}>Browse news by category or explore everything happening on campus.</p>
						</div>
						<div className={styles.filterPills}>
							{categories.map((category) => (
								<button
									key={category.value}
									type="button"
									className={`${styles.filterPill} ${activeCategory === category.value ? styles.filterPillActive : ''}`}
									onClick={() => setActiveCategory(category.value)}
								>
									{category.label}
								</button>
							))}
						</div>
					</motion.div>

					{filteredNews.length === 0 ? (
						<div className={styles.emptyState}>
							<p className={styles.emptyText}>No news items found for this category.</p>
						</div>
					) : (
						<motion.div
							className={styles.newsGrid}
							variants={staggerContainer}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: '-60px' }}
						>
							{filteredNews.map((item) => (
								<motion.article key={item.id} className={styles.newsCard} variants={staggerItem}>
									<div className={styles.cardImageWrap}>
										<img src={item.image} alt={item.title} className={styles.cardImage} />
										<span className={styles.categoryTag}>{item.category}</span>
									</div>
									<div className={styles.cardBody}>
										<span className={styles.meta}>{formatDate(item.date)}</span>
										<h3 className={styles.cardTitle}>{item.title}</h3>
										<p className={styles.cardExcerpt}>{item.excerpt}</p>
										<button className={styles.cardLink} type="button">Read Story</button>
									</div>
								</motion.article>
							))}
						</motion.div>
					)}
				</div>
			</section>
		</motion.main>
	);
}