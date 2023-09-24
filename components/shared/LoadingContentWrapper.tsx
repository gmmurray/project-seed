import LoadingIndicator from './LoadingIndicator';
import MessageWrapper from './MessageWrapper';
import React from 'react';
import { resolveIfStringAndTruthy } from '../../lib/util/stringUtil';

type Props<TData> = {
  data: TData | undefined;
  noDataMessage: string;
  error: [unknown, string];
  loading: boolean;
  loadingComponent?: React.JSX.Element;
  renderContent: (data: TData) => React.JSX.Element;
};

export default function LoadingContentWrapper<TData>({
  data,
  noDataMessage,
  error: [error, defaultError],
  loading,
  loadingComponent,
  renderContent: renderChildren,
}: Props<TData>) {
  const visibleError = resolveIfStringAndTruthy(error, defaultError);
  if (loading) {
    return loadingComponent ?? <LoadingIndicator />;
  } else if (
    !data ||
    (Array.isArray(data) && data.length === 0) ||
    visibleError
  ) {
    return <MessageWrapper title={visibleError ?? noDataMessage} />;
  }

  return renderChildren(data);
}
