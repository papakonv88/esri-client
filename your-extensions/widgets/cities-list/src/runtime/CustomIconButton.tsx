import React from 'react'
import { Button } from 'jimu-ui'
import {PinEsriOutlined} from 'jimu-icons/outlined/gis/pin-esri'

const CustomIconButton = ({handleModal}) => {
    return (
            <Button
                className="exbmap-ui-tool esri-widget--button"
                title={'Πόλεις'}
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
                <PinEsriOutlined width={16} height={16} />
            </Button>
    )
}

export default CustomIconButton;
