const request = require('request-promise');
const delay = require('delay');

const options = {
  method: 'POST',
  uri: 'http://0.0.0.0:22999/api/proxies',
  json: true,
  headers: {
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
    'Content-Type': 'application/json'
  },
  body: {
    proxy: {
      preset: "session_long",
      zone: "",
      proxy_type:"persist",
      pool_size:1,
      session:"",
      port:24000
    }
  }
};

async function main() {
    await delay(20000);
    await request(options);
    await delay(5000);
}

main()
