import React from 'react'
import {Modal, Button, ModalBody} from 'jimu-ui'
import {CloseOutlined} from 'jimu-icons/outlined/editor/close'
import {CloseButton} from './../../../../shared/components/CloseButton'

const CustomModal = ({handleModal, isOpen, text}) => {
    return (
        <>
            <Modal isOpen={isOpen} centered={true} onClose={() => handleModal(false)} size="md">
                <ModalBody>
                   <CloseButton handleClick={handleModal} />
                   {/* <div style={{position: 'relative', margin: 12}}>
                        <p style={{marginTop: 5}}>{text}</p>
                    </div>*/}
                    <div dangerouslySetInnerHTML={{ __html: text }} />
                </ModalBody>
            </Modal>
        </>
    )
}

export default CustomModal;
