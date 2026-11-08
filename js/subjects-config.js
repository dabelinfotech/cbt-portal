/**
 * ============================================================================
 * JAMB UTME SUBJECTS CONFIGURATION & OFFICIAL BROCHURE COMBINATION RULES
 * ============================================================================
 * Standard UTME Pattern:
 *  - 4 Subjects Total (Compulsory: Use of English + Any 3 Relevant Subjects)
 *  - Full UTME Question Allocation:
 *      * Use of English: 60 Questions (100 Marks)
 *      * 3 Other Subjects: 40 Questions each (100 Marks each)
 *      * Total: 180 Questions | 400 Aggregate Marks | 120 Minutes (2 Hours)
 */

window.UTME_QUESTION_BANK = window.UTME_QUESTION_BANK || {};

window.UTME_SUBJECTS = [
  {
    id: "english",
    code: "ENG-101",
    name: "Use of English",
    shortName: "Use of English",
    category: "COMPULSORY",
    compulsory: true,
    standardQuestions: 60,
    maxScore: 100,
    syllabusTopics: "Comprehension, Cloze Register, Lexis & Structure, Oral Forms, JAMB Novel (The Life Changer / The Lekki Headmaster)"
  },
  // SCIENCES & MATHEMATICS
  {
    id: "mathematics",
    code: "MTH-102",
    name: "Mathematics",
    shortName: "Mathematics",
    category: "SCIENCE",
    compulsory: false,
    standardQuestions: 40,
    maxScore: 100,
    syllabusTopics: "Number & Numeration, Algebra, Geometry & Trigonometry, Calculus, Statistics & Probability"
  },
  {
    id: "physics",
    code: "PHY-103",
    name: "Physics",
    shortName: "Physics",
    category: "SCIENCE",
    compulsory: false,
    standardQuestions: 40,
    maxScore: 100,
    syllabusTopics: "Mechanics, Thermal Physics, Waves & Optics, Electricity & Magnetism, Modern/Atomic Physics"
  },
  {
    id: "chemistry",
    code: "CHM-104",
    name: "Chemistry",
    shortName: "Chemistry",
    category: "SCIENCE",
    compulsory: false,
    standardQuestions: 40,
    maxScore: 100,
    syllabusTopics: "Stoichiometry, Atomic Structure, Gas Laws, Electrochemistry, Acids/Bases, Organic & Inorganic Chemistry"
  },
  {
    id: "biology",
    code: "BIO-105",
    name: "Biology",
    shortName: "Biology",
    category: "SCIENCE",
    compulsory: false,
    standardQuestions: 40,
    maxScore: 100,
    syllabusTopics: "Cell Biology, Organization of Life, Physiology, Ecology, Genetics & Variation, Evolution"
  },
  {
    id: "agric",
    code: "AGR-106",
    name: "Agricultural Science",
    shortName: "Agric Science",
    category: "SCIENCE",
    compulsory: false,
    standardQuestions: 40,
    maxScore: 100,
    syllabusTopics: "General Agriculture, Agronomy & Soil Science, Animal Production, Farm Mechanization, Agric Economics & Extension"
  },
  {
    id: "computer",
    code: "CMP-107",
    name: "Computer Studies",
    shortName: "Computer Studies",
    category: "SCIENCE",
    compulsory: false,
    standardQuestions: 40,
    maxScore: 100,
    syllabusTopics: "Computing History, Data Representation, Hardware & Logic Gates, Networking, Programming & Cybersecurity"
  },
  {
    id: "phe",
    code: "PHE-108",
    name: "Physical & Health Education",
    shortName: "PHE",
    category: "SCIENCE",
    compulsory: false,
    standardQuestions: 40,
    maxScore: 100,
    syllabusTopics: "Human Anatomy & Exercise Physiology, Athletics & Games, Communicable Diseases, First Aid & Community Health"
  },

  // COMMERCIAL & SOCIAL SCIENCES
  {
    id: "economics",
    code: "ECO-201",
    name: "Economics",
    shortName: "Economics",
    category: "COMMERCIAL",
    compulsory: false,
    standardQuestions: 40,
    maxScore: 100,
    syllabusTopics: "Demand & Supply, Elasticity, Production & Cost Theory, National Income, Money & Banking, Public Finance"
  },
  {
    id: "commerce",
    code: "COM-202",
    name: "Commerce",
    shortName: "Commerce",
    category: "COMMERCIAL",
    compulsory: false,
    standardQuestions: 40,
    maxScore: 100,
    syllabusTopics: "Trade, Business Units, Money & Banking, Insurance, Transport, Capital Market, Consumer Protection"
  },
  {
    id: "accounts",
    code: "ACC-203",
    name: "Principles of Accounts",
    shortName: "Accounts",
    category: "COMMERCIAL",
    compulsory: false,
    standardQuestions: 40,
    maxScore: 100,
    syllabusTopics: "Double Entry, Cash Book, Bank Reconciliation, Final Accounts, Depreciation, Partnership & Company Accounts"
  },
  {
    id: "government",
    code: "GOV-204",
    name: "Government",
    shortName: "Government",
    category: "COMMERCIAL",
    compulsory: false,
    standardQuestions: 40,
    maxScore: 100,
    syllabusTopics: "Organs & Systems of Government, Constitutions, Nigerian Constitutional Development, Public Corporations, International Organizations"
  },
  {
    id: "geography",
    code: "GEO-205",
    name: "Geography",
    shortName: "Geography",
    category: "COMMERCIAL",
    compulsory: false,
    standardQuestions: 40,
    maxScore: 100,
    syllabusTopics: "Physical Geography (Geomorphology, Climatology), Map Reading & GIS, Human & Regional Geography of Nigeria/Africa"
  },

  // ARTS & HUMANITIES
  {
    id: "literature",
    code: "LIT-301",
    name: "Literature-in-English",
    shortName: "Lit-in-English",
    category: "ARTS",
    compulsory: false,
    standardQuestions: 40,
    maxScore: 100,
    syllabusTopics: "Literary Appreciation, Figures of Speech, African & Non-African Drama, Prose & Poetry, Unseen Passage"
  },
  {
    id: "crs",
    code: "CRS-302",
    name: "Christian Religious Studies",
    shortName: "CRS",
    category: "ARTS",
    compulsory: false,
    standardQuestions: 40,
    maxScore: 100,
    syllabusTopics: "Sovereignty of God, Covenant, Leadership in Israel, Prophets, Synoptic Gospels, Acts of the Apostles & Epistles"
  },
  {
    id: "irs",
    code: "IRS-303",
    name: "Islamic Studies",
    shortName: "Islamic Studies",
    category: "ARTS",
    compulsory: false,
    standardQuestions: 40,
    maxScore: 100,
    syllabusTopics: "Qur'an & Tafsir, Hadith & Sunnah, Tawhid & Fiqh (Pillars of Islam), Sirah & Islamic History/Civilization"
  },
  {
    id: "civic",
    code: "CIV-304",
    name: "Civic Education",
    shortName: "Civic Education",
    category: "ARTS",
    compulsory: false,
    standardQuestions: 40,
    maxScore: 100,
    syllabusTopics: "Citizenship, Human Rights, Democracy & Rule of Law, National Values, Traffic Regulations, Cultism & Public Service"
  },
  {
    id: "history",
    code: "HIS-305",
    name: "History",
    shortName: "History",
    category: "ARTS",
    compulsory: false,
    standardQuestions: 40,
    maxScore: 100,
    syllabusTopics: "Pre-Colonial Nigerian States (Hausa/Fulani, Oyo, Benin, Kanem-Borno, Igbo), Colonial Rule, Nationalism & Post-Independence Africa"
  },
  {
    id: "languages",
    code: "LNG-306",
    name: "French / Nigerian Languages",
    shortName: "French / Langs",
    category: "ARTS",
    compulsory: false,
    standardQuestions: 40,
    maxScore: 100,
    syllabusTopics: "Grammar, Oral Phonology, Translation, Cultural Customs & Idiomatic Expressions (French / Yoruba / Igbo / Hausa)"
  }
];

