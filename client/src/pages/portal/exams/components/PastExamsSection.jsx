import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import PastExamCard from './PastExamCard';
import styles from '../ExamsPage.module.css';

/**
 * PastExamsSection - Collapsible section for past exams
 *
 * @param {Object} props
 * @param {Array} props.pastExams - List of past exams
 * @param {boolean} props.collapsed - State of the section
 * @param {function} props.setCollapsed - Setter for collapsed state
 */
const PastExamsSection = ({ pastExams, collapsed, setCollapsed }) => {
  return (
    <div style={{ marginTop: 'var(--space-8)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <h2 className={styles.sectionTitle}>
          Past Exams
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', fontWeight: 400 }}>
            ({pastExams.length})
          </span>
        </h2>
        
        <Button variant="outline" size="small" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? 'Show Past Exams ▼' : 'Hide ▲'}
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            {pastExams.length > 0 ? (
              pastExams.map(exam => (
                <PastExamCard key={exam.id} exam={exam} />
              ))
            ) : (
              <EmptyState 
                icon="archive"
                title="No past exams yet"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PastExamsSection;
