import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import db from '../../lib/connect'
import Friend from '../../lib/schema'

export default async function get_friends(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send(()=>'signin required');
    }
    const {body} = req

    await db.connect()

    switch (req.method) {
    case 'GET':
        try{
            Friend.find({ownerId: session.id},((error:any, documents:any)=> {
                if (error) throw error;
                res.status(200).send(documents);
            }))
        }catch(err){
            console.log(err)
        }
        break
    case 'DELETE':
        try{
            const {_id} = JSON.parse(body)
            await Friend.deleteOne({_id})
            res.status(200).json({ message: 'Deleted Sir' })
        }catch(err){
            console.log(err)
        }
        break
    case 'POST':
        try{
            const {friendName, friendAddress, selectedAmount, selectedCode} = JSON.parse(body)
            const friend = await Friend.create({ownerId: session.id,friendName,friendAddress,selectedAmount,selectedCode})
            await friend.save()
        }catch(err){
            console.log(err)
        }
        break
    }
}