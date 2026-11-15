import { act, renderHook } from '@testing-library/react';
import useFetch from './useFetch';

const deferred = () => {
  let resolve;
  const promise = new Promise((r) => {
    resolve = r;
  });
  return { promise, resolve };
};

it('ignores a slow response of a previous request (stale data)', async () => {
  const first = deferred();
  const second = deferred();
  const fetchFirst = () => first.promise;
  const fetchSecond = () => second.promise;

  const { result, rerender } = renderHook(({ fn }) => useFetch(fn), {
    initialProps: { fn: fetchFirst },
  });
  rerender({ fn: fetchSecond });

  await act(async () => second.resolve('new'));
  expect(result.current.data).toBe('new');

  // The older request finishes last; it must not overwrite the newer data.
  await act(async () => first.resolve('old'));
  expect(result.current.data).toBe('new');
  expect(result.current.loading).toBe(false);
});
