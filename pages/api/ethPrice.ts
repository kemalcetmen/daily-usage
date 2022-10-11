import type { NextApiRequest, NextApiResponse } from 'next'

const { RAPIDAPI_KEY = ''} = process.env;

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const {  method } = req

  if(method === 'GET') {
    const url = 'https://bitcoinaverage-global-bitcoin-index-v1.p.rapidapi.com/indices/global/ticker/ETHUSD';

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'bitcoinaverage-global-bitcoin-index-v1.p.rapidapi.com'
      }
    };
    fetch(url,options)
        .then(a => a.json())
        .then(json =>res.status(200).json( json ))
        .catch(err => console.error('error:' + err));
  }
}