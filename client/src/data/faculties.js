/**
 * @fileoverview Mock data for university faculties.
 */
import alsunImage from '@/assets/images/faculty/alsun-banner-bg.png';
import businessImage from '@/assets/images/faculty/business.webp';
import computerScienceImage from '@/assets/images/faculty/computer-science-grad-students.webp';
import dentistryImage from '@/assets/images/faculty/Dentistry.webp';
import engineeringImage from '@/assets/images/faculty/enginner.webp';
import massComImage from '@/assets/images/faculty/Mass Com.webp';
import pharmacyImage from '@/assets/images/faculty/Dr.-Paine-Lab-Pharmacy-.webp';
export const FACULTIES = [
  {
    id: 'engineering',
    name: 'Faculty of Engineering Sciences & Arts',
    slug: 'engineering',
    icon: 'wrench',
    description: 'Preparing the next generation of engineers with cutting-edge technology and research.',
    image: engineeringImage,
    color: '#E63946',
    departments: ['Architecture', 'Electronics', 'Mechatronics', 'Computer Engineering'],
  },
  {
    id: 'computer-science',
    name: 'Faculty of Computer Science',
    slug: 'computer-science',
    icon: 'cpu',
    description: 'Advancing software, data, and AI through a future-focused computing curriculum.',
    image: computerScienceImage,
    color: '#264653',
    departments: ['Computer Science', 'Software Engineering', 'Artificial Intelligence'],
  },
  {
    id: 'pharmacy',
    name: 'Faculty of Pharmacy',
    slug: 'pharmacy',
    icon: 'pill',
    description: 'A leading center for pharmaceutical education and drug research in the region.',
    image: pharmacyImage,
    color: '#457B9D',
    departments: ['Clinical Pharmacy', 'Pharmacology', 'Pharmaceutical Chemistry'],
  },
  {
    id: 'business',
    name: 'Faculty of Business Administration',
    slug: 'business',
    icon: 'briefcase',
    description: 'Fostering innovative leadership and ethical business practices in a global economy.',
    image: businessImage,
    color: '#2A9D8F',
    departments: ['Accounting', 'Finance', 'Marketing', 'MIS'],
  },
  {
    id: 'dentistry',
    name: 'Faculty of Dentistry',
    slug: 'dentistry',
    icon: 'activity',
    description: 'Providing world-class dental education and community healthcare services.',
    image: dentistryImage,
    color: '#8B0000',
    departments: ['Oral Surgery', 'Orthodontics', 'Pedodontics'],
  },
  {
    id: 'communication',
    name: 'Faculty of Mass Communication',
    slug: 'mass-communication',
    icon: 'radio',
    description: 'Empowering voices and shaping the future of media and journalism.',
    image: massComImage,
    color: '#F4A261',
    departments: ['Journalism', 'Public Relations', 'Radio & TV'],
  },
  {
    id: 'alsun',
    name: 'Faculty of Alsun (Languages)',
    slug: 'alsun',
    icon: 'languages',
    description: 'Bridging cultures through language mastery, translation, and literature studies.',
    image: alsunImage,
    color: '#6A4C93',
    departments: ['English', 'German', 'Spanish', 'Italian'],
  }
];
