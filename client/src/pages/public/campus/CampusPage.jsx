import { motion } from 'framer-motion';
import { pageTransition } from '@/lib/motion/variants';
import CampusHero from './sections/CampusHero';
import BuildingFinder from './sections/BuildingFinder';
import RestaurantMenus from './sections/RestaurantMenus';
import CampusFacilities from './sections/CampusFacilities';
import CampusEvents from './sections/CampusEvents';
import CampusContact from './sections/CampusContact';

const CampusPage = () => (
  <motion.main
    variants={pageTransition}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    <CampusHero />
    <BuildingFinder />
    <CampusFacilities />
    <RestaurantMenus />
    <CampusEvents />
    <CampusContact />
  </motion.main>
);

export default CampusPage;
