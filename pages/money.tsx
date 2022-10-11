import type {  GetServerSideProps, NextPage } from 'next'
import styles from '../styles/Money.module.scss'
import { useState } from "react";
import MoneyMain from '../components/Money/MoneyMain'
import MoneyModal from '../components/Money/MoneyModal'
import ListModal from '../components/Money/ListModal';
import { getSession } from 'next-auth/react';
import db from '../lib/connect'
import Friend from '../lib/schema'
import Head from 'next/head'

const Money: NextPage<{ data: any[] }>= props => {
  const [isModalOpen,setIsmodalOpen] =useState(false)
  const [listOpen,setListOpen] = useState(false)
  const [selectedName,setSelectedName] = useState("")
  const [selectedAddress,setSelectedAddress] = useState("")
  const [list,setList] = useState<object[]>(props.data)

  const deleteFriend = async (_id:any)=>{
    const data = {_id}
    await fetch('/api/friends', {method: 'DELETE',body: JSON.stringify(data)})
    setList((prev:object[])=> prev.filter((e:any)=>e._id!==_id))
  }
  const switchModal = ()=>{
    setIsmodalOpen(e=>!e)
  }
  const selectOne = (e:any, d:any ) => {
    setSelectedName(e)
    setSelectedAddress(d)
    setListOpen(false)
  }

  return (
    <div className={styles.page}>
    <Head>
      <title>ETH Sender</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
      <div className={styles.content}>
        <div className={styles.side}>
          {
            !listOpen &&
            <div>
                <div className={styles.title}>name:</div>
                <div className={styles.title}>address:</div>
            </div>
          }
        </div>
        <div className={styles.center}>
          {listOpen ?
          <ListModal
            list={list}
            selectedName={selectedName}
            setListOpen={setListOpen}
            selectOne={selectOne}
            deleteFriend={deleteFriend}
          />
          :
          <>
          {!isModalOpen
          ?
          <MoneyMain
            selectedName={selectedName}
            selectedAddress={selectedAddress}
            setSelectedName={setSelectedName}
            listOpen={listOpen}
            setListOpen={setListOpen}
          />
          :
          <MoneyModal/>
          }
        </>
        }
        </div>
        <div className={styles.side}>
          {!listOpen && 
            <div className={isModalOpen ? styles.closecreater : styles.opencreater}>
                <svg onClick={switchModal} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.402 45.402"><path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"/></svg>
            </div>}
        </div>
      </div>
    </div>
  )
}
//it is so slow
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await db.connect()

  try{
    const session = await getSession(ctx);
    const res = await Friend.find({ownerId: session?.id})
    const data =JSON.parse(JSON.stringify(res))
   return {
    props: { data }
    }
  }catch(err){
      console.log(err)
      return {
        props: {}
      };
  }
};

export default Money