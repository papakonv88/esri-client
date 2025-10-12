import React from "react";
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  Icon,
} from "jimu-ui";

const FiltersDropdown = ({
  title,
  iconUrl,
  items,
  selectedItem,
  handleFiltersChange,
  type,
  isDisabled = false,
  hasSeasonalData = false,
  locale,
  isUp,
}) => {
  const getDisabled = (idx) => {
    if (isDisabled) {
      return true;
    }

    if (type === "season") {
      if (idx > 0 && !hasSeasonalData) {
        return true;
      }
    }
    title;
    return false;
  };

  return (
    <Dropdown
      menuItemCheckMode="single"
      activeIcon
      direction="down"
      menuRole="menu"
      className={"dropdown-custom"}
      size={"lg"}
      trigger="click"
    >
      <DropdownButton>
        {isUp ? <span className={"titles-menu"}>{title}</span> : null}
        <span>
          <Icon color="white" icon={iconUrl} rotate={0} size="l" title="Icon" />
        </span>
      </DropdownButton>
      <DropdownMenu>
        {items.map((item, idx) => (
          <DropdownItem
            key={item.id}
            style={{ whiteSpace: "pre-wrap", maxWidth: "inherit%" }}
            disabled={getDisabled(idx)}
            onClick={() => {
              handleFiltersChange(item, type);
              /*setIsOpen(false);*/
            }}
            active={
              locale === "el"
                ? selectedItem === item.label
                : selectedItem === item.labelEn
            }
          >
            {locale === "el" ? item.label : item.labelEn}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default FiltersDropdown;
