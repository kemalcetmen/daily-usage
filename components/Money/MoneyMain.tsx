import styles from '../../styles/Money.module.scss'
import { useEffect, useState } from "react";
import OpenClosesvg from '../General/OpenClosesvg';
import Image from 'next/image';

type Props = {
    selectedName: string;
    selectedAddress: string;
    setSelectedName: React.Dispatch<React.SetStateAction<string>>;
    listOpen: boolean;
    setListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const MoneyMain = ({selectedName,selectedAddress,setSelectedName,listOpen,setListOpen}: Props)=> {
    const [address,setAddress] = useState('')
    const [amountUSD,setAmountUSD] = useState<number>(0)
    const [amountETH,setAmountETH] = useState<number>(0)
    const [ratio,setRatio] = useState<number>()
    useEffect(() => {
        // taking ehtusd ratio
        const controller = new AbortController()
        const signal = controller.signal
        fetch('/api/ethPrice', {signal})
        .then((res)=>res.json())
        .then((data)=>{
            setRatio(Math.floor(data.ask*100)/100)
        })
        return ()=> {
            controller.abort()
        }
      }, [])
//       useEffect(() => {
//         // taking ehtusd ratio
//         const controller = new AbortController()
//         const signal = controller.signal
//         fetch('/api/friends')
//         .then((res)=>res.json())
//         .then((data)=>{
// console.log(data)        })

//       }, [])
    const changeETH= (e:any)=>{
        setAmountETH(e.target.value)
        if(ratio){
            setAmountUSD(Number((e.target.value*ratio).toFixed(2)))
        }
    }
    const changeUSD= (e:any)=>{
        setAmountUSD(e.target.value)
        if(ratio){
            setAmountETH(Number((e.target.value/ratio).toFixed(2)))
        }
    }
    const send = async ()=>{
        // metamask sending process
        const yourNumber = (amountETH*(10**18)).toString(16)
        if (typeof window.ethereum !== "undefined") {
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            const params = [
                {
                  from: window.ethereum.selectedAddress,
                  to: address,
                  value: yourNumber,
                },
              ];
            window.ethereum.request({method: 'eth_sendTransaction',params})
            .then((result:any) => {
                console.log(result);
            })
            .catch((error:any) => {
                console.log(error);
            })
        }
    }
    const changeAddress =(e:any) => {
        if(selectedName){
            // preventing some name-address problems
            setSelectedName("")
        }
        setAddress(e.target.value)
    }
    useEffect(() => {
        setAddress(selectedAddress)
    },[selectedAddress])
  return (
    <form className={styles.form}>
        <div className={styles.inputmain} onClick={() => {setListOpen(true)}}>
            <input
                disabled={true}
                value={selectedName}
            />
            <OpenClosesvg close ={listOpen}/>
        </div>
        <div className={styles.inputmain}>
            <input
                required 
                value={address}
                onChange={changeAddress}
            />
        </div>
        <div className={styles.currencyselector}>
            <div className={styles.currencymain}>
                <input
                    type="number"
                    onChange={changeUSD}
                    value={amountUSD ? amountUSD :""}
                    placeholder="00.00"
                />
                <div>{"USD"}</div> 
            </div>
            <div className={styles.approx}>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 200.000000 200.000000"> <g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"> <path d="M608 1379 c-93 -10 -177 -50 -236 -113 -58 -61 -77 -103 -68 -150 7 -38 51 -82 92 -92 43 -11 72 5 115 62 45 61 85 84 148 84 59 0 155 -34 256 -90 205 -115 289 -139 424 -125 190 20 371 131 371 227 0 66 -49 118 -112 118 -28 0 -47 -9 -82 -39 -83 -72 -211 -104 -314 -77 -58 15 -99 36 -216 111 -68 44 -147 73 -214 81 -26 3 -58 6 -72 8 -14 1 -55 -1 -92 -5z"/> <path d="M565 881 c-77 -28 -195 -90 -221 -116 -61 -61 1 -175 94 -175 17 0 65 17 108 37 52 25 96 38 133 41 53 3 65 -1 198 -66 187 -94 249 -112 373 -112 156 0 267 45 359 145 36 39 41 51 41 91 0 39 -5 51 -34 80 -51 51 -89 48 -161 -15 -125 -110 -258 -108 -474 5 -192 101 -307 125 -416 85z"/> </g> </svg>   
            </div>
            <div className={styles.currencymain}>
                <input
                    type="number"
                    onChange={changeETH}
                    value={amountETH ? amountETH :""}
                    placeholder="00.00"
                />
                <div>{"ETH"}</div> 
            </div>
        </div>
        <button type='button' onClick={send} className={styles.bigbuttonmain}>
            <div>{"SEND"}</div>
            <Image
                src="/metamask.svg"
                alt=""
                width={36}
                height={36}
            />
        </button>
    </form>
  )
}

export default MoneyMain
