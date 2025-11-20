import {React, IMState, appActions} from 'jimu-core';
import { useSelector } from 'react-redux'
import CustomIconButton from './CustomIconButton';
import CustomModal from './CustomModal';
import abstracts from './abstracts-new.json'
import {useMemo} from "react";
import {getWidgetIdByLabel} from "../../../../shared/utils";
import {useLocale} from "../../../../shared/hooks";
import '../../index.css'

const Widget = () => {
    const {useState} = React
    const [isOpen, setIsOpen] = useState(false);
    const {locale} = useLocale();

    const activeLayer = useSelector((state: IMState) =>
        state.widgetsState?.["rasters-menu-widget"]?.activeLayer
    )

    const handleModal = (bool: boolean) => setIsOpen(bool)

    const text = useMemo(() => {
        return locale === 'el' ? abstracts[activeLayer]?.abstract_el : abstracts[activeLayer]?.abstract_en
    }, [activeLayer, locale])

    return (
        <>
            <div className="exbmap-ui">
                <CustomIconButton locale={locale} handleModal={handleModal} />
            </div>
            {(isOpen && activeLayer) ? <CustomModal handleModal={handleModal} isOpen={isOpen} text={text} /> : null}
        </>
    )
}

export default Widget;
