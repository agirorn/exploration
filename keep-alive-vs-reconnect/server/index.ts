import express from 'express';
import type { Request, Response } from 'express';

const app = express();
app.use(express.json());
const port = 9999

app.post('/', (req: Request, res: Response) => {
  if (req.body.number === 0) {
    console.log('');
  }
  process.stdout.write('.');
  res.json('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
