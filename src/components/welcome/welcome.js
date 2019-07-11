import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'widgets';

import styles from './welcome.scss';

const Welcome = ({ history }) => {

  const handleClick = (e) => {
    e.preventDefault(e);
    history.push('/subscribe');
  };

  return (
    <div className={styles['welcome-wrapper']}>
      <main>
        <article>
          <h1>Welcome</h1>
          <p>
            {`
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Nam facilisis nisl egestas nibh porta, eget lacinia mi placerat.
              In ullamcorper pellentesque urna id vulputate. Praesent ut nulla
              Nullam ullamcorper nisi quam, in sagittis ante fringilla et. 
              Vestibulum nec placerat ex. Proin molestie, leo eget 
              efficitur consequat, tortor urna tempus enim, quis elementum ligula 
              diam quis dolor. Quisque tincidunt..
            `}
          </p>
          <p>
            {
              `Aliquam faucibus posuere placerat. Vestibulum nec turpis sit amet 
              quam vestibulum posuere at id quam. Nulla bibendum, neque in mollis 
              volutpat, diam metus sagittis risus, ultrices pulvinar nibh leo quis 
              lorem. Ut sed mauris et justo placerat egestas. Vestibulum ante ipsum 
              primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed 
              quis ultrices elit. Cras non nunc at metus dapibus lobortis non a mauris. 
              Aliquam pulvinar risus augue, sed gravida tellus venenatis at. Nunc 
              gravida elementum erat at fringilla. Ut eget laoreet elit, nec lacinia nunc. 
              Maecenas faucibus venenatis nulla, vestibulum lobortis justo porttitor rutrum. 
              Vivamus viverra ex et neque eleifend, in condimentum massa pharetra. Duis 
              scelerisque quis nulla et euismod. Donec vitae luctus velit, at dignissim odio.`
            }
          </p>
        </article>
        <Button onClick={handleClick} className="default">
          NEXT
        </Button>
      </main>
    </div>
  );
};

export default Welcome;

Welcome.propTypes = {
  history: PropTypes.object
};
