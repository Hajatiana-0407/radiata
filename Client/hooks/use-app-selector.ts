import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = (selector) => useSelector((state: RootState) => selector(state));
