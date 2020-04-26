import Menu from './components/Menu';
import Page from './pages/Page';
import React, { useCallback, useState, useEffect } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, CreateAnimation, IonIcon, IonMenu, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import './App.scss';

import { chevronBack, chevronForward } from 'ionicons/icons';

const App: React.FC = () => {

  const animRef: React.RefObject<CreateAnimation> = React.createRef();

  const [menuInit, setMenuInit] = useState(false)
  const [menuOpen, setMenuOpen] = useState(true)

  const toggleMenu = async (sync: boolean = false) => {
    if (!animRef || !animRef.current) {
      console.log('fail', animRef)
      return;
    }

    let animation = animRef.current!.animation;
    
    console.log(menuOpen)
    if (menuOpen) {
      animation = animation.fromTo('flex', '0 0 305px', '0 0 calc(60px + 1.5rem)').direction('normal')
      animation.play({ sync })
      setMenuOpen(false)
    } else {
      animation = animation.fromTo('flex', '0 0 calc(60px + 1.5rem)', '0 0 305px').direction('reverse')
      animation.play({ sync })
      setMenuOpen(true)
    }
  }

  useEffect(() => {
    if (!menuInit) {
      if (!menuOpen) {
        toggleMenu(true);
      }
      setMenuInit(true);
    }
  });

  return (
    <IonApp id="app">
      <IonReactRouter>
        <CreateAnimation
          ref={animRef}
          easing="cubic-bezier(.4,.82,.31,1)"
          duration={666}
        >
          <div id="sidebar" className="ion-hide-md-down">
            <Menu />
            <button onClick={() => toggleMenu()} id="menuToggle">
              <IonIcon icon={menuOpen ? chevronBack : chevronForward}></IonIcon>
            </button>
          </div>
        </CreateAnimation>

        <IonMenu type="overlay" side="start" menuId="first">
          <IonContent>
            {/* <Menu></Menu> */}
          </IonContent>
        </IonMenu>

        <IonRouterOutlet id="mainContent">
          <Route path="/page/:name" component={Page} exact />
          <Redirect from="/" to="/page/Inbox" exact />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
