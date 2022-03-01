import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import reducers, { namespace } from './states';

import WorkerHand from './components/worker-hand/worker-hand.container';
import { ColumnDefinition } from "@twilio/flex-ui";

const PLUGIN_NAME = 'RaiseHandPlugin';

export default class RaiseHandPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   * @param manager { Flex.Manager }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    this.registerReducers(manager);

    const options: Flex.ContentFragmentProps = { sortOrder: -1 };
    

    flex.MainHeader.Content.add(<WorkerHand key="worker-hand" worker={manager.workerClient} syncClient={manager.insightsClient} />, {
      sortOrder: -1,
      align: 'end'
    });

    flex.WorkersDataTable.Content.add(<ColumnDefinition key="agent-hand-custom" header={""} content={item => <WorkerHand key={`worker-${item.worker.sid}-hand`} worker={item.worker} syncClient={manager.insightsClient} />}/>, {sortOrder:0});
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  private registerReducers(manager: Flex.Manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${Flex.VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
