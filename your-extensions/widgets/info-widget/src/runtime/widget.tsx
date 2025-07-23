import {React, IMState, appActions} from 'jimu-core'
import { useSelector } from 'react-redux'
import CustomIconButton from './CustomIconButton';
import CustomModal from './CustomModal';
import abstracts from './abstracts.json'
import {useMemo} from "react";
import {getWidgetIdByLabel} from "../../../../shared/utils";

const Widget = () => {
    const {useState} = React
    const [isOpen, setIsOpen] = useState(false);

    const parentWidgetLabel = 'rasters-menu';
    const widgetID = getWidgetIdByLabel(parentWidgetLabel);

    const activeLayer = useSelector((state: IMState) =>
        state.widgetsState?.[widgetID]?.activeLayer
    )

    const handleModal = (bool: boolean) => setIsOpen(bool)

    const text = useMemo(() => {
        return abstracts[activeLayer]?.abstract_el || ''
    }, [activeLayer])

    return (
        <>
            <div className="exbmap-ui">
                <CustomIconButton handleModal={handleModal} />
            </div>
            {(isOpen && activeLayer) ? <CustomModal handleModal={handleModal} isOpen={isOpen} text={text} /> : null}
        </>
    )
}

export default Widget;
