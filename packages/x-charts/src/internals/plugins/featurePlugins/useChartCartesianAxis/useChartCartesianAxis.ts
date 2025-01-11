'use client';
import * as React from 'react';
import { ChartPlugin } from '../../models';
import { ChartSeriesType } from '../../../../models/seriesType/config';
import { UseChartCartesianAxisSignature } from './useChartCartesianAxis.types';
import { blueberryTwilightPalette } from '../../../../colorPalettes';
import { useSelector } from '../../../store/useSelector';
import { selectorChartDrawingArea } from '../../corePlugins/useChartDimensions/useChartDimensions.selectors';
import { selectorChartSeriesState } from '../../corePlugins/useChartSeries/useChartSeries.selectors';
import { defaultizeAxis } from './defaultizeAxis';

export const useChartCartesianAxis: ChartPlugin<
  UseChartCartesianAxisSignature<ChartSeriesType>
> = ({ params, store, seriesConfig }) => {
  const { xAxis, yAxis, dataset } = params;

  const drawingArea = useSelector(store, selectorChartDrawingArea);
  const formattedSeries = useSelector(store, selectorChartSeriesState);

  // The effect do not track any value defined synchronously during the 1st render by hooks called after `useChartCartesianAxis`
  // As a consequence, the state generated by the 1st run of this useEffect will always be equal to the initialization one
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    store.update((prev) => ({
      ...prev,
      cartesianAxis: {
        ...prev.cartesianAxis,
        x: defaultizeAxis(xAxis, dataset, 'x'),
        y: defaultizeAxis(yAxis, dataset, 'y'),
      },
    }));
  }, [seriesConfig, drawingArea, formattedSeries, xAxis, yAxis, dataset, store]);

  return {};
};

useChartCartesianAxis.params = {
  xAxis: true,
  yAxis: true,
  dataset: true,
};

useChartCartesianAxis.getDefaultizedParams = ({ params }) => {
  return {
    ...params,
    colors: params.colors ?? blueberryTwilightPalette,
    theme: params.theme ?? 'light',
    defaultizedXAxis: defaultizeAxis(params.xAxis, params.dataset, 'x'),
    defaultizedYAxis: defaultizeAxis(params.yAxis, params.dataset, 'y'),
  };
};

useChartCartesianAxis.getInitialState = (params) => ({
  cartesianAxis: {
    x: params.defaultizedXAxis,
    y: params.defaultizedYAxis,
  },
});