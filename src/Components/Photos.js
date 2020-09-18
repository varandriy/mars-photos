import { Filter } from './Filter';
import React from 'react';
import { connect } from 'react-redux';
import './Photos.css';

const Component = ({ photos }) => {
  const [limit, setLimit] = React.useState(1);

  const handleLimitChange = () => {
    setLimit(limit + 1);
  };

  React.useEffect(() => {
    setLimit(1);
  }, [photos]);

  return (
    <div className={'main-container'}>
      <div className={'selects'}>
        <Filter />
      </div>
      {
        photos.slice(0, limit).map(photo => {
          return (
            <div className={'photo'} key={photo.id}>
              <img alt="photos" src={photo.img_src} style={{ width: '100%' }} />
            </div>
          );
        })
      }
      {
        limit < photos.length && (
          <div>
            <button style={{ backgroundColor: '#F9AA33' }} onClick={handleLimitChange}>Load more</button>
          </div>
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    photos: state.photos,
  };
};

export const Photos = connect(mapStateToProps)(Component);
