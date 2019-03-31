import React from 'react';

const FuseSplashScreen = () => {
    return (
        <div id="fuse-splash-screen">

            <div className="center">

                <div className="logo">
                    <img width="128" src="https://www.kpu.ca/sites/all/themes/kwantlen_v3/img/logo.svg" alt="logo"/>
                </div>
                <div className="spinner-wrapper">
                    <div className="spinner">
                        <div className="inner">
                            <div className="gap"/>
                            <div className="left">
                                <div className="half-circle"/>
                            </div>
                            <div className="right">
                                <div className="half-circle"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FuseSplashScreen;
