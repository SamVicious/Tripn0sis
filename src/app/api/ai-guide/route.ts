import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" }, 
        { status: 400 }
      );
    }

    // Simulate AI response with Sydney-specific knowledge and Aussie slang
    const responses = getSydneyResponse(message.toLowerCase());

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    return NextResponse.json({ 
      response: responses
    });

  } catch (error) {
    console.error("AI Guide error:", error);
    return NextResponse.json(
      { error: "Sorry mate, something went wrong on my end!" }, 
      { status: 500 }
    );
  }
}

function getSydneyResponse(message: string): string {
  // Transport related
  if (message.includes('transport') || message.includes('get around') || message.includes('opal')) {
    return "Right-o! Sydney's transport is pretty bonzer. Get yourself an Opal card - you can tap on and off trains, buses, ferries, and light rail. The trains are your best bet for long distances, but the ferries are bloody beautiful for getting around the harbour. Pro tip: avoid peak hours (7-9am, 5-7pm) if you can - it's packed like sardines! And don't forget, Sunday's got discounted travel after 8am.";
  }

  // Coffee related
  if (message.includes('coffee') || message.includes('cafe')) {
    return "Ah, a coffee lover! You've come to the right city, mate. Skip the chains and head to Surry Hills - try Reuben Hills or Single O. In the CBD, check out The Grounds of Alexandria (bit touristy but the coffee's ace). For a proper local experience, hit up Campos Coffee in Newtown. And here's a secret: most Aussies just order a 'flat white' - it's like a latte but stronger and less milky.";
  }

  // Hidden gems
  if (message.includes('hidden') || message.includes('secret') || message.includes('local')) {
    return "Crikey, you want the real Sydney experience! Try Wenzel Pinnacle lookout in Lane Cove - better views than the touristy spots and hardly anyone knows about it. For a swim, Parsley Bay is a hidden gem with a suspension bridge. And if you're feeling peckish, the 2am dumplings in Chinatown (Dixon Street) are legendary - only cabbies and shift workers know about 'em!";
  }

  // Weather
  if (message.includes('weather') || message.includes('temperature')) {
    return "Sydney weather's pretty sweet most of the year! Right now it's around 20-25°C - perfect for a harbour walk. Summer (Dec-Feb) can get bloody hot (30°C+), so pack sunscreen and a hat. Winter's mild (15-20°C) but can be a bit drizzly. Always check the UV index - it's fierce here, even in winter. And watch out for those afternoon thunderstorms in summer - they come out of nowhere!";
  }

  // Aboriginal culture
  if (message.includes('aboriginal') || message.includes('indigenous') || message.includes('culture') || message.includes('first nations')) {
    return "Too right! Sydney sits on Gadigal land, and there's incredible Aboriginal history here. The Royal Botanic Gardens has a great Aboriginal Heritage Tour. Check out the rock engravings at Ku-ring-gai Chase National Park - they're thousands of years old! And don't miss the Aboriginal Art Gallery at the Art Gallery of NSW. Always remember to show respect - this is the world's oldest continuous culture, going back 65,000+ years.";
  }

  // Food
  if (message.includes('food') || message.includes('eat') || message.includes('restaurant')) {
    return "You're in for a treat! For proper Aussie tucker, try a meat pie from Harry's Cafe de Wheels (been there since 1945). Fish and chips at Doyle's on the Beach is iconic. For multicultural eats, head to Cabramatta for Vietnamese, or Harris Park for Indian. And you can't leave without trying Tim Tams and Lamingtons - proper Aussie sweets!";
  }

  // Beaches
  if (message.includes('beach') || message.includes('swim') || message.includes('surf')) {
    return "Beaches are Sydney's crown jewels! Bondi's famous but crowded - try Coogee or Bronte for a more relaxed vibe. Manly's great for surfing and has a lovely promenade. Always swim between the flags and listen to the lifeguards - they know what they're doing. And remember: slip, slop, slap - slip on a shirt, slop on sunscreen, slap on a hat!";
  }

  // Nightlife
  if (message.includes('night') || message.includes('bar') || message.includes('drink') || message.includes('pub')) {
    return "Sydney's nightlife is pretty good, though the lockout laws changed things a bit. The Rocks has some historic pubs like The Hero of Waterloo. For cocktails, try Maybe Sammy or Eau de Vie. Surry Hills and Newtown have great local bars. Just remember, most places close around 3am, and you'll need ID even if you look 40!";
  }

  // Default responses with Aussie flair
  const defaultResponses = [
    "That's a ripper question! I'm still learning about that topic, but I reckon you should explore Sydney and find out for yourself. What else can I help you with, mate?",
    "Fair dinkum, that's interesting! While I don't have all the details on that one, I'd suggest checking with the locals or having a squiz online. Anything else about Sydney I can help with?",
    "Good on ya for asking! I'm not 100% sure about that particular thing, but Sydney's full of surprises. Why don't you ask me about transport, food, or beaches instead?",
    "Blimey, that's a tough one! I might not have the full story on that, but I'm chock-full of info about Sydney's best spots. What would you like to know about our beautiful harbour city?"
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}
