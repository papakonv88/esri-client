import React from 'react'
import { Button } from 'jimu-ui'
import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'

const CustomIconButton = ({handleModal}) => {
    return (
            <Button
                className="exbmap-ui-tool esri-widget--button"
                title={'Πληροφορίες'}
                style={{
                    width: 32,
                    height: 32,
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                size="sm"
                icon
                type="default"
                onClick={() => handleModal(true)}
            >
                <InfoOutlined width={16} height={16} />
            </Button>
    )
}

export default CustomIconButton;
