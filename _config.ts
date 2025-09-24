import lume from "lume/mod.ts";
import lightningCSS from "lume/plugins/lightningcss.ts";

const site = lume({
  src: "./src",
});

site.add("/styles.css");
site.use(lightningCSS());
export default site;
