export interface EntityQueryParams {
  filtersValues?: Record<string, string | null>;
  sortBy?: string | null;
  sortDirection?: -1 | 1;
  page?: number;
  size?: number;
}
