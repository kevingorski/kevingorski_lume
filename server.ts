import Server from "lume/core/server.ts";
import expires from "lume/middlewares/expires.ts";
import www from "lume/middlewares/www.ts";
import notFound from "lume/middlewares/not_found.ts";

const server = new Server({
  port: 8000,
  root: `${Deno.cwd()}/_site`,
});

server.use(www({
  add: false, // false to remove, true to add it.
}))
server.use(expires());
server.use(notFound({
  root: `${Deno.cwd()}/_site`,
  page404: "/404.html",
}));

server.start();
