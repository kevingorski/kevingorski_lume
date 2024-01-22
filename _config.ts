import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import postcss from "lume/plugins/postcss.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import basePath from "lume/plugins/base_path.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import pageFind from "lume/plugins/pagefind.ts";
import sitemap from "lume/plugins/sitemap.ts";
import feed from "lume/plugins/feed.ts";
import inline from "lume/plugins/inline.ts";
import toc from "lume_markdown_plugins/toc.ts";

const markdown = {
  options: {
    typographer: true,
  },
};

const site = lume({
  location: new URL("https://kevingorski.com/"),
}, {
  markdown,
});

site
  .ignore("README.md")
  .copy("img", ".")
  .use(postcss())
  .use(inline({
    copyAttributes: ["alt", "title", /^data-/],
  }))
  .use(date())
  .use(codeHighlight())
  .use(toc({
    slugify: {
      separator: "_",
      lowercase: true,
    },
  }))
  .use(basePath())
  .use(sitemap())
  .use(pageFind({
    ui: {
      resetStyles: false,
    },
  }))
  .use(slugifyUrls({ alphanumeric: false }))
  .use(feed({
    output: ["/feed.json", "/feed.xml"],
    query: "type=posts",
    info: {
      description: "=site.description",
      title: "=site.title",
    },
    items: {
      content: "$.post-body",
      title: "=title",
      updated: "=date",
    },
  }))
  .use(resolveUrls())

site.process([".html"], (pages) => {
  for (const page of pages) {
    page.document?.querySelectorAll("a[href^='http']").forEach((a) => {
      a.setAttribute("target", "_blank");
    });
  }
});
  
export default site;

