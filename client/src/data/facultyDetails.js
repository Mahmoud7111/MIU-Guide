/**
 * @fileoverview Structured content for faculty pages.
 */
import alsunHero from '@/assets/images/faculty/alsun-banner-bg.png';
import businessHero from '@/assets/images/faculty/business.webp';
import computerScienceHero from '@/assets/images/faculty/computer-science-grad-students.webp';
import dentistryHero from '@/assets/images/faculty/Dentistry.webp';
import engineeringHero from '@/assets/images/faculty/enginner.webp';
import massComHero from '@/assets/images/faculty/Mass Com.webp';
import pharmacyHero from '@/assets/images/faculty/Dr.-Paine-Lab-Pharmacy-.webp';

const placeholderContent = 'Details will be available soon.';

export const FACULTY_DETAILS = {
  'engineering': {
    name: 'Faculty of Engineering Sciences & Arts',
    shortName: 'Engineering Sciences & Arts',
    heroImage: engineeringHero,
    heroSubtitle: 'Design, build, and innovate through industry-aligned engineering education.',
    quickFacts: [
      { label: 'Programs', value: 'Undergraduate & graduate tracks' },
      { label: 'Focus Areas', value: 'Design, systems, technology' },
      { label: 'Learning Model', value: 'Hands-on labs & projects' },
      { label: 'Career Paths', value: 'Engineering & research' },
    ],
    sections: [
      {
        id: 'about',
        title: 'About Our Faculty',
        content: [
          'We are delighted to welcome you to the Faculty of Engineering Sciences & Arts, Misr International University. We are certain that your experience at MIU will be fruitful and challenging.',
          'The Faculty offers degree programs in the fields of Architecture and Electronics and Communications with the primary goal of providing students with outstanding scientific and technical competence to enable them to contribute effectively to the development of their societies. You will be taught by highly qualified staff members in the areas of academia we are specialized in.',
          'The Faculty offers a motivating and supporting environment for any student who wants to experience state-of-the-art curricula in Engineering science and technology. We encourage you to excel and innovate in your studies and extracurricular activities.'
        ]
      },
      {
        id: 'dean-message',
        title: 'Message from the Dean',
        tone: 'callout',
        content: [
          'We are certain that your experience at MIU will be fruitful and challenging. We look forward to supporting your academic and professional journey.'
        ],
        attribution: 'Professor Hassan Ahmed El Ghitani, Dean'
      },
      { id: 'vision-mission', title: 'Vision & Mission', content: [placeholderContent] },
      { id: 'strategic-objectives', title: 'Strategic Objectives', content: [placeholderContent] },
      { id: 'admissions-regulations', title: 'Admissions Regulations', content: [placeholderContent] },
      { id: 'advising-procedures', title: 'Advising Procedures', content: [placeholderContent] },
      { id: 'academic-regulations', title: 'Academic Regulations', content: [placeholderContent] },
      { id: 'academic-program', title: 'Academic Program', content: [placeholderContent] },
      { id: 'services-facilities', title: 'Services & Facilities', content: [placeholderContent] },
      { id: 'quality-assurance', title: 'Quality Assurance', content: [placeholderContent] },
      { id: 'community-services', title: 'Community Services', content: [placeholderContent] },
      { id: 'student-code', title: 'Student Code of Conduct', content: [placeholderContent] },
      { id: 'student-guide', title: 'Student Guide 2025-2026', content: [placeholderContent] },
      { id: 'code-ethics', title: 'Code of Ethics', content: [placeholderContent] },
      { id: 'announcements', title: 'Announcements', content: [placeholderContent] },
    ]
  },
  'alsun': {
    name: 'Faculty of Applied Linguistics (Al-Alsun)',
    shortName: 'Al-Alsun',
    heroImage: alsunHero,
    heroSubtitle: 'Explore applied linguistics, translation, and literature through practice-led learning.',
    quickFacts: [
      { label: 'Focus Areas', value: 'Translation, Linguistics, Literature' },
      { label: 'Learning Model', value: 'Practice-led, research-driven' },
      { label: 'Facilities', value: 'Interpreting, digital & multimedia labs' },
      { label: 'Career Paths', value: 'Teaching, translation, media' },
    ],
    sections: [
      {
        id: 'about',
        title: 'About Our Faculty',
        content: [
          'Welcome to the Faculty of Applied Linguistics (Al-Alsun) at Misr International University.',
          'The Faculty offers a variety of courses in different areas of the English language that aim at providing students with broad knowledge and intellectual skills for positions of responsibility in the professional world. The Program provides a practical focus that involves real-world discussion, research, and hands-on learning in language, translation, and literature.',
          'Students benefit from state-of-the-art interpreting labs, computer labs, and digital and multimedia labs, in addition to specialist software supporting subtitling and computer-assisted translation. Graduates pursue careers in teaching, translation and interpretation, tourism, journalism, public relations, and communications media.'
        ]
      },
      {
        id: 'dean-message',
        title: 'Message from the Dean',
        tone: 'callout',
        content: [
          'I invite you to explore our programs and learning environment to discover how Al-Alsun prepares students for a global, multilingual future.'
        ],
        attribution: 'Professor Maha Fathi'
      },
      { id: 'vision-mission', title: 'Vision & Mission', content: [placeholderContent] },
      { id: 'strategic-objectives', title: 'Strategic Objectives', content: [placeholderContent] },
      { id: 'admissions-regulations', title: 'Admissions Regulations', content: [placeholderContent] },
      { id: 'advising-procedures', title: 'Advising Procedures', content: [placeholderContent] },
      { id: 'academic-regulations', title: 'Academic Regulations', content: [placeholderContent] },
      { id: 'academic-program', title: 'Academic Program', content: [placeholderContent] },
      { id: 'services-facilities', title: 'Services & Facilities', content: [placeholderContent] },
      { id: 'quality-assurance', title: 'Quality Assurance', content: [placeholderContent] },
      { id: 'community-services', title: 'Community Services', content: [placeholderContent] },
      { id: 'student-code', title: 'Student Code of Conduct', content: [placeholderContent] },
      { id: 'student-guide', title: 'Student Guide 2025-2026', content: [placeholderContent] },
      { id: 'code-ethics', title: 'Code of Ethics', content: [placeholderContent] },
      { id: 'news', title: 'News', content: [placeholderContent] },
      { id: 'alsun-workshops', title: 'Alsun Workshops', content: [placeholderContent] },
      { id: 'specialized-workshops', title: 'Specialized Workshops', content: [placeholderContent] },
      { id: 'organizational-structure', title: 'Organizational Structure', content: [placeholderContent] },
      { id: 'research-ethics-guide', title: 'دليل أخلاقيات البحث العلمي', content: [placeholderContent] },
      { id: 'audiovisual-translation', title: 'Audiovisual Translation Summer Training', content: [placeholderContent] },
      { id: 'translation-center', title: 'Center of Excellence in Translation and Localization', content: [placeholderContent] },
      { id: 'announcements', title: 'Announcements', content: [placeholderContent] },
    ]
  },
  'computer-science': {
    name: 'Faculty of Computer Science',
    shortName: 'Computer Science',
    heroImage: computerScienceHero,
    heroSubtitle: 'Build the future through software, data, and intelligent systems.',
    quickFacts: [
      { label: 'Programs', value: 'B.Sc., M.Sc., Diplomas' },
      { label: 'Focus Areas', value: 'AI, software, data science' },
      { label: 'Faculty', value: 'National & international expertise' },
      { label: 'Student Life', value: 'Tech clubs & competitions' },
    ],
    sections: [
      {
        id: 'about',
        title: 'About Our Faculty',
        content: [
          'The Faculty of Computer Science is excited to welcome new members of our community. We are committed to high-quality curricula and nurturing the talents of promising students while delivering cutting-edge science and technology.',
          'Our academic staff are well respected nationally and internationally. We believe universities enrich society by developing skills and building technology that improves quality of life. We also host many activities and invite all students to engage and contribute.'
        ]
      },
      {
        id: 'dean-message',
        title: 'Message from the Dean',
        tone: 'callout',
        content: [
          'We look forward to supporting your journey, encouraging innovation, and helping you build a strong foundation for a technology-driven future.'
        ],
        attribution: 'Associate Professor Ayman Nabil, Acting Dean'
      },
      { id: 'publications', title: "Publications' List", content: [placeholderContent] },
      { id: 'vision-mission', title: 'Vision & Mission', content: [placeholderContent] },
      { id: 'strategic-objectives', title: 'Strategic Objectives', content: [placeholderContent] },
      { id: 'admissions-regulations', title: 'Admissions Regulations', content: [placeholderContent] },
      { id: 'advising-procedures', title: 'Advising Procedures', content: [placeholderContent] },
      { id: 'academic-regulations', title: 'Academic Regulations', content: [placeholderContent] },
      { id: 'academic-program', title: 'Academic Program', content: [placeholderContent] },
      { id: 'services-facilities', title: 'Services & Facilities', content: [placeholderContent] },
      { id: 'quality-assurance', title: 'Quality Assurance', content: [placeholderContent] },
      { id: 'community-services', title: 'Community Services', content: [placeholderContent] },
      { id: 'student-code', title: 'Student Code of Conduct', content: [placeholderContent] },
      { id: 'student-guide', title: 'Student Guide 2025-2026', content: [placeholderContent] },
      { id: 'code-ethics', title: 'Code of Ethics', content: [placeholderContent] },
      { id: 'graduation-projects', title: 'Graduation Projects', content: [placeholderContent] },
    ]
  },
  'pharmacy': {
    name: 'Faculty of Pharmacy',
    shortName: 'Pharmacy',
    heroImage: pharmacyHero,
    heroSubtitle: 'Advance healthcare through rigorous pharmaceutical education and clinical practice.',
    quickFacts: [
      { label: 'Founded', value: '1997' },
      { label: 'Degree', value: 'B.Sc. in Pharmaceutical Sciences' },
      { label: 'Clinical Training', value: 'Cairo placements & visits' },
      { label: 'Graduated Classes', value: '21' },
    ],
    sections: [
      {
        id: 'about',
        title: 'About Our Faculty',
        content: [
          'Welcome to the Faculty of Pharmacy at Misr International University. The Faculty was founded in 1997 to offer the Bachelor Degree (B.Sc.) in Pharmaceutical Sciences. The first class graduated in 2001.',
          'The Faculty aims to improve the quality of health care in our country by graduating students who can provide pharmaceutical care in rural and urban environments. Our students receive a strong background in pharmaceutical sciences and acquire the necessary clinical expertise.',
          'Complementing this, and as indicated in the curricula, the students are exposed to pharmacy practice environment, lectures, seminars and laboratory sessions focusing on contemporary issues. The pharmacy students academic experience culminates in the final year with a series of visits for diverse pharmaceutical and clinical settings throughout Cairo.'
        ]
      },
      {
        id: 'dean-message',
        title: 'Message from the Dean',
        tone: 'callout',
        content: [
          'On behalf of the Faculty members we whole-heartedly welcome you. We are committed to a supportive environment that enables students to excel academically and professionally.'
        ],
        attribution: 'Professor Ahmed Emad El-Gendy, Dean'
      },
      {
        id: 'history-milestones',
        title: 'History & Milestones',
        content: [
          'The Faculty of Pharmacy - Misr International University was established in 1996 under the Law of Organizing Universities No. 49, 1972 and No. 101, 1992 concerning the establishment of private universities.',
          'The first Pharmacy students were enrolled in the academic year 1997/1998. The first class graduated in 2001.',
          'The total number of graduated classes is 21.'
        ]
      },
      { id: 'academic-program', title: 'Academic Program', content: [placeholderContent] },
      { id: 'clinical-training', title: 'Clinical Training', content: [placeholderContent] },
      { id: 'quality-assurance', title: 'Quality Assurance', content: [placeholderContent] },
      { id: 'community-services', title: 'Community Services', content: [placeholderContent] },
      { id: 'announcements', title: 'Announcements', content: [placeholderContent] },
    ]
  },
  'dentistry': {
    name: 'Faculty of Oral and Dental Medicine',
    shortName: 'Oral & Dental Medicine',
    heroImage: dentistryHero,
    heroSubtitle: 'Delivering excellence in education, patient care, and dental research.',
    quickFacts: [
      { label: 'Mission', value: 'Ethical community leaders' },
      { label: 'Clinics', value: 'Dental Clinics Complex' },
      { label: 'Programs', value: 'Under & postgraduate' },
      { label: 'Focus', value: 'Education, care, research' },
    ],
    sections: [
      {
        id: 'message-dean',
        title: 'Message from the Dean',
        tone: 'callout',
        content: [
          'Welcome to Misr International University - Faculty of Oral and Dental Medicine. Our mission is to graduate future academic and community leaders who have the capabilities and ethical decision-making skills to improve oral and general health.',
          'Our under and postgraduate programs provide a full array of top-rated educational opportunities delivered through devoted faculty members. Our Dental Clinics Complex serves the community through offering high-quality dental care and awareness to children and adults.'
        ],
        attribution: 'Professor Hossam Tewfik, Dean'
      },
      { id: 'about', title: 'About Our Faculty', content: [placeholderContent] },
      { id: 'vision-mission', title: 'Vision & Mission', content: [placeholderContent] },
      { id: 'core-values', title: 'Core Values', content: [placeholderContent] },
      { id: 'strategic-objectives', title: 'Strategic Objectives', content: [placeholderContent] },
      { id: 'faculty-staff', title: 'Faculty Staff & Organization', content: [placeholderContent] },
      { id: 'board-advisors', title: 'Board of Advisors', content: [placeholderContent] },
      { id: 'research-unit', title: 'Research Unit', content: [placeholderContent] },
      { id: 'journal-fcr', title: 'Journal of FCR', content: [placeholderContent] },
      { id: 'accreditation', title: 'Accreditation', content: [placeholderContent] },
      { id: 'admissions-regulations', title: 'Admissions Regulations', content: [placeholderContent] },
      { id: 'registration-regulations', title: 'Registration Regulations', content: [placeholderContent] },
      { id: 'academic-advising', title: 'Academic Advising', content: [placeholderContent] },
      { id: 'academic-program', title: 'Academic Program', content: [placeholderContent] },
      { id: 'services-facilities', title: 'Services & Facilities', content: [placeholderContent] },
      { id: 'dental-clinics', title: 'Dental Clinics Complex', content: [placeholderContent] },
      { id: 'quality-assurance', title: 'Quality Assurance', content: [placeholderContent] },
      { id: 'masters-program', title: "Master's Program", content: [placeholderContent] },
      { id: 'continuing-education', title: 'Continuing Dental Education', content: [placeholderContent] },
      { id: 'internship-training', title: 'Internship Training Program', content: [placeholderContent] },
      { id: 'staff-development', title: 'Staff Development', content: [placeholderContent] },
      { id: 'community-services', title: 'Community Services', content: [placeholderContent] },
      { id: 'student-clubs', title: "Students' Clubs Activities", content: [placeholderContent] },
      { id: 'international-affiliation', title: 'International Affiliation', content: [placeholderContent] },
    ]
  },
  'business': {
    name: 'Faculty of Business Administration',
    shortName: 'Business Administration',
    heroImage: businessHero,
    heroSubtitle: 'Lead with strategy, ethics, and a global business mindset.',
    quickFacts: [
      { label: 'Programs', value: 'Undergraduate & graduate' },
      { label: 'Focus Areas', value: 'Management, finance, marketing' },
      { label: 'Learning Model', value: 'Case studies & internships' },
      { label: 'Career Paths', value: 'Business & entrepreneurship' },
    ],
    sections: [
      {
        id: 'about',
        title: 'About Our Faculty',
        content: [
          'The Faculty of Business Administration and International Trade offers educational programs that are in line with international quality standards and prepare graduates to serve the community. Significant efforts are exerted by the faculty members and the teaching assistants to support educational capacities and self-learning through skill-oriented courses.',
          'Our Faculty pays close attention to exploring and meeting the job market needs through the integration between theory and practice. The Faculty is keen on supporting the academic level of students through collaboration programs with distinguished and top ranked European universities to help faculty and students maintain a competitive edge.',
          'To this end, the Faculty has developed and implemented a strategic plan that ensures the continuous fulfillment of its mission.'
        ]
      },
      {
        id: 'dean-message',
        title: 'Message from the Dean',
        tone: 'callout',
        content: [
          'We are committed to educational quality and preparing graduates to serve the community through a balance of theory and practice.'
        ],
        attribution: 'Dr. Ahmed Fekri, Acting Dean'
      },
      { id: 'vision-mission', title: 'Vision & Mission', content: [placeholderContent] },
      { id: 'strategic-objectives', title: 'Strategic Objectives', content: [placeholderContent] },
      { id: 'admissions-regulations', title: 'Admissions Regulations', content: [placeholderContent] },
      { id: 'advising-procedures', title: 'Advising Procedures', content: [placeholderContent] },
      { id: 'academic-regulations', title: 'Academic Regulations', content: [placeholderContent] },
      { id: 'academic-program', title: 'Academic Program', content: [placeholderContent] },
      { id: 'services-facilities', title: 'Services & Facilities', content: [placeholderContent] },
      { id: 'quality-assurance', title: 'Quality Assurance', content: [placeholderContent] },
      { id: 'community-services', title: 'Community Services', content: [placeholderContent] },
      { id: 'student-code', title: 'Student Code of Conduct', content: [placeholderContent] },
      { id: 'student-guide', title: 'Student Guide 2025-2026', content: [placeholderContent] },
      { id: 'code-ethics', title: 'Code of Ethics', content: [placeholderContent] },
      { id: 'announcements', title: 'Announcements', content: [placeholderContent] },
    ]
  },
  'mass-communication': {
    name: 'Faculty of Mass Communication',
    shortName: 'Mass Communication',
    heroImage: massComHero,
    heroSubtitle: 'Tell stories that move culture across media and platforms.',
    quickFacts: [
      { label: 'Programs', value: 'Journalism, PR, media' },
      { label: 'Focus Areas', value: 'Broadcast, digital, production' },
      { label: 'Learning Model', value: 'Studio-based, hands-on' },
      { label: 'Career Paths', value: 'Media & communications' },
    ],
    sections: [
      {
        id: 'about',
        title: 'About Our Faculty',
        content: [
          'Welcome to the Department of Mass Communication at Misr International University.',
          'The Department offers the students an opportunity to specialize in one of its three majors, Television Journalism, Radio and Television, and Integrated Marketing Communications. The Program offers a wide range of courses that provide the students with theoretical knowledge and practical skills that are critical in the workplace.',
          'In addition, the Mass Communication Program involves an internship which helps the students apply their knowledge to the real world and gain experience. The Department also offers a graduate program leading to an MA in comparative media studies, an interdisciplinary program designed to respond to the rapid changes in local and international media.',
          'The Department has state-of-the-art facilities including digital studios, Internet and multimedia labs and photography labs. The students also enjoy full-service library facilities including access to many electronic resources and databases.',
          'Graduates of the Department have a wide range of employment and career opportunities available to them, including publishing, broadcasting, TV and radio production, public relations, marketing, and digital technologies.'
        ]
      },
      {
        id: 'dean-message',
        title: 'Message from the Dean',
        tone: 'callout',
        content: [
          'I invite you to explore our website to learn more about our programs and learning environment.'
        ],
        attribution: 'Professor Maha Fathi, Acting Dean, Faculty of Al Alsun and Mass Communication'
      },
      { id: 'vision-mission', title: 'Vision & Mission', content: [placeholderContent] },
      { id: 'strategic-objectives', title: 'Strategic Objectives', content: [placeholderContent] },
      { id: 'admissions-regulations', title: 'Admissions Regulations', content: [placeholderContent] },
      { id: 'advising-procedures', title: 'Advising Procedures', content: [placeholderContent] },
      { id: 'academic-regulations', title: 'Academic Regulations', content: [placeholderContent] },
      { id: 'academic-program', title: 'Academic Program', content: [placeholderContent] },
      { id: 'services-facilities', title: 'Services & Facilities', content: [placeholderContent] },
      { id: 'quality-assurance', title: 'Quality Assurance', content: [placeholderContent] },
      { id: 'community-services', title: 'Community Services', content: [placeholderContent] },
      { id: 'student-code', title: 'Student Code of Conduct', content: [placeholderContent] },
      { id: 'student-guide', title: 'Student Guide 2025-2026', content: [placeholderContent] },
      { id: 'code-ethics', title: 'Code of Ethics', content: [placeholderContent] },
      { id: 'announcements', title: 'Announcements', content: [placeholderContent] },
    ]
  },
};
