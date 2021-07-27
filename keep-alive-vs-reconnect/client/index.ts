import got from 'got';
import HttpAgent from 'agentkeepalive';

const { HttpsAgent } = HttpAgent;

const NUMBER_OF_REQUESTS = 1_000;
const KEEP_ALIVE_IS_ON = process.argv.includes('--keep-alive');

const options = KEEP_ALIVE_IS_ON
  ? {
    agent: {
      http: new HttpAgent(),
      https: new HttpsAgent()
    }
  }
  : {};

const TIMER_LABLE = KEEP_ALIVE_IS_ON
  ? `${NUMBER_OF_REQUESTS} requests with Keep-Alive: ON`
  : `${NUMBER_OF_REQUESTS} requests with Keep-Alive: OFF`;

// const range = (length: number) => new Array(length).fill(0).map((_v: unknown,i: number) => i);
const post = async (n: number) => got.post(
  'http://localhost:9999/',
  {
    ...options,
		json: { number: n },
    responseType: 'json'
  },
);

const run = async () => {
  console.time(TIMER_LABLE);
  for (let i = 1; i != NUMBER_OF_REQUESTS; i++) {

    await post(i);
  }
  console.timeEnd(TIMER_LABLE);
};


run().catch(
  (error) => {
    console.log(error);
    process.exit(1);
  },
)
