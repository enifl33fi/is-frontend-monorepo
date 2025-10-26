import type {Product, TableProduct} from '@is/labs/lab1/shared/product/types';

export function convertProductToTableProduct(product: Product): TableProduct {
  return {
    id: product.id,
    hasAccess: product.hasAccess,
    coordinatesId: product.coordinates.id,
    manufacturerId: product.manufacturer?.id ?? null,
    ownerId: product.owner?.id ?? null,
    name: product.name,
    unitOfMeasure: product.unitOfMeasure,
    price: product.price,
    manufactureCost: product.manufactureCost,
    rating: product.rating,
    creationDate: product.creationDate,
  };
}
