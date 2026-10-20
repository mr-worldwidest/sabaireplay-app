import { onRequestPost as __api_waitlist_js_onRequestPost } from "/Users/y1k/GitHub/sabaireplay-app/functions/api/waitlist.js"

export const routes = [
    {
      routePath: "/api/waitlist",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_waitlist_js_onRequestPost],
    },
  ]