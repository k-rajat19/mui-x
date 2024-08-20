import * as React from 'react';
import { GridPrivateApiCommon } from '../../../models/api/gridApiCommon';
import { GridStrategyProcessorName, GridStrategyProcessor } from './gridStrategyProcessingApi';

export const useGridRegisterStrategyProcessor = <
  Api extends GridPrivateApiCommon,
  G extends GridStrategyProcessorName,
>(
  apiRef: React.MutableRefObject<Api>,
  strategyName: string,
  group: G,
  processor: GridStrategyProcessor<G>,
) => {
  const registerPreProcessor = React.useCallback(() => {
    apiRef.current.registerStrategyProcessor(strategyName, group, processor);
  }, [apiRef, processor, group, strategyName]);

  React.useEffect(() => {
      registerPreProcessor();
  }, [registerPreProcessor]);
};
