import { SingleProduct } from "../shared/single-product.dto";

export class ListProductsResponse
{
    readonly products: SingleProduct[];
    readonly count:    number

    constructor(listProductsResponseItem: SingleProduct[])
    {
        this.products = listProductsResponseItem;
        this.count    = listProductsResponseItem.length;
    }
}
