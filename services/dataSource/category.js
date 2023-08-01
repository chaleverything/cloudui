import { getPromise } from '../../common/apiPromise';

export const getAllCategorys = async () => {
  return await getPromise('Categorys/GetAllCategorys', null);
}