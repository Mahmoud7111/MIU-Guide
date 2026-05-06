import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiTag, FiArrowLeft, FiShare2 } from 'react-icons/fi';
import { NEWS } from '@/data/news';
import { pageTransition, fadeUp } from '@/lib/motion/variants';
import styles from './NewsDetailPage.module.css';

const NewsDetailPage = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();
  
  // Find the specific news item
  const newsItem = NEWS.find(n => n.id === parseInt(newsId));

  if (!newsItem) {
    return (
      <div className={styles.errorContainer}>
        <h2>News Not Found</h2>
        <p>The news article you are looking for does not exist or has been removed.</p>
        <Link to="/news" className={styles.backBtn}>
          <FiArrowLeft /> Back to News
        </Link>
      </div>
    );
  }

  // Related news (other items)
  const relatedNews = NEWS.filter(n => n.id !== newsItem.id).slice(0, 3);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.main
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={styles.page}
    >
      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.container}>
          <Link to="/news" className={styles.breadcrumb}>
            <FiArrowLeft /> Back to News
          </Link>
          
          <motion.div variants={fadeUp} className={styles.meta}>
            <span className={styles.categoryBadge}>{newsItem.category}</span>
            <span className={styles.date}>
              <FiCalendar /> {formatDate(newsItem.date)}
            </span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className={styles.title}>
            {newsItem.title}
          </motion.h1>
          
          <motion.div variants={fadeUp} className={styles.authorInfo}>
            <div className={styles.authorAvatar}>
              <FiUser />
            </div>
            <div className={styles.authorText}>
              <span className={styles.authorLabel}>Published by</span>
              <span className={styles.authorName}>{newsItem.author || 'MIU Communications'}</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Article Content */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Main Content */}
            <article className={styles.article}>
              <motion.div variants={fadeUp} className={styles.mainImageWrapper}>
                <img src={newsItem.image} alt={newsItem.title} className={styles.mainImage} />
              </motion.div>
              
              <motion.div 
                variants={fadeUp} 
                className={styles.body}
                dangerouslySetInnerHTML={{ __html: newsItem.content }}
              />
              
              <div className={styles.articleFooter}>
                <div className={styles.tags}>
                  <span className={styles.tag}><FiTag /> MIU</span>
                  <span className={styles.tag}><FiTag /> {newsItem.category}</span>
                  <span className={styles.tag}><FiTag /> University News</span>
                </div>
                <button className={styles.shareBtn}>
                  <FiShare2 /> Share Article
                </button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>Related News</h3>
                <div className={styles.relatedList}>
                  {relatedNews.map(item => (
                    <Link key={item.id} to={`/news/${item.id}`} className={styles.relatedCard}>
                      <div className={styles.relatedImage}>
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className={styles.relatedInfo}>
                        <h4 className={styles.relatedTitle}>{item.title}</h4>
                        <span className={styles.relatedDate}>{formatDate(item.date)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className={styles.newsletterCard}>
                <h3>Stay Updated</h3>
                <p>Subscribe to our newsletter to receive the latest MIU news and updates.</p>
                <form className={styles.newsletterForm} onSubmit={e => e.preventDefault()}>
                  <input type="email" placeholder="Enter your email" required />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default NewsDetailPage;
