# WJ Submissions - Where Pizza Doesn't Exist
## Intro

This is my first submission to the web jam, where the theme was "Movies", so I made a **very** realistic poster about a fictional film
called "Where Pizza Doesn't Exist", took me a few days to complete, and i found it fun, keep in mind that i was working on this during exams. (lel)

Hosted using Firebase at https://thesneakyturtel-wj-submissions.web.app/where-pizza-doesnt-exist/

have fun :P

## Cool Tip

I've took some time and made a system called "Global Preferences" (if you want to find it in code), essentially, it takes the search parameters of the URL and uses
that to toggle some features on and off, here are all of the features that are effected by global preference:

1. BG Music: { Default: true,  URL Parameter Name: "bg-music" }, Usage example: "bg-music=false"
2. Equalizer: { Default: true,  URL Parameter Name: "equalizer",  Requirements: Requires BG Music to be set to true }, Usage example: "equalizer=false"
3. Lava Animations: { Default: true,  URL Parameter Name: "lava-animations" }, Usage example: "lava-animations=false"
4. Particle Animations: { Default: true,  URL Parameter Name: "particle-animations" }, Usage example: "particle-animations=false"

Usage example:

1. "https://thesneakyturtel-wj-submissions.web.app/where-pizza-doesnt-exist/?bg-music=false&particle-animations=false" - Disables BG Music and Particle Animations (Also disables equalizer, since it requires BG Music to be enabled)
2. "https://thesneakyturtel-wj-submissions.web.app/where-pizza-doesnt-exist/?equalizer=false&lava-animations=false" - Disables Equalizer and Lava Animations
