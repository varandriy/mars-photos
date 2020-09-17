import { CameraValues } from './CameraValues'
import React from 'react'
import { connect } from "react-redux";
import './MarsPhotos.css';

const Component = ({ photos }) => {
    let [visible, setVisible] = React.useState(1);
    console.log(visible)


    const handleChangeVisible = () => {
        setVisible(visible + 1);
    }
    return (
        <div className={'main-container'}>
            <div className={'selects'}>
                <CameraValues setVisible={setVisible} />
            </div>
            {photos.slice(0, visible).map(photo => {
                return (
                    <div className={'photo'} key={photo.id}>
                        <img alt="photos" src={photo.img_src} style={{ width: 438, height: 300 }} />
                    </div>
                )
            })}
            {
                visible < photos.length &&
                <div>
                    <button style={{ backgroundColor: "#F9AA33" }} onClick={handleChangeVisible}>Load more</button>git init
                </div>

            }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        photos: state.photos
    };
};

export const MarsPhotos = connect(mapStateToProps)(Component);
