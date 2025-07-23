import React from 'react';
import {Dropdown, DropdownButton, DropdownMenu, DropdownItem, Icon} from 'jimu-ui';

const FiltersDropdown = ({
                             title,
                             iconUrl,
                             items,
                             selectedItem,
                             handleFiltersChange,
                             type,
                             isDisabled = false,
                             hasSeasonalData = false
                         }) => {
    const getDisabled = (idx) => {
        if (isDisabled) {
            return true
        }

        if (type === 'season') {
            if (idx > 0 && !hasSeasonalData) {
                return true
            }
        }

        return false
    }
    return (
        <Dropdown
            menuItemCheckMode="single"
            activeIcon
            direction="down"
            menuRole="menu"
            className={'dropdown-custom'}
            size={"lg"}
            trigger="click"
        >
            <DropdownButton>
                {title}
                <span>
                <Icon
                    color="white"
                    icon={iconUrl}
                    rotate={0}
                    size="l"
                    title="Icon"
                />
            </span>
            </DropdownButton>
            <DropdownMenu>
                {items.map((item, idx) => (
                    <DropdownItem
                        key={item.id}
                        style={{ whiteSpace: 'pre-wrap', maxWidth: 'inherit%'}}
                        disabled={getDisabled(idx)}
                        onClick={() => {
                            handleFiltersChange(item, type);
                            /*setIsOpen(false);*/
                        }}
                        active={selectedItem === item.label}
                    >
                        {item.label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>)
}

export default FiltersDropdown;
