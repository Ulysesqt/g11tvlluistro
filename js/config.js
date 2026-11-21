/* =====================================================================
   CONFIG — edit everything personal here. Leave a photo "" to show a
   clearly-marked placeholder; paste an image URL or local path to replace.
   ===================================================================== */
const CONFIG={
  name:"Isabella Rose", first:"Isabella", initials:"IR",
  families:"Together with their families",
  date:"2027-03-20T18:00:00+08:00",            // drives the countdown (ISO, with timezone)
  dateText:"Saturday, March 20, 2027", dateShort:"03 . 20 . 2027", timeText:"6:00 in the evening",
  venue:"The Blue Garden Ballroom", address:"123 Rosewater Avenue, Parañaque City, Metro Manila",
  mapUrl:"https://www.google.com/maps/search/?api=1&query=Parañaque+City+Metro+Manila",
  about:"Eighteen years of laughter, quiet strength and dreams in full bloom. Here are a few moments from the girl we are so proud to celebrate.",
  photos:{hero:"",featured:"",final:"",gallery:[{src:"",cap:"Little dreamer"},{src:"",cap:"Sunday smiles"},{src:"",cap:"Chasing sunsets"},{src:"",cap:"Almost eighteen"}]},
  program:[
    {t:"5:30 PM",n:"Grand Entrance",d:"The debutante arrives, surrounded by family."},
    {t:"6:00 PM",n:"Welcome Remarks",d:"A warm greeting from her parents."},
    {t:"6:30 PM",n:"Dinner",d:"A plated dinner and good company."},
    {t:"7:30 PM",n:"18 Roses",d:"Eighteen special people, eighteen heartfelt dances."},
    {t:"8:15 PM",n:"18 Candles",d:"Words of love for each light."},
    {t:"8:45 PM",n:"18 Treasures",d:"Gifts that carry wishes for the years ahead."},
    {t:"9:15 PM",n:"Special Performances",d:"Songs and surprises from friends and family."},
    {t:"10:00 PM",n:"Birthday Celebration",d:"The cake, the toast, and a night of dancing."}],
  dress:{theme:"Elegant Blue",text:"Floor-length gowns and tailored suits in shades of blue are warmly encouraged. Silver accents and white details are welcome. We kindly ask guests to leave the ivory-white gown to the debutante.",
    colors:[["Powder Blue","#b0c4de"],["Baby Blue","#bcd6f0"],["Navy Blue","#1f3a68"],["Silver","#c3cad3"],["White","#ffffff"]]},
  maxGuests:4,
  rsvpEndpoint:"",   // e.g. "https://formspree.io/f/xxxxxxx" — POSTs JSON {name,phone,attending,guests,message}. For Google Sheets use an Apps Script web-app URL.
  music:"assets/music.mp3"   // put your audio file here; it never autoplays
};
/* ===================================================================== */
