import styles from '../../styles/Money.module.scss'
import { useEffect, useState } from "react";

const MoneyModal = ()=> {
    const [newName,setNewName] = useState("")
    const [newAddress,setNewAddress] = useState("")

    const save = ()=> {
        const friendName =newName
        const friendAddress = newAddress
        const data = { friendName, friendAddress }
        fetch('/api/friends', {
            method: 'POST',
            body: JSON.stringify(data)
          })
    }
  return (
    <form className={styles.form} onSubmit={()=>{}}>
        <div className={styles.inputmodal}>
            <input
                autoFocus
                value={newName}
                onChange={(e:any)=>{setNewName(e.target.value)}}
            />
        </div>
        <div className={styles.inputmodal}>
            <input
                type="text"
                value={newAddress}
                onChange={(e:any)=>{setNewAddress(e.target.value)}}
            />
        </div>
        <div className={styles.bigbuttonmodal}>
        <button onClick={save}>
            <div>{"SAVE"}</div>
        </button>
        </div>
        
    </form>
  )
}

export default MoneyModal
