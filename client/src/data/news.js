/**
 * @fileoverview Mock data for university news and events.
 */
export const NEWS = [
  {
    id: 1,
    title: 'MIU Ranks Among Top Private Universities in Egypt',
    excerpt: 'The latest global rankings place MIU as a leader in educational quality and student satisfaction.',
    content: `
      <p>Misr International University (MIU) is proud to announce its latest achievement in the global university rankings. This year, MIU has been recognized as one of the top private universities in Egypt, reflecting our commitment to academic excellence and student success.</p>
      <p>The ranking criteria included teaching quality, research output, international outlook, and graduate employability. MIU scored exceptionally high in student satisfaction and industry partnerships, ensuring our graduates are well-prepared for the competitive job market.</p>
      <h3>A Commitment to Quality</h3>
      <p>This recognition is a testament to the hard work of our faculty members and the dedication of our students. We continue to invest in our infrastructure and curriculum to maintain these high standards.</p>
    `,
    date: '2024-03-15',
    category: 'Achievement',
    image: '/src/assets/images/tools/campus.webp',
    author: 'Academic Office',
    featured: true,
  },
  {
    id: 2,
    title: 'New Artificial Intelligence Lab Opens in Engineering Faculty',
    excerpt: 'Equipped with state-of-the-art GPUs and robotics kits, the new lab will host advanced research projects.',
    content: `
      <p>The Faculty of Engineering at MIU has officially inaugurated its new Artificial Intelligence and Robotics Laboratory. This facility is designed to provide students with hands-on experience in cutting-edge technologies.</p>
      <p>Equipped with high-performance workstations, state-of-the-art GPUs, and a variety of robotics hardware, the lab will serve as a hub for innovation and research. It will support undergraduate projects as well as advanced faculty research in machine learning, computer vision, and autonomous systems.</p>
      <blockquote>"This lab represents a significant leap forward in our technological capabilities," said the Dean of Engineering.</blockquote>
    `,
    date: '2024-03-12',
    category: 'Facility',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    author: 'Engineering Dept',
    featured: false,
  },
  {
    id: 3,
    title: 'Registration for Summer Semester 2024 Now Open',
    excerpt: 'Students can now register for summer courses via the student portal. Early bird registration ends soon.',
    content: `
      <p>Academic registration for the Summer 2024 semester is now officially open for all MIU students. A wide variety of core and elective courses are available across all faculties.</p>
      <p>Registration can be completed entirely online through the Student Portal. We encourage students to register early to secure their spots in preferred sections. Please consult with your academic advisor before finalizing your course selection.</p>
      <ul>
        <li>Early Bird Registration: Until April 15</li>
        <li>Late Registration: May 1 - May 10</li>
        <li>Classes Begin: June 1, 2024</li>
      </ul>
    `,
    date: '2024-03-10',
    category: 'Academic',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
    author: 'Registrar Office',
    featured: false,
  },
  {
    id: 4,
    title: 'Annual Career Fair to Host 50+ Global Companies',
    excerpt: 'Connect with top employers and explore internship opportunities at the upcoming MIU Career Fair.',
    content: `
      <p>MIU is excited to announce our Annual Career Fair, scheduled for next month. This year's event will host over 50 leading local and international companies from various sectors including technology, finance, marketing, and engineering.</p>
      <p>This fair provides a unique platform for students to network with industry professionals, learn about current market trends, and apply for internships and full-time positions.</p>
      <p>Don't forget to bring several copies of your updated resume and dress professionally!</p>
    `,
    date: '2024-03-08',
    category: 'Event',
    image: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=800',
    author: 'Career Center',
    featured: false,
  }
];
