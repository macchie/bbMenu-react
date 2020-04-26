import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { logoBitbucket, search, add, apps, helpCircle, fileTrayFull, code, folder, gitPullRequest, cut, chevronBack } from 'ionicons/icons';
import './Menu.scss';

interface AppPage {
  url: string;
  icon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Your work',
    url: '/page/Inbox',
    icon: fileTrayFull
  },
  {
    title: 'Repositories',
    url: '/page/Outbox',
    icon: code
  },
  {
    title: 'Projects',
    url: '/page/Favorites',
    icon: folder
  },
  {
    title: 'Pull requests',
    url: '/page/Archived',
    icon: gitPullRequest
  },
  {
    title: 'Snippets',
    url: '/page/Trash',
    icon: cut
  }
];

const Menu: React.FC = () => {
  const location = useLocation(); 

  return (
    // <IonMenu contentId="main" type="overlay" id="bbMenu">
    //     <IonContent>
          <div id="bbMenu">
            <div id='subMenu'>
              <div id="subMenuSection">
                <button className="large">
                  <IonIcon icon={logoBitbucket} />
                </button>

                <button>
                  <IonIcon icon={search} />
                </button>

                <button>
                  <IonIcon icon={add} />
                </button>
              </div>

              <div id="subMenuSection">
                <button>
                  <IonIcon icon={apps} />
                </button>

                <button>
                  <IonIcon icon={helpCircle} />
                </button>

                <button className="large">
                  <img alt="avatar" src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"/>
                </button>
              </div>
            </div>
            <IonList>
              <IonListHeader>bbMenu</IonListHeader>

              {appPages.map((appPage, index) => {
                return (
                  <IonMenuToggle key={index} autoHide={false}>
                    <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                      <IonIcon slot="start" icon={appPage.icon} />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                );
              })}
            </IonList>
          </div>
    //     </IonContent>
    // </IonMenu>
  );
};

export default Menu;
