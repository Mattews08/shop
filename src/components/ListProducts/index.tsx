import { useCallback, useEffect, useState } from "react";
import { api } from "../../service/api";
import "./style.css";

interface AllInforApi {
  products: AllProducts[];
  limit: number;
  total: number;
}

interface AllProducts {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  discountPercentage: number;
}

export const ListProducts = () => {
  const [infoApi, setInfoProducts] = useState<AllInforApi>();
  const [products, setProducts] = useState<AllProducts[]>();

  const getInfoApi = useCallback(async () => {
    const response = await api.get("/products");
    setInfoProducts(response.data);
  }, []);

  useEffect(() => {
    const allProducts = infoApi?.products;
    setProducts(allProducts);
  }, [infoApi?.products]);

  useEffect(() => {
    getInfoApi();
  }, [getInfoApi]);

  return (
    <div className="container-products">
      {products?.map((product) => (
        <div key={product.id} className="product">
          <img
            src={product.thumbnail}
            alt={product.title}
            width={80}
            height={80}
          />
          <p className="product-title">{product.title}</p>
          <p className="price">R$ {product.price}</p>
          <p className="discount">desconto R$ {product.discountPercentage / 1}</p>

          <button className="view-product">Ver produto</button>
          <button className="add-cart">Adicionar no carrinho</button>
        </div>
      ))}
    </div>
  );
};
