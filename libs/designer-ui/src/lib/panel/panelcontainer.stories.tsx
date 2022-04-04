import { About } from '../about';
import { MenuItemType } from '../card/types';
import type { PanelContainerProps } from './panelcontainer';
import { PanelContainer } from './panelcontainer';
import { PanelHeaderControlType } from './panelheader/panelheader';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

export default {
  component: PanelContainer,
  title: 'Components/Panel',
} as ComponentMeta<typeof PanelContainer>;
export const Container: ComponentStory<typeof PanelContainer> = (args: PanelContainerProps) => <PanelContainer {...args} />;

const aboutProps = {
  connectorDisplayName: 'Node Name',
  description: 'This is a description ',
  descriptionDocumentation: { url: 'www.microsoft.com', description: 'more info' },
  headerIcons: [
    { title: 'Tag1', badgeText: 'test' },
    { title: 'Tag2', badgeText: 'more' },
  ],
};
const panelHeaderMenu = [
  {
    disabled: false,
    type: MenuItemType.Advanced,
    disabledReason: 'Not Disabled',
    iconName: 'Comment',
    key: 'Comment',
    title: 'Add Comment',
  },
  {
    key: 'Delete',
    disabled: false,
    disabledReason: 'Not Disabled',
    iconName: 'Delete',
    title: 'Delete',
    type: MenuItemType.Advanced,
  },
];

Container.args = {
  cardIcon: 'https://connectoricons-prod.azureedge.net/releases/v1.0.1550/1.0.1550.2686/azureblob/icon.png',
  comment: 'This is a test commment',
  isRight: true,
  isCollapsed: false,
  noNodeSelected: false,
  panelHeaderControlType: PanelHeaderControlType.MENU,
  panelHeaderMenu: panelHeaderMenu,
  showCommentBox: true,
  selectedTab: 'About',
  tabs: { About: { name: 'About', title: 'About', order: 0, content: <About {...aboutProps} /> } },
  width: '630px',
  title: 'Panel',
};