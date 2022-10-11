import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../../styles/Cards.module.scss'

type Props = {
    title: string,
    source: string,
    link: string,
}

const Card = ({title,source,link}: Props) => {
    return (
      <div className={styles.card}>
        <Link href={link}>
            <div className={styles.inside}>
                <Image
                    width={300}
                    height={300}
                    src={source}
                    alt={""}
                />
                <h1>{title}</h1>
            </div>
        </Link>
      </div>
    )
}

const Cards = () => {
    const pages =[
        {
            title:"translate",
            source:"/tra.png",
            link:"/translate"
        },
        {
            title:"wallet",
            source:"/buterin.png",
            link:"/money"
        }
    ]
  return (
    <div className={styles.cards}>
        {pages.map((page:any,i:number) =>(
            <Card
                key={i}
                title={page.title}
                source={page.source}
                link={page.link}
            />
        ))}
    </div>
  )
}

export default Cards