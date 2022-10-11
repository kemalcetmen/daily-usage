import styles from '../../styles/money/ListModal.module.scss'
import OpenClosesvg from "../General/OpenClosesvg";

type Props = {
    list: object[],
    selectedName: string;
    setListOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectOne:(e: any, d: any) => void,
    deleteFriend: (_id: any) => Promise<void>
}
const ListModal = ({list,selectedName,setListOpen,selectOne,deleteFriend}: Props) => {
    console.log(list)
  return (
    <div className={styles.list}>
        <ul>
            <div className={styles.firstitem} key={-1} onClick={()=>{setListOpen(false)}}>
                <input
                    disabled={true}
                    value={selectedName}
                />
                <OpenClosesvg close={true}/>
            </div>
            {list.map((e:any,i:number)=>(
            <div className={styles.listitem} key={i}>                
                <div onClick={()=>{selectOne(e.friendName,e.friendAddress)}}>
                    <input
                        disabled={true}
                        value={e.friendName}
                    />
                    <input
                        disabled={true}
                        value={e.friendAddress}
                    />
                </div>
                <svg onClick={()=>{deleteFriend(e._id)}}version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="-15 -15 69 69"><path d="M37.059,16H26H16H4.941C2.224,16,0,18.282,0,21s2.224,5,4.941,5H16h10h11.059C39.776,26,42,23.718,42,21 S39.776,16,37.059,16z"/></svg>
            </div>
        ))}
        </ul>
    </div>
  )
}

export default ListModal