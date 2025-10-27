import lume from "lume/mod.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import googleFonts from "lume/plugins/google_fonts.ts";
import icons from "lume/plugins/icons.ts";
import inline from "lume/plugins/inline.ts";
import jsx from "lume/plugins/jsx.ts";
import date from "lume/plugins/date.ts";
import sheets from "lume/plugins/sheets.ts";
import transformImages from "lume/plugins/transform_images.ts";
import { walk } from "jsr:@std/fs";

Deno.env.set("TZ", "Z");

const site = lume({
  src: "./src",
});

site.use(date());
site.use(jsx());
site.use(sheets({
  outputOptions: {
    blankrows: true
  }
}));

site.use(
  googleFonts({
    fonts:
      "https://fonts.google.com/share?selection.family=Montserrat:ital,wght@0,100..900;1,100..900|Noto+Serif+JP:wght@200..900|Petrona:ital,wght@0,100..900;1,100..900|Sono:wght@200..800",
  })
);
site.use(tailwindcss());
site.add("style.css"); //Add the entry point
site.use(icons());
site.use(transformImages());
site.use(inline());
site.add("/static");
site.add("/scripts");

site.addEventListener("afterBuild", async(_event) => {
  const outDir = "_site";

  for await (const entry of walk(outDir, {
    includeDirs: false,
    exts: ["jpg", "gif", "png", "jpeg"]
  })) {
    const path = entry.path;

    if (path.includes(".webp")) {
      continue;
    }
    await Deno.remove(path, {recursive: false});
    console.log(`Deleted original: ${path}`);
  }
});

export default site;
