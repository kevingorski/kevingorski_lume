export const layout = "layouts/tag.vto";

export default function* ({ search }) {
  for (const tag of search.values("tags")) {
    yield {
      tag,
      title: `Tagged “${tag}”`,
      type: "tag",
      url: `/tags/${tag}/`,
    };
  }
}
