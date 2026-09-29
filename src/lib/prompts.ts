export const MUNDANE_PROMPTS = [
  "i drink matcha",
  "i study comp sci",
  "i bought an air fryer",
  "i like messi",
  "i like ronaldo",
  "i listen to shoegaze",
  "i wake up at 6am",
  "i shoot 35mm film",
  "i use arch linux",
  "i eat sourdough",
  "i drink pour over coffee",
  "i wear adidas sambas",
  "i watch a24 movies",
  "i play valorant",
  "i use mechanical keyboards",
  "i drink sparkling water",
  "i walk 10,000 steps every day",
  "i take cold showers",
  "i read non-fiction",
  "i bought an ergonomic chair",
  "i listen to podcasts at 1.5x",
  "i use notion to organize my life",
  "i deleted instagram for a week",
  "i use a safety razor",
  "i watch f1 on sundays",
  "i bought a le creuset dutch oven",
  "i drink kombucha",
  "i stretch before bed",
  "i listen to vinyl records",
  "i do zone 2 cardio",
  "i use vim keybindings",
  "i use a fountain pen",
  "i drink iced americano in winter",
  "i cook with cast iron",
  "i take magnesium glycinate",
  "i work from coffee shops",
  "i go to pilates",
  "i buy raw honey",
  "i watch 4-hour video essays",
  "i use wired earpods",
  "i have a 12-step skincare routine",
  "i buy pasture-raised eggs",
  "i listen to aphex twin",
  "i drink bone broth",
  "i use an analog alarm clock",
  "i bought a kindle paperwhite",
  "i drink ceremonial grade cacao",
  "i do intermittent fasting",
  "i wear neutral earth tones",
  "i sleep with a weighted blanket",
  "i listen to japanese city pop",
  "i meal prep on sundays",
  "i drink loose leaf sencha",
  "i watch premier league tactical analysis",
  "i track my sleep on an oura ring",
  "i avoid seed oils",
  "i use a trackball mouse",
  "i collect tote bags",
  "i wear carhartt work jackets",
  "i read substack newsletters",
  "i use obsidian for note taking",
  "i grind my own pepper",
];

export function getRandomPrompt(current?: string): string {
  const available = current
    ? MUNDANE_PROMPTS.filter((p) => p !== current)
    : MUNDANE_PROMPTS;
  const index = Math.floor(Math.random() * available.length);
  return available[index];
}

export function getRandomPromptBatch(count: number = 5): string[] {
  const shuffled = [...MUNDANE_PROMPTS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
