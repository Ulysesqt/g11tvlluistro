READY-TO-SUBMIT WEBSITE - 18th Debut Invitation
================================================
index.html        page shell (loads libraries from CDN)
css/styles.css    all styling and animations
js/config.js      EDIT THIS: name, date, venue, photos, program, RSVP, music
js/app.js         React components (envelope, sections, RSVP, music)
assets/images/    put your photos here, then set paths in config.js, e.g. "assets/images/hero.jpg"
assets/           put your music here as music.mp3 (never autoplays)

RSVP: set rsvpEndpoint in js/config.js (e.g. a Formspree URL). Until then the form says the reply was NOT sent.
Hosting: upload the whole folder to Netlify, Vercel, GitHub Pages, or any web host. Needs internet for the CDN libraries and fonts.
