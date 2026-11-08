/**
 * ============================================================================
 * JAMB UTME PAST QUESTIONS BANK — USE OF ENGLISH (COMPULSORY FOR ALL CANDIDATES)
 * ============================================================================
 * Covers Official JAMB Use of English Sections:
 *  1. Comprehension Passages
 *  2. Cloze / Register Passages
 *  3. JAMB Prescribed Novels (The Life Changer & The Lekki Headmaster)
 *  4. Sentence Interpretation & Idioms
 *  5. Antonyms (Opposite in Meaning)
 *  6. Synonyms (Nearest in Meaning)
 *  7. Lexis & Structure (Grammar, Concord, Prepositions, Question Tags)
 *  8. Oral Forms (Vowels, Consonants, Stress & Emphatic Stress)
 */

window.UTME_QUESTION_BANK = window.UTME_QUESTION_BANK || {};

const PASSAGE_1_ECOLOGY = `Read the passage below carefully and answer the questions that follow.

The rapid pace of urbanization in developing nations has brought with it a complex web of environmental and socio-economic challenges. Millions of rural dwellers migrate annually to metropolitan centres in search of elusive white-collar employment, better healthcare, and modern social amenities. However, the infrastructural capacity of these burgeoning cities rarely expands at a commensurate rate. Consequently, sprawling informal settlements—commonly referred to as slums—spring up on the fringes of urban centres.

In these densely populated neighbourhoods, potable water is a luxury, and proper waste disposal systems are virtually non-existent. Indiscriminate dumping of refuse into drainage channels frequently culminates in devastating perennial floods whenever the torrential rains arrive. Urban planners and policymakers have repeatedly advocated a twin-pronged strategy: decongesting the cities through deliberate rural industrialization and enforcing stringent environmental sanitation laws. Until rural communities are made economically viable and habitable, the rural-urban drift will remain an intractable phenomenon.`;

const PASSAGE_2_CLOZE_MEDICAL = `In the passage below, the numbered gaps indicate missing words from a hospital and clinical register.

When the accident victim was rushed into the emergency ward on a stretcher, the attending physician immediately checked his vital signs using a stethoscope and a sphygmomanometer. Because the patient had lost a considerable volume of blood, an urgent blood transfusion was ordered after cross-matching his blood group at the hematology laboratory. Subsequently, the orthopaedic surgeon examined the X-ray radiographs, which revealed a compound fracture of the femur. Prior to wheeling the patient into the operating theatre, the anaesthetist administered a general anaesthetic so that the surgical procedure would be painless. Following a successful operation, the patient was transferred to the recovery ward for post-operative monitoring and rehabilitation.`;

