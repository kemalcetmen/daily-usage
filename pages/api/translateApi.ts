import type { NextApiRequest, NextApiResponse } from 'next'

const { RAPIDAPI_KEY = '',  RAPIDAPI_HOST = ''} = process.env;

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id, name },
    method,
    body,
  } = req


  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json({ id, name: `User ${id}` })
      break
    case 'POST':
      // Update or create data in your database
      const { textToTranslate, inputCode, outoutCode } = JSON.parse(body)
      const url = `https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=${outoutCode}&api-version=3.0&from=${inputCode}&profanityAction=NoAction&textType=plain`;
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
            .catch(err => console.error('error:' + err));
            
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}