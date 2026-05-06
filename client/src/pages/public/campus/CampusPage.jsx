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
    <div id="hero"><CampusHero /></div>
    <div id="buildings"><BuildingFinder /></div>
    <div id="facilities"><CampusFacilities /></div>
    <div id="dining"><RestaurantMenus /></div>
    <div id="events"><CampusEvents /></div>
    <div id="contact"><CampusContact /></div>
  </motion.main>
);

export default CampusPage;