window.UTME_COURSE_PRESETS = {
  med_surg: {
    label: "Medicine & Surgery / Nursing / Pharmacy / Dentistry",
    subjects: ["english", "biology", "chemistry", "physics"],
    benchmarkScore: 280,
    brochureNote: "Medicine & Surgery, Nursing, and Pharmacy require Use of English, Biology, Chemistry, and Physics. Competitive Federal University Cut-off: 270 – 310 / 400."
  },
  eng_tech: {
    label: "Engineering / Computer Science / Architecture",
    subjects: ["english", "mathematics", "physics", "chemistry"],
    benchmarkScore: 250,
    brochureNote: "Engineering (Mechanical, Electrical, Civil, Chemical) and Computer Science require Use of English, Mathematics, Physics, and Chemistry. Competitive Cut-off: 240 – 285 / 400."
  },
  biochem_micro: {
    label: "Biochemistry / Microbiology / Agricultural Science",
    subjects: ["english", "biology", "chemistry", "mathematics"],
    benchmarkScore: 220,
    brochureNote: "Biochemistry and Microbiology require Use of English, Biology, Chemistry, and either Mathematics or Physics. Competitive Cut-off: 210 – 245 / 400."
  },
  law: {
    label: "Law / Civil & Common Law",
    subjects: ["english", "literature", "government", "crs"],
    benchmarkScore: 275,
    brochureNote: "Law requires Use of English, Literature-in-English, and any two Arts/Social Science subjects (typically Government and CRS/IRS). Competitive Cut-off: 265 – 300 / 400."
  },
  mass_comm: {
    label: "Mass Communication / International Relations",
    subjects: ["english", "literature", "government", "economics"],
    benchmarkScore: 235,
    brochureNote: "Mass Communication requires Use of English, Literature-in-English, Government, and one Social Science/Arts subject. Competitive Cut-off: 225 – 260 / 400."
  },
  accounting_bus: {
    label: "Accounting / Business Administration / Banking & Finance",
    subjects: ["english", "mathematics", "economics", "accounts"],
    benchmarkScore: 230,
    brochureNote: "Accounting, Finance, and Business Administration require Use of English, Mathematics, Economics, and Principles of Accounts (or Commerce/Government). Competitive Cut-off: 220 – 260 / 400."
  },
  economics: {
    label: "Economics / Public Administration / Political Science",
    subjects: ["english", "mathematics", "economics", "government"],
    benchmarkScore: 235,
    brochureNote: "Economics requires Use of English, Mathematics, Economics, and Government (or Geography/Accounts). Competitive Cut-off: 225 – 265 / 400."
  },
  comp_info: {
    label: "Cybersecurity / Information Technology / Data Science",
    subjects: ["english", "mathematics", "physics", "computer"],
    benchmarkScore: 240,
    brochureNote: "Cybersecurity and Information Systems accept Use of English, Mathematics, Physics, and Computer Studies (or Chemistry). Competitive Cut-off: 230 – 270 / 400."
  },
  arts_hum: {
    label: "English & Literary Studies / Theatre Arts / History",
    subjects: ["english", "literature", "government", "history"],
    benchmarkScore: 215,
    brochureNote: "Arts & Humanities courses require Use of English, Literature-in-English, and two other Arts/Social Science subjects. Competitive Cut-off: 200 – 240 / 400."
  },
  env_geo: {
    label: "Geography / Urban & Regional Planning / Geology",
    subjects: ["english", "mathematics", "geography", "chemistry"],
    benchmarkScore: 210,
    brochureNote: "Environmental Sciences & Geography require Use of English, Geography, Mathematics, and one Science/Social Science subject. Competitive Cut-off: 200 – 230 / 400."
  }
};

