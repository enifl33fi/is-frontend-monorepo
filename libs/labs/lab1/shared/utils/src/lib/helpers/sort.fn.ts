import type {TableEntity} from '@is/labs/lab1/shared/types';
import type {TuiComparator} from '@taiga-ui/addon-table';
import {tuiDefaultSort} from '@taiga-ui/cdk';

export function sortFn(key: string, direction: -1 | 1): TuiComparator<TableEntity> {
  return (a, b) => direction * tuiDefaultSort(a[key], b[key]);
}
