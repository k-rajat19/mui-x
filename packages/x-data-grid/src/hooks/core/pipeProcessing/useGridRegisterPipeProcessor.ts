import * as React from 'react';
import { GridPrivateApiCommon } from '../../../models/api/gridApiCommon';
import { GridPipeProcessorGroup, GridPipeProcessor } from './gridPipeProcessingApi';

export const useGridRegisterPipeProcessor = <
  PrivateApi extends GridPrivateApiCommon,
  G extends GridPipeProcessorGroup,
>(
  apiRef: React.MutableRefObject<PrivateApi>,
  group: G,
  callback: GridPipeProcessor<G>,
) => {
  const cleanup = React.useRef<(() => void) | null>();
  const id = React.useRef(`mui-${Math.round(Math.random() * 1e9)}`);

  const registerPreProcessor = React.useCallback(() => {
    cleanup.current = apiRef.current.registerPipeProcessor(group, id.current, callback);
  }, [apiRef, callback, group]);

  React.useEffect(() => {
   
      registerPreProcessor();

    return () => {
      if (cleanup.current) {
        cleanup.current();
        cleanup.current = null;
      }
    };
  }, [registerPreProcessor]);
};
