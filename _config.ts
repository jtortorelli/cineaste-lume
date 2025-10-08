import lume from "lume/mod.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import googleFonts from "lume/plugins/google_fonts.ts";
import icons from "lume/plugins/icons.ts";
import inline from "lume/plugins/inline.ts";
import jsx from "lume/plugins/jsx.ts";
import date from "lume/plugins/date.ts";

const site = lume({
  src: "./src",
});

site.use(date());
site.use(jsx());

site.use(
  googleFonts({
    fonts:
      "https://fonts.google.com/share?selection.family=Montserrat:ital,wght@0,100..900;1,100..900|Noto+Serif+JP:wght@200..900|Petrona:ital,wght@0,100..900;1,100..900|Sono:wght@200..800",
  })
);
site.use(tailwindcss());
site.add("style.css"); //Add the entry point
site.use(icons());
site.use(inline());
site.add("/static");

export default site;
