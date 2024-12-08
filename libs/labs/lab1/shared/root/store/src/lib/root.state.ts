import type {Tab} from '@is/labs/lab1/shared/root/types';

export interface RootState {
  activeTab: Tab;
  loading: boolean;
}
