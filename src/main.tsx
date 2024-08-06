import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import ReactDOM from 'react-dom/client'
import { store } from './redux/store'
import { onEnter, onArticlesEnter } from './redux/actions'
import { Provider, useSelector } from 'react-redux';
import { Article } from './redux/articles.reducer'

const rootRoute = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const error = useSelector(state => state.article.error)
  return (
    <>
      <Outlet />
      <p>{error}</p>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexComponent,
})

function IndexComponent() {
  const articles = useSelector(state => state.article.articles)
  return (
    <div className="p-2">
      <h3>Home</h3>
      <Link to="/articles" preload={false}>Go to Articles</Link>
      <ul>
        {articles.map((article: Article, index: number) => (
          <li key={index}>
            {article.title}
          </li>
        ))}
      </ul>
        
    </div>
  )
}

const articleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/articles',
  component: Articles,
  beforeLoad: onEnter(onArticlesEnter),
})

function Articles() {
  return (
    <div className="flex flex-col p-2">
      <h3>Articles</h3>
      <hr className="m-2" />
      <Link to="/">Go Home</Link>
      <Outlet />
    </div>
  )
}


const routeTree = rootRoute.addChildren([
  indexRoute,
  articleRoute
  // editor1Route.addChildren([editor2Route]),
])

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} context={{ store }}  />
    </Provider>
  )
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)

  root.render(<App />)
}
