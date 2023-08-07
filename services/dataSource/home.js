import { getPromise } from '../../common/apiPromise';

export const getNavigation = async () => {
  return await getPromise('MyHome/GetNavigation', null);
}