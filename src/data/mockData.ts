import { Department, Doctor, PatientReview } from '../types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    iconName: 'HeartPulse',
    tagline: 'Comprehensive Heart & Vascular Care',
    description: 'Advanced diagnostic screening, preventive cardiology, coronary interventions, and specialized heart health management.',
    doctorCount: 8,
    commonConditions: ['Hypertension', 'Arrhythmia', 'Coronary Artery Disease', 'Heart Failure'],
    features: ['Non-invasive ECG & Echo', '24/7 Cardiac Care Unit', 'Preventive Lipid Clinics']
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    iconName: 'Sparkles',
    tagline: 'Clinical & Cosmetic Skin Health',
    description: 'Expert medical diagnosis for complex skin, hair, and nail conditions alongside state-of-the-art dermatological therapeutics.',
    doctorCount: 6,
    commonConditions: ['Eczema & Psoriasis', 'Acne Vulgaris', 'Skin Cancer Screening', 'Allergic Dermatitis'],
    features: ['Digital Dermoscopy', 'Minor Skin Procedures', 'Pediatric Dermatology']
  },
  {
    id: 'general-medicine',
    name: 'General Medicine',
    iconName: 'Stethoscope',
    tagline: 'Primary Healthcare & Preventive Medicine',
    description: 'Holistic clinical assessments, chronic disease management, seasonal infection diagnosis, and routine wellness checkups.',
    doctorCount: 12,
    commonConditions: ['Type 2 Diabetes', 'Acute Respiratory Infections', 'Hypertension', 'Digestive Disorders'],
    features: ['Annual Health Screening', 'Vaccination Program', 'Chronic Disease Counseling']
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    iconName: 'Baby',
    tagline: 'Gentle, Specialized Care for Children',
    description: 'Compassionate, age-appropriate medical care from newborn neonatology through adolescent developmental milestones.',
    doctorCount: 9,
    commonConditions: ['Childhood Asthma', 'Developmental Milestones', 'Nutritional Deficiencies', 'Common Pediatric Fevers'],
    features: ['Child-Friendly Suites', 'Growth Tracking Clinics', 'Pediatric Emergency Support']
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    iconName: 'Bone',
    tagline: 'Bone, Joint & Musculoskeletal Specialists',
    description: 'Comprehensive non-surgical and surgical solutions for joint pain, sports injuries, fractures, and spinal conditions.',
    doctorCount: 7,
    commonConditions: ['Osteoarthritis', 'Sports Ligament Tears', 'Disc Herniation', 'Bone Fractures'],
    features: ['Robotic Joint Replacement', 'In-house Physical Therapy', 'Minimally Invasive Arthroscopy']
  },
  {
    id: 'neurology',
    name: 'Neurology',
    iconName: 'Brain',
    tagline: 'Brain, Nerve & Spinal Cord Expertise',
    description: 'Cutting-edge neurodiagnostic evaluation and dedicated therapeutic pathways for acute and chronic neurological disorders.',
    doctorCount: 5,
    commonConditions: ['Migraine & Chronic Headaches', 'Epilepsy & Seizures', 'Parkinson’s Disease', 'Neuropathies'],
    features: ['High-Resolution Neuroimaging', 'EEG & EMG Labs', 'Memory & Cognitive Assessment']
  },
  {
    id: 'gynecology',
    name: 'Gynecology & Obstetrics',
    iconName: 'Activity',
    tagline: 'Dedicated Women’s Health Across All Life Stages',
    description: 'Compassionate obstetrical care, routine gynecological screenings, reproductive endocrinology, and minimally invasive surgeries.',
    doctorCount: 8,
    commonConditions: ['Prenatal Care', 'PCOS & Hormonal Imbalance', 'Endometriosis', 'Menopause Transition'],
    features: ['Advanced 4D Ultrasound', 'Birthing Suites', 'Minimally Invasive Laparoscopy']
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    iconName: 'Eye',
    tagline: 'Advanced Vision Care & Eye Surgery',
    description: 'Precision diagnostic testing, custom cataract surgery, glaucoma therapies, and retinal care to preserve and enhance eyesight.',
    doctorCount: 5,
    commonConditions: ['Cataracts', 'Glaucoma', 'Diabetic Retinopathy', 'Refractive Vision Errors'],
    features: ['Laser Refractive Suite', 'Optical Coherence Tomography', 'Corneal Diagnostics']
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-sarah-wilson',
    name: 'Dr. Sarah Wilson',
    title: 'M.D., FACP',
    departmentId: 'general-medicine',
    departmentName: 'General Medicine',
    specialization: 'Senior Internal Medicine Physician',
    qualifications: 'MBBS, MD (Internal Medicine), Johns Hopkins Fellowship',
    experienceYears: 14,
    consultationFee: 75,
    rating: 4.9,
    reviewCount: 142,
    about: 'Dr. Sarah Wilson is a renowned internist dedicated to holistic adult patient care, evidence-based preventive screenings, and personalized chronic disease management. She emphasizes thorough diagnostic communication and long-term wellness.',
    expertise: ['Preventive Medicine', 'Metabolic Syndrome', 'Cardiovascular Risk Prevention', 'Adult Immunization'],
    education: [
      'MD in Internal Medicine - Johns Hopkins University School of Medicine',
      'Clinical Residency - Massachusetts General Hospital',
      'B.S. in Biology - Stanford University'
    ],
    languages: ['English', 'Spanish'],
    consultationTypes: ['In-Person', 'Video Consultation'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM', '04:45 PM'],
    hospitalLocation: 'CareConnect Main Tower, Wing A',
    roomNumber: 'Suite 302',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'doc-james-carter',
    name: 'Dr. James Carter',
    title: 'M.D., FACC',
    departmentId: 'cardiology',
    departmentName: 'Cardiology',
    specialization: 'Consultant Interventional Cardiologist',
    qualifications: 'MD, DM (Cardiology), Harvard Medical School Fellow',
    experienceYears: 18,
    consultationFee: 120,
    rating: 4.95,
    reviewCount: 218,
    about: 'Dr. James Carter has over 18 years of clinical leadership in adult cardiology. He specializes in coronary angiography, structural heart evaluations, and comprehensive hypertension management with an empathetic approach.',
    expertise: ['Coronary Angiography', 'Arrhythmia Management', 'Heart Failure Therapy', 'Hypertension Control'],
    education: [
      'Cardiology Fellowship - Harvard Medical School',
      'MD in General Medicine - Columbia University Vagelos College of Physicians',
      'Fellow of the American College of Cardiology (FACC)'
    ],
    languages: ['English'],
    consultationTypes: ['In-Person', 'Video Consultation'],
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    availableSlots: ['08:30 AM', '11:00 AM', '01:30 PM', '03:00 PM'],
    hospitalLocation: 'CareConnect Heart Center, Level 2',
    roomNumber: 'Suite 214',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'doc-priya-nair',
    name: 'Dr. Priya Nair',
    title: 'M.D., FAAD',
    departmentId: 'dermatology',
    departmentName: 'Dermatology',
    specialization: 'Senior Consultant Dermatologist',
    qualifications: 'MD (Dermatology & Venereology), DNB',
    experienceYears: 11,
    consultationFee: 90,
    rating: 4.88,
    reviewCount: 167,
    about: 'Dr. Priya Nair provides specialized clinical dermatologic care, focusing on autoimmune dermatoses, chronic eczema, acne management, and digital dermoscopy for early skin lesion identification.',
    expertise: ['Clinical Dermatology', 'Eczema & Psoriasis', 'Acne Scar Protocols', 'Mole Mapping & Dermoscopy'],
    education: [
      'Residency in Dermatology - Yale New Haven Health',
      'Doctor of Medicine (M.D.) - Baylor College of Medicine',
      'Fellow of the American Academy of Dermatology'
    ],
    languages: ['English', 'Hindi'],
    consultationTypes: ['In-Person', 'Video Consultation'],
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    availableSlots: ['10:00 AM', '11:30 AM', '02:30 PM', '04:00 PM'],
    hospitalLocation: 'CareConnect Specialty Pavilion, Wing C',
    roomNumber: 'Suite 410',
    imageUrl: 'https://images.unsplash.com/photo-1594824813571-638f02614d3f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'doc-michael-lee',
    name: 'Dr. Michael Lee',
    title: 'M.D., FAAOS',
    departmentId: 'orthopedics',
    departmentName: 'Orthopedics',
    specialization: 'Orthopedic & Joint Reconstruction Surgeon',
    qualifications: 'MD, MS (Orthopedic Surgery), Mayo Clinic Fellow',
    experienceYears: 16,
    consultationFee: 110,
    rating: 4.92,
    reviewCount: 185,
    about: 'Dr. Michael Lee is a board-certified orthopedic surgeon renowned for precision knee and hip arthroplasty, complex sports medicine reconstructions, and conservative pain management.',
    expertise: ['Knee & Hip Replacement', 'ACL Reconstruction', 'Rotator Cuff Repair', 'Musculoskeletal Trauma'],
    education: [
      'Adult Reconstruction Fellowship - Mayo Clinic',
      'Residency in Orthopedic Surgery - Northwestern Memorial',
      'M.D. - University of Pennsylvania Perelman School of Medicine'
    ],
    languages: ['English', 'Mandarin'],
    consultationTypes: ['In-Person'],
    availableDays: ['Monday', 'Tuesday', 'Thursday'],
    availableSlots: ['08:00 AM', '09:45 AM', '01:00 PM', '03:15 PM'],
    hospitalLocation: 'CareConnect Orthopedic Institute',
    roomNumber: 'Suite 108',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'doc-elena-rostova',
    name: 'Dr. Elena Rostova',
    title: 'M.D., FAAP',
    departmentId: 'pediatrics',
    departmentName: 'Pediatrics',
    specialization: 'Chief Pediatrician & Child Specialist',
    qualifications: 'MD (Pediatrics), Boston Children’s Hospital Fellow',
    experienceYears: 13,
    consultationFee: 70,
    rating: 4.97,
    reviewCount: 230,
    about: 'Dr. Elena Rostova creates an extraordinarily gentle, welcoming environment for infants, children, and parents. Her clinical focus ranges from neonatal developmental surveillance to pediatric asthma therapy.',
    expertise: ['Childhood Asthma Care', 'Newborn Screening', 'Pediatric Nutrition', 'Developmental Assessments'],
    education: [
      'Pediatric Fellowship - Boston Children’s Hospital',
      'Pediatrics Residency - Seattle Children’s Hospital',
      'M.D. - University of Washington School of Medicine'
    ],
    languages: ['English', 'Russian'],
    consultationTypes: ['In-Person', 'Video Consultation'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday'],
    availableSlots: ['09:15 AM', '11:00 AM', '01:45 PM', '03:30 PM', '05:00 PM'],
    hospitalLocation: 'CareConnect Children’s Pavilion',
    roomNumber: 'Suite 201',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'doc-marcus-vance',
    name: 'Dr. Marcus Vance',
    title: 'M.D., FAAN',
    departmentId: 'neurology',
    departmentName: 'Neurology',
    specialization: 'Senior Consultant Neurologist',
    qualifications: 'MD, PhD (Neuroscience), UCSF Fellow',
    experienceYears: 19,
    consultationFee: 130,
    rating: 4.91,
    reviewCount: 140,
    about: 'Dr. Marcus Vance combines deep clinical neuroscience research with compassionate bedside patient care. He specializes in migraine mitigation, epilepsy therapies, and early neurodegenerative diagnoses.',
    expertise: ['Refractory Migraines', 'Epilepsy & EEG Analysis', 'Peripheral Neuropathy', 'Tremor & Movement Disorders'],
    education: [
      'Neurophysiology Fellowship - UCSF Health',
      'Neurology Residency - UCLA Medical Center',
      'MD / PhD in Neuroscience - Johns Hopkins'
    ],
    languages: ['English'],
    consultationTypes: ['In-Person', 'Video Consultation'],
    availableDays: ['Tuesday', 'Wednesday', 'Thursday'],
    availableSlots: ['09:30 AM', '11:15 AM', '02:00 PM', '04:15 PM'],
    hospitalLocation: 'CareConnect Neurosciences Center',
    roomNumber: 'Suite 505',
    imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'doc-ananya-gupta',
    name: 'Dr. Ananya Gupta',
    title: 'M.D., FACOG',
    departmentId: 'gynecology',
    departmentName: 'Gynecology & Obstetrics',
    specialization: 'Obstetrician & Gynecologist',
    qualifications: 'MD, MS (OB/GYN), Cleveland Clinic Fellow',
    experienceYears: 15,
    consultationFee: 85,
    rating: 4.93,
    reviewCount: 192,
    about: 'Dr. Ananya Gupta provides compassionate, evidence-based care through every milestone of a woman’s life, including high-risk pregnancy management, hormonal balancing for PCOS, and gentle surgical solutions.',
    expertise: ['High-Risk Obstetrics', 'PCOS & Reproductive Health', 'Minimally Invasive Surgery', 'Menopause Management'],
    education: [
      'Advanced Laparoscopy Fellowship - Cleveland Clinic',
      'OB/GYN Residency - Brigham and Women’s Hospital',
      'M.D. - Cornell University Weill Medical College'
    ],
    languages: ['English', 'Hindi', 'Gujarati'],
    consultationTypes: ['In-Person', 'Video Consultation'],
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    availableSlots: ['08:45 AM', '10:30 AM', '01:15 PM', '03:45 PM'],
    hospitalLocation: 'CareConnect Women & Family Pavilion',
    roomNumber: 'Suite 312',
    imageUrl: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'doc-david-chen',
    name: 'Dr. David Chen',
    title: 'M.D., FACS',
    departmentId: 'ophthalmology',
    departmentName: 'Ophthalmology',
    specialization: 'Ophthalmic Surgeon & Retinal Specialist',
    qualifications: 'MD, Wilmer Eye Institute Fellow',
    experienceYears: 12,
    consultationFee: 95,
    rating: 4.89,
    reviewCount: 115,
    about: 'Dr. David Chen is dedicated to preserving clear vision using state-of-the-art diagnostic imaging and microscopic laser surgery. He specializes in cataract microsurgery and medical retina care.',
    expertise: ['Micro-incision Cataract Surgery', 'Glaucoma Laser Therapy', 'Macular Degeneration', 'Dry Eye Syndromes'],
    education: [
      'Vitreoretinal Fellowship - Wilmer Eye Institute',
      'Ophthalmology Residency - Wills Eye Hospital',
      'M.D. - Duke University School of Medicine'
    ],
    languages: ['English', 'Mandarin'],
    consultationTypes: ['In-Person'],
    availableDays: ['Tuesday', 'Thursday', 'Friday'],
    availableSlots: ['09:00 AM', '10:45 AM', '02:15 PM', '04:00 PM'],
    hospitalLocation: 'CareConnect Eye & Laser Center',
    roomNumber: 'Suite 104',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600'
  }
];

export const MOCK_REVIEWS: PatientReview[] = [
  {
    id: 'rev-1',
    doctorId: 'doc-sarah-wilson',
    patientName: 'Robert Martinez',
    rating: 5,
    date: '3 days ago',
    comment: 'Dr. Wilson took the time to review all my bloodwork in detail and explained my cardiovascular markers without rushing. Scheduling through CareConnect took less than 2 minutes!',
    verifiedVisit: true
  },
  {
    id: 'rev-2',
    doctorId: 'doc-sarah-wilson',
    patientName: 'Emily Chen',
    rating: 5,
    date: '1 week ago',
    comment: 'Extremely polite, knowledgeable, and observant. The clinic reception had my CareConnect booking ready immediately upon check-in.',
    verifiedVisit: true
  },
  {
    id: 'rev-3',
    doctorId: 'doc-james-carter',
    patientName: 'David S.',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Dr. Carter’s depth of expertise in cardiology gave our family complete peace of mind. He answered every question with genuine patience.',
    verifiedVisit: true
  },
  {
    id: 'rev-4',
    doctorId: 'doc-priya-nair',
    patientName: 'Jessica Taylor',
    rating: 5,
    date: '5 days ago',
    comment: 'My eczema had flared up severely. Dr. Nair tailored a modern topical plan that cleared it up within 10 days. Outstanding physician.',
    verifiedVisit: true
  },
  {
    id: 'rev-5',
    doctorId: 'doc-elena-rostova',
    patientName: 'Mark & Sarah Miller',
    rating: 5,
    date: 'Last month',
    comment: 'Our 4-year-old was terrified of doctor visits until we met Dr. Elena. She has a magical, gentle way with kids. Cannot recommend her enough.',
    verifiedVisit: true
  }
];

export const FAQS = [
  {
    question: 'How do I book an appointment on CareConnect?',
    answer: 'Select your preferred medical department, pick a specialist or general physician, choose a convenient date and time slot, and fill in basic patient details. You will receive an instant appointment confirmation reference code.'
  },
  {
    question: 'Can I choose between in-person hospital visits and video consultations?',
    answer: 'Yes! Participating doctors offer both in-person visits at CareConnect hospital suites and encrypted video telehealth consultations. You can filter doctors specifically by consultation type.'
  },
  {
    question: 'Is CareConnect completely free for patients to schedule?',
    answer: 'Yes, booking through the CareConnect portal has no booking fee or hidden surcharge. The consultation fee displayed is paid directly at the hospital clinic or during check-in.'
  },
  {
    question: 'How do I reschedule or cancel my booked appointment?',
    answer: 'You can navigate to the "Appointments" tab and switch to "My Appointments". From there, you can view your active bookings and cancel or reschedule anytime with a single click.'
  },
  {
    question: 'What should I bring to my hospital appointment?',
    answer: 'Please bring your CareConnect appointment reference code, a valid photo identification card, your health insurance card if applicable, and any recent lab reports or current medication lists.'
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'demo-appt-1',
    referenceNumber: 'CC-2026-8942',
    doctorId: 'doc-sarah-wilson',
    doctorName: 'Dr. Sarah Wilson',
    doctorSpecialization: 'Senior Internal Medicine Physician',
    doctorDepartment: 'General Medicine',
    patientName: 'Alex Morgan',
    patientEmail: 'alex.morgan@example.com',
    patientPhone: '+1 (555) 234-8901',
    consultationType: 'In-Person' as const,
    date: '2026-10-14',
    timeSlot: '10:30 AM',
    reasonForVisit: 'Annual routine health assessment & blood pressure check',
    status: 'Confirmed' as const,
    consultationFee: 75,
    bookedAt: '2026-10-10T14:30:00Z'
  },
  {
    id: 'demo-appt-2',
    referenceNumber: 'CC-2026-9104',
    doctorId: 'doc-priya-nair',
    doctorName: 'Dr. Priya Nair',
    doctorSpecialization: 'Senior Consultant Dermatologist',
    doctorDepartment: 'Dermatology',
    patientName: 'Alex Morgan',
    patientEmail: 'alex.morgan@example.com',
    patientPhone: '+1 (555) 234-8901',
    consultationType: 'Video Consultation' as const,
    date: '2026-10-18',
    timeSlot: '02:30 PM',
    reasonForVisit: 'Follow-up consultation for eczema treatment plan',
    status: 'Confirmed' as const,
    consultationFee: 90,
    bookedAt: '2026-10-09T11:15:00Z'
  }
];
