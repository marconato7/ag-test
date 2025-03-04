import { Body                     } from "@nestjs/common"; 
import { Controller               } from "@nestjs/common"; 
import { NotFoundException        } from "@nestjs/common"; 
import { Delete                   } from "@nestjs/common";
import { Get                      } from "@nestjs/common";
import { Param                    } from "@nestjs/common";
import { Post                     } from "@nestjs/common";
import { Put                      } from "@nestjs/common";
import { Product                  } from "../entities/product.entity";
import { Repository               } from "typeorm";
import { CreateProductRequest     } from "./dtos/products/create-product/create-product-request.dto";
import { UpdateProductRequest     } from "./dtos/products/update-product/update-product-request.dto";
import { InjectRepository         } from "@nestjs/typeorm";
import { ListProductsResponse     } from "./dtos/products/list-products/list-products-response.dto";
import { SingleProduct            } from "./dtos/products/shared/single-product.dto";
import { Public                   } from "src/decorators/is-public.decorator";

@Controller()
export class ProductsController
{
    constructor(@InjectRepository(Product) private readonly _productRepository: Repository<Product>) {}

    @Post("produtos")
    async CreateProduct(@Body() request: CreateProductRequest) : Promise<SingleProduct>
    {
        const productToCreate = new Product
        (
            request.nome,
            request.quantidade,
            request.preco,
            request.codigo_barras
        );

        const createdProduct = await this._productRepository.save(productToCreate);

        return this.MapToSingleProduct(createdProduct);
    }

    @Public()
    @Get("produtos")
    async ListProducts(): Promise<ListProductsResponse>
    {
        const productsToList = await this._productRepository.find();

        return this.MapToListProductsResponse(productsToList);
    }

    @Public()
    @Get("produtos/:code")
    async GetProductByCode(@Param("code") code: string) : Promise<SingleProduct>
    {
        const filteredProduct = await this._productRepository.findOneBy({ code });
        if (filteredProduct == null)
        {
            throw new NotFoundException();
        }

        return this.MapToSingleProduct(filteredProduct);
    }

    @Put("produtos/:code")
    async UpdateProduct(@Param("code") code: string, @Body() request : UpdateProductRequest) : Promise<SingleProduct>
    {
        const productToUpdate = await this._productRepository.findOneBy({ code });
        if (productToUpdate == null)
        {
            throw new NotFoundException();
        }

        productToUpdate.Update
        (
            request.nome,
            request.codigo_barras,
            request.quantidade,
            request.preco,
        );

        this._productRepository.save(productToUpdate);

        return this.MapToSingleProduct(productToUpdate);
    }

    @Delete("produtos/:code")
    async RemoveProduct(@Param("code") code: string)
    {
        var productToDelete = await this._productRepository.findOneBy({ code });
        if (productToDelete == null)
        {
            throw new NotFoundException();
        }

        await this._productRepository.remove(productToDelete);
    }

    MapToSingleProduct(product: Product): SingleProduct
    {
        const singleProduct = new SingleProduct
        (
            product.code,
            product.name,
            product.quantity,
            product.price,
            product.bar_code,
        );

        return singleProduct;
    }

    MapToListProductsResponse(products: Product[]): ListProductsResponse
    {
        const listProductsResponse = new ListProductsResponse
        (
            products.map
            (
                product => new SingleProduct
                (
                    product.code,
                    product.name,
                    product.quantity,
                    product.price,
                    product.bar_code,
                )
            )
        );

        return listProductsResponse;
    }
}
