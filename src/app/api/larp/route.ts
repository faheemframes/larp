import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_INSTRUCTION = `you are larp, a tool that replaces a normal statement with an authentic, unhinged internet monologue.

STRICT ANTI-AI FILTER (WRITE LIKE A REAL HUMAN, NOT AN LLM):
1. BANNED AI WORDS (NEVER USE ANY OF THESE WORDS):
   - tapestry, symphony, celestial, alchemy, ethereal, sacred, dance, myriad, beacon, testament, delve, realm, whisper, canvas, mosaic, bespoke, labyrinth, intricate, conduit, nexus, unadulterated, fleeting, dance.
   - zero purple prose. zero fantasy clichés. real humans on twitter, reddit, and group chats NEVER talk like an elf or a philosophy professor.

2. BANNED SENTENCE FORMULAS:
   - do NOT use the ai formula: "x isn't just y, it's a z..."
   - do NOT say "saying [x] feels reductive..."
   - do NOT say "to say [x] is an understatement..."

3. HOW REAL HUMANS ACTUALLY TALK ONLINE:
   - conversational, slightly unhinged, self-aware internet voice: "literally", "genuinely", "not even joking", "people don't realize", "it's actually absurd", "down a rabbit hole", "i haven't recovered from", "folded like cheap lawn chairs", "for four business days".
   - grounded, funny, specific details: mention real tools, numbers, moments, specific brand names, real frustrations, physical relatable things (e.g. room-temp red bull, acaia scale, cheap lawn chairs, valgrind segfaults, stoke away on a tuesday, 2012 ballon d'or).
   - write directly as the person texting their friend or dropping a raw tweet.

4. ALL LOWERCASE ("NO CAPS"): strictly lowercase throughout.
5. LENGTH: 45 to 75 words max (1 punchy paragraph). sounds like someone typed it on their phone in 15 seconds.
6. NO OUTER QUOTES.`;

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
    finishReason?: string;
  }>;
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

