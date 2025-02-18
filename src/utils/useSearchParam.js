import { useSearchParams } from 'react-router-dom'

// This is an analog of `useSearchParam` from `react-use`, but it doesn't trigger a rerender if we return to the old URL
export function useSearchParam(param) {
  const [searchParams] = useSearchParams()
  return searchParams.get(param) ?? undefined
}
