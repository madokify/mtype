export default function handler(req, res) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.redirect(302, '/');
  }

  let username;

  if (slug.codePointAt(0) === 0xE0001) {
    username = decodeZWS(slug);
  } else {
    username = slug.trim().replace(/[^a-zA-Z0-9_-]/g, '');
  }

  if (!username) {
    return res.redirect(302, '/');
  }

  return res.redirect(301, `https://monkeytype.com/profile/${username}`);
}

function decodeZWS(encoded) {
  let result = '';
  for (const ch of encoded) {
    const cp = ch.codePointAt(0);
    if (cp === 0xE0001 || cp === 0xE0000) continue;
    if (cp >= 0xE0000 && cp <= 0xE007F) {
      result += String.fromCodePoint(cp - 0xE0000);
    }
  }
  return result.replace(/[^a-zA-Z0-9_-]/g, '');
}
