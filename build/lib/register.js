import * as tslib_1 from "tslib";
import * as React from 'react';
import { STORY_CHANGED } from '@storybook/core-events';
import addons, { types } from '@storybook/addons';
import delay from 'delay';
import { initialize } from 'react-devtools-inline/frontend';
import { activate as activateBackend, initialize as initializeBackend } from 'react-devtools-inline/backend';
const ADDON_ID = 'ReactDevTool';
const PANEL_ID = `${ADDON_ID}/panel`;
const DevToolPanel = ({ api, active }) => {
    const [DevTools, setIframe] = React.useState(null);
    const onStoryChange = (id) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const iframe = document.getElementById('storybook-preview-iframe');
        if (iframe && iframe.contentWindow) {
            const { contentWindow } = iframe;
            initializeBackend(contentWindow);
            setIframe(initialize(contentWindow));
            activateBackend(contentWindow);
            return;
        }
        yield delay(1000);
        onStoryChange(id);
    });
    React.useEffect(() => {
        api.on(STORY_CHANGED, onStoryChange);
        return () => {
            api.off(STORY_CHANGED, onStoryChange);
        };
    }, [api]);
    if (!active) {
        return null;
    }
    ;
    return (React.createElement(React.Fragment, null, DevTools && React.createElement(DevTools, null)));
};
addons.register(ADDON_ID, api => {
    const render = ({ active }) => React.createElement(DevToolPanel, { api: api, active: active });
    const title = 'React Devtool';
    addons.add(PANEL_ID, {
        type: types.PANEL,
        title,
        render,
    });
});
