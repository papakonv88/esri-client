import React, {useState} from 'react';
import {JimuMapViewComponent} from 'jimu-arcgis';
import {Icon, Button, Icon} from 'jimu-ui';
import grFlag from "./../assets/gr.png";
import enFlag from "./../assets/en.png";
import burgerMenuIcon from "./../assets/burger-menu.svg";
import closeIcon from "./../assets/close.svg";

const BurgerMenu = ({handleIsBurgerOpen, isOpen, locale, currentLinks, getPageUrl, handleChangeLocale}) => {
    return (
        <>
            {!isOpen ? <div className="burger-container">
                <Button
                    className="exbmap-ui-tool esri-widget--button"
                    style={{
                        width: 'auto',
                        height: 'auto',
                        padding: 5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: 'transparent',
                        background: 'transparent',
                    }}
                    size="l"
                    icon
                    type="default"
                    onClick={handleIsBurgerOpen}
                >
                    <Icon
                        style={{ width: '24px', height: '24px' }}
                       currentColor={true}
                        icon={
                            burgerMenuIcon
                        }
                    />
                </Button>
            </div> : null}
            {isOpen ? (
                <div className={'burger-menu-items'}>
                <Button
                        className="exbmap-ui-tool esri-widget--button"
                        style={{
                            width: 'auto',
                            height: 'auto',
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderColor: 'transparent',
                            background: 'transparent',
                            alignSelf: 'flex-end',
                            paddingBottom: 50
                        }}
                        size="l"
                        icon
                        type="default"
                        onClick={handleIsBurgerOpen}
                    >
                    <Icon
                        style={{ width: '24px', height: '24px' }}
                        currentColor={true}
                        icon={
                            closeIcon
                        }
                    />
                    </Button>
                    <div className="burger-menu-list-items">
                        {currentLinks.map((link, idx) => (
                            <>
                                <div key={link.to} style={{textAlign: 'right'}} onClick={() => getPageUrl(link)}>{link.name}</div>
                                <div className={"divider-menu"}/>
                            </>
                        ))
                        }
                    </div>
                    <div style={{marginTop: 'auto', display: 'flex', flexDirection: 'column', rowGap: '15px'}}>
                        <div style={{
                            textAlign: 'right'
                        }} onClick={() => handleChangeLocale("el")}>Ελληνικά <span style={{marginLeft: 5}}>
                            <img
                                loading="lazy"
                                src={grFlag}
                                alt="gr-flag"
                                style={{width: "30px", height: "16px"}}
                            /></span></div>
                        <div className={"divider-menu"}/>
                        <div style={{
                            textAlign: 'right',
                        }} onClick={() => handleChangeLocale("en-us")}>English <span style={{marginLeft: 5}}>
                              <img
                                  loading="lazy"
                                  src={enFlag}
                                  alt="en-flag"
                                  style={{width: "30px", height: "16px"}}
                              />
                        </span></div>
                    </div>
                </div>
            ) : null}

            {/* Backdrop */}
            {isOpen && (
                <div
                    className={'backdrop'}
                    onClick={handleIsBurgerOpen}
                />
            )}
        </>
    );
}

export default BurgerMenu;
