import React from 'react'
import styles from '../../styles/translate/TextBox.module.scss'
import OpenClosesvg from '../General/OpenClosesvg';

type Props = {
    type: string,
    currentLanguage: string,
    setShowModal: React.Dispatch<React.SetStateAction<string>>,
    setTextToTranslate?: React.Dispatch<React.SetStateAction<string>>,
    setTranslatedText?: React.Dispatch<React.SetStateAction<string>>,
}
const Languages = ({
    type,
    currentLanguage,
    setShowModal }: Props) => {

    const openModal = () => {
        setShowModal(type)
    }
    return (
        <>
            <div className={styles.languageselector} onClick={openModal}>
                <input
                    disabled={true}
                    value={currentLanguage}
                />
                <OpenClosesvg close={false} />
            </div>
        </>
    )
}

export default Languages