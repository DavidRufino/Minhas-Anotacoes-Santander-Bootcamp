import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ListState } from './list.reducer';

export const selectListState = createFeatureSelector('list');

export const selectListEntities = createSelector(
  selectListState,
  (state: ListState) => state.entities,
);

export const selectListLoading = createSelector(
  selectListState,
  (state: ListState) => state.loading,
);

export const selectListLoadingMore = createSelector(
  selectListState,
  (state: ListState) => state.loadingMore,
);

export const selectListEerror = createSelector(
  selectListState,
  (state: ListState) => state.error,
);

export const selectListPage = createSelector(
  selectListState,
  (state: ListState) => state.page,
);

export const selectListCreating = createSelector(
  selectListState,
  (state: ListState) => state.creating,
);

export const selectListRemoving = createSelector(
  selectListState,
  (state: ListState) => state.removing,
);
