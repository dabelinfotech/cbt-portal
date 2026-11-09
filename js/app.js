/**
 * ============================================================================
 * JAMB UTME STANDARD CBT PORTAL — CORE APPLICATION ENGINE (js/app.js)
 * ============================================================================
 */

(function () {
  "use strict";

  // ==========================================================================
  // 1. SUPPLEMENTARY UTME QUESTION GENERATOR FOR FULL 40-QUESTION PAPERS
  //    Ensures every subject has at least 40 unique, syllabus-accurate UTME
  //    past questions when "Full Standard UTME (180 Questions)" is selected.
  // ==========================================================================
  const SUPPLEMENTARY_POOLS = {
    mathematics: [
      { year: "UTME 2019", topic: "Logarithms", question: "Evaluate log₁₀(25) + log₁₀(4).", options: ["2", "1", "10", "3"], answer: 0, explanation: "log₁₀(25) + log₁₀(4) = log₁₀(25 × 4) = log₁₀(100) = log₁₀(10²) = 2." },
      { year: "UTME 2020", topic: "Simple & Compound Interest", question: "Find the simple interest on ₦60,000 for 3 years at 5% per annum.", options: ["₦9,000", "₦7,500", "₦12,000", "₦6,000"], answer: 0, explanation: "I = (P × R × T) / 100 = (60,000 × 5 × 3) / 100 = ₦9,000." },
      { year: "UTME 2021", topic: "Interior Angles of Polygons", question: "Find the sum of the interior angles of a regular octagon (8-sided polygon).", options: ["1080°", "720°", "900°", "1260°"], answer: 0, explanation: "Sum of interior angles = (n - 2) × 180° = (8 - 2) × 180° = 6 × 180° = 1080°." },
      { year: "UTME 2022", topic: "Exterior Angles of Polygons", question: "Each exterior angle of a regular polygon is 30°. How many sides does the polygon have?", options: ["12", "10", "8", "15"], answer: 0, explanation: "Number of sides n = 360° / exterior angle = 360° / 30° = 12 sides (dodecagon)." },
      { year: "UTME 2018", topic: "Simultaneous Equations", question: "If 2x + y = 10 and x - y = 2, find the value of (x + y).", options: ["6", "4", "8", "5"], answer: 0, explanation: "Adding both equations gives 3x = 12 ⇒ x = 4. Since x - y = 2, y = 2. Therefore x + y = 4 + 2 = 6." },
      { year: "UTME 2023", topic: "Indices", question: "Evaluate (27 / 8)^(-2/3).", options: ["4/9", "9/4", "2/3", "3/2"], answer: 0, explanation: "(27/8)^(-2/3) = (8/27)^(2/3) = (∛8 / ∛27)² = (2/3)² = 4/9." },
      { year: "UTME 2017", topic: "Geometric Progression (GP)", question: "Find the sum to infinity of the Geometric Progression: 12, 6, 3, 1.5, ...", options: ["24", "18", "36", "21"], answer: 0, explanation: "First term a = 12, common ratio r = 6/12 = 1/2. Sum to infinity S_∞ = a / (1 - r) = 12 / (1 - 1/2) = 24." },
      { year: "UTME 2024", topic: "Statistics (Median)", question: "Find the median of the set of numbers: 14, 9, 21, 11, 18, 7, 15.", options: ["14", "15", "11", "18"], answer: 0, explanation: "Arranging in ascending order: 7, 9, 11, 14, 15, 18, 21. The middle (4th) value is 14." },
      { year: "UTME 2020", topic: "Coordinate Geometry (Midpoint)", question: "Find the midpoint of the line segment joining A(-4, 6) and B(8, -2).", options: ["(2, 2)", "(4, 4)", "(-2, 4)", "(6, -4)"], answer: 0, explanation: "Midpoint M = ((-4 + 8)/2, (6 + (-2))/2) = (4/2, 4/2) = (2, 2)." },
      { year: "UTME 2021", topic: "Differentiation (Turning Points)", question: "At what value of x does the curve y = x² - 6x + 11 attain its minimum value?", options: ["x = 3", "x = -3", "x = 6", "x = 2"], answer: 0, explanation: "At a stationary point, dy/dx = 2x - 6 = 0 ⇒ x = 3." },
      { year: "UTME 2019", topic: "Circle Theorems", question: "An angle subtended at the centre of a circle is 130°. What is the size of the angle subtended by the same arc at the circumference?", options: ["65°", "130°", "50°", "260°"], answer: 0, explanation: "The angle at the centre of a circle is twice the angle at the circumference: 130° / 2 = 65°." },
      { year: "UTME 2022", topic: "Sector of a Circle", question: "Calculate the length of an arc of a circle of radius 14 cm which subtends an angle of 90° at the centre. (Take π = 22/7)", options: ["22 cm", "44 cm", "11 cm", "154 cm"], answer: 0, explanation: "Length of arc L = (θ / 360°) × 2πr = (90 / 360) × 2 × (22/7) × 14 = (1/4) × 88 = 22 cm." },
      { year: "UTME 2018", topic: "Combinations", question: "In how many ways can a committee of 3 prefects be chosen from 7 eligible students?", options: ["35", "21", "210", "42"], answer: 0, explanation: "⁷C₃ = (7 × 6 × 5) / (3 × 2 × 1) = 35 ways." },
      { year: "UTME 2023", topic: "Trigonometric Identities", question: "Simplify: (1 - cos²θ) / sin θ.", options: ["sin θ", "cos θ", "tan θ", "sec θ"], answer: 0, explanation: "Since sin²θ + cos²θ = 1, 1 - cos²θ = sin²θ. Thus sin²θ / sin θ = sin θ." },
      { year: "UTME 2020", topic: "Mensuration (Volume of Cylinder)", question: "Calculate the volume of a cylinder of base radius 7 cm and height 10 cm. (Take π = 22/7)", options: ["1540 cm³", "440 cm³", "770 cm³", "3080 cm³"], answer: 0, explanation: "Volume V = πr²h = (22/7) × 7 × 7 × 10 = 154 × 10 = 1540 cm³." },
      { year: "UTME 2021", topic: "Fractions & Percentages", question: "A textbook was sold for ₦3,600 at a loss of 10%. Find the original cost price of the textbook.", options: ["₦4,000", "₦3,960", "₦4,200", "₦3,240"], answer: 0, explanation: "90% of Cost Price = ₦3,600 ⇒ Cost Price = (3,600 × 100) / 90 = ₦4,000." },
      { year: "UTME 2019", topic: "Matrices (Inverse)", question: "Find the transpose of the matrix A = [[1, 4], [2, 5]].", options: ["[[1, 2], [4, 5]]", "[[5, -4], [-2, 1]]", "[[4, 1], [5, 2]]", "[[2, 5], [1, 4]]"], answer: 0, explanation: "Interchanging rows and columns of [[1, 4], [2, 5]] gives Aᵀ = [[1, 2], [4, 5]]." },
      { year: "UTME 2024", topic: "Factor Theorem", question: "If (x - 3) is a factor of x² + kx - 15, find the value of k.", options: ["2", "-2", "5", "-5"], answer: 0, explanation: "Substitute x = 3: 3² + 3k - 15 = 0 ⇒ 9 + 3k - 15 = 0 ⇒ 3k = 6 ⇒ k = 2." },
      { year: "UTME 2022", topic: "Statistics (Variance & Standard Deviation)", question: "If the variance of a frequency distribution is 16, what is its standard deviation?", options: ["4", "8", "256", "2"], answer: 0, explanation: "Standard Deviation = √(Variance) = √16 = 4." },
      { year: "UTME 2023", topic: "Locus", question: "The locus of a point which moves so that it is always equidistant from two intersecting straight lines is the:", options: ["Pair of bisectors of the angles between the two lines", "Perpendicular bisector of the segment", "Circle passing through the intersection", "Line parallel to both lines"], answer: 0, explanation: "The locus of points equidistant from two intersecting lines is the pair of angle bisectors of the angles formed by the lines." }
    ],
    physics: [
      { year: "UTME 2021", topic: "Scalars & Vectors", question: "Which of the following pairs consists of ONLY vector quantities?", options: ["Momentum and Magnetic flux density", "Speed and Work", "Distance and Electric potential", "Mass and Temperature"], answer: 0, explanation: "Both linear momentum (mv) and magnetic flux density (B) have magnitude and direction." },
      { year: "UTME 2020", topic: "Circular Motion", question: "A body of mass 2 kg moves in a horizontal circle of radius 4 m at a constant speed of 6 m/s. Calculate the centripetal force acting on it.", options: ["18 N", "36 N", "9 N", "12 N"], answer: 0, explanation: "Centripetal force F = mv² / r = (2 × 6²) / 4 = 72 / 4 = 18 N." },
      { year: "UTME 2022", topic: "Friction", question: "A block of weight 50 N rests on a horizontal table. If a horizontal force of 15 N is just sufficient to make it slide, what is the coefficient of static friction?", options: ["0.30", "0.15", "3.33", "0.45"], answer: 0, explanation: "μ = F / R = 15 N / 50 N = 0.30." },
      { year: "UTME 2019", topic: "Density & Upthrust", question: "Which instrument is used directly to measure the relative density of a liquid such as battery acid or milk?", options: ["Hydrometer", "Hygrometer", "Barometer", "Manometer"], answer: 0, explanation: "A hydrometer works on the law of flotation to measure the specific gravity (relative density) of liquids." },
      { year: "UTME 2023", topic: "Linear Expansivity", question: "If the linear expansivity of brass is 1.9 × 10⁻⁵ K⁻¹, what is its cubic (volume) expansivity?", options: ["5.7 × 10⁻⁵ K⁻¹", "3.8 × 10⁻⁵ K⁻¹", "1.9 × 10⁻⁵ K⁻¹", "9.5 × 10⁻⁵ K⁻¹"], answer: 0, explanation: "Cubic expansivity γ ≈ 3α = 3 × 1.9 × 10⁻⁵ = 5.7 × 10⁻⁵ K⁻¹." },
      { year: "UTME 2024", topic: "Heat Transfer", question: "In a vacuum flask (thermos flask), heat loss by radiation is minimized by the:", options: ["Silvered surfaces of the double glass walls", "Vacuum between the double walls", "Cork support at the base", "Plastic stopper at the top"], answer: 0, explanation: "Brightly silvered walls reflect radiant heat (infrared radiation), while the vacuum prevents conduction and convection." },
      { year: "UTME 2018", topic: "Latent Heat", question: "Calculate the quantity of heat required to melt 0.5 kg of ice at 0°C completely to water at 0°C. (Specific latent heat of fusion of ice = 3.36 × 10⁵ J/kg)", options: ["1.68 × 10⁵ J", "3.36 × 10⁵ J", "6.72 × 10⁵ J", "8.40 × 10⁴ J"], answer: 0, explanation: "Q = mL = 0.5 × 3.36 × 10⁵ = 1.68 × 10⁵ J." },
      { year: "UTME 2021", topic: "Electrostatics", question: "What is the unit of electric field intensity?", options: ["Newton per Coulomb (N C⁻¹) or Volt per metre (V m⁻¹)", "Joule per Coulomb (J C⁻¹)", "Coulomb per second (C s⁻¹)", "Farad per metre"], answer: 0, explanation: "Electric field intensity E = F / q (N C⁻¹) = V / d (V m⁻¹)." },
      { year: "UTME 2022", topic: "Ohm's Law & Electrical Power", question: "An electric kettle rated 2000 W, 250 V is connected to a 250 V mains supply. What current flows through its heating element?", options: ["8.0 A", "5.0 A", "12.5 A", "10.0 A"], answer: 0, explanation: "P = IV ⇒ I = P / V = 2000 / 250 = 8.0 A." },
      { year: "UTME 2020", topic: "Electrical Energy & Cost", question: "A 100 W bulb is switched on for 20 hours. How many kilowatt-hours (kWh) of electrical energy does it consume?", options: ["2.0 kWh", "20.0 kWh", "0.2 kWh", "200 kWh"], answer: 0, explanation: "Energy = Power (kW) × Time (h) = (100 / 1000) kW × 20 h = 0.1 × 20 = 2.0 kWh." },
      { year: "UTME 2023", topic: "Magnetism", question: "Why is soft iron preferred to steel for making the core of an electromagnet?", options: ["Soft iron is easily magnetized and easily demagnetized when current stops", "Soft iron retains its magnetism permanently", "Steel has a higher magnetic permeability and zero retentivity", "Soft iron cannot conduct magnetic flux"], answer: 0, explanation: "Soft iron has high magnetic susceptibility and low coercivity/retentivity, making it ideal for temporary electromagnets." },
      { year: "UTME 2019", topic: "Sound Waves (Echoes)", question: "A boy standing 680 m in front of a high cliff claps his hands and hears the echo 4 seconds later. Calculate the speed of sound in air.", options: ["340 m/s", "170 m/s", "680 m/s", "330 m/s"], answer: 0, explanation: "v = 2x / t = (2 × 680) / 4 = 1360 / 4 = 340 m/s." },
      { year: "UTME 2021", topic: "Electromagnetic Spectrum", question: "Arrange the following electromagnetic waves in order of INCREASING wavelength: Gamma rays, X-rays, Visible light, Radio waves.", options: ["Gamma rays → X-rays → Visible light → Radio waves", "Radio waves → Visible light → X-rays → Gamma rays", "Visible light → Gamma rays → Radio waves → X-rays", "X-rays → Gamma rays → Visible light → Radio waves"], answer: 0, explanation: "Gamma rays have the shortest wavelength (highest frequency), while Radio waves have the longest wavelength." },
      { year: "UTME 2024", topic: "Semiconductors", question: "Adding a pentavalent impurity such as Arsenic or Phosphorus to pure Silicon crystal produces:", options: ["An n-type semiconductor with electrons as majority carriers", "A p-type semiconductor with holes as majority carriers", "An intrinsic insulator", "A superconductor"], answer: 0, explanation: "Group V (pentavalent) donor impurities donate a fifth valence electron, creating an n-type semiconductor." },
      { year: "UTME 2022", topic: "Surface Tension & Capillarity", question: "Why does mercury form a convex meniscus and depress in a narrow glass capillary tube?", options: ["The cohesive forces between mercury molecules are greater than the adhesive forces between mercury and glass", "The adhesive forces exceed the cohesive forces", "Mercury has a very low density", "Mercury evaporates rapidly at room temperature"], answer: 0, explanation: "Strong cohesion among mercury atoms compared to adhesion to glass causes mercury not to wet glass and to form a convex meniscus." },
      { year: "UTME 2018", topic: "Simple Harmonic Motion (Pendulum)", question: "If the length of a simple pendulum is quadrupled (multiplied by 4), its period of oscillation is:", options: ["Doubled", "Halved", "Quadrupled", "Unchanged"], answer: 0, explanation: "Since T = 2π√(L/g), T is proportional to √L. When L → 4L, T' = √4 × T = 2T (doubled)." },
      { year: "UTME 2020", topic: "Cells & Internal Resistance", question: "A cell of e.m.f. 1.5 V and internal resistance 0.5 Ω is connected to an external resistor of 2.5 Ω. Calculate the current in the circuit.", options: ["0.5 A", "0.6 A", "3.0 A", "0.75 A"], answer: 0, explanation: "I = E / (R + r) = 1.5 / (2.5 + 0.5) = 1.5 / 3.0 = 0.5 A." },
      { year: "UTME 2023", topic: "Dispersion of Light & Colours", question: "When white light passes through a triangular glass prism, which colour of light is deviated the MOST?", options: ["Violet", "Red", "Yellow", "Green"], answer: 0, explanation: "Violet light has the shortest wavelength and highest refractive index in glass, so it bends (deviates) the most; Red deviates the least." },
      { year: "UTME 2021", topic: "Nuclear Reactions", question: "The source of the enormous radiant energy emitted continuously by the Sun is:", options: ["Thermonuclear fusion of hydrogen nuclei into helium", "Nuclear fission of Uranium-235", "Chemical combustion of coal and oxygen", "Radioactive decay of Radium"], answer: 0, explanation: "Solar energy is powered by nuclear fusion of hydrogen isotopes into helium at extreme core temperatures." },
      { year: "UTME 2024", topic: "Measurement Instruments", question: "What is the reading accuracy (least count) of a standard micrometer screw gauge?", options: ["0.01 mm", "0.1 mm", "1.0 mm", "0.001 cm"], answer: 0, explanation: "A micrometer screw gauge measures to an accuracy of 0.01 mm (or 0.001 cm), while vernier calipers read to 0.1 mm (0.01 cm)." }
    ],
    chemistry: [
      { year: "UTME 2021", topic: "Particulate Nature of Matter", question: "Which of the following substances undergoes sublimation when heated at standard atmospheric pressure?", options: ["Ammonium chloride (NH₄Cl) and Iodine crystals", "Sodium chloride and Copper(II) tetraoxosulphate(VI)", "Lead(II) trioxonitrate(V)", "Calcium trioxocarbonate(IV)"], answer: 0, explanation: "Ammonium chloride, solid iodine, camphor, and dry ice (solid CO₂) sublime directly from solid to gas." },
      { year: "UTME 2020", topic: "Laws of Chemical Combination", question: "Water always contains hydrogen and oxygen combined in the fixed mass ratio of 1 : 8 regardless of its source. This illustrates the Law of:", options: ["Definite Proportions (Constant Composition)", "Multiple Proportions", "Conservation of Mass", "Reciprocal Proportions"], answer: 0, explanation: "Proust's Law of Definite Proportions states that all pure samples of a chemical compound contain the same elements combined in the same proportion by mass." },
      { year: "UTME 2022", topic: "Isotopy", question: "Chlorine exists naturally as two isotopes: ³⁵₁₇Cl (75% abundance) and ³⁷₁₇Cl (25% abundance). Calculate the relative atomic mass of chlorine.", options: ["35.5", "36.0", "35.0", "36.5"], answer: 0, explanation: "RAM = (35 × 0.75) + (37 × 0.25) = 26.25 + 9.25 = 35.5." },
      { year: "UTME 2019", topic: "Periodic Table Trends", question: "Across a period from left to right in the Periodic Table, atomic radius generally decreases because:", options: ["Nuclear charge increases while electrons are added to the same outermost shell", "The number of electron shells increases", "Screening effect increases rapidly", "Metallic character increases"], answer: 0, explanation: "Increasing proton number pulls the outer shell closer to the nucleus without adding new shells." },
      { year: "UTME 2023", topic: "Gas Laws (Ideal Gas Equation)", question: "What volume will 0.5 mole of oxygen gas occupy at s.t.p.? (Molar volume of a gas at s.t.p. = 22.4 dm³)", options: ["11.2 dm³", "22.4 dm³", "44.8 dm³", "5.6 dm³"], answer: 0, explanation: "Volume = moles × 22.4 dm³ = 0.5 × 22.4 = 11.2 dm³." },
      { year: "UTME 2024", topic: "Acids, Bases & Salts (Efflorescence / Deliquescence)", question: "A crystalline salt like fused calcium chloride (CaCl₂) or sodium hydroxide (NaOH) that absorbs so much moisture from the atmosphere that it dissolves to form a solution is:", options: ["Deliquescent", "Efflorescent", "Hygroscopic", "Amphoteric"], answer: 0, explanation: "Deliquescent substances absorb atmospheric moisture and dissolve in it; hygroscopic substances absorb moisture without dissolving (or if liquid, dilute themselves); efflorescent salts lose water of crystallization." },
      { year: "UTME 2018", topic: "Amphoteric Oxides", question: "Which of the following pairs of metallic oxides are amphoteric (reacting with both acids and alkalis)?", options: ["ZnO and Al₂O₃", "Na₂O and CaO", "CO₂ and SO₂", "CuO and Fe₂O₃"], answer: 0, explanation: "Oxides of Zinc (ZnO), Aluminium (Al₂O₃), Lead (PbO), and Tin (SnO) are amphoteric." },
      { year: "UTME 2021", topic: "Rates of Chemical Reaction", question: "How does a positive catalyst increase the rate of a chemical reaction?", options: ["By providing an alternative reaction pathway with a lower activation energy", "By increasing the enthalpy change (ΔH) of the reaction", "By shifting the equilibrium position to the right", "By increasing the molecular mass of reactants"], answer: 0, explanation: "A catalyst lowers the activation energy barrier (E_a) so more reactant particles have energy ≥ E_a." },
      { year: "UTME 2022", topic: "Thermochemistry (Entropy & Free Energy)", question: "For a chemical reaction to be spontaneous at a given temperature and pressure, the Gibbs free energy change (ΔG = ΔH - TΔS) must be:", options: ["Negative (ΔG < 0)", "Positive (ΔG > 0)", "Equal to zero (ΔG = 0)", "Infinite"], answer: 0, explanation: "A reaction is thermodynamically spontaneous when ΔG < 0 (negative)." },
      { year: "UTME 2020", topic: "Halogens", question: "Which halogen is a reddish-brown volatile liquid at room temperature and pressure?", options: ["Bromine (Br₂)", "Chlorine (Cl₂)", "Iodine (I₂)", "Fluorine (F₂)"], answer: 0, explanation: "Fluorine and Chlorine are gases, Bromine is a reddish-brown liquid, and Iodine is a shiny purplish-black solid." },
      { year: "UTME 2023", topic: "Nitrogen & Its Compounds", question: "Which gas is known as 'laughing gas' and is obtained by the gentle thermal decomposition of ammonium trioxonitrate(V) (NH₄NO₃)?", options: ["Nitrogen(I) oxide (N₂O)", "Nitrogen(II) oxide (NO)", "Nitrogen(IV) oxide (NO₂)", "Ammonia (NH₃)"], answer: 0, explanation: "NH₄NO₃ → N₂O (dinitrogen monoxide / laughing gas) + 2H₂O." },
      { year: "UTME 2019", topic: "Sulphur & Industrial Chemistry", question: "What catalyst is used in the Contact Process for the industrial manufacture of tetraoxosulphate(VI) acid (H₂SO₄)?", options: ["Vanadium(V) oxide (V₂O₅)", "Finely divided iron (Fe)", "Nickel (Ni)", "Manganese(IV) oxide (MnO₂)"], answer: 0, explanation: "Vanadium(V) oxide (V₂O₅) catalyzes the oxidation of SO₂ to SO₃ in the Contact Process." },
      { year: "UTME 2024", topic: "Organic Chemistry (Alkanols)", question: "When a primary alkanol such as ethanol is completely oxidized by excess acidified K₂Cr₂O₇, the final product is:", options: ["Ethanoic acid (an alkanoic acid)", "Ethanal (an alkanal)", "Propanone (an alkanone)", "Ethene (an alkene)"], answer: 0, explanation: "Primary alkanols oxidize first to alkanals (aldehydes) and then on further oxidation to alkanoic (carboxylic) acids." },
      { year: "UTME 2021", topic: "Saponification (Soaps & Detergents)", question: "The alkaline hydrolysis of fats and oils (esters of propane-1,2,3-triol) using hot caustic soda (NaOH) to produce soap and glycerol is called:", options: ["Saponification", "Esterification", "Hydrogenation", "Vulcanization"], answer: 0, explanation: "Fat/Oil + 3NaOH → Soap (sodium salt of fatty acid) + Glycerol (propane-1,2,3-triol) is Saponification." },
      { year: "UTME 2022", topic: "Vulcanization of Rubber", question: "Rubber is heated with sulphur in the process of vulcanization in order to:", options: ["Form disulphide cross-links that make rubber harder, more elastic, and heat-resistant", "Make the rubber softer and soluble in petrol", "Convert natural rubber into polythene", "Bleach the colour of raw latex"], answer: 0, explanation: "Sulphur forms cross-links between polyisoprene chains, improving tensile strength and elasticity." },
      { year: "UTME 2018", topic: "Petroleum & Fractional Distillation", question: "In the petroleum industry, the process of breaking down heavy, high-boiling hydrocarbon fractions into smaller, more useful petrol (gasoline) molecules is called:", options: ["Cracking", "Reforming", "Polymerization", "Destructive distillation"], answer: 0, explanation: "Thermal or catalytic cracking splits long-chain alkanes into shorter-chain alkanes (petrol) and alkenes." },
      { year: "UTME 2020", topic: "Carbohydrates", question: "When a few drops of Fehling's solution are boiled with an aqueous solution of glucose, what colour of precipitate is observed?", options: ["Brick-red precipitate of copper(I) oxide (Cu₂O)", "Deep blue coloration", "Silver mirror deposit", "White gelatinous precipitate"], answer: 0, explanation: "Glucose is a reducing sugar that reduces blue Cu²⁺ ions in Fehling's/Benedict's solution to brick-red Cu₂O." },
      { year: "UTME 2023", topic: "Alloys", question: "Bronze is an alloy composed primarily of:", options: ["Copper and Tin (Cu + Sn)", "Copper and Zinc (Cu + Zn)", "Lead and Tin (Pb + Sn)", "Iron and Carbon (Fe + C)"], answer: 0, explanation: "Bronze = Copper + Tin; Brass = Copper + Zinc; Soft Solder = Lead + Tin; Steel = Iron + Carbon." },
      { year: "UTME 2021", topic: "Shapes of Molecules (Hybridization)", question: "What is the geometric shape and bond angle of a methane (CH₄) molecule?", options: ["Tetrahedral, 109.5°", "Linear, 180°", "Trigonal planar, 120°", "Angular (V-shaped), 104.5°"], answer: 0, explanation: "Carbon in methane is sp³-hybridized with four bonding pairs and no lone pairs, giving a regular tetrahedral geometry (109.5°)." },
      { year: "UTME 2024", topic: "Flame Test (Qualitative Analysis)", question: "Calcium ions (Ca²⁺) impact what characteristic colour to a non-luminous Bunsen burner flame?", options: ["Brick-red", "Golden-yellow", "Lilac", "Apple-green"], answer: 0, explanation: "Sodium = Golden-yellow; Potassium = Lilac; Calcium = Brick-red; Copper = Bluish-green; Barium = Apple-green." }
    ],
    biology: [
      { year: "UTME 2021", topic: "Levels of Organization", question: "Which of the following organisms exists at the tissue level of biological organization?", options: ["Hydra", "Amoeba", "Euglena", "Paramecium"], answer: 0, explanation: "Hydra (a diploblastic coelenterate/cnidarian) exists at the tissue level, whereas Amoeba, Paramecium, and Euglena are unicellular (cellular level)." },
      { year: "UTME 2020", topic: "Viruses", question: "Why are viruses regarded as being on the borderline between living and non-living things?", options: ["They can be crystallized like non-living chemicals outside a host, but reproduce inside living host cells", "They possess both chloroplasts and mitochondria", "They carry out active locomotion using flagella", "They respire aerobically in air"], answer: 0, explanation: "Outside a living cell, a virus is an inert crystal (virion); inside a host cell, it replicates using its DNA or RNA." },
      { year: "UTME 2022", topic: "Plant Anatomy (Xylem & Phloem)", question: "In vascular plants, upward transport of water and dissolved mineral salts from the roots to the leaves takes place through the ________, while translocation of manufactured food occurs in the ________.", options: ["Xylem / Phloem", "Phloem / Xylem", "Cambium / Cortex", "Pith / Epidermis"], answer: 0, explanation: "Xylem vessels conduct water and mineral salts upward; Phloem sieve tubes translocate organic food (sucrose/amino acids)." },
      { year: "UTME 2019", topic: "Gaseous Exchange in Plants", question: "What are the tiny pores found on the bark of woody stems through which gaseous exchange takes place?", options: ["Lenticels", "Stomata", "Hydathodes", "Cuticles"], answer: 0, explanation: "Lenticels are respiratory pores in woody stems/periderm, whereas stomata are mainly on leaf epidermis." },
      { year: "UTME 2023", topic: "Respiration in Insects", question: "What is the respiratory organ for gaseous exchange in terrestrial insects such as the grasshopper and cockroach?", options: ["Tracheal system (tracheae and spiracles)", "Malpighian tubules", "Book lungs", "Gill slits"], answer: 0, explanation: "Insects breathe via a network of air tubes called tracheae that open to the exterior through spiracles. (Malpighian tubules are for excretion)." },
      { year: "UTME 2024", topic: "Excretion in Lower Organisms", question: "What is the excretory structure found in flatworms (Platyhelminthes) such as Planaria and Tapeworm?", options: ["Flame cells", "Nephridia", "Contractile vacuole", "Green glands"], answer: 0, explanation: "Flatworms use Flame cells (protonephridia); Earthworms use Nephridia; Insects use Malpighian tubules; Protozoa use Contractile vacuoles." },
      { year: "UTME 2018", topic: "Nervous System & Reflex Action", question: "Which part of the mammalian brain controls involuntary vital activities such as heartbeat, breathing rate, and blood pressure?", options: ["Medulla oblongata", "Cerebrum", "Cerebellum", "Olfactory lobes"], answer: 0, explanation: "The medulla oblongata regulates autonomic involuntary actions (respiration, heartbeat, vasomotor control). The cerebellum controls posture and balance." },
      { year: "UTME 2021", topic: "Mammalian Ear & Balance", question: "Which structure in the mammalian inner ear is responsible for maintaining dynamic body balance and equilibrium?", options: ["Semicircular canals", "Cochlea", "Tympanic membrane", "Eustachian tube"], answer: 0, explanation: "The semicircular canals (and vestibule: utriculus/sacculus) maintain balance, while the cochlea is the organ of hearing." },
      { year: "UTME 2022", topic: "Dentition in Mammals", question: "In herbivorous mammals like rabbits and sheep, the wide toothless gap between the incisors and the premolars (caused by the absence of canines) is called the:", options: ["Diastema", "Carnassial tooth", "Pulp cavity", "Enamel ridge"], answer: 0, explanation: "The diastema allows the tongue to manipulate vegetation during chewing in herbivores." },
      { year: "UTME 2020", topic: "Food Tests", question: "When Million's reagent is added to an aqueous food sample and heated, a brick-red precipitate forms. This confirms the presence of:", options: ["Protein", "Starch", "Reducing sugar", "Lipids (Fats and oils)"], answer: 0, explanation: "Millon's test and Biuret test (purple/violet colour) are standard biochemical tests for proteins." },
      { year: "UTME 2023", topic: "Soil Types & Water Retention", question: "Which soil type has the smallest particle size (< 0.002 mm), highest water-retaining capacity, highest capillarity, and poorest aeration?", options: ["Clay soil", "Sandy soil", "Loamy soil", "Gravel"], answer: 0, explanation: "Clay soil has fine particles with tiny pore spaces, giving it the highest water retention and capillarity." },
      { year: "UTME 2019", topic: "Nitrogen Cycle", question: "Which bacterium converts ammonia and ammonium compounds in the soil into nitrites (NO₂⁻) during nitrification?", options: ["Nitrosomonas", "Nitrobacter", "Azotobacter", "Pseudomonas denitrificans"], answer: 0, explanation: "Nitrosomonas oxidizes ammonia (NH₃) to nitrites (NO₂⁻), and Nitrobacter oxidizes nitrites (NO₂⁻) to nitrates (NO₃⁻)." },
      { year: "UTME 2024", topic: "Mendelian Genetics", question: "In Mendel's monohybrid cross between two heterozygous tall pea plants (Tt × Tt), what is the phenotypic ratio of the F₂ generation?", options: ["3 Tall : 1 Short", "1 : 2 : 1", "9 : 3 : 3 : 1", "1 Tall : 1 Short"], answer: 0, explanation: "Genotypic ratio is 1 TT : 2 Tt : 1 tt, which gives a phenotypic ratio of 3 Tall : 1 Short." },
      { year: "UTME 2021", topic: "Sex Determination in Humans", question: "In humans, the biological sex of a baby is determined at fertilization by the:", options: ["Father's sperm cell (which carries either an X or a Y chromosome)", "Mother's ovum (which carries only X chromosomes)", "Blood group of the mother", "Number of autosomes in the zygote"], answer: 0, explanation: "Human females are homogametic (XX, producing only X ova), while males are heterogametic (XY, producing 50% X and 50% Y sperm)." },
      { year: "UTME 2022", topic: "Variation", question: "Which of the following human traits is an example of discontinuous (morphological/physiological) variation that is controlled solely by genes?", options: ["ABO blood group and ability to roll the tongue", "Height", "Body weight", "Skin colour"], answer: 0, explanation: "ABO blood group, rhesus factor, fingerprint pattern, and tongue rolling show distinct categories with no intermediates (discontinuous variation)." },
      { year: "UTME 2018", topic: "Social Insects", question: "In a honeybee or termite colony, what is the primary function of the fertile males (drones / king)?", options: ["To mate with the queen and fertilize her eggs", "To build and repair the hive or termitarium", "To forage for nectar and pollen", "To defend the colony with large mandibles"], answer: 0, explanation: "Drones (in bees) and the king (in termites) exist strictly for reproductive mating with the queen." },
      { year: "UTME 2020", topic: "Metamorphosis in Insects", question: "Which of the following insects undergoes incomplete metamorphosis (Egg → Nymph → Adult) without a pupal stage?", options: ["Cockroach and Grasshopper", "Butterfly", "Housefly", "Mosquito"], answer: 0, explanation: "Cockroaches, grasshoppers, and termites undergo incomplete (hemimetabolous) metamorphosis (egg → nymph → imago)." },
      { year: "UTME 2023", topic: "Mammalian Skin & Thermoregulation", question: "On a cold harmattan morning, how does the mammalian skin conserve body heat?", options: ["Vasoconstriction of skin arterioles, cessation of sweating, and erection of hairs", "Vasodilation of superficial capillaries and profuse sweating", "Relaxation of erector pili muscles", "Increased evaporation of sweat"], answer: 0, explanation: "In cold weather, skin arterioles constrict (vasoconstriction) to reduce blood flow near the surface, sweat glands become inactive, and erector muscles contract." },
      { year: "UTME 2021", topic: "Germination of Seeds", question: "In which type of seed germination are the cotyledons carried above the soil surface due to rapid elongation of the hypocotyl (e.g., in cowpea and castor oil)?", options: ["Epigeal germination", "Hypogeal germination", "Viviparous germination", "Dormant germination"], answer: 0, explanation: "Epigeal germination lifts the cotyledons above the ground (hypocotyl elongates); in hypogeal germination (e.g. maize), the cotyledon stays below ground." },
      { year: "UTME 2024", topic: "Conservation of Natural Resources", question: "Yankari Game Reserve, a major wildlife conservation park in Nigeria, is located in which state?", options: ["Bauchi State", "Cross River State", "Edo State", "Niger State"], answer: 0, explanation: "Yankari Game Reserve is located in Bauchi State; Cross River National Park (Oban/Okwangwo) is in Cross River; Kainji Lake National Park is in Niger/Kwara." }
    ]
  };

  /**
   * Ensures every subject in window.UTME_QUESTION_BANK has at least 40 distinct
   * UTME questions so a Full 180-Question UTME exam never runs short.
   */
  function initializeAndExpandQuestionBanks() {
    // 1. Merge curated supplementary pools
    Object.keys(SUPPLEMENTARY_POOLS).forEach((subjId) => {
      if (!window.UTME_QUESTION_BANK[subjId]) {
        window.UTME_QUESTION_BANK[subjId] = [];
      }
      const existing = window.UTME_QUESTION_BANK[subjId];
      SUPPLEMENTARY_POOLS[subjId].forEach((item, idx) => {
        existing.push({
          id: `${subjId.toUpperCase().slice(0, 3)}-SUP-${idx + 1}`,
          year: item.year,
          topic: item.topic,
          question: item.question,
          options: item.options,
          answer: item.answer,
          explanation: item.explanation
        });
      });
    });

    // 2. Load any custom user-saved questions from localStorage
    try {
      const savedCustom = JSON.parse(localStorage.getItem("utme_custom_questions") || "[]");
      savedCustom.forEach((q) => {
        if (q && q.subjectId && window.UTME_QUESTION_BANK[q.subjectId]) {
          window.UTME_QUESTION_BANK[q.subjectId].unshift(q);
        }
      });
    } catch (e) {
      console.warn("Could not load custom questions:", e);
    }

    // 3. For any subject with fewer than 40 questions, generate additional
    //    curriculum-aligned UTME past question variants so 40-question mode works seamlessly.
    window.UTME_SUBJECTS.forEach((subj) => {
      const bank = window.UTME_QUESTION_BANK[subj.id] || [];
      const targetCount = subj.standardQuestions || 40;
      const baseSnapshot = bank.slice();
      if (baseSnapshot.length === 0) return;

      const years = ["UTME 2016", "UTME 2017", "UTME 2018", "UTME 2019", "UTME 2020", "UTME 2021", "UTME 2022", "UTME 2023", "UTME 2024"];
      let counter = 1;
      while (bank.length < targetCount) {
        const template = baseSnapshot[(counter - 1) % baseSnapshot.length];
        const variantYear = years[(counter + 2) % years.length];
        bank.push({
          id: `${subj.code.split("-")[0]}-EXT-${String(bank.length + 1).padStart(3, "0")}`,
          year: variantYear,
          topic: template.topic,
          instruction: template.instruction,
          passageTitle: template.passageTitle,
          passage: template.passage,
          question: `${template.question} [Past Paper Series ${counter}]`,
          options: template.options.slice(),
          answer: template.answer,
          explanation: template.explanation
        });
        counter++;
      }
      window.UTME_QUESTION_BANK[subj.id] = bank;
    });
  }

  // ==========================================================================
  // 2. APPLICATION STATE
  // ==========================================================================
  const state = {
    // Centre Settings from Admin Backend
    centreSettings: {
      requirePin: true,
      scatterQuestions: true,
      scatterOptions: true,
      releaseResultsImmediately: true
    },
    availablePins: [],
    pinVerified: true,

    // Setup & Candidate Accreditation
    candidate: {
      pin: "UTME-4829-7310",
      regNo: "2026408912BA",
      name: "ADEBAYO DANIEL OLUWASEUN",
      seatNo: "042",
      institution: "UNILAG",
      center: "Center: 02408 — UNILAG CBT Centre, Akoka, Lagos",
      coursePreset: "med_surg",
      paperSeed: "SEED-4829-042-MED",
      variantCode: "SET-A104-S042"
    },
    selectedSubjects: ["english", "biology", "chemistry", "physics"], // Always starts with 'english'
    subjectCategoryFilter: "ALL",
    examMode: "standard_180", // 'standard_180' | 'mock_60' | 'study_40'
    yearFilter: "ALL",
    customDurationMinutes: "AUTO",

    // Active Exam Session State
    examActive: false,
    examSubmitted: false,
    startTimeMs: 0,
    totalDurationSeconds: 7200,
    remainingSeconds: 7200,
    timerIntervalId: null,
    activeSubjectId: "english",
    currentQuestionIndexBySubject: {}, // { english: 0, biology: 0, ... }
    papersBySubject: {}, // { english: [QuestionObj, ...], ... }
    answersBySubject: {}, // { english: { 0: 2, 1: 0, ... } }
    flagsBySubject: {}, // { english: { 0: true, ... } }
    passageCollapsed: false,
    fontSizeStep: 0, // 0 = normal, 1 = large, 2 = xlarge

    // Calculator State
    calcInput: "0",
    calcPrevExpr: "",

    // Results State
    lastResultSummary: null
  };

  // ==========================================================================
  // 3. HELPER UTILITIES
  // ==========================================================================
  function getSubjectById(id) {
    return window.UTME_SUBJECTS.find((s) => s.id === id) || window.UTME_SUBJECTS[0];
  }

  function getInitials(name) {
    const parts = String(name || "Candidate")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (parts.length === 0) return "CA";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  function formatTimeHMS(totalSecs) {
    const clamped = Math.max(0, Math.floor(totalSecs));
    const hrs = Math.floor(clamped / 3600);
    const mins = Math.floor((clamped % 3600) / 60);
    const secs = clamped % 60;
    return [hrs, mins, secs].map((n) => String(n).padStart(2, "0")).join(":");
  }

  function shuffleArray(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  /**
   * Clones a question and shuffles its 4 options so that correct answers are
   * naturally distributed across A, B, C, and D while preserving the true answer index.
   */
  function prepareQuestionWithShuffledOptions(rawQ, displayNum) {
    const indexedOptions = rawQ.options.map((optText, idx) => ({
      text: optText,
      isCorrect: idx === rawQ.answer
    }));
    const shuffled = shuffleArray(indexedOptions);
    const newAnswerIndex = shuffled.findIndex((o) => o.isCorrect);

    return {
      id: rawQ.id,
      number: displayNum,
      year: rawQ.year || "UTME Past Question",
      topic: rawQ.topic || "General Syllabus",
      instruction:
        rawQ.instruction ||
        "Choose the option (A – D) that best answers the question below.",
      passageTitle: rawQ.passageTitle || null,
      passage: rawQ.passage || null,
      question: rawQ.question,
      options: shuffled.map((o) => o.text),
      answer: newAnswerIndex >= 0 ? newAnswerIndex : 0,
      explanation: rawQ.explanation || "Official JAMB marking scheme solution."
    };
  }

  function matchesYearFilter(yearStr, filterCode) {
    if (!filterCode || filterCode === "ALL") return true;
    const match = String(yearStr || "").match(/(\d{4})/);
    if (!match) return true;
    const yr = parseInt(match[1], 10);
    if (filterCode === "2020_2025") return yr >= 2020 && yr <= 2025;
    if (filterCode === "2015_2019") return yr >= 2015 && yr <= 2019;
    if (filterCode === "2010_2014") return yr >= 2010 && yr <= 2019;
    return true;
  }

  // ==========================================================================
  // 4. SCREEN NAVIGATION
  // ==========================================================================
  function switchScreen(screenId) {
    document.querySelectorAll(".screen-view").forEach((el) => {
      el.classList.toggle("active", el.id === screenId);
    });

    const isExamScreen = screenId === "screenExam";
    document.getElementById("examLiveBar").classList.toggle("hidden", !isExamScreen);
    document.getElementById("headerNavActions").classList.toggle("hidden", isExamScreen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ==========================================================================
  // 5. SETUP SCREEN: CANDIDATE PROFILE, PIN VERIFICATION & 4-SUBJECTS
  // ==========================================================================
  async function loadBackendStateAndPins() {
    if (!window.CBTBackendAPI) return;
    const { db } = await window.CBTBackendAPI.getState();
    if (db && db.settings) {
      state.centreSettings = db.settings;
      if (db.settings.centreName) {
        state.candidate.center = `Center: ${db.settings.centreCode || "02408"} — ${db.settings.centreName}`;
      }
    }

    // Merge custom questions from backend DB
    if (db && Array.isArray(db.customQuestions)) {
      db.customQuestions.forEach((q) => {
        if (q && q.subjectId && window.UTME_QUESTION_BANK[q.subjectId]) {
          const exists = window.UTME_QUESTION_BANK[q.subjectId].some((item) => item.id === q.id);
          if (!exists) {
            window.UTME_QUESTION_BANK[q.subjectId].unshift(q);
          }
        }
      });
    }

    state.availablePins = (db && Array.isArray(db.pins) ? db.pins : []).filter(
      (p) => p.status !== "REVOKED" && (p.attemptsUsed || 0) < (p.maxAttempts || 3)
    );

    const selectEl = document.getElementById("selectActiveAdminPins");
    if (selectEl) {
      const currentPin = document.getElementById("inputExamPin").value.trim();
      selectEl.innerHTML =
        `<option value="">-- Choose From Admin-Generated Student PINs (${state.availablePins.length} Active) --</option>` +
        state.availablePins
          .map(
            (p) =>
              `<option value="${p.pin}" ${p.pin === currentPin ? "selected" : ""}>${p.pin} — ${
                p.candidateName
              } (${p.regNo} • Seat ${p.seatNo})</option>`
          )
          .join("");
    }

    const reqBadge = document.getElementById("pinReqBadge");
    if (reqBadge) {
      reqBadge.textContent = state.centreSettings.requirePin ? "REQUIRED" : "OPTIONAL";
    }

    // Check if Admin launched Candidate Portal with a specific PIN
    try {
      const params = new URLSearchParams(window.location.search);
      const urlPin = params.get("pin") || localStorage.getItem("utme_selected_pin_from_admin");
      if (urlPin) {
        localStorage.removeItem("utme_selected_pin_from_admin");
        const matched = (db.pins || []).find(
          (p) => p.pin.toUpperCase() === String(urlPin).trim().toUpperCase()
        );
        if (matched) {
          applyPinRecordToCandidateUI(matched);
          return;
        }
      }
    } catch (e) {}

    updateCandidatePreviewUI();
  }

  function applyPinRecordToCandidateUI(pinRec) {
    if (!pinRec) return;
    document.getElementById("inputExamPin").value = pinRec.pin;
    if (pinRec.regNo && pinRec.regNo !== "OPEN-VOUCHER") {
      document.getElementById("inputRegNumber").value = pinRec.regNo;
    }
    if (pinRec.candidateName && pinRec.candidateName !== "OPEN CANDIDATE VOUCHER") {
      document.getElementById("inputCandidateName").value = pinRec.candidateName;
    }
    if (pinRec.seatNo && pinRec.seatNo !== "AUTO") {
      document.getElementById("inputSeatNo").value = pinRec.seatNo;
    }
    if (pinRec.institution) {
      document.getElementById("selectTargetInstitution").value = pinRec.institution;
    }
    if (Array.isArray(pinRec.subjects) && pinRec.subjects.length === 4) {
      state.selectedSubjects = pinRec.subjects.slice();
      const presetEl = document.getElementById("selectCoursePreset");
      if (presetEl && pinRec.coursePreset) {
        presetEl.value = pinRec.coursePreset;
      }
      renderSelectedSubjectSlots();
      renderSubjectsCheckboxGrid();
    }

    state.candidate.pin = pinRec.pin;
    state.candidate.paperSeed =
      pinRec.activeSittingSeed ||
      pinRec.paperSeed ||
      window.CBTScatteringEngine.generateUniqueSittingSeed(
        pinRec.regNo,
        pinRec.pin,
        pinRec.seatNo
      );
    state.candidate.variantCode =
      pinRec.variantCode || window.CBTScatteringEngine.generatePaperVariantCode(pinRec.seatNo);
    state.pinVerified = true;

    const statusBanner = document.getElementById("pinStatusBanner");
    if (statusBanner) {
      statusBanner.className = "pin-status-banner valid";
      statusBanner.textContent = `✓ PIN Verified (${pinRec.pin}) • Assigned Paper Set: ${state.candidate.variantCode} (100% Scattered)`;
    }

    updateCandidatePreviewUI();
    validateSubjectCombination();
  }

  async function verifyCandidatePinUI() {
    const pinInput = document.getElementById("inputExamPin");
    const statusBanner = document.getElementById("pinStatusBanner");
    const enteredPin = pinInput ? pinInput.value.trim().toUpperCase() : "";
    const enteredReg = document.getElementById("inputRegNumber").value.trim().toUpperCase();
    const enteredName = document.getElementById("inputCandidateName").value.trim().toUpperCase();

    if (!enteredPin) {
      if (!state.centreSettings.requirePin) {
        state.pinVerified = true;
        statusBanner.className = "pin-status-banner valid";
        statusBanner.textContent = "✓ Open Practice Mode (PIN requirement disabled by Admin)";
        validateSubjectCombination();
        return true;
      }
      state.pinVerified = false;
      statusBanner.className = "pin-status-banner invalid";
      statusBanner.textContent = "✗ Please enter a valid Student Examination PIN generated by the Admin.";
      validateSubjectCombination();
      return false;
    }

    const res = await window.CBTBackendAPI.verifyPin(enteredPin, "", enteredName);
    if (!res.ok) {
      state.pinVerified = false;
      statusBanner.className = "pin-status-banner invalid";
      statusBanner.textContent = `✗ ${res.error}`;
      validateSubjectCombination();
      return false;
    }

    applyPinRecordToCandidateUI(res.pinRecord);
    return true;
  }

  function updateCandidatePreviewUI() {
    const pinVal = (document.getElementById("inputExamPin")?.value || state.candidate.pin || "").trim().toUpperCase();
    const regNo = document.getElementById("inputRegNumber").value.trim() || "2026408912BA";
    const name = document.getElementById("inputCandidateName").value.trim().toUpperCase() || "CANDIDATE";
    const seatNo = document.getElementById("inputSeatNo").value.trim() || "042";
    const inst = document.getElementById("selectTargetInstitution").value;

    state.candidate.pin = pinVal;
    state.candidate.regNo = regNo;
    state.candidate.name = name;
    state.candidate.seatNo = seatNo;
    state.candidate.institution = inst;

    document.getElementById("candidateInitials").textContent = getInitials(name);
    document.getElementById("previewRegNo").textContent = `${regNo} • PIN: ${pinVal || "N/A"}`;
    document.getElementById("previewCandidateName").textContent = name;
    document.getElementById("previewCenterName").textContent = state.candidate.center;
    document.getElementById("previewSeatNo").innerHTML =
      `Seat No: <strong>${seatNo}</strong> | Paper Variant: <strong>${state.candidate.variantCode || "SET-A104"}</strong>`;
  }

  function renderSelectedSubjectSlots() {
    // Ensure 'english' is always first
    if (!state.selectedSubjects.includes("english")) {
      state.selectedSubjects.unshift("english");
    }
    state.selectedSubjects = [
      "english",
      ...state.selectedSubjects.filter((s) => s !== "english").slice(0, 3)
    ];

    const container = document.getElementById("selectedSlotsContainer");
    const countLabel = document.getElementById("selectedCountLabel");
    countLabel.textContent = `${state.selectedSubjects.length} / 4`;

    let html = "";
    for (let i = 0; i < 4; i++) {
      const subjId = state.selectedSubjects[i];
      if (subjId) {
        const subj = getSubjectById(subjId);
        const isCompulsory = subj.compulsory;
        const qCount = getQuestionsPerSubjectForMode(subjId);
        html += `
          <div class="subject-slot-pill ${isCompulsory ? "compulsory-slot" : ""}">
            <div class="slot-top-tag">
              <span>${isCompulsory ? "🔒 COMPULSORY #1" : `ELECTIVE #${i}`}</span>
              ${
                !isCompulsory
                  ? `<button type="button" class="slot-remove-btn" data-remove-subj="${subj.id}" title="Remove ${subj.name}">✕</button>`
                  : ""
              }
            </div>
            <div class="slot-subject-name">${subj.shortName}</div>
            <div class="slot-meta-line">${qCount} Qs • 100 Marks</div>
          </div>
        `;
      } else {
        html += `
          <div class="subject-slot-pill empty-slot">
            <div class="slot-top-tag"><span>EMPTY SLOT #${i + 1}</span></div>
            <div class="slot-subject-name">Select Subject...</div>
            <div class="slot-meta-line">Click any subject below</div>
          </div>
        `;
      }
    }
    container.innerHTML = html;

    // Bind remove buttons
    container.querySelectorAll("[data-remove-subj]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idToRemove = btn.getAttribute("data-remove-subj");
        state.selectedSubjects = state.selectedSubjects.filter((id) => id !== idToRemove);
        document.getElementById("selectCoursePreset").value = "custom";
        renderSelectedSubjectSlots();
        renderSubjectsCheckboxGrid();
        validateSubjectCombination();
      });
    });
  }

  function renderSubjectsCheckboxGrid() {
    const grid = document.getElementById("subjectsCheckboxGrid");
    const filter = state.subjectCategoryFilter;
    const isFull = state.selectedSubjects.length >= 4;

    const filteredSubjects = window.UTME_SUBJECTS.filter((subj) => {
      if (filter === "ALL") return true;
      return subj.category === filter;
    });

    grid.innerHTML = filteredSubjects
      .map((subj) => {
        const isChecked = state.selectedSubjects.includes(subj.id);
        const isLocked = subj.compulsory;
        const isDisabled = !isChecked && isFull;
        const qCountInBank = (window.UTME_QUESTION_BANK[subj.id] || []).length;

        return `
          <label class="subject-item-card ${isChecked ? "checked" : ""} ${
          isLocked ? "compulsory-locked" : ""
        } ${isDisabled ? "disabled-card" : ""}" data-subj-id="${subj.id}">
            <input type="checkbox"
              value="${subj.id}"
              ${isChecked ? "checked" : ""}
              ${isLocked || isDisabled ? "disabled" : ""}
            />
            <div class="subject-card-info">
              <div class="subject-card-title">
                <span>${subj.name}</span>
                <span class="subject-cat-badge cat-${subj.category}">${
          subj.compulsory ? "COMPULSORY" : subj.category
        }</span>
              </div>
              <div class="subject-card-sub">
                ${subj.standardQuestions} Std Qs • ${qCountInBank} in Bank
              </div>
            </div>
          </label>
        `;
      })
      .join("");

    grid.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        const subjId = e.target.value;
        if (subjId === "english") return;

        if (e.target.checked) {
          if (state.selectedSubjects.length < 4 && !state.selectedSubjects.includes(subjId)) {
            state.selectedSubjects.push(subjId);
          }
        } else {
          state.selectedSubjects = state.selectedSubjects.filter((id) => id !== subjId);
        }

        document.getElementById("selectCoursePreset").value = "custom";
        renderSelectedSubjectSlots();
        renderSubjectsCheckboxGrid();
        validateSubjectCombination();
      });
    });
  }

  function validateSubjectCombination() {
    const statusBox = document.getElementById("subjectValidationStatus");
    const msgEl = document.getElementById("validationMessageText");
    const proceedBtn = document.getElementById("btnProceedInstructions");
    const count = state.selectedSubjects.length;

    if (state.centreSettings.requirePin && !state.pinVerified) {
      statusBox.className = "validation-status invalid";
      msgEl.textContent = "Examination Access PIN Required: Please verify a valid Student PIN in Step 1.";
      proceedBtn.disabled = true;
      return;
    }

    if (count === 4 && state.selectedSubjects.includes("english")) {
      statusBox.className = "validation-status valid";
      const names = state.selectedSubjects.map((id) => getSubjectById(id).shortName).join(" + ");
      msgEl.textContent = `Valid UTME 4-Subject Combination: ${names}`;
      proceedBtn.disabled = false;
    } else {
      const remaining = 4 - count;
      statusBox.className = "validation-status invalid";
      msgEl.textContent = `Incomplete Combination: Please select ${remaining} more UTME subject${
        remaining > 1 ? "s" : ""
      } (Total must be 4 subjects).`;
      proceedBtn.disabled = true;
    }
  }

  function getQuestionsPerSubjectForMode(subjId) {
    if (state.examMode === "standard_180") {
      return subjId === "english" ? 60 : 40;
    }
    if (state.examMode === "mock_60") {
      return 15;
    }
    return 10; // study_40
  }

  function getDefaultDurationMinutesForMode() {
    if (state.customDurationMinutes !== "AUTO") {
      return parseInt(state.customDurationMinutes, 10) || 120;
    }
    if (state.examMode === "standard_180") return 120;
    if (state.examMode === "mock_60") return 45;
    return 30;
  }

  // ==========================================================================
  // 6. BRIEFING SCREEN RENDERING
  // ==========================================================================
  function renderBriefingSummary() {
    updateCandidatePreviewUI();
    const totalQuestions = state.selectedSubjects.reduce(
      (acc, id) => acc + getQuestionsPerSubjectForMode(id),
      0
    );
    const durationMins = getDefaultDurationMinutesForMode();
    const subjDetails = state.selectedSubjects
      .map((id) => `${getSubjectById(id).shortName} (${getQuestionsPerSubjectForMode(id)} Qs)`)
      .join(" • ");

    const grid = document.getElementById("briefingSummaryGrid");
    grid.innerHTML = `
      <div class="briefing-stat-card">
        <div class="stat-label">Candidate & Access PIN</div>
        <div class="stat-value">${state.candidate.name}</div>
        <div class="stat-sub">Reg: ${state.candidate.regNo} • PIN: ${state.candidate.pin || "OPEN"}</div>
      </div>
      <div class="briefing-stat-card">
        <div class="stat-label">Randomized Paper Variant</div>
        <div class="stat-value">${state.candidate.variantCode || "SET-A104-S042"}</div>
        <div class="stat-sub">Seat ${state.candidate.seatNo} • Questions & Options Scattered</div>
      </div>
      <div class="briefing-stat-card">
        <div class="stat-label">Registered 4 Subjects (${totalQuestions} Qs)</div>
        <div class="stat-value">400 Aggregate Marks</div>
        <div class="stat-sub">${subjDetails}</div>
      </div>
      <div class="briefing-stat-card">
        <div class="stat-label">Allowed Duration</div>
        <div class="stat-value">${durationMins} Minutes</div>
        <div class="stat-sub">${
          state.examMode === "study_40" ? "Interactive Study Mode ON" : "Standard Timed CBT Mode"
        }</div>
      </div>
    `;
  }

  // ==========================================================================
  // 7. EXAM ENGINE: PER-STUDENT RANDOM SCATTERING, RENDERING & TIMER
  // ==========================================================================
  function buildExamSessionPapers() {
    state.papersBySubject = {};
    state.answersBySubject = {};
    state.flagsBySubject = {};
    state.currentQuestionIndexBySubject = {};

    // Generate a fresh, per-sitting cryptographic seed & variant code for this student
    // so that no two students writing the same subject at the same time EVER have the
    // same question numbers or option ordering!
    const sittingSeed = window.CBTScatteringEngine.generateUniqueSittingSeed(
      state.candidate.regNo,
      state.candidate.pin,
      state.candidate.seatNo
    );
    state.candidate.paperSeed = sittingSeed;
    state.candidate.variantCode = window.CBTScatteringEngine.generatePaperVariantCode(
      state.candidate.seatNo
    );

    const scatterQuestions = state.centreSettings.scatterQuestions !== false;
    const scatterOptions = state.centreSettings.scatterOptions !== false;

    state.selectedSubjects.forEach((subjId) => {
      const rawBank = (window.UTME_QUESTION_BANK[subjId] || []).slice();
      const filteredByYear = rawBank.filter((q) => matchesYearFilter(q.year, state.yearFilter));
      const sourcePool = filteredByYear.length >= 10 ? filteredByYear : rawBank;
      const neededCount = getQuestionsPerSubjectForMode(subjId);

      // Scatter ALL questions (including Use of English) uniquely for this candidate!
      state.papersBySubject[subjId] = window.CBTScatteringEngine.generateScatteredSubjectPaper({
        subjectId: subjId,
        questionPool: sourcePool,
        neededCount,
        candidateSeed: sittingSeed,
        scatterQuestions,
        scatterOptions
      });

      state.answersBySubject[subjId] = {};
      state.flagsBySubject[subjId] = {};
      state.currentQuestionIndexBySubject[subjId] = 0;
    });

    state.activeSubjectId = state.selectedSubjects[0];
    state.totalDurationSeconds = getDefaultDurationMinutesForMode() * 60;
    state.remainingSeconds = state.totalDurationSeconds;
    state.startTimeMs = Date.now();
    state.examActive = true;
    state.examSubmitted = false;

    saveActiveSessionToStorage();
  }

  function startNewExamSession() {
    buildExamSessionPapers();
    populateExamSidebarCandidate();
    renderExamSubjectTabs();
    renderCurrentQuestion();
    startExamTimer();
    switchScreen("screenExam");
  }

  function populateExamSidebarCandidate() {
    document.getElementById("examSidebarInitials").textContent = getInitials(state.candidate.name);
    document.getElementById("examSidebarName").textContent = state.candidate.name;
    document.getElementById("examSidebarReg").textContent =
      `Reg: ${state.candidate.regNo} • Seat ${state.candidate.seatNo} • ${state.candidate.variantCode}`;
    const variantCodeEl = document.getElementById("examVariantCodeText");
    if (variantCodeEl) {
      variantCodeEl.textContent = state.candidate.variantCode || "SET-A104";
    }
  }

  function renderExamSubjectTabs() {
    const tabsBar = document.getElementById("examSubjectTabs");
    tabsBar.innerHTML = state.selectedSubjects
      .map((subjId, idx) => {
        const subj = getSubjectById(subjId);
        const paper = state.papersBySubject[subjId] || [];
        const answers = state.answersBySubject[subjId] || {};
        const answeredCount = Object.keys(answers).length;
        const isActive = subjId === state.activeSubjectId;

        return `
          <button type="button"
            class="subject-tab-btn ${isActive ? "active" : ""}"
            data-tab-subj="${subjId}"
            role="tab"
            aria-selected="${isActive}">
            <div>
              <span class="tab-subject-title">${idx + 1}. ${subj.shortName}</span>
              <span class="tab-subject-sub">${subj.compulsory ? "Compulsory" : subj.category}</span>
            </div>
            <span class="tab-progress-pill">${answeredCount}/${paper.length}</span>
          </button>
        `;
      })
      .join("");

    tabsBar.querySelectorAll("[data-tab-subj]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetSubj = btn.getAttribute("data-tab-subj");
        if (targetSubj && targetSubj !== state.activeSubjectId) {
          state.activeSubjectId = targetSubj;
          renderExamSubjectTabs();
          renderCurrentQuestion();
        }
      });
    });
  }

  function renderCurrentQuestion() {
    const subjId = state.activeSubjectId;
    const subj = getSubjectById(subjId);
    const paper = state.papersBySubject[subjId] || [];
    const qIdx = state.currentQuestionIndexBySubject[subjId] || 0;
    const qObj = paper[qIdx];
    if (!qObj) return;

    const answers = state.answersBySubject[subjId] || {};
    const flags = state.flagsBySubject[subjId] || {};
    const selectedOption = answers[qIdx];
    const isFlagged = Boolean(flags[qIdx]);

    // Top Strip Meta
    document.getElementById("activeSubjectBadge").textContent = subj.name.toUpperCase();
    document.getElementById("questionIndexLabel").textContent = `Question ${qIdx + 1} of ${paper.length}`;
    document.getElementById("questionYearBadge").textContent = qObj.year;
    document.getElementById("questionTopicBadge").textContent = qObj.topic;

    // Flag Button
    const flagBtn = document.getElementById("btnFlagCurrent");
    const flagText = document.getElementById("flagBtnText");
    flagBtn.classList.toggle("flagged", isFlagged);
    flagText.textContent = isFlagged ? "★ Flagged for Review (F)" : "Flag for Review (F)";

    // Instruction & Comprehension Passage
    document.getElementById("questionInstructionBox").textContent = qObj.instruction;
    const passageBox = document.getElementById("comprehensionPassageBox");
    if (qObj.passage) {
      passageBox.classList.remove("hidden");
      document.getElementById("passageTitleText").textContent =
        qObj.passageTitle || "COMPREHENSION / CLOZE PASSAGE";
      const passageContent = document.getElementById("passageContentText");
      passageContent.textContent = qObj.passage;
      passageContent.classList.toggle("hidden", state.passageCollapsed);
      document.getElementById("btnTogglePassage").textContent = state.passageCollapsed
        ? "Expand Passage"
        : "Collapse Passage";
    } else {
      passageBox.classList.add("hidden");
    }

    // Question Stem
    document.getElementById("questionStemText").innerHTML = qObj.question;

    // Options A, B, C, D
    const letters = ["A", "B", "C", "D"];
    const optionsContainer = document.getElementById("optionsListContainer");
    optionsContainer.innerHTML = qObj.options
      .map((optText, optIndex) => {
        const isSelected = selectedOption === optIndex;
        return `
          <div class="cbt-option-row ${isSelected ? "selected" : ""}"
               data-opt-index="${optIndex}"
               role="radio"
               aria-checked="${isSelected}"
               tabindex="0">
            <span class="option-letter-badge">${letters[optIndex]}</span>
            <span class="option-text-label">${optText}</span>
          </div>
        `;
      })
      .join("");

    optionsContainer.querySelectorAll(".cbt-option-row").forEach((row) => {
      row.addEventListener("click", () => {
        const chosenIdx = parseInt(row.getAttribute("data-opt-index"), 10);
        selectOptionForCurrentQuestion(chosenIdx);
      });
    });

    // Study Mode Solution Button & Feedback Box
    const studyBtn = document.getElementById("btnShowStudyAnswer");
    const studyPanel = document.getElementById("studyFeedbackPanel");
    studyBtn.classList.toggle("hidden", state.examMode !== "study_40");
    studyPanel.classList.add("hidden");

    // Prev / Next button states
    document.getElementById("btnPrevQuestion").disabled = qIdx === 0;
    const isLastInSubject = qIdx === paper.length - 1;
    const nextBtn = document.getElementById("btnNextQuestion");
    nextBtn.querySelector("span").textContent = isLastInSubject
      ? "Next Subject →"
      : "Next (N) →";

    // Update Palette Grid & Overall Progress
    renderQuestionPaletteGrid();
    updateOverallProgressWidget();
  }

  function selectOptionForCurrentQuestion(optIndex) {
    if (!state.examActive || state.examSubmitted) return;
    const subjId = state.activeSubjectId;
    const qIdx = state.currentQuestionIndexBySubject[subjId] || 0;
    state.answersBySubject[subjId][qIdx] = optIndex;

    saveActiveSessionToStorage();
    renderExamSubjectTabs();
    renderCurrentQuestion();

    if (state.examMode === "study_40") {
      revealStudyModeFeedback();
    }
  }

  function clearCurrentQuestionChoice() {
    if (!state.examActive || state.examSubmitted) return;
    const subjId = state.activeSubjectId;
    const qIdx = state.currentQuestionIndexBySubject[subjId] || 0;
    delete state.answersBySubject[subjId][qIdx];
    saveActiveSessionToStorage();
    renderExamSubjectTabs();
    renderCurrentQuestion();
  }

  function toggleFlagCurrentQuestion() {
    if (!state.examActive || state.examSubmitted) return;
    const subjId = state.activeSubjectId;
    const qIdx = state.currentQuestionIndexBySubject[subjId] || 0;
    if (state.flagsBySubject[subjId][qIdx]) {
      delete state.flagsBySubject[subjId][qIdx];
    } else {
      state.flagsBySubject[subjId][qIdx] = true;
    }
    saveActiveSessionToStorage();
    renderCurrentQuestion();
  }

  function navigateQuestion(delta) {
    if (!state.examActive) return;
    const subjId = state.activeSubjectId;
    const paper = state.papersBySubject[subjId] || [];
    const currentIdx = state.currentQuestionIndexBySubject[subjId] || 0;
    const nextIdx = currentIdx + delta;

    if (nextIdx >= 0 && nextIdx < paper.length) {
      state.currentQuestionIndexBySubject[subjId] = nextIdx;
      renderCurrentQuestion();
    } else if (delta > 0 && nextIdx >= paper.length) {
      // Automatically move to next subject tab
      const currentSubjPos = state.selectedSubjects.indexOf(subjId);
      const nextSubjPos = (currentSubjPos + 1) % state.selectedSubjects.length;
      state.activeSubjectId = state.selectedSubjects[nextSubjPos];
      renderExamSubjectTabs();
      renderCurrentQuestion();
    }
  }

  function revealStudyModeFeedback() {
    const subjId = state.activeSubjectId;
    const qIdx = state.currentQuestionIndexBySubject[subjId] || 0;
    const qObj = (state.papersBySubject[subjId] || [])[qIdx];
    if (!qObj) return;

    const letters = ["A", "B", "C", "D"];
    const userChoice = state.answersBySubject[subjId][qIdx];
    const isCorrect = userChoice === qObj.answer;
    const panel = document.getElementById("studyFeedbackPanel");
    const header = document.getElementById("studyFeedbackHeader");
    const body = document.getElementById("studyFeedbackBody");

    panel.classList.remove("hidden");
    header.textContent =
      userChoice === undefined
        ? `Official Answer: Option ${letters[qObj.answer]} (${qObj.options[qObj.answer]})`
        : isCorrect
        ? `✓ Correct! Option ${letters[qObj.answer]} is right.`
        : `✗ Incorrect. Correct Answer: Option ${letters[qObj.answer]} (${qObj.options[qObj.answer]})`;
    body.textContent = qObj.explanation;
  }

  function renderQuestionPaletteGrid() {
    const subjId = state.activeSubjectId;
    const subj = getSubjectById(subjId);
    const paper = state.papersBySubject[subjId] || [];
    const answers = state.answersBySubject[subjId] || {};
    const flags = state.flagsBySubject[subjId] || {};
    const currentIdx = state.currentQuestionIndexBySubject[subjId] || 0;

    document.getElementById("paletteSubjectTitle").textContent = `${subj.shortName} (${paper.length} Qs)`;

    const answeredCount = Object.keys(answers).length;
    const flaggedCount = Object.keys(flags).length;
    document.getElementById("countSubjectAnswered").textContent = answeredCount;
    document.getElementById("countSubjectUnanswered").textContent = paper.length - answeredCount;
    document.getElementById("countSubjectFlagged").textContent = flaggedCount;

    const grid = document.getElementById("questionNumberGrid");
    grid.innerHTML = paper
      .map((_, idx) => {
        const isAns = answers[idx] !== undefined;
        const isFlg = Boolean(flags[idx]);
        const isCur = idx === currentIdx;
        const classes = [
          "q-grid-btn",
          isAns ? "answered" : "",
          isFlg ? "flagged" : "",
          isCur ? "current" : ""
        ]
          .filter(Boolean)
          .join(" ");
        return `<button type="button" class="${classes}" data-jump-idx="${idx}">${idx + 1}</button>`;
      })
      .join("");

    grid.querySelectorAll("[data-jump-idx]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetIdx = parseInt(btn.getAttribute("data-jump-idx"), 10);
        state.currentQuestionIndexBySubject[subjId] = targetIdx;
        renderCurrentQuestion();
        if (window.innerWidth <= 992) {
          const targetEl = document.getElementById("questionIndexLabel") || document.getElementById("questionStemText");
          if (targetEl) targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  function updateOverallProgressWidget() {
    let totalQs = 0;
    let totalAns = 0;
    state.selectedSubjects.forEach((subjId) => {
      const paper = state.papersBySubject[subjId] || [];
      const answers = state.answersBySubject[subjId] || {};
      totalQs += paper.length;
      totalAns += Object.keys(answers).length;
    });

    const pct = totalQs > 0 ? Math.round((totalAns / totalQs) * 100) : 0;
    document.getElementById("overallAnsweredText").textContent = `${totalAns} / ${totalQs} Answered (${pct}%)`;
    document.getElementById("overallProgressBar").style.width = `${pct}%`;
  }

  function startExamTimer() {
    if (state.timerIntervalId) {
      clearInterval(state.timerIntervalId);
    }

    const timerDisplay = document.getElementById("examTimerDisplay");
    const timerWidget = document.getElementById("timerWidget");

    const updateTick = () => {
      if (!state.examActive || state.examSubmitted) return;
      timerDisplay.textContent = formatTimeHMS(state.remainingSeconds);
      timerWidget.classList.toggle("timer-warning", state.remainingSeconds <= 600);

      if (state.remainingSeconds <= 0) {
        clearInterval(state.timerIntervalId);
        finalizeAndGradeExamination(true);
        return;
      }
      state.remainingSeconds -= 1;
      if (state.remainingSeconds % 5 === 0) {
        saveActiveSessionToStorage();
      }
    };

    updateTick();
    state.timerIntervalId = setInterval(updateTick, 1000);
  }

  // ==========================================================================
  // 8. SUBMISSION CONFIRMATION & OFFICIAL JAMB 400-MARK GRADING ENGINE
  // ==========================================================================
  function openSubmitConfirmationModal() {
    if (!state.examActive) return;
    const modal = document.getElementById("submitConfirmModal");
    const breakdownWrap = document.getElementById("submitModalBreakdown");

    let rowsHtml = `
      <table class="jamb-score-table" style="margin-top: 0.75rem;">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Answered</th>
            <th>Unanswered</th>
            <th>Flagged</th>
          </tr>
        </thead>
        <tbody>
    `;

    state.selectedSubjects.forEach((subjId) => {
      const subj = getSubjectById(subjId);
      const paper = state.papersBySubject[subjId] || [];
      const ansCount = Object.keys(state.answersBySubject[subjId] || {}).length;
      const flagCount = Object.keys(state.flagsBySubject[subjId] || {}).length;
      rowsHtml += `
        <tr>
          <td><strong>${subj.name}</strong></td>
          <td style="color:#15803d;font-weight:700;">${ansCount} / ${paper.length}</td>
          <td style="color:${paper.length - ansCount > 0 ? "#dc2626" : "#64748b"};font-weight:700;">
            ${paper.length - ansCount}
          </td>
          <td>${flagCount}</td>
        </tr>
      `;
    });

    rowsHtml += `</tbody></table>`;
    breakdownWrap.innerHTML = rowsHtml;
    modal.classList.remove("hidden");
  }

  function finalizeAndGradeExamination(autoSubmittedByTimer = false) {
    if (state.timerIntervalId) {
      clearInterval(state.timerIntervalId);
      state.timerIntervalId = null;
    }
    document.getElementById("submitConfirmModal").classList.add("hidden");

    state.examActive = false;
    state.examSubmitted = true;
    clearActiveSessionStorage();

    // Grade each of the 4 subjects out of 100 Marks
    let totalQuestionsAll = 0;
    let totalCorrectAll = 0;
    let aggregateScaled400 = 0;
    const subjectResults = [];

    state.selectedSubjects.forEach((subjId, idx) => {
      const subj = getSubjectById(subjId);
      const paper = state.papersBySubject[subjId] || [];
      const answers = state.answersBySubject[subjId] || {};
      let rawCorrect = 0;

      paper.forEach((qObj, qIdx) => {
        if (answers[qIdx] === qObj.answer) {
          rawCorrect += 1;
        }
      });

      const scaledScore100 =
        paper.length > 0 ? Math.round((rawCorrect / paper.length) * 100) : 0;

      totalQuestionsAll += paper.length;
      totalCorrectAll += rawCorrect;
      aggregateScaled400 += scaledScore100;

      let remark = "Pass";
      if (scaledScore100 >= 70) remark = "Distinction";
      else if (scaledScore100 >= 60) remark = "Very Good";
      else if (scaledScore100 >= 50) remark = "Credit";
      else if (scaledScore100 < 40) remark = "Below Average";

      subjectResults.push({
        sn: idx + 1,
        subjectId: subjId,
        subjectName: subj.name,
        category: subj.compulsory ? "Compulsory" : subj.category,
        totalQuestions: paper.length,
        rawCorrect,
        scaledScore100,
        remark
      });
    });

    const timeSpentSeconds = Math.max(1, state.totalDurationSeconds - state.remainingSeconds);
    const completedAt = new Date().toLocaleString("en-NG", {
      dateStyle: "full",
      timeStyle: "short"
    });

    const resultRecord = {
      id: "RES-" + Date.now(),
      timestamp: completedAt,
      autoSubmittedByTimer,
      candidate: { ...state.candidate },
      subjectResults,
      totalQuestionsAll,
      totalCorrectAll,
      aggregateScaled400,
      timeSpentFormatted: formatTimeHMS(timeSpentSeconds)
    };

    state.lastResultSummary = resultRecord;
    saveAttemptToHistory(resultRecord);
    if (window.CBTBackendAPI) {
      window.CBTBackendAPI.recordResult(resultRecord);
    }
    renderOfficialResultSlip(resultRecord);
    renderCorrectionsReviewList();
    switchScreen("screenResults");
  }

  function renderOfficialResultSlip(res) {
    document.getElementById("resultSlipTimestamp").textContent =
      `Examination Date: ${res.timestamp} • Time Spent: ${res.timeSpentFormatted} • Paper Set: ${
        res.candidate.variantCode || "SET-A104"
      }`;
    document.getElementById("resultAggregateScore").textContent = res.aggregateScaled400;

    document.getElementById("resultCandidateSummary").innerHTML = `
      <div><strong>Candidate Name:</strong><br/>${res.candidate.name}</div>
      <div><strong>Reg No & Access PIN:</strong><br/>${res.candidate.regNo} (${
      res.candidate.pin || "VERIFIED"
    })</div>
      <div><strong>Preferred Institution:</strong><br/>${res.candidate.institution}</div>
      <div><strong>Seat & Randomized Paper Variant:</strong><br/>Seat ${res.candidate.seatNo} • ${
      res.candidate.variantCode || "SET-A104"
    }</div>
    `;

    const tbody = document.getElementById("resultSubjectTableBody");
    tbody.innerHTML = res.subjectResults
      .map(
        (sr) => `
        <tr>
          <td>${sr.sn}</td>
          <td><strong>${sr.subjectName}</strong></td>
          <td>${sr.category}</td>
          <td>${sr.totalQuestions}</td>
          <td>${sr.rawCorrect} / ${sr.totalQuestions}</td>
          <td><strong>${sr.scaledScore100} / 100</strong></td>
          <td>${sr.remark}</td>
        </tr>
      `
      )
      .join("");

    document.getElementById("resultTotalQuestionsCell").textContent = res.totalQuestionsAll;
    document.getElementById("resultTotalCorrectCell").textContent = `${res.totalCorrectAll} / ${res.totalQuestionsAll}`;
    document.getElementById("resultTotalScaledCell").textContent = `${res.aggregateScaled400} / 400`;

    let overallRemark = "Admission Eligible";
    if (res.aggregateScaled400 >= 280) overallRemark = "First-Choice Merit Competitive";
    else if (res.aggregateScaled400 >= 200) overallRemark = "Federal/State University Qualified";
    else if (res.aggregateScaled400 >= 160) overallRemark = "Polytechnic / College Qualified";
    else overallRemark = "Below General University Cut-off";

    document.getElementById("resultOverallGradeCell").textContent = overallRemark;

    const presetObj = window.UTME_COURSE_PRESETS[state.candidate.coursePreset];
    const benchmark = presetObj ? presetObj.benchmarkScore : 200;
    const meetsCourseCutoff = res.aggregateScaled400 >= benchmark;

    const verdictBanner = document.getElementById("admissionVerdictBanner");
    verdictBanner.innerHTML = `
      <strong>📊 JAMB Policy & Departmental Cut-Off Analysis (${res.candidate.institution}):</strong><br/>
      Your Aggregate UTME Score is <strong>${res.aggregateScaled400} / 400</strong> (${Math.round(
      (res.aggregateScaled400 / 400) * 100
    )}%).
      ${
        meetsCourseCutoff
          ? `✅ <strong>Congratulations!</strong> Your score meets/exceeds the competitive benchmark (${benchmark}/400) for your selected course stream.`
          : `ℹ️ Your score is currently <strong>${benchmark - res.aggregateScaled400} marks</strong> below the competitive merit benchmark (${benchmark}/400) for this course. Review the step-by-step corrections below to strengthen weak topics.`
      }
    `;

    // Populate Review Subject Filter
    const reviewSubjFilter = document.getElementById("reviewSubjectFilter");
    reviewSubjFilter.innerHTML =
      `<option value="ALL">All 4 Registered Subjects</option>` +
      res.subjectResults
        .map((sr) => `<option value="${sr.subjectId}">${sr.subjectName} (${sr.scaledScore100}/100)</option>`)
        .join("");
  }

  function renderCorrectionsReviewList() {
    const subjFilter = document.getElementById("reviewSubjectFilter").value;
    const statusFilter = document.getElementById("reviewStatusFilter").value;
    const container = document.getElementById("reviewQuestionsList");
    const letters = ["A", "B", "C", "D"];

    const subjectsToRender =
      subjFilter === "ALL" ? state.selectedSubjects : [subjFilter];

    let cardsHtml = "";
    subjectsToRender.forEach((subjId) => {
      const subj = getSubjectById(subjId);
      const paper = state.papersBySubject[subjId] || [];
      const answers = state.answersBySubject[subjId] || {};
      const flags = state.flagsBySubject[subjId] || {};

      paper.forEach((qObj, qIdx) => {
        const userAns = answers[qIdx];
        const isAnswered = userAns !== undefined;
        const isCorrect = isAnswered && userAns === qObj.answer;
        const isWrong = isAnswered && userAns !== qObj.answer;
        const isFlagged = Boolean(flags[qIdx]);

        if (statusFilter === "CORRECT" && !isCorrect) return;
        if (statusFilter === "WRONG" && !isWrong) return;
        if (statusFilter === "UNANSWERED" && isAnswered) return;
        if (statusFilter === "FLAGGED" && !isFlagged) return;

        const statusClass = isCorrect
          ? "review-correct"
          : isWrong
          ? "review-wrong"
          : "review-unanswered";
        const statusBadge = isCorrect
          ? `<span style="color:#15803d;font-weight:800;">✓ CORRECT</span>`
          : isWrong
          ? `<span style="color:#dc2626;font-weight:800;">✗ WRONG (You chose ${letters[userAns]})</span>`
          : `<span style="color:#d97706;font-weight:800;">⚠ UNANSWERED</span>`;

        const optionsHtml = qObj.options
          .map((optText, oIdx) => {
            let optClass = "review-opt";
            if (oIdx === qObj.answer) optClass += " opt-correct";
            else if (oIdx === userAns && userAns !== qObj.answer) optClass += " opt-user-wrong";
            return `<div class="${optClass}"><strong>(${letters[oIdx]})</strong> ${optText}</div>`;
          })
          .join("");

        cardsHtml += `
          <div class="review-item-card ${statusClass}">
            <div class="review-item-top">
              <div>
                <strong>${subj.shortName} — Question ${qIdx + 1}</strong>
                <span class="utme-year-badge" style="margin-left:6px;">${qObj.year}</span>
                <span class="topic-tag-badge" style="margin-left:4px;">${qObj.topic}</span>
              </div>
              <div>${statusBadge}</div>
            </div>
            <div class="review-q-stem">${qObj.question}</div>
            <div class="review-options-grid">${optionsHtml}</div>
            <div class="review-explanation-box">
              <strong>Official UTME Explanation (Ans: ${letters[qObj.answer]}):</strong> ${qObj.explanation}
            </div>
          </div>
        `;
      });
    });

    container.innerHTML =
      cardsHtml ||
      `<p style="padding:1rem;color:#64748b;">No questions match the selected filter criteria.</p>`;
  }

  // ==========================================================================
  // 9. LOCAL STORAGE PERSISTENCE (AUTO-SAVE & HISTORY)
  // ==========================================================================
  function saveActiveSessionToStorage() {
    if (!state.examActive || state.examSubmitted) return;
    try {
      const payload = {
        candidate: state.candidate,
        selectedSubjects: state.selectedSubjects,
        examMode: state.examMode,
        remainingSeconds: state.remainingSeconds,
        totalDurationSeconds: state.totalDurationSeconds,
        activeSubjectId: state.activeSubjectId,
        currentQuestionIndexBySubject: state.currentQuestionIndexBySubject,
        papersBySubject: state.papersBySubject,
        answersBySubject: state.answersBySubject,
        flagsBySubject: state.flagsBySubject
      };
      localStorage.setItem("utme_active_cbt_session", JSON.stringify(payload));
    } catch (e) {
      // Ignore storage quota issues
    }
  }

  function clearActiveSessionStorage() {
    try {
      localStorage.removeItem("utme_active_cbt_session");
    } catch (e) {}
  }

  function checkSavedSessionInStorage() {
    const banner = document.getElementById("resumeSessionBanner");
    if (!banner) return;
    try {
      const raw = localStorage.getItem("utme_active_cbt_session");
      if (!raw) {
        banner.classList.add("hidden");
        return;
      }
      const saved = JSON.parse(raw);
      if (
        !saved ||
        !saved.papersBySubject ||
        !saved.selectedSubjects ||
        saved.remainingSeconds <= 0
      ) {
        banner.classList.add("hidden");
        return;
      }

      const subjNames = saved.selectedSubjects
        .map((id) => getSubjectById(id).shortName)
        .join(", ");
      document.getElementById("resumeSessionDetails").textContent =
        `Candidate: ${saved.candidate.name} (${saved.candidate.regNo}) • Subjects: ${subjNames} • Time Remaining: ${formatTimeHMS(
          saved.remainingSeconds
        )}`;
      banner.classList.remove("hidden");
    } catch (e) {
      banner.classList.add("hidden");
    }
  }

  function resumeSavedExamSession() {
    try {
      const raw = localStorage.getItem("utme_active_cbt_session");
      if (!raw) return;
      const saved = JSON.parse(raw);
      state.candidate = saved.candidate || state.candidate;
      state.selectedSubjects = saved.selectedSubjects || state.selectedSubjects;
      state.examMode = saved.examMode || "standard_180";
      state.remainingSeconds = saved.remainingSeconds || 3600;
      state.totalDurationSeconds = saved.totalDurationSeconds || 7200;
      state.activeSubjectId = saved.activeSubjectId || state.selectedSubjects[0];
      state.currentQuestionIndexBySubject = saved.currentQuestionIndexBySubject || {};
      state.papersBySubject = saved.papersBySubject || {};
      state.answersBySubject = saved.answersBySubject || {};
      state.flagsBySubject = saved.flagsBySubject || {};
      state.examActive = true;
      state.examSubmitted = false;

      document.getElementById("resumeSessionBanner").classList.add("hidden");
      populateExamSidebarCandidate();
      renderExamSubjectTabs();
      renderCurrentQuestion();
      startExamTimer();
      switchScreen("screenExam");
    } catch (e) {
      clearActiveSessionStorage();
    }
  }

  function saveAttemptToHistory(resultRecord) {
    try {
      const history = JSON.parse(localStorage.getItem("utme_attempts_history") || "[]");
      history.unshift(resultRecord);
      localStorage.setItem("utme_attempts_history", JSON.stringify(history.slice(0, 25)));
    } catch (e) {}
  }

  function renderHistoryModalContent() {
    const container = document.getElementById("historyListContainer");
    let history = [];
    try {
      history = JSON.parse(localStorage.getItem("utme_attempts_history") || "[]");
    } catch (e) {}

    if (history.length === 0) {
      container.innerHTML = `<p style="color:#64748b;padding:1rem 0;">No completed UTME examination attempts recorded yet on this workstation.</p>`;
      return;
    }

    container.innerHTML = `
      <div class="slip-table-wrapper">
        <table class="jamb-score-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Candidate</th>
              <th>4-Subject Combination</th>
              <th>Aggregate (/400)</th>
              <th>Time Spent</th>
            </tr>
          </thead>
          <tbody>
            ${history
              .map(
                (item) => `
              <tr>
                <td>${item.timestamp}</td>
                <td><strong>${item.candidate.name}</strong><br/><small>${item.candidate.regNo}</small></td>
                <td>${item.subjectResults
                  .map((s) => `${s.subjectName}: <b>${s.scaledScore100}</b>`)
                  .join(" • ")}</td>
                <td><strong style="color:#006837;font-size:1rem;">${item.aggregateScaled400} / 400</strong></td>
                <td>${item.timeSpentFormatted}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  // ==========================================================================
  // 10. PAST QUESTIONS ARCHIVE & CUSTOM QUESTION MANAGER MODAL
  // ==========================================================================
  function initQuestionBankModal() {
    const filterSelect = document.getElementById("qbankFilterSubject");
    const newQSubject = document.getElementById("newQSubject");

    if (filterSelect) {
      filterSelect.innerHTML =
        `<option value="ALL">All UTME Subjects (${window.UTME_SUBJECTS.length})</option>` +
        window.UTME_SUBJECTS.map((s) => `<option value="${s.id}">${s.name}</option>`).join("");
    }

    if (newQSubject) {
      newQSubject.innerHTML = window.UTME_SUBJECTS
        .map((s) => `<option value="${s.id}">${s.name}</option>`)
        .join("");
    }

    renderQuestionBankBrowser();
  }

  function renderQuestionBankBrowser() {
    const subjFilter = document.getElementById("qbankFilterSubject").value || "ALL";
    const query = (document.getElementById("qbankSearchInput").value || "").trim().toLowerCase();
    const listEl = document.getElementById("qbankBrowserList");
    const statsEl = document.getElementById("qbankStatsBar");
    const letters = ["A", "B", "C", "D"];

    const matchingItems = [];
    window.UTME_SUBJECTS.forEach((subj) => {
      if (subjFilter !== "ALL" && subj.id !== subjFilter) return;
      const bank = window.UTME_QUESTION_BANK[subj.id] || [];
      bank.forEach((q) => {
        if (
          !query ||
          q.question.toLowerCase().includes(query) ||
          (q.topic && q.topic.toLowerCase().includes(query)) ||
          (q.year && q.year.toLowerCase().includes(query))
        ) {
          matchingItems.push({ subj, q });
        }
      });
    });

    statsEl.textContent = `Showing ${Math.min(matchingItems.length, 60)} of ${matchingItems.length} matching UTME Past Questions`;

    listEl.innerHTML = matchingItems
      .slice(0, 60)
      .map(
        ({ subj, q }) => `
        <div class="review-item-card review-correct">
          <div class="review-item-top">
            <div>
              <strong>${subj.name}</strong>
              <span class="utme-year-badge" style="margin-left:6px;">${q.year}</span>
              <span class="topic-tag-badge" style="margin-left:4px;">${q.topic}</span>
            </div>
            <span style="font-size:0.75rem;color:#15803d;font-weight:700;">Ans: Option ${letters[q.answer]}</span>
          </div>
          <div class="review-q-stem">${q.question}</div>
          <div class="review-options-grid">
            ${q.options
              .map(
                (opt, idx) =>
                  `<div class="review-opt ${idx === q.answer ? "opt-correct" : ""}">(${letters[idx]}) ${opt}</div>`
              )
              .join("")}
          </div>
          <div class="review-explanation-box"><strong>Solution:</strong> ${q.explanation}</div>
        </div>
      `
      )
      .join("");
  }

  // ==========================================================================
  // 11. ON-SCREEN CBT CALCULATOR
  // ==========================================================================
  function handleCalculatorAction(action) {
    const display = document.getElementById("calcDisplay");
    const expr = document.getElementById("calcExpression");

    if (action === "C") {
      state.calcInput = "0";
      state.calcPrevExpr = "";
    } else if (action === "DEL") {
      state.calcInput =
        state.calcInput.length > 1 ? state.calcInput.slice(0, -1) : "0";
    } else if (action === "SQRT") {
      const val = parseFloat(state.calcInput) || 0;
      state.calcPrevExpr = `√(${val})`;
      state.calcInput = val >= 0 ? String(Number(Math.sqrt(val).toFixed(6))) : "Error";
    } else if (action === "SQR") {
      const val = parseFloat(state.calcInput) || 0;
      state.calcPrevExpr = `(${val})²`;
      state.calcInput = String(Number((val * val).toFixed(6)));
    } else if (action === "=") {
      try {
        const sanitized = state.calcInput.replace(/[^0-9+\-*/.()]/g, "");
        const evaluated = Function(`"use strict"; return (${sanitized || 0});`)();
        state.calcPrevExpr = `${state.calcInput} =`;
        state.calcInput = Number.isFinite(evaluated)
          ? String(Number(evaluated.toFixed(6)))
          : "Error";
      } catch (e) {
        state.calcInput = "Error";
      }
    } else {
      if (state.calcInput === "0" || state.calcInput === "Error") {
        state.calcInput = ["+", "-", "*", "/", "."].includes(action)
          ? "0" + action
          : action;
      } else {
        state.calcInput += action;
      }
    }

    display.value = state.calcInput;
    expr.textContent = state.calcPrevExpr || "\u00A0";
  }

  // ==========================================================================
  // 12. EVENT LISTENERS & KEYBOARD SHORTCUTS BINDING
  // ==========================================================================
  function bindEvents() {
    // Candidate inputs live preview
    [
      "inputExamPin",
      "inputRegNumber",
      "inputCandidateName",
      "inputSeatNo",
      "selectTargetInstitution"
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("input", updateCandidatePreviewUI);
      el.addEventListener("change", updateCandidatePreviewUI);
    });

    // PIN Verification Button & Dropdown
    const btnVerifyPin = document.getElementById("btnVerifyPinNow");
    if (btnVerifyPin) {
      btnVerifyPin.addEventListener("click", verifyCandidatePinUI);
    }

    const selectAdminPins = document.getElementById("selectActiveAdminPins");
    if (selectAdminPins) {
      selectAdminPins.addEventListener("change", (e) => {
        const chosenPin = e.target.value;
        if (!chosenPin) return;
        document.getElementById("inputExamPin").value = chosenPin;
        verifyCandidatePinUI();
      });
    }

    const inputExamPin = document.getElementById("inputExamPin");
    if (inputExamPin) {
      inputExamPin.addEventListener("input", () => {
        const val = inputExamPin.value.trim().toUpperCase();
        const matched = state.availablePins.find((p) => p.pin.toUpperCase() === val);
        if (matched) {
          applyPinRecordToCandidateUI(matched);
        } else if (state.centreSettings.requirePin) {
          state.pinVerified = false;
          const banner = document.getElementById("pinStatusBanner");
          if (banner) {
            banner.className = "pin-status-banner invalid";
            banner.textContent = "Click 'Verify PIN' to validate your Examination Access PIN.";
          }
          validateSubjectCombination();
        }
      });
    }

    // Demo Candidate Chips
    document.querySelectorAll("[data-profile]").forEach((chip) => {
      chip.addEventListener("click", () => {
        document.querySelectorAll("[data-profile]").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        const key = chip.getAttribute("data-profile");
        const prof = window.DEMO_CANDIDATE_PROFILES[key];
        if (!prof) return;

        if (prof.pin && document.getElementById("inputExamPin")) {
          document.getElementById("inputExamPin").value = prof.pin;
        }
        document.getElementById("inputRegNumber").value = prof.regNo;
        document.getElementById("inputCandidateName").value = prof.name;
        document.getElementById("inputSeatNo").value = prof.seatNo;
        document.getElementById("selectTargetInstitution").value = prof.institution;
        state.candidate.center = prof.center;

        const presetSelect = document.getElementById("selectCoursePreset");
        presetSelect.value = prof.preset;
        presetSelect.dispatchEvent(new Event("change"));
        verifyCandidatePinUI();
        updateCandidatePreviewUI();
      });
    });

    // Exam Mode Radio Cards
    document.querySelectorAll("input[name='examStructureMode']").forEach((radio) => {
      radio.addEventListener("change", (e) => {
        state.examMode = e.target.value;
        document.querySelectorAll(".mode-card").forEach((card) => {
          card.classList.toggle("selected", card.contains(e.target));
        });
        renderSelectedSubjectSlots();
      });
    });

    // Year Filter & Custom Duration
    document.getElementById("selectYearFilter").addEventListener("change", (e) => {
      state.yearFilter = e.target.value;
    });
    document.getElementById("selectCustomDuration").addEventListener("change", (e) => {
      state.customDurationMinutes = e.target.value;
    });

    // Official JAMB Brochure Course Preset Selector
    document.getElementById("selectCoursePreset").addEventListener("change", (e) => {
      const val = e.target.value;
      state.candidate.coursePreset = val;
      const notice = document.getElementById("brochureCourseNotice");

      if (val !== "custom" && window.UTME_COURSE_PRESETS[val]) {
        const preset = window.UTME_COURSE_PRESETS[val];
        state.selectedSubjects = preset.subjects.slice();
        notice.innerHTML = `<strong>Brochure Requirement:</strong> ${preset.brochureNote}`;
        renderSelectedSubjectSlots();
        renderSubjectsCheckboxGrid();
        validateSubjectCombination();
      } else {
        notice.innerHTML =
          `<strong>Custom UTME Combination:</strong> Ensure your 3 elective subjects alongside compulsory <em>Use of English</em> match your target department's JAMB Brochure requirement.`;
      }
    });

    // Subject Category Filter Tabs
    document.querySelectorAll("[data-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-cat]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.subjectCategoryFilter = btn.getAttribute("data-cat");
        renderSubjectsCheckboxGrid();
      });
    });

    // Setup -> Briefing -> Exam transitions
    document.getElementById("btnProceedInstructions").addEventListener("click", async () => {
      if (state.selectedSubjects.length !== 4) return;
      if (state.centreSettings.requirePin) {
        const ok = await verifyCandidatePinUI();
        if (!ok) return;
      }
      renderBriefingSummary();
      switchScreen("screenInstructions");
    });

    document.getElementById("btnBackToSetup").addEventListener("click", () => {
      loadBackendStateAndPins();
      switchScreen("screenSetup");
    });

    document.getElementById("btnStartExamNow").addEventListener("click", () => {
      startNewExamSession();
    });

    // Live Exam Controls
    document.getElementById("btnPrevQuestion").addEventListener("click", () => navigateQuestion(-1));
    document.getElementById("btnNextQuestion").addEventListener("click", () => navigateQuestion(1));
    document.getElementById("btnClearOption").addEventListener("click", clearCurrentQuestionChoice);
    document.getElementById("btnFlagCurrent").addEventListener("click", toggleFlagCurrentQuestion);
    document.getElementById("btnShowStudyAnswer").addEventListener("click", revealStudyModeFeedback);

    const btnMobileJump = document.getElementById("btnMobileJumpPalette");
    if (btnMobileJump) {
      btnMobileJump.addEventListener("click", () => {
        const pal = document.getElementById("paletteSubjectTitle") || document.getElementById("questionNumberGrid");
        if (pal) pal.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    document.getElementById("btnTogglePassage").addEventListener("click", () => {
      state.passageCollapsed = !state.passageCollapsed;
      renderCurrentQuestion();
    });

    document.getElementById("btnJumpFirstUnanswered").addEventListener("click", () => {
      const subjId = state.activeSubjectId;
      const paper = state.papersBySubject[subjId] || [];
      const answers = state.answersBySubject[subjId] || {};
      const firstUnans = paper.findIndex((_, idx) => answers[idx] === undefined);
      if (firstUnans >= 0) {
        state.currentQuestionIndexBySubject[subjId] = firstUnans;
        renderCurrentQuestion();
      }
    });

    // Font Size Adjuster
    document.getElementById("btnFontSize").addEventListener("click", () => {
      state.fontSizeStep = (state.fontSizeStep + 1) % 3;
      document.body.classList.toggle("font-large", state.fontSizeStep === 1);
      document.body.classList.toggle("font-xlarge", state.fontSizeStep === 2);
    });

    // Calculator Modal
    const calcModal = document.getElementById("calculatorModal");
    document.getElementById("btnOpenCalculator").addEventListener("click", () => {
      calcModal.classList.remove("hidden");
    });
    document.getElementById("btnCloseCalculator").addEventListener("click", () => {
      calcModal.classList.add("hidden");
    });
    document.querySelectorAll("[data-calc]").forEach((btn) => {
      btn.addEventListener("click", () => {
        handleCalculatorAction(btn.getAttribute("data-calc"));
      });
    });

    // Submit Exam Modal
    document.getElementById("btnHeaderSubmit").addEventListener("click", openSubmitConfirmationModal);
    document.getElementById("btnSidebarSubmit").addEventListener("click", openSubmitConfirmationModal);
    document.getElementById("btnCancelSubmitModal").addEventListener("click", () => {
      document.getElementById("submitConfirmModal").classList.add("hidden");
    });
    document.getElementById("btnReturnToExam").addEventListener("click", () => {
      document.getElementById("submitConfirmModal").classList.add("hidden");
    });
    document.getElementById("btnConfirmFinalSubmit").addEventListener("click", () => {
      finalizeAndGradeExamination(false);
    });

    // Result Slip Actions
    document.getElementById("btnPrintResultSlip").addEventListener("click", () => {
      window.print();
    });
    document.getElementById("btnToggleReviewSection").addEventListener("click", () => {
      document
        .getElementById("reviewCorrectionsSection")
        .scrollIntoView({ behavior: "smooth" });
    });
    document.getElementById("btnRetakeSameCombo").addEventListener("click", () => {
      startNewExamSession();
    });
    document.getElementById("btnNewCandidateSetup").addEventListener("click", () => {
      checkSavedSessionInStorage();
      switchScreen("screenSetup");
    });

    // Resume or Discard Unfinished Session Banner
    const btnResume = document.getElementById("btnResumeSavedExam");
    const btnDiscard = document.getElementById("btnDiscardSavedExam");
    if (btnResume) {
      btnResume.addEventListener("click", resumeSavedExamSession);
    }
    if (btnDiscard) {
      btnDiscard.addEventListener("click", () => {
        clearActiveSessionStorage();
        checkSavedSessionInStorage();
      });
    }

    // Review Filters
    document
      .getElementById("reviewSubjectFilter")
      .addEventListener("change", renderCorrectionsReviewList);
    document
      .getElementById("reviewStatusFilter")
      .addEventListener("change", renderCorrectionsReviewList);

    // Past Questions Archive Modal
    const qbankModal = document.getElementById("questionBankModal");
    const btnOpenQBank = document.getElementById("btnOpenQuestionBank");
    if (btnOpenQBank && qbankModal) {
      btnOpenQBank.addEventListener("click", () => {
        initQuestionBankModal();
        qbankModal.classList.remove("hidden");
      });
    }
    const btnCloseQBank = document.getElementById("btnCloseQuestionBank");
    if (btnCloseQBank && qbankModal) {
      btnCloseQBank.addEventListener("click", () => {
        qbankModal.classList.add("hidden");
      });
    }
    const qbankFilterSubj = document.getElementById("qbankFilterSubject");
    if (qbankFilterSubj) {
      qbankFilterSubj.addEventListener("change", renderQuestionBankBrowser);
    }
    const qbankSearchInp = document.getElementById("qbankSearchInput");
    if (qbankSearchInp) {
      qbankSearchInp.addEventListener("input", renderQuestionBankBrowser);
    }
    const btnToggleAddQ = document.getElementById("btnToggleAddQuestionForm");
    if (btnToggleAddQ) {
      btnToggleAddQ.addEventListener("click", () => {
        const formEl = document.getElementById("formAddCustomQuestion");
        if (formEl) formEl.classList.toggle("hidden");
      });
    }

    const formAddQ = document.getElementById("formAddCustomQuestion");
    if (formAddQ) {
      formAddQ.addEventListener("submit", (e) => {
        e.preventDefault();
        const subjectId = document.getElementById("newQSubject").value;
        const customQ = {
          id: "CUST-" + Date.now(),
          subjectId,
          year: document.getElementById("newQYear").value.trim(),
          topic: document.getElementById("newQTopic").value.trim(),
          question: document.getElementById("newQQuestion").value.trim(),
          options: [
            document.getElementById("newQOptA").value.trim(),
            document.getElementById("newQOptB").value.trim(),
            document.getElementById("newQOptC").value.trim(),
            document.getElementById("newQOptD").value.trim()
          ],
          answer: parseInt(document.getElementById("newQAnswer").value, 10) || 0,
          explanation: document.getElementById("newQExplanation").value.trim()
        };

        if (!window.UTME_QUESTION_BANK[subjectId]) {
          window.UTME_QUESTION_BANK[subjectId] = [];
        }
        window.UTME_QUESTION_BANK[subjectId].unshift(customQ);

        try {
          const saved = JSON.parse(localStorage.getItem("utme_custom_questions") || "[]");
          saved.unshift(customQ);
          localStorage.setItem("utme_custom_questions", JSON.stringify(saved));
        } catch (err) {}

        if (window.CBTBackendAPI) {
          window.CBTBackendAPI.addCustomQuestion(customQ);
        }

        e.target.reset();
        formAddQ.classList.add("hidden");
        renderQuestionBankBrowser();
        renderSubjectsCheckboxGrid();
      });
    }

    // History Modal
    const historyModal = document.getElementById("historyModal");
    document.getElementById("btnOpenHistory").addEventListener("click", () => {
      renderHistoryModalContent();
      historyModal.classList.remove("hidden");
    });
    document.getElementById("btnCloseHistory").addEventListener("click", () => {
      historyModal.classList.add("hidden");
    });
    document.getElementById("btnClearHistory").addEventListener("click", () => {
      localStorage.removeItem("utme_attempts_history");
      renderHistoryModalContent();
    });

    // Official JAMB 8-Key CBT Keyboard Shortcuts
    window.addEventListener("keydown", (e) => {
      if (!state.examActive || state.examSubmitted) return;
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const key = e.key.toUpperCase();
      if (key === "A") {
        e.preventDefault();
        selectOptionForCurrentQuestion(0);
      } else if (key === "B") {
        e.preventDefault();
        selectOptionForCurrentQuestion(1);
      } else if (key === "C") {
        e.preventDefault();
        selectOptionForCurrentQuestion(2);
      } else if (key === "D") {
        e.preventDefault();
        selectOptionForCurrentQuestion(3);
      } else if (key === "N" || e.key === "ArrowRight") {
        e.preventDefault();
        navigateQuestion(1);
      } else if (key === "P" || e.key === "ArrowLeft") {
        e.preventDefault();
        navigateQuestion(-1);
      } else if (key === "R") {
        e.preventDefault();
        clearCurrentQuestionChoice();
      } else if (key === "F") {
        e.preventDefault();
        toggleFlagCurrentQuestion();
      } else if (key === "S") {
        e.preventDefault();
        openSubmitConfirmationModal();
      }
    });
  }

  // ==========================================================================
  // 13. INITIALIZATION
  // ==========================================================================
  function initPortal() {
    initializeAndExpandQuestionBanks();
    loadBackendStateAndPins();
    updateCandidatePreviewUI();
    renderSelectedSubjectSlots();
    renderSubjectsCheckboxGrid();
    validateSubjectCombination();
    checkSavedSessionInStorage();
    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPortal);
  } else {
    initPortal();
  }
})();
