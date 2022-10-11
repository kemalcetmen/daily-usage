import type { NextApiRequest, NextApiResponse } from 'next'

const { RAPIDAPI_KEY = '',  RAPIDAPI_HOST = ''} = process.env;

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const {method,body} = req

  if(method === 'POST') {
    const { textToTranslate, inputCode, outputCode } = JSON.parse(body)
    const url = `https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=${outputCode}&api-version=3.0&from=${inputCode}&profanityAction=NoAction&textType=plain`;
    const options = {
      method: 'POST',
      headers: {
        'content-type':'application/json',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST
      },
      //   body: '[{"Text":"hi"}]'
        body: `[{"Text":"${textToTranslate}"}]`
      };
      fetch(url,options)
          .then(a => a.json())
          .then(json =>res.status(200).json( json ))
          .catch(err =>res.status(404).end(err));
  }
}