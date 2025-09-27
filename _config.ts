import lume from "lume/mod.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";

const site = lume({
  src: "./src",
});

site.use(tailwindcss(/* Options */));
site.add("style.css"); //Add the entry point

export default site;
