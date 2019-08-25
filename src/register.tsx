import * as React from 'react';
import { STORY_CHANGED } from '@storybook/core-events';
import addons, { types } from '@storybook/addons';
import { API } from '@storybook/api';
import delay from 'delay';
import { initialize } from 'react-devtools-inline/frontend';
import {
  activate as activateBackend,
  initialize as initializeBackend
} from 'react-devtools-inline/backend';

const ADDON_ID = 'ReactDevTool';
const PANEL_ID = `${ADDON_ID}/panel`;

const DevToolPanel = ({ api, active }: { api: API, active: boolean }): JSX.Element | null => {
  const [DevTools, setIframe]: [any, any] = React.useState(null)


  const onStoryChange = async id => {
    const iframe = document.getElementById('storybook-preview-iframe') as HTMLIFrameElement;
    if(iframe && iframe.contentWindow) {
      const { contentWindow } = iframe;

      initializeBackend(contentWindow);
      setIframe(initialize(contentWindow))
      activateBackend(contentWindow);

      return;
    }

    await delay(1000);
    onStoryChange(id);
  };

  React.useEffect(() => {
    api.on(STORY_CHANGED, onStoryChange)

    return () => {
      api.off(STORY_CHANGED, onStoryChange);
    }
  }, [api])

  if(!active) {
    return null
  };

  return (
    <React.Fragment>
      {DevTools && <DevTools />}
    </React.Fragment>
  )
}

addons.register(ADDON_ID, api => {
  const render = ({ active }) => <DevToolPanel api={api} active={active} />
  const title = 'React Devtool';

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title,
    render,
  });
});
