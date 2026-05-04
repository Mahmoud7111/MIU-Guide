import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageTransition, staggerContainer, staggerItem, fadeUp } from '@/lib/motion/variants';
import HeroSection from '@/components/ui/HeroSection';
import { ROUTES } from '@/lib/constants';
import { FACULTY_DETAILS } from '@/data/facultyDetails';
import styles from './FacultyPage.module.css';

const buildFallback = (section) => {
	if (section.content && section.content.length > 0) {
		return section.content;
	}
	return ['Details will be available soon.'];
};

export default function FacultyPage() {
	const { facultyId } = useParams();
	const faculty = FACULTY_DETAILS[facultyId];

	if (!faculty) {
		return (
			<motion.main
				className={styles.page}
				variants={pageTransition}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<HeroSection
					title="Faculty"
					subtitle="We could not find this faculty page."
					image={null}
					breadcrumbs={[
						{ label: 'Home', path: ROUTES.HOME },
						{ label: 'Academics', path: ROUTES.ACADEMICS },
						{ label: 'Faculty' },
					]}
				/>
				<section className={styles.section}>
					<div className={styles.container}>
						<div className={styles.notFoundCard}>
							<h2 className={styles.notFoundTitle}>Faculty page not available</h2>
							<p className={styles.notFoundText}>
								Please return to the academics overview to browse available faculties.
							</p>
							<Link className={styles.notFoundLink} to={ROUTES.ACADEMICS}>
								Back to Academics
							</Link>
						</div>
					</div>
				</section>
			</motion.main>
		);
	}

	return (
		<motion.main
			className={styles.page}
			variants={pageTransition}
			initial="hidden"
			animate="visible"
			exit="exit"
		>
			<HeroSection
				title={faculty.name}
				subtitle={faculty.heroSubtitle}
				image={faculty.heroImage}
				breadcrumbs={[
					{ label: 'Home', path: ROUTES.HOME },
					{ label: 'Academics', path: ROUTES.ACADEMICS },
					{ label: faculty.shortName },
				]}
			/>

			<section className={`${styles.section} ${styles.introSection}`}>
				<div className={styles.container}>
					<motion.div
						className={styles.introGrid}
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-80px' }}
					>
						<motion.div className={styles.introText} variants={fadeUp}>
							<span className={styles.kicker}>Faculty Profile</span>
							<h2 className={styles.introTitle}>At a Glance</h2>
							<p className={styles.introSubtitle}>
								Explore programs, regulations, and student resources tailored to the {faculty.shortName} community.
							</p>
						</motion.div>
						<motion.div className={styles.factsGrid} variants={staggerContainer}>
							{faculty.quickFacts.map((fact) => (
								<motion.div key={fact.label} className={styles.factCard} variants={staggerItem}>
									<span className={styles.factLabel}>{fact.label}</span>
									<span className={styles.factValue}>{fact.value}</span>
								</motion.div>
							))}
						</motion.div>
					</motion.div>
				</div>
			</section>

			<section className={`${styles.section} ${styles.contentSection}`}>
				<div className={styles.container}>
					<div className={styles.contentGrid}>
						<aside className={styles.sideNav}>
							<p className={styles.sideNavTitle}>On this page</p>
							<div className={styles.sideNavList}>
								{faculty.sections.map((section) => (
									<a key={section.id} className={styles.sideNavLink} href={`#${section.id}`}>
										{section.title}
									</a>
								))}
							</div>
						</aside>

						<div className={styles.sections}>
							{faculty.sections.map((section) => (
								<motion.article
									key={section.id}
									id={section.id}
									className={`${styles.sectionBlock} ${section.tone === 'callout' ? styles.callout : ''}`}
									variants={fadeUp}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true, margin: '-60px' }}
								>
									<h3 className={styles.sectionTitle}>{section.title}</h3>
									<div className={styles.sectionBody}>
										{buildFallback(section).map((paragraph, idx) => (
											<p key={`${section.id}-p-${idx}`}>{paragraph}</p>
										))}
									</div>
									{section.attribution && (
										<p className={styles.sectionAttribution}>{section.attribution}</p>
									)}
								</motion.article>
							))}
						</div>
					</div>
				</div>
			</section>
		</motion.main>
	);
}