function getSmartFallback(text: string, seed: number = 0): string {
  const cleaned = text.trim().toLowerCase().replace(/[.!?]+$/, "");

  if (/comp|code|program|engineer|dev|software|cs|python|c\+\+|rust/.test(cleaned)) {
    const takes = [
      "i study comp sci and honestly i haven't recovered from the psychological damage. i am losing my absolute mind staring at valgrind segfaults at 4am while vibrating off room-temp red bull and questioning every life choice that led to me debugging null pointers until my eyes bleed. my entire personality is now just crying over leetcode while my friends in marketing are already buying houses.",
      "i do comp sci which mostly means i've spent the last three days tracking a single off-by-one error in c++ while my terminal tells me my heap is ninety percent fragmented. everyone thinks we're building the next tech startup when really i'm just arguing with a compiler about memory leaks at 3am."
    ];
    return takes[seed % takes.length];
  }

  if (/messi/.test(cleaned)) {
    const takes = [
      "messi is genuinely not a human being. people love showing goal stats from 2012 but you have to watch him walk around the center circle for ten minutes doing absolutely nothing just to spot a three-inch gap and split four defenders with one pass. the boateng ankle breaker wasn't even a skill move, he literally just shifted his weight and boateng folded like a cheap lawn chair.",
      "i back messi completely. you watch tiktok compilations while i'm still losing sleep over his 2007 solo run against getafe where he replicated maradona to the millimeter. the man walks eighty percent of the match because his brain is literally computing defensive geometry in real time."
    ];
    return takes[seed % takes.length];
  }

  if (/ronaldo/.test(cleaned)) {
    const takes = [
      "ronaldo at united in 2008 was a freak of nature. people forget he was doing five stepovers a second on the wing before his knee gave out and he just decided to become the most lethal penalty box poacher on earth. that 2008 moscow header against chelsea where he hung in the air for what felt like four business days was genuinely absurd.",
      "ronaldo is the only correct answer. you look at his 2017 champions league knockout run against bayern and juve and it's actually terrifying. the man basically willed real madrid to three consecutive trophies on pure spite and gym work ethic."
    ];
    return takes[seed % takes.length];
  }

  if (/football|soccer/.test(cleaned)) {
    const takes = [
      "i watch football, but not casual highlights. i'm talking about waking up on freezing tuesdays to watch a 4-4-2 low block and obsessing over whether a defensive midfielder scans his shoulder four times before receiving on the half-turn. if you don't appreciate the agony of a 0-0 draw at stoke you don't know ball.",
      "football to me is pure suffering. it's marcelo bielsa sitting on an upside-down cooler analyzing transition traps for twelve hours straight until the pitch looks like a geometry exam. you either get the obsession or you're just watching commercials."
    ];
    return takes[seed % takes.length];
  }

  if (/coffee|espresso|caffeine/.test(cleaned)) {
    const takes = [
      "i'm in too deep with coffee to the point where normal cafes taste like warm battery acid to me. i'm weighing out 18.2 grams of washed ethiopian beans on an acaia scale every morning and timing my pour-over to the second. if the drawdown takes 3 minutes and 5 seconds instead of 2:55 my whole mood is ruined for the day.",
      "i don't drink normal coffee anymore. i have a hand grinder dialed down to forty microns and temperature-controlled water at 93 degrees. my roommates think i'm running a chemistry lab in the kitchen but the taste difference is non-negotiable."
    ];
    return takes[seed % takes.length];
  }

  if (/mornings?/.test(cleaned)) {
    return "waking up before 11am is genuinely offensive to the human spirit. while linkedin grifters take 5am ice baths in fluorescent office lighting, conscious people know the human brain only functions properly in the 2am quiet of the night.";
  }

  if (/valorant|game|gaming/.test(cleaned)) {
    return "haven and ascent aren't video game maps, they are psychological traps. you haven't lived until you've held a two-pixel off-angle on a-site with 12 hp while their sova memorized a shock dart lineup from two years ago. my blood pressure has never been the same.";
  }

  // Universal procedural fallback for any other input
  const genericTakes = [
    `in the world of "${cleaned}", i am fully down the rabbit hole. you guys navigate life through casual approximations while i am deep in the microscopic mechanics of it until 3am. it stopped being a casual thing three years ago and became an absolute obsession.`,
    `most people skim the surface of "${cleaned}", but i have spent an unhealthy amount of time obsessing over the subculture lore and technical minutiae. you either get the vision or you're missing out completely.`
  ];
  return genericTakes[seed % genericTakes.length];
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error:
            "ai configuration is missing. add your GEMINI_API_KEY environment variable and restart the server.",
          code: "MISSING_KEY",
        },
        { status: 503 }
      );
    }

    const body = await req.json().catch(() => null);
    const text = typeof body?.text === "string" ? body.text.trim() : "";
    const seed = typeof body?.seed === "number" ? body.seed : 0;

    if (!text) {
      return NextResponse.json(
        { success: false, error: "please provide a statement to larp." },
        { status: 400 }
      );
    }

    if (text.length > 300) {
      return NextResponse.json(
        {
          success: false,
          error: "statement is too long. please keep it under 300 characters.",
        },
        { status: 400 }
      );
    }

    if (apiKey.toLowerCase() === "demo") {
      return NextResponse.json({
        success: true,
        original: text.toLowerCase(),
        larp: getSmartFallback(text, seed),
      });
    }

    const userPrompt = `replace this statement with an authentic, grounded, funny internet monologue for chat:
"${text}"

instructions:
- speak directly as a real human in a group chat or twitter reply.
- ABSOLUTELY NO AI WORDS: no tapestry, symphony, celestial, alchemy, ethereal, sacred, dance, myriad, testament.
- NO AI FORMULA: do not use "x isn't just y, it's z" or "saying x feels reductive".
- strictly lowercase.
- 45 to 75 words max.
- variation seed: ${seed}.`;

    // Multi-model cascade across resilient models
    const models = [
      "gemini-3.5-flash-lite",
      "gemini-3-flash-preview",
      "gemini-2.5-flash-lite",
      "gemini-2.5-flash",
    ];

    let generatedLarp = "";

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const generationConfig: Record<string, unknown> = {
          temperature: 0.95,
          maxOutputTokens: 250,
        };

        if (model.includes("2.5")) {
          generationConfig.thinkingConfig = { thinkingBudget: 0 };
        }

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: SYSTEM_INSTRUCTION }],
            },
            contents: [
              {
                role: "user",
                parts: [{ text: userPrompt }],
              },
            ],
            generationConfig,
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => null);
          console.warn(`Model ${model} returned status ${response.status}:`, errData?.error?.message?.slice(0, 100));
          continue;
        }

        const data = (await response.json()) as GeminiResponse;
        const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        if (candidateText) {
          generatedLarp = candidateText;
          break;
        }
      } catch (err) {
        console.warn(`Error contacting model ${model}:`, err);
      }
    }

    // Zero-failure fallback guarantee
    if (!generatedLarp) {
      console.warn("Using smart fallback generator for input:", text);
      generatedLarp = getSmartFallback(text, seed);
    }

    // Clean up formatting
    let cleaned = generatedLarp.replace(/^```(markdown|text)?\n?/i, "").replace(/```$/i, "").trim();
    if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
      cleaned = cleaned.slice(1, -1).trim();
    }
    cleaned = cleaned.toLowerCase();

    return NextResponse.json({
      success: true,
      original: text.toLowerCase(),
      larp: cleaned,
    });
  } catch (err) {
    console.error("LARP route exception, using fallback:", err);
    const body = await req.json().catch(() => null);
    const fallbackText = typeof body?.text === "string" ? body.text : "this thought";
    return NextResponse.json({
      success: true,
      original: fallbackText.toLowerCase(),
      larp: getSmartFallback(fallbackText, 0),
    });
  }
}