window.UTME_QUESTION_BANK.english = [
  // ================= SECTION A: COMPREHENSION PASSAGE (1 - 5) =================
  {
    id: "ENG-001",
    year: "UTME 2023",
    topic: "Comprehension Passage",
    instruction: "Read the comprehension passage carefully and answer the question below.",
    passageTitle: "PASSAGE I: Urbanization and Rural-Urban Drift",
    passage: PASSAGE_1_ECOLOGY,
    question: "According to the passage, why do rural dwellers migrate in large numbers to metropolitan centres?",
    options: [
      "Because rural communities have been completely destroyed by perennial flooding",
      "In search of white-collar jobs, improved healthcare, and modern social amenities",
      "Because urban planners invited them to build informal settlements on city fringes",
      "To enforce stringent environmental sanitation laws in the cities"
    ],
    answer: 1,
    explanation: "In the first paragraph, the author explicitly states that rural dwellers migrate 'in search of elusive white-collar employment, better healthcare, and modern social amenities.'"
  },
  {
    id: "ENG-002",
    year: "UTME 2023",
    topic: "Comprehension Passage",
    instruction: "Read the comprehension passage carefully and answer the question below.",
    passageTitle: "PASSAGE I: Urbanization and Rural-Urban Drift",
    passage: PASSAGE_1_ECOLOGY,
    question: "The word 'commensurate' as used in the passage is closest in meaning to:",
    options: [
      "Proportional or corresponding",
      "Negligible and declining",
      "Unpredictable and erratic",
      "Excessive and wasteful"
    ],
    answer: 0,
    explanation: "'Commensurate' means corresponding in size, degree, or proportion. The cities' infrastructure does not expand at a rate proportional to population growth."
  },
  {
    id: "ENG-003",
    year: "UTME 2023",
    topic: "Comprehension Passage",
    instruction: "Read the comprehension passage carefully and answer the question below.",
    passageTitle: "PASSAGE I: Urbanization and Rural-Urban Drift",
    passage: PASSAGE_1_ECOLOGY,
    question: "What does the writer identify as the immediate cause of perennial flooding in densely populated urban neighbourhoods?",
    options: [
      "The construction of rural industries near river banks",
      "The scarcity of potable drinking water in rural villages",
      "The indiscriminate dumping of refuse into drainage channels",
      "The excessive expansion of metropolitan road networks"
    ],
    answer: 2,
    explanation: "The second paragraph states: 'Indiscriminate dumping of refuse into drainage channels frequently culminates in devastating perennial floods whenever the torrential rains arrive.'"
  },
  {
    id: "ENG-004",
    year: "UTME 2023",
    topic: "Comprehension Passage",
    instruction: "Read the comprehension passage carefully and answer the question below.",
    passageTitle: "PASSAGE I: Urbanization and Rural-Urban Drift",
    passage: PASSAGE_1_ECOLOGY,
    question: "By describing white-collar employment in the cities as 'elusive', the author implies that such jobs are:",
    options: [
      "Highly lucrative and stress-free",
      "Difficult to find or obtain",
      "Reserved exclusively for rural migrants",
      "Available in abundance for everyone"
    ],
    answer: 1,
    explanation: "'Elusive' means difficult to find, catch, or achieve. Many migrants travel to the city hoping for office jobs that are scarce."
  },
  {
    id: "ENG-005",
    year: "UTME 2023",
    topic: "Comprehension Passage",
    instruction: "Read the comprehension passage carefully and answer the question below.",
    passageTitle: "PASSAGE I: Urbanization and Rural-Urban Drift",
    passage: PASSAGE_1_ECOLOGY,
    question: "What sustainable solution does the passage propose to curb the rural-urban drift?",
    options: [
      "Demolishing all metropolitan cities and relocating capitals",
      "Banning torrential rainfall through cloud seeding",
      "Deliberate rural industrialization and making rural areas economically viable",
      "Stopping all forms of healthcare delivery in urban centres"
    ],
    answer: 2,
    explanation: "The final sentences emphasize a 'twin-pronged strategy: decongesting the cities through deliberate rural industrialization...' and making rural communities economically viable."
  },

  // ================= SECTION B: CLOZE / REGISTER (6 - 10) =================
  {
    id: "ENG-006",
    year: "UTME 2022",
    topic: "Cloze / Register (Medicine)",
    instruction: "Choose the word that most appropriately fits the medical register context.",
    passageTitle: "PASSAGE II: Clinical & Hospital Register",
    passage: PASSAGE_2_CLOZE_MEDICAL,
    question: "A medical specialist who administers drugs to induce loss of sensation or consciousness before surgery is called an:",
    options: [
      "Ophthalmologist",
      "Anaesthetist",
      "Dermatologist",
      "Paediatrician"
    ],
    answer: 1,
    explanation: "An anaesthetist (or anaesthesiologist) administers anaesthetics prior to surgical operations so the patient feels no pain."
  },
  {
    id: "ENG-007",
    year: "UTME 2022",
    topic: "Cloze / Register (Law & Judiciary)",
    instruction: "Choose the option that best completes the sentence in the legal register.",
    question: "After listening to the submissions of both the prosecution and defence counsel, the judge ________ the case to next month for judgment.",
    options: [
      "prorogued",
      "adjourned",
      "dissolved",
      "abrogated"
    ],
    answer: 1,
    explanation: "In legal usage, a court or judge 'adjourns' a case to a future date. Parliament is 'prorogued' or 'dissolved', and laws are 'abrogated' or 'repealed'."
  },
  {
    id: "ENG-008",
    year: "UTME 2021",
    topic: "Cloze / Register (Publishing)",
    instruction: "Choose the option that best completes the sentence.",
    question: "Before a book is finally printed and bound, the author's original ________ must be thoroughly edited by the proofreaders.",
    options: [
      "bibliography",
      "manuscript",
      "epilogue",
      "glossary"
    ],
    answer: 1,
    explanation: "An author's unpublished written work submitted for publication is called a 'manuscript'."
  },
  {
    id: "ENG-009",
    year: "UTME 2020",
    topic: "Cloze / Register (Banking & Finance)",
    instruction: "Choose the option that best completes the sentence.",
    question: "The businessman's cheque was dishonoured by the bank and stamped 'Refer to Drawer' because his account was ________.",
    options: [
      "overdrawn",
      "Solvent",
      "credited",
      "reconciled"
    ],
    answer: 0,
    explanation: "A cheque bounces (is dishonoured) when the drawer's account has insufficient funds or is overdrawn beyond any agreed overdraft limit."
  },
  {
    id: "ENG-010",
    year: "UTME 2024",
    topic: "Cloze / Register (Aviation)",
    instruction: "Choose the option that best completes the sentence.",
    question: "Due to poor visibility caused by severe harmattan haze, the pilot could not land on the ________ and had to divert the aircraft.",
    options: [
      "hangar",
      "runway",
      "fuselage",
      "cockpit"
    ],
    answer: 1,
    explanation: "Aircraft take off from and land on a 'runway'. A 'hangar' is a building where aircraft are housed/maintained."
  },

  // ================= SECTION C: JAMB NOVELS (11 - 18) =================
  {
    id: "ENG-011",
    year: "UTME 2022",
    topic: "JAMB Novel: The Life Changer",
    instruction: "Answer the question based on Khadija Abubakar Jalli's 'The Life Changer'.",
    question: "In 'The Life Changer', who narrates the story of Salma's university experience to Ummi and her younger siblings?",
    options: [
      "Bint",
      "Ummi herself",
      "Omar",
      "Teemah"
    ],
    answer: 1,
    explanation: "Ummi (the mother of Omar, Teemah, Jamila, and Bint) narrates her own and her friend Salma's university experiences to educate her children before Omar begins university."
  },
  {
    id: "ENG-012",
    year: "UTME 2023",
    topic: "JAMB Novel: The Life Changer",
    instruction: "Answer the question based on Khadija Abubakar Jalli's 'The Life Changer'.",
    question: "In 'The Life Changer', what admission was Omar celebrating at the beginning of the novel?",
    options: [
      "Admission to study Medicine at the University of Maiduguri",
      "Admission to study Law at Ahmadu Bello University, Zaria",
      "Admission to study Engineering at Bayero University, Kano",
      "Admission to study Pharmacy at Usmanu Danfodiyo University"
    ],
    answer: 1,
    explanation: "Omar gained admission to study Law at Ahmadu Bello University (ABU), Zaria (Kongo Campus)."
  },
  {
    id: "ENG-013",
    year: "UTME 2023",
    topic: "JAMB Novel: The Life Changer",
    instruction: "Answer the question based on Khadija Abubakar Jalli's 'The Life Changer'.",
    question: "In 'The Life Changer', why was Salma eventually expelled from the university during her final exam?",
    options: [
      "She was caught with an examination malpractice cheat sheet (expo) and implicated Kolawole Abdulmalik",
      "She assaulted the Head of Department in his office",
      "She failed to pay her hostel accommodation fee for four sessions",
      "She organized a violent student union protest on campus"
    ],
    answer: 0,
    explanation: "Salma was caught cheating by the female invigilator during her final paper (Moral Philosophy) using a cheat note given to her by Labaran, and she falsely implicated innocent Kolawole Abdulmalik."
  },
  {
    id: "ENG-014",
    year: "UTME 2021",
    topic: "JAMB Novel: The Life Changer",
    instruction: "Answer the question based on Khadija Abubakar Jalli's 'The Life Changer'.",
    question: "Who were Salma's two close roommates at the university in 'The Life Changer'?",
    options: [
      "Teemah and Jamila",
      "Tomide and Ngozi",
      "Ada and Funmi",
      "Zainab and Halima"
    ],
    answer: 1,
    explanation: "Salma's roommates in the hostel were Tomide (from Kwara State) and Ngozi (from Imo State); the three formed a tight bond."
  },
  {
    id: "ENG-015",
    year: "UTME 2024",
    topic: "JAMB Novel: The Life Changer",
    instruction: "Answer the question based on Khadija Abubakar Jalli's 'The Life Changer'.",
    question: "In 'The Life Changer', who was the dishonest classmate and gambler that lured Habib and Zaki into kidnapping and smart-card fraud?",
    options: [
      "Salim",
      "Labaran",
      "Talle (The Quiet One)",
      "Kabir"
    ],
    answer: 1,
    explanation: "Honourable Habib used Labaran as his driver/thug to kidnap Alhaji處's son, and Talle was Labaran's accomplice who hid the boy in Zaria."
  },
  {
    id: "ENG-016",
    year: "UTME 2025",
    topic: "JAMB Novel: The Lekki Headmaster",
    instruction: "Answer the question based on Kabir Alabi Garba's 'The Lekki Headmaster'.",
    question: "In Kabir Alabi Garba's 'The Lekki Headmaster', who is the central protagonist that serves as the dedicated headmaster of Stardom Schools?",
    options: [
      "Mr. Bepo (Adewale Adebisi)",
      "Chief Audu",
      "Pastor Matthew",
      "Dr.beke"
    ],
    answer: 0,
    explanation: "Mr. Bepo (Adewale Adebisi) is the conscientious and principled headmaster of Stardom Schools in Lekki who wrestles with the 'Japa' (relocation to the UK) dilemma."
  },
  {
    id: "ENG-017",
    year: "UTME 2025",
    topic: "JAMB Novel: The Lekki Headmaster",
    instruction: "Answer the question based on Kabir Alabi Garba's 'The Lekki Headmaster'.",
    question: "What major personal conflict does Mr. Bepo face throughout 'The Lekki Headmaster'?",
    options: [
      "Whether to abandon his beloved pupils and teaching career in Nigeria to join his wife Seri in the United Kingdom",
      "Whether to contest for governor of Lagos State",
      "Whether to convert Stardom Schools into a shopping mall",
      "Whether to study Medicine at the age of sixty"
    ],
    answer: 0,
    explanation: "The central conflict of 'The Lekki Headmaster' revolves around Mr. Bepo's emotional struggle between his passion for moulding young Nigerians at Stardom Schools and pressure from his wife, Seri, to relocate ('Japa') to the UK."
  },
  {
    id: "ENG-018",
    year: "UTME 2024",
    topic: "JAMB Novel: The Life Changer",
    instruction: "Answer the question based on Khadija Abubakar Jalli's 'The Life Changer'.",
    question: "How old is Bint, the youngest child in Ummi's family in 'The Life Changer'?",
    options: [
      "Five years old",
      "Eight years old",
      "Ten years old",
      "Twelve years old"
    ],
    answer: 0,
    explanation: "At the opening of Chapter 1 of 'The Life Changer', Bint is five years old, Jamila is eight, Teemah is twelve, and Omar is eighteen."
  },

  // ================= SECTION D: SENTENCE INTERPRETATION & IDIOMS (19 - 26) =================
  {
    id: "ENG-019",
    year: "UTME 2022",
    topic: "Sentence Interpretation",
    instruction: "Select the option that best explains the information conveyed in the sentence.",
    question: "After the heated board meeting, the managing director decided to throw in the towel. This means that the managing director:",
    options: [
      "distributed towels to the board members",
      "accepted defeat and resigned from his position",
      "challenged his opponents to a physical fight",
      "postponed the meeting indefinitely"
    ],
    answer: 1,
    explanation: "The idiom 'to throw in the towel' (from boxing) means to admit defeat, give up, or quit."
  },
  {
    id: "ENG-020",
    year: "UTME 2021",
    topic: "Sentence Interpretation",
    instruction: "Select the option that best explains the information conveyed in the sentence.",
    question: "Chike's account of the burglary must be taken with a pinch of salt. This means that Chike's story:",
    options: [
      "is completely reliable and accurate",
      "should not be completely believed as it may be exaggerated",
      "is very tasteful and entertaining to listeners",
      "lacks basic grammatical coherence"
    ],
    answer: 1,
    explanation: "To 'take something with a pinch (or grain) of salt' means to view a statement with skepticism and not take it literally or as the whole truth."
  },
  {
    id: "ENG-021",
    year: "UTME 2020",
    topic: "Sentence Interpretation",
    instruction: "Select the option that best explains the information conveyed in the sentence.",
    question: "The new tax policy merely scratches the surface of the nation's economic woes. This means the policy:",
    options: [
      "deals with the economic problem only superficially",
      "completely eradicates the economic difficulties",
      "worsens the living standards of rural farmers",
      "causes physical damage to national infrastructure"
    ],
    answer: 0,
    explanation: "'To scratch the surface' means to deal with only a small or superficial part of a much deeper problem."
  },
  {
    id: "ENG-022",
    year: "UTME 2019",
    topic: "Sentence Interpretation",
    instruction: "Select the option that best explains the information conveyed in the sentence.",
    question: "Halima was on tenterhooks while awaiting the release of the UTME results. This means Halima was:",
    options: [
      "in a state of anxious suspense and nervousness",
      "celebrating her victory ahead of time",
      "completely indifferent to the outcome",
      "sitting on a sharp metallic fence"
    ],
    answer: 0,
    explanation: "'On tenterhooks' means in a state of uneasy suspense, anxiety, or nervous anticipation."
  },
  {
    id: "ENG-023",
    year: "UTME 2023",
    topic: "Sentence Interpretation",
    instruction: "Select the option that best explains the information conveyed in the sentence.",
    question: "By refusing to apologize to the disciplinary committee, the erring student burned his bridges. This means he:",
    options: [
      "set fire to the school's pedestrian bridge",
      "destroyed all possible ways of returning or reconciling",
      "built a stronger defence for his case",
      "impressed the committee with his courage"
    ],
    answer: 1,
    explanation: "To 'burn one's bridges' (or boats) means to act in a way that makes it impossible to retreat or go back to a previous state."
  },
  {
    id: "ENG-024",
    year: "UTME 2018",
    topic: "Sentence Interpretation",
    instruction: "Select the option that best explains the information conveyed in the sentence.",
    question: "Had the fire brigade arrived ten minutes earlier, the warehouse would have been saved. This implies that:",
    options: [
      "the fire brigade arrived early and saved the warehouse",
      "the fire brigade arrived late and the warehouse was not saved",
      "the warehouse was only partially damaged",
      "the fire brigade refused to attend to the emergency"
    ],
    answer: 1,
    explanation: "A third-conditional sentence ('Had X happened, Y would have happened') expresses a counterfactual past event: the brigade did not arrive ten minutes earlier, so the warehouse was lost."
  },
  {
    id: "ENG-025",
    year: "UTME 2021",
    topic: "Sentence Interpretation",
    instruction: "Select the option that best explains the information conveyed in the sentence.",
    question: "The senator's philanthropic gesture had strings attached. This means the senator's help:",
    options: [
      "was packaged in parcels tied with ropes",
      "came with hidden conditions or obligations",
      "was given purely out of selfless charity",
      "was meant for musicians who play stringed instruments"
    ],
    answer: 1,
    explanation: "'With strings attached' means subject to special conditions, obligations, or ulterior motives."
  },
  {
    id: "ENG-026",
    year: "UTME 2024",
    topic: "Sentence Interpretation",
    instruction: "Select the option that best explains the information conveyed in the sentence.",
    question: "The treasurer was caught red-handed embezzling the union's funds. This means he was:",
    options: [
      "caught in the very act of committing the crime",
      "found with red ink stained on his palms",
      "arrested long after he had spent the money",
      "falsely accused by his political rivals"
    ],
    answer: 0,
    explanation: "To be 'caught red-handed' means to be apprehended in the exact moment of committing a wrongful act."
  },

  // ================= SECTION E: ANTONYMS / OPPOSITE IN MEANING (27 - 34) =================
  {
    id: "ENG-027",
    year: "UTME 2023",
    topic: "Antonyms (Opposite in Meaning)",
    instruction: "Choose the option that is most nearly OPPOSITE in meaning to the capitalized word.",
    question: "While the younger brother is notoriously EXTRAGAVANT with money, the elder brother is remarkably ________.",
    options: [
      "lavish",
      "frugal",
      "affluent",
      "generous"
    ],
    answer: 1,
    explanation: "'Extravagant' means spending money wastefully; its antonym is 'frugal' (thrifty, economical)."
  },
  {
    id: "ENG-028",
    year: "UTME 2022",
    topic: "Antonyms (Opposite in Meaning)",
    instruction: "Choose the option that is most nearly OPPOSITE in meaning to the capitalized word.",
    question: "The witness gave a LUCID account of the incident, whereas the suspect's statement was completely ________.",
    options: [
      "coherent",
      "confused",
      "vivid",
      "brief"
    ],
    answer: 1,
    explanation: "'Lucid' means clear and easy to understand. Its opposite is 'confused', 'obscure', or 'muddy'."
  },
  {
    id: "ENG-029",
    year: "UTME 2021",
    topic: "Antonyms (Opposite in Meaning)",
    instruction: "Choose the option that is most nearly OPPOSITE in meaning to the capitalized word.",
    question: "Rather than MITIGATE the suffering of the flood victims, the official's negligence served to ________ it.",
    options: [
      "alleviate",
      "aggravate",
      "eradicate",
      "cushion"
    ],
    answer: 1,
    explanation: "'Mitigate' means to make less severe or painful. Its direct antonym is 'aggravate' (make worse)."
  },
  {
    id: "ENG-030",
    year: "UTME 2020",
    topic: "Antonyms (Opposite in Meaning)",
    instruction: "Choose the option that is most nearly OPPOSITE in meaning to the capitalized word.",
    question: "The chairman's SPURIOUS claims were quickly exposed when the auditor presented ________ documents.",
    options: [
      "authentic",
      "counterfeit",
      "ambiguous",
      "obsolete"
    ],
    answer: 0,
    explanation: "'Spurious' means false, fake, or not genuine. The opposite is 'authentic' or 'genuine'."
  },
  {
    id: "ENG-031",
    year: "UTME 2019",
    topic: "Antonyms (Opposite in Meaning)",
    instruction: "Choose the option that is most nearly OPPOSITE in meaning to the capitalized word.",
    question: "Though the recruit appeared DIFFIDENT during the interview, he became surprisingly ________ after his promotion.",
    options: [
      "timid",
      "assertive",
      "reluctant",
      "humble"
    ],
    answer: 1,
    explanation: "'Diffident' means modest or shy because of a lack of self-confidence. Its opposite is 'assertive' or 'confident'."
  },
  {
    id: "ENG-032",
    year: "UTME 2024",
    topic: "Antonyms (Opposite in Meaning)",
    instruction: "Choose the option that is most nearly OPPOSITE in meaning to the capitalized word.",
    question: "We expected the monarch to be HAUGHTY, but we found him remarkably ________.",
    options: [
      "arrogant",
      "unassuming",
      "pompous",
      "belligerent"
    ],
    answer: 1,
    explanation: "'Haughty' means arrogantly superior and disdainful. Its antonym is 'unassuming', 'modest', or 'humble'."
  },
  {
    id: "ENG-033",
    year: "UTME 2018",
    topic: "Antonyms (Opposite in Meaning)",
    instruction: "Choose the option that is most nearly OPPOSITE in meaning to the capitalized word.",
    question: "In times of crisis, a leader should remain TRANQUIL rather than become ________.",
    options: [
      "serene",
      "agitated",
      "composed",
      "placated"
    ],
    answer: 1,
    explanation: "'Tranquil' means calm and peaceful; its opposite is 'agitated' or 'restless'."
  },
  {
    id: "ENG-034",
    year: "UTME 2022",
    topic: "Antonyms (Opposite in Meaning)",
    instruction: "Choose the option that is most nearly OPPOSITE in meaning to the capitalized word.",
    question: "The professor's lecture on quantum mechanics was so ESOTERIC that the freshmen wished for a more ________ topic.",
    options: [
      "obscure",
      "familiar",
      "abstruse",
      "mystical"
    ],
    answer: 1,
    explanation: "'Esoteric' means intended for or understood by only a small number of people with specialized knowledge. Its opposite is 'familiar', 'simple', or 'exoteric'."
  },

  // ================= SECTION F: SYNONYMS / NEAREST IN MEANING (35 - 42) =================
  {
    id: "ENG-035",
    year: "UTME 2023",
    topic: "Synonyms (Nearest in Meaning)",
    instruction: "Choose the option that is NEAREST IN MEANING to the capitalized word.",
    question: "The government enacted a STRINGENT law to curb cybercrime across the country.",
    options: [
      "lenient",
      "rigorous",
      "flexible",
      "optional"
    ],
    answer: 1,
    explanation: "'Stringent' (of regulations or requirements) means strict, precise, and rigorous."
  },
  {
    id: "ENG-036",
    year: "UTME 2022",
    topic: "Synonyms (Nearest in Meaning)",
    instruction: "Choose the option that is NEAREST IN MEANING to the capitalized word.",
    question: "His OSTENTATIOUS lifestyle attracted the attention of the anti-graft agency.",
    options: [
      "modest",
      "flamboyant",
      "secretive",
      "ascetic"
    ],
    answer: 1,
    explanation: "'Ostentatious' means characterized by vulgar or pretentious display; designed to impress or attract notice ('flamboyant' / 'showy')."
  },
  {
    id: "ENG-037",
    year: "UTME 2021",
    topic: "Synonyms (Nearest in Meaning)",
    instruction: "Choose the option that is NEAREST IN MEANING to the capitalized word.",
    question: "The diplomat was praised for his TACITURN nature during the sensitive negotiations.",
    options: [
      "garrulous",
      "reticent",
      "boisterous",
      "aggressive"
    ],
    answer: 1,
    explanation: "'Taciturn' means reserved or uncommunicative in speech; saying little ('reticent')."
  },
  {
    id: "ENG-038",
    year: "UTME 2020",
    topic: "Synonyms (Nearest in Meaning)",
    instruction: "Choose the option that is NEAREST IN MEANING to the capitalized word.",
    question: "The medicine provided only EPHEMERAL relief from the chronic migraine.",
    options: [
      "permanent",
      "short-lived",
      "instantaneous",
      "excruciating"
    ],
    answer: 1,
    explanation: "'Ephemeral' means lasting for a very short time ('short-lived' or 'transient')."
  },
  {
    id: "ENG-039",
    year: "UTME 2019",
    topic: "Synonyms (Nearest in Meaning)",
    instruction: "Choose the option that is NEAREST IN MEANING to the capitalized word.",
    question: "The panel found the witness's testimony PLAUSIBLE.",
    options: [
      "believable",
      "ridiculous",
      "fabricated",
      "irrelevant"
    ],
    answer: 0,
    explanation: "'Plausible' means seeming reasonable, probable, or believable."
  },
  {
    id: "ENG-040",
    year: "UTME 2024",
    topic: "Synonyms (Nearest in Meaning)",
    instruction: "Choose the option that is NEAREST IN MEANING to the capitalized word.",
    question: "The principal's IMPROMPTU speech inspired the graduating students.",
    options: [
      "rehearsed",
      "unprepared",
      "lengthy",
      "monotonous"
    ],
    answer: 1,
    explanation: "'Impromptu' means done without being planned, organized, or rehearsed ('unprepared' / 'extempore')."
  },
  {
    id: "ENG-041",
    year: "UTME 2018",
    topic: "Synonyms (Nearest in Meaning)",
    instruction: "Choose the option that is NEAREST IN MEANING to the capitalized word.",
    question: "Poverty and illiteracy are often INIMICAL to democratic stability.",
    options: [
      "beneficial",
      "harmful",
      "essential",
      "indifferent"
    ],
    answer: 1,
    explanation: "'Inimical' means tending to obstruct or harm; hostile or unfriendly."
  },
  {
    id: "ENG-042",
    year: "UTME 2023",
    topic: "Synonyms (Nearest in Meaning)",
    instruction: "Choose the option that is NEAREST IN MEANING to the capitalized word.",
    question: "The old man's BENEVOLENCE endeared him to the entire village.",
    options: [
      "malevolence",
      "kindness",
      "longevity",
      "wealth"
    ],
    answer: 1,
    explanation: "'Benevolence' means well-meaning kindness, generosity, and goodwill."
  },

  // ================= SECTION G: LEXIS & STRUCTURE (43 - 53) =================
  {
    id: "ENG-043",
    year: "UTME 2023",
    topic: "Lexis & Structure (Subjunctive Mood)",
    instruction: "Choose the option that best completes the gap.",
    question: "It is high time the students ________ wasting their study hours on social media.",
    options: [
      "stop",
      "stopped",
      "are stopping",
      "will stop"
    ],
    answer: 1,
    explanation: "After the expression 'It is time / It is high time + subject', English grammar requires the past subjunctive (simple past tense form), hence 'stopped'."
  },
  {
    id: "ENG-044",
    year: "UTME 2022",
    topic: "Lexis & Structure (Concord)",
    instruction: "Choose the option that best completes the gap.",
    question: "The Vice-Chancellor, together with the Deans of Faculties, ________ attending the convocation ceremony tomorrow.",
    options: [
      "are",
      "is",
      "were",
      "have been"
    ],
    answer: 1,
    explanation: "When a singular subject ('The Vice-Chancellor') is linked to another noun by 'together with', 'along with', or 'as well as', the verb agrees with the first (main) singular subject ('is')."
  },
  {
    id: "ENG-045",
    year: "UTME 2021",
    topic: "Lexis & Structure (Proximity Concord)",
    instruction: "Choose the option that best completes the gap.",
    question: "Neither the coach nor the players ________ happy with the referee's decision.",
    options: [
      "was",
      "were",
      "is",
      "has been"
    ],
    answer: 1,
    explanation: "By the rule of proximity concord, when 'Neither... nor' or 'Either... or' joins two subjects, the verb agrees with the subject closer to it ('the players' -> plural 'were')."
  },
  {
    id: "ENG-046",
    year: "UTME 2020",
    topic: "Lexis & Structure (Prepositions)",
    instruction: "Choose the option that best completes the gap.",
    question: "The accused person was eventually acquitted ________ all charges of fraud.",
    options: [
      "from",
      "of",
      "for",
      "by"
    ],
    answer: 1,
    explanation: "The verb 'acquit' collocates with the preposition 'of' (to be acquitted of a charge), whereas 'discharge' takes 'from'."
  },
  {
    id: "ENG-047",
    year: "UTME 2024",
    topic: "Lexis & Structure (Question Tags)",
    instruction: "Choose the option that best completes the gap.",
    question: "Hardly had the examination started when the power went out, ________?",
    options: [
      "hadn't it",
      "had it",
      "didn't it",
      "did it"
    ],
    answer: 1,
    explanation: "The main clause 'Hardly had the examination started' contains the semi-negative adverb 'Hardly' and auxiliary 'had', so it takes a positive question tag: 'had it?'"
  },
  {
    id: "ENG-048",
    year: "UTME 2019",
    topic: "Lexis & Structure (Order of Adjectives)",
    instruction: "Choose the option that best completes the gap.",
    question: "Chief Okafor recently bought a ________ sports car.",
    options: [
      "brand-new red Japanese",
      "Japanese red brand-new",
      "red Japanese brand-new",
      "brand-new Japanese red"
    ],
    answer: 0,
    explanation: "Standard order of adjectives (OSASCOMP): Age ('brand-new') comes before Colour ('red'), which comes before Origin ('Japanese')."
  },
  {
    id: "ENG-049",
    year: "UTME 2022",
    topic: "Lexis & Structure (Pronoun Case)",
    instruction: "Choose the option that best completes the gap.",
    question: "This confidential matter is strictly between you and ________.",
    options: [
      "I",
      "me",
      "myself",
      "mine"
    ],
    answer: 1,
    explanation: "'Between' is a preposition and requires an objective case pronoun ('between you and me')."
  },
  {
    id: "ENG-050",
    year: "UTME 2021",
    topic: "Lexis & Structure (Phrasal Verbs)",
    instruction: "Choose the option that best completes the gap.",
    question: "Because of the torrential downpour, the inter-house sports competition was ________ until next Friday.",
    options: [
      "called off",
      "put off",
      "set off",
      "turned off"
    ],
    answer: 1,
    explanation: "'Put off' means to postpone to a later time ('until next Friday'), whereas 'called off' means cancelled completely."
  },
  {
    id: "ENG-051",
    year: "UTME 2020",
    topic: "Lexis & Structure (Reciprocal Pronouns)",
    instruction: "Choose the option that best completes the gap.",
    question: "The two identical twins love ________ dearly, while the five cousins often quarrel with ________.",
    options: [
      "one another / each other",
      "each other / one another",
      "themselves / each other",
      "each other / themselves"
    ],
    answer: 1,
    explanation: "Traditionally in JAMB grammar, 'each other' is used for two persons/things ('the two identical twins'), while 'one another' is used for more than two ('the five cousins')."
  },
  {
    id: "ENG-052",
    year: "UTME 2023",
    topic: "Lexis & Structure (Conditionals)",
    instruction: "Choose the option that best completes the gap.",
    question: "If I ________ in your shoes, I would accept the scholarship offer immediately.",
    options: [
      "am",
      "were",
      "was being",
      "have been"
    ],
    answer: 1,
    explanation: "In unreal/hypothetical second-conditional clauses ('If I were...'), the subjunctive 'were' is used for all persons."
  },
  {
    id: "ENG-053",
    year: "UTME 2018",
    topic: "Lexis & Structure (Collocations)",
    instruction: "Choose the option that best completes the gap.",
    question: "The panel congratulated the valedictorian ________ her outstanding performance in the UTME.",
    options: [
      "for",
      "on",
      "about",
      "with"
    ],
    answer: 1,
    explanation: "The standard English preposition following 'congratulate someone' is 'on' ('congratulated her on her performance')."
  },

  // ================= SECTION H: ORAL FORMS / PHONETICS (54 - 60) =================
  {
    id: "ENG-054",
    year: "UTME 2023",
    topic: "Oral Forms (Vowel Sounds)",
    instruction: "Choose the word that has the SAME VOWEL SOUND as the one represented by the letter(s) underlined.",
    question: "le<u>o</u>pard",
    options: [
      "people",
      "burial",
      "feud",
      "loan"
    ],
    answer: 1,
    explanation: "The 'eo' in 'leopard' /ˈlepəd/ is pronounced with the short vowel /e/, which is the same vowel sound in 'burial' /ˈberiəl/."
  },
  {
    id: "ENG-055",
    year: "UTME 2022",
    topic: "Oral Forms (Consonant Sounds)",
    instruction: "Choose the word that has the SAME CONSONANT SOUND as the one represented by the letter(s) underlined.",
    question: "<u>ch</u>alet",
    options: [
      "chair",
      "machine",
      "chemical",
      "church"
    ],
    answer: 1,
    explanation: "In 'chalet' /ˈʃæleɪ/ (a word of French origin), 'ch' represents the voiceless palato-alveolar fricative /ʃ/, just like 'ch' in 'machine' /məˈʃiːn/."
  },
  {
    id: "ENG-056",
    year: "UTME 2021",
    topic: "Oral Forms (Silent Letters)",
    instruction: "Choose the word in which the consonant 'b' is NOT pronounced (silent).",
    question: "Identify the word containing a silent 'b':",
    options: [
      "timber",
      "plumber",
      "fumble",
      "chamber"
    ],
    answer: 1,
    explanation: "In 'plumber' /ˈplʌmə(r)/, the 'b' after 'm' is silent (as in 'comb', 'lamb', 'debt', 'subtle')."
  },
  {
    id: "ENG-057",
    year: "UTME 2024",
    topic: "Oral Forms (Primary Word Stress)",
    instruction: "Choose the option in which the correct stressed syllable is written in CAPITAL letters.",
    question: "Identify the correct primary stress pattern for the word 'photographic':",
    options: [
      "PHO-to-graph-ic",
      "pho-TO-graph-ic",
      "pho-to-GRAPH-ic",
      "pho-to-graph-IC"
    ],
    answer: 2,
    explanation: "Words ending in the suffix '-ic' take primary stress on the penultimate syllable (the syllable immediately preceding '-ic'): pho-to-GRAPH-ic."
  },
  {
    id: "ENG-058",
    year: "UTME 2020",
    topic: "Oral Forms (Rhymes)",
    instruction: "Choose the word that RHYMES with the given word.",
    question: "quay",
    options: [
      "tray",
      "key",
      "buy",
      "coy"
    ],
    answer: 1,
    explanation: "'Quay' is pronounced /kiː/, which is a homophone of and rhymes with 'key' /kiː/."
  },
  {
    id: "ENG-059",
    year: "UTME 2023",
    topic: "Oral Forms (Emphatic Stress)",
    instruction: "The word in CAPITAL LETTERS has the emphatic stress. Choose the question to which the given sentence is the appropriate answer.",
    question: "Amina bought a LEATHER bag at the market yesterday.",
    options: [
      "Did Halima buy a leather bag at the market yesterday?",
      "Did Amina buy a velvet bag at the market yesterday?",
      "Did Amina buy a leather shoe at the market yesterday?",
      "Did Amina buy a leather bag at the supermarket yesterday?"
    ],
    answer: 1,
    explanation: "Since the emphatic stress is on 'LEATHER', the question must contrast 'leather' with another material ('velvet') while keeping all other parts identical."
  },
  {
    id: "ENG-060",
    year: "UTME 2022",
    topic: "Oral Forms (Vowel Sounds)",
    instruction: "Choose the word that has the SAME VOWEL SOUND as the one represented by the letter(s) underlined.",
    question: "bl<u>oo</u>d",
    options: [
      "food",
      "son",
      "book",
      "brood"
    ],
    answer: 1,
    explanation: "'Blood' /blʌd/ contains the central vowel /ʌ/, which is also found in 'son' /sʌn/."
  }
];

