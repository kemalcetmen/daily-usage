import React, {useState} from 'react'
import styles from '../../styles/Modal.module.scss'

type Props = {
    languages: Array<string>,
    setShowModal: React.Dispatch<React.SetStateAction<string>>,
    setChosenLanguage: React.Dispatch<React.SetStateAction<string>>,
}

const Modal = ({languages,
    setShowModal,
    setChosenLanguage}: Props) => {

    const [searchedLanguage, setSearchedLanguage] = useState('')

    const filteredLanguages = languages.filter((language) =>
      language.toLowerCase().includes(searchedLanguage.toLowerCase())
    )
  
    const handleClick = (e:any) => {
      setChosenLanguage(e.target.textContent)
      setShowModal("")
    }
  
    const handleChange = (e:any) => {
      setSearchedLanguage(e.target.value)
    }
  return (
    <div className={styles.optionlist}>
        <div className={styles.searchbar}>
            <input onChange={handleChange}/>
            <div className={styles.closebutton} onClick={() => setShowModal("")}>
            <svg
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
            </div>
        </div>
        <div className={styles.optioncontainer}>
            <ul>{filteredLanguages?.map((e,i)=>(
                <div key={i} className={styles.listitem}>
                    <li onClick={handleClick}>{e}</li>
                </div>
            ))}
                </ul>
        </div>

      
    </div>
   
  )
}

export default Modal