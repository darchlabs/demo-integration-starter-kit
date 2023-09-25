const Darchlabs = require("darchlabs")
const { webhooks } = new Darchlabs.default("token")

webhooks.listen(3002, "/api/v1/webhook", (wh) => {
  console.log("here in webhook", wh)
})