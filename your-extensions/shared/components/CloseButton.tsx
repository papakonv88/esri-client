import {Button} from "jimu-ui";
import {CloseOutlined} from "../../../jimu-icons/outlined/editor/close";
import {React} from "jimu-core";

export const CloseButton = ({handleClick}) => {
    return (
        <Button
            icon
            size="xs"
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                border: 'none',
                background: 'transparent',
                padding: '12px',
                cursor: 'pointer'
            }}
            onClick={() => handleClick(false)}
            title="Κλείσιμο"
            aria-label="Κλείσιμο"
        >
            <CloseOutlined width={16} height={16}/>
        </Button>
    )
}
