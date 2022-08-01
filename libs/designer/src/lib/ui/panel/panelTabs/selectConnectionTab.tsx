import constants from '../../../common/constants';
import { useConnectionsForConnector } from '../../../core/queries/connections';
import { useConnectorByNodeId } from '../../../core/state/connection/connectionSelector';
import { changeConnectionMapping } from '../../../core/state/connection/connectionSlice';
import { isolateTab, selectPanelTab, showDefaultTabs } from '../../../core/state/panel/panelSlice';
import { useNodeConnectionId } from '../../../core/state/selectors/actionMetadataSelector';
import type { RootState } from '../../../core/store';
import type { Connection } from '@microsoft-logic-apps/utils';
import type { PanelTab } from '@microsoft/designer-ui';
import { SelectConnection } from '@microsoft/designer-ui';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const SelectConnectionTab = () => {
  const dispatch = useDispatch();

  const selectedNodeId = useSelector((state: RootState) => state.panel.selectedNode);
  const currentConnectionId = useNodeConnectionId(selectedNodeId);

  const hideConnectionTabs = useCallback(() => {
    dispatch(showDefaultTabs());
    dispatch(selectPanelTab(constants.PANEL_TAB_NAMES.PARAMETERS));
  }, [dispatch]);

  const createConnectionCallback = useCallback(() => {
    dispatch(isolateTab(constants.PANEL_TAB_NAMES.CONNECTION_CREATE));
  }, [dispatch]);

  const connector = useConnectorByNodeId(selectedNodeId);
  const connectionQuery = useConnectionsForConnector(connector?.id ?? '');
  const connections = useMemo(() => connectionQuery.data ?? [], [connectionQuery]);

  useEffect(() => {
    if (connections.length === 0) createConnectionCallback();
  }, [connections, createConnectionCallback]);

  const saveSelectionCallback = useCallback(
    (connection?: Connection) => {
      if (!connection) return;
      dispatch(changeConnectionMapping({ nodeId: selectedNodeId, connectionId: connection?.id }));
      hideConnectionTabs();
    },
    [dispatch, selectedNodeId, hideConnectionTabs]
  );

  const cancelSelectionCallback = useCallback(() => {
    hideConnectionTabs();
  }, [hideConnectionTabs]);

  return (
    <SelectConnection
      connections={connections}
      currentConnectionId={currentConnectionId}
      saveSelectionCallback={saveSelectionCallback}
      cancelSelectionCallback={cancelSelectionCallback}
      createConnectionCallback={createConnectionCallback}
    />
  );
};

export const selectConnectionTab: PanelTab = {
  title: 'Select Connection',
  name: constants.PANEL_TAB_NAMES.CONNECTION_SELECTOR,
  description: 'Select Connection Tab',
  visible: true,
  content: <SelectConnectionTab />,
  order: 0,
};