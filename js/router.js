import { createRouter } from '@exponent/ex-navigation';

import HomeScreen from './HomeScreen';
import UserScreen from './UserScreen';
import RepoScreen from './RepoScreen';

const router = createRouter(() => ({
  home: () => HomeScreen,
  user: () => UserScreen,
  repo: () => RepoScreen
}));

export default router;