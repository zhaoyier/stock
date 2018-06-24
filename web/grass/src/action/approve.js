import { createAction, createSyncAction } from 'redux-action'
import * as api from '../api/approve'

export const PRODUCT_LIST_PUBLIC = 'PRODUCT_LIST_PUBLIC'

export const productListPublic = createAction(PRODUCT_LIST_PUBLIC,api.productListPublic)