window.DEMO_CANDIDATE_PROFILES = {
  science_med: {
    pin: "UTME-4829-7310",
    regNo: "2026408912BA",
    name: "ADEBAYO DANIEL OLUWASEUN",
    seatNo: "042",
    institution: "UNILAG",
    preset: "med_surg",
    center: "Center: 02408 — UNILAG CBT Centre, Akoka, Lagos"
  },
  science_eng: {
    pin: "UTME-7731-9042",
    regNo: "2026773104EF",
    name: "CHUKWUEMEKA CHIDERA VICTOR",
    seatNo: "118",
    institution: "UI",
    preset: "eng_tech",
    center: "Center: 04112 — Distance Learning CBT Centre, UI, Ibadan"
  },
  art_law: {
    pin: "UTME-1954-3381",
    regNo: "2026195408AC",
    name: "NWOSU CHIAMAKA TREASURE",
    seatNo: "019",
    institution: "OAU",
    preset: "law",
    center: "Center: 03801 — OAU ICT Computer Centre, Ile-Ife"
  },
  comm_acct: {
    pin: "UTME-9043-6615",
    regNo: "2026904321GD",
    name: "IBRAHIM ZAINAB FATIMA",
    seatNo: "076",
    institution: "ABU",
    preset: "accounting_bus",
    center: "Center: 01105 — ABU Iya Abubakar Computer Centre, Zaria"
  }
};

