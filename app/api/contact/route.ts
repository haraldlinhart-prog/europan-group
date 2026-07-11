import { NextRequest, NextResponse } from 'next/server'
// Catches bot-generated random tokens that are short enough to slide past a simple
// length check but look nothing like a real word: very few vowels AND unnaturally
// frequent upper/lowercase switching. Both conditions required together to avoid
// flagging real oddly-cased words (e.g. "McDonald").
function isGibberish(str: string): boolean {
  const words = (str || '').split(/\s+/).filter(w => w.length >= 6);
  const vowelChars = 'aeiouyAEIOUYäöüÄÖÜàáâãåèéêëìíîïòóôõùúûýÀÁÂÃÅÈÉÊËÌÍÎÏÒÓÔÕÙÚÛÝ';
  for (const word of words) {
    const letters = word.replace(/[^a-zA-ZäöüÄÖÜßàáâãåèéêëìíîïòóôõùúûýÀÁÂÃÅÈÉÊËÌÍÎÏÒÓÔÕÙÚÛÝ]/g, '');
    if (letters.length < 6) continue;
    let vowels = 0;
    for (const ch of letters) if (vowelChars.includes(ch)) vowels++;
    const vowelRatio = vowels / letters.length;
    let transitions = 0;
    for (let i = 1; i < letters.length; i++) {
      const prevUpper = letters[i - 1] === letters[i - 1].toUpperCase() && letters[i - 1] !== letters[i - 1].toLowerCase();
      const curUpper = letters[i] === letters[i].toUpperCase() && letters[i] !== letters[i].toLowerCase();
      if (prevUpper !== curUpper) transitions++;
    }
    const transitionRatio = transitions / (letters.length - 1);
    if (vowelRatio < 0.2 && transitionRatio > 0.35) return true;
  }
  if (/\S{61,}/.test(str || '')) return true;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message, elapsed } = body

  // Gibberish-Bot-Erkennung (kurze Zufallsstrings) — silent success wie Honeypot
  if (isGibberish(message) || isGibberish(name)) { return NextResponse.json({ ok: true }); }
    if (body.website) return NextResponse.json({ ok: true })
    if (typeof elapsed === 'number' && elapsed < 2000) return NextResponse.json({ ok: true })
    if (!name || !email || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    const noSpaces = String(message).replace(/\s/g, '')
    if (noSpaces.length > 60 && noSpaces.length === String(message).length) return NextResponse.json({ ok: true })
    if (!email.includes('@')) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    const resendKey = process.env.RESEND_API_KEY
    const contactTo = process.env.CONTACT_TO || 'info@europan.group'
    if (!resendKey) return NextResponse.json({ ok: true })
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'EUROPAN <noreply@pan21.com>', to: contactTo, reply_to: email, subject: `EUROPAN Contact: ${subject || name}`, html: `<p><strong>Name:</strong> ${name}<br><strong>Email:</strong> ${email}<br><strong>Subject:</strong> ${subject || '—'}</p><p>${message}</p><p style="font-size:0.7rem;color:#aaa;">europan.group · ${elapsed}ms</p>` }),
    })
    return NextResponse.json({ ok: true })
  } catch { return NextResponse.json({ error: 'Internal error' }, { status: 500 }) }
}
