
import { redirect } from '@tanstack/react-router'
import { getArticlesSlice } from './articles.reducer';
import { notFound } from '@tanstack/react-router';
export const actionWithLoader = (
  longPromiseCreatorOrPromise,
) => {
  return async (dispatch, getState): Promise<void> => {

    // try {
      // --------------- dispatch action --------------- //
      await longPromiseCreatorOrPromise(dispatch, getState ?? undefined);
    // } catch (error) {
    //   // clear success message first
    // }
    return Promise.resolve();
  };
};


export const onEnter = (onEnterAction) => async (routeParams) =>  {
  // get store from context (passed in RouterProvider)
  const { store } = routeParams.context;
  if (!store) return;
  await onEnterAction(routeParams)(store.dispatch, store.getState);
}

// export const onArticlesEnter = (routesParams) => {
//   return async (dispatch) => {
//     dispatch(getArticlesSlice([{ title: 'cool' }]))
//     // redirect({ to:  '/', throw: true })
//     notFound({ throw: true })

//   }
// }

export const onArticlesEnter = (routesParams) => {
  return actionWithLoader(async (dispatch) => {
    dispatch(getArticlesSlice([{ title: 'cool' }]))
    // redirect({ to:  '/', throw: true })
    notFound({ throw: true })

  })
}