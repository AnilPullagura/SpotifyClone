import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import PlaylistsDetails from './components/PlaylistsDetails'
import CategoryPlaylistsDetails from './components/CategoryPlaylistsDetails'
import AlbumDetails from './components/AlbumDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/playlist/:id" component={PlaylistsDetails} />
      <ProtectedRoute
        exact
        path="/category/:id/playlists"
        component={CategoryPlaylistsDetails}
      />
      <Route exact path="/album/:id" component={AlbumDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)
export default App
