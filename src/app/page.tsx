"use client";
import Card from "@/components/Card";
import CardSkeleton from "@/components/Card/skeleton";
import Input from "@/components/Input";
import AddProductForm from "@/components/ProductForm/AddProduct";
import EditProductForm from "@/components/ProductForm/EditProduct";
import { ProductsProps, useProductsProvider } from "@/context/ProductContext";
import {
  AlertCircle,
  ArrowUpDown,
  LoaderCircle,
  PackageOpen,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const { products, setProducts } = useProductsProvider();

  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductsProps>();

  const [filterSearch, setFilterSearch] = useState<string>("");
  const [sort, setSort] = useState<
    "price_asc" | "price_desc" | "stock_asc" | "stock_desc" | null
  >(null);
  const [sortModal, setSortModal] = useState<boolean>(false);
  const [productsList, setProductsList] = useState<ProductsProps[]>([]);

  const handleAddProducts = () => {
    // const productsList = [...products];
    // productsList.push({
    //   name: "Nike Air Force 1 LE",
    //   price: 195000,
    //   image: "/images/images.jpeg",
    //   stock: 3,
    // });
    // setProducts(productsList);
    setAddModal(true);
  };

  const handleEditProducts = (product: ProductsProps) => {
    setSelectedProduct(product);
    setEditModal(true);
  };

  const handleDeleteProducts = () => {
    const deletedIndex = products.findIndex((product) => {
      return product.id === selectedProduct?.id;
    });
    setLoadingDelete(true);
    setTimeout(() => {
      products.splice(deletedIndex, 1);
      setProducts(products);
      setLoadingDelete(false);
      setDeleteModal(false);
    }, 3000);
  };

  const handleSearchProduct = (filter: string) => {
    if (filter.length > 0) {
      const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(filter.toLowerCase());
      });
      setProductsList(filteredProducts);
    } else {
      setProductsList(products);
    }
  };

  const handleSortProducts = () => {
    const temp = [...productsList];

    switch (sort) {
      case "price_asc":
        temp.sort((a, b) => a.price - b.price);
        setProductsList(temp);
        break;
      case "price_desc":
        temp.sort((a, b) => b.price - a.price);
        setProductsList(temp);
        break;
      case "stock_asc":
        temp.sort((a, b) => a.stock - b.stock);
        setProductsList(temp);
        break;
      case "stock_desc":
        temp.sort((a, b) => b.stock - a.stock);
        setProductsList(temp);
        break;
      default:
        setProductsList(
          products.filter((product) =>
            product.name.toLowerCase().includes(filterSearch.toLowerCase())
          )
        );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (products) {
      setProductsList(products);
    }
  }, [products]);

  useEffect(() => {
    handleSearchProduct(filterSearch);
  }, [filterSearch]);

  useEffect(() => {
    handleSortProducts();
    // switch (sort) {
    //   case "price_asc":
    //     productsList.sort((a, b) => a.price - b.price);
    //     break;
    //   case "price_desc":
    //     productsList.sort((a, b) => b.price - a.price);
    //     break;
    //   case "stock_asc":
    //     productsList.sort((a, b) => a.stock - b.stock);
    //     break;
    //   case "stock_desc":
    //     productsList.sort((a, b) => b.stock - a.stock);
    //     break;
    //   default:
    //     setProductsList(
    //       products.filter((product) =>
    //         product.name.toLowerCase().includes(filterSearch.toLowerCase())
    //       )
    //     );
    // }
  }, [sort]);

  return (
    <div className="p-4 pb-28 md:p-8 md:pb-8">
      <div className="flex flex-col md:items-center justify-between md:flex-row gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-base mt-1">List of products available</p>
        </div>

        <div className="hidden md:flex">
          <button
            onClick={handleAddProducts}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 md:hover:bg-blue-700 active:bg-blue-700 transition-all duration-150 w-full md:w-fit  "
          >
            <Plus />
            Add Product
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Input
          onChange={(e) => {
            setFilterSearch(e.target.value);
          }}
          groupClassname="w-full"
          placeholder="Search Products"
        />

        <button
          onClick={() => {
            setSortModal(true);
          }}
          className={`outline rounded-lg flex items-center px-2 py-2 w-fit ${
            sort === null
              ? "text-neutral-400 outline-neutral-300 "
              : "text-blue-600 outline-blue-600"
          } md:hidden`}
        >
          <ArrowUpDown />
        </button>
        <select
          onChange={(e) => {
            if (e.target.value === "") {
              setSort(null);
            } else {
              setSort(e.target.value as typeof sort);
            }
          }}
          value={sort ?? ""}
          className="hidden md:flex py-2 px-3 outline outline-neutral-300 rounded-lg"
        >
          <option value="">Sort By (default)</option>
          <option value="price_asc">Price Low to High</option>
          <option value="price_desc">Price High to Low</option>
          <option value="stock_asc">Stock Low to High</option>
          <option value="stock_desc">Stock High to Low</option>
        </select>
      </div>
      <div className="fixed md:hidden bottom-24 right-6">
        <button
          onClick={handleAddProducts}
          className="bg-blue-600 text-white rounded-[100%] p-4 drop-shadow-md active:bg-blue-700 md:hover:bg-blue-700 transition-all duration-150"
        >
          <Plus />
        </button>
      </div>
      {loading ? (
        <div className="grid grid-cols-6 gap-6 w-full mt-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : productsList.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 w-full">
          {productsList.map((product, index) => (
            <Card
              key={index}
              onClick={() => handleEditProducts(product)}
              onDelete={() => {
                setSelectedProduct(product);
                setDeleteModal(true);
              }}
              name={product.name}
              image={product.image}
              stock={product.stock}
              price={product.price}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-neutral-400">
          <PackageOpen className="size-20" />
          <p className="mt-4 text-2xl">No products available</p>
        </div>
      )}
      {addModal && (
        <AddProductForm open={addModal} onClose={() => setAddModal(false)} />
      )}
      {editModal && (
        <EditProductForm
          open={editModal}
          onClose={() => {
            setEditModal(false);
          }}
          products={selectedProduct!}
        />
      )}
      {deleteModal && (
        <div
          onClick={() => {
            setDeleteModal(false);
          }}
          className="fixed top-0 left-0 bg-black/20 backdrop-blur-sm min-h-screen flex flex-col items-center justify-end w-screen md:justify-center z-50"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-white rounded-lg p-6 w-full flex flex-col items-center justify-center text-center md:max-w-96  "
          >
            <AlertCircle className="size-20 text-black fill-red-500 outline-black" />
            <p className="text-2xl font-bold mt-4">Delete this product?</p>
            <p className="mt-1">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selectedProduct?.name}</span>?
            </p>
            <div className="flex items-center gap-6 w-full mt-4">
              <button
                onClick={() => {
                  handleDeleteProducts();
                }}
                disabled={loadingDelete}
                className="w-full flex items-center justify-center text-red-500 outline outline-red-500 rounded-lg px-3 py-2 font-medium active:bg-red-100 md:hover:bg-red-100"
              >
                {loadingDelete ? (
                  <LoaderCircle className="size-6 animate-spin" />
                ) : (
                  <>Yes, Delete</>
                )}
              </button>
              <button
                onClick={() => {
                  setDeleteModal(false);
                }}
                disabled={loadingDelete}
                className="w-full flex items-center justify-center text-neutral-500 outline outline-neutral-500 rounded-lg px-3 py-2 font-medium active:bg-neutral-100 md:hover:bg-neutral-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {sortModal && (
        <div className="fixed top-0 left-0 bg-black/20 backdrop-blur-sm min-h-screen flex flex-col items-center justify-end w-screen z-50">
          <div className="bg-white rounded-lg p-6 w-full flex flex-col items-start justify-center">
            {/* <AlertCircle className="size-20 text-black fill-red-500 outline-black" /> */}
            <p className="text-2xl font-bold mt-4">Sort List</p>
            <div className="w-full">
              <div className="flex items-center justify-between w-full mt-4">
                <label htmlFor="price_asc">Price Low To High </label>
                <input
                  onChange={() => {
                    setSort("price_asc");
                  }}
                  checked={sort === "price_asc"}
                  id="price_asc"
                  value="price_asc"
                  type="radio"
                />
              </div>
              <div className="flex items-center justify-between w-full mt-4">
                <label htmlFor="price_desc">Price High To Low</label>
                <input
                  onChange={() => {
                    setSort("price_desc");
                  }}
                  checked={sort === "price_desc"}
                  id="price_desc"
                  value="price_desc"
                  type="radio"
                />
              </div>
              <div className="flex items-center justify-between w-full mt-4">
                <label htmlFor="stock_asc">Stock Low To High</label>
                <input
                  onChange={() => {
                    setSort("stock_asc");
                  }}
                  checked={sort === "stock_asc"}
                  id="stock_asc"
                  value="stock_asc"
                  type="radio"
                />
              </div>
              <div className="flex items-center justify-between w-full mt-4">
                <label htmlFor="stock_desc">Stock High to Low</label>
                <input
                  onChange={() => {
                    setSort("stock_desc");
                  }}
                  checked={sort === "stock_desc"}
                  id="stock_desc"
                  value="stock_desc"
                  type="radio"
                />
              </div>
            </div>
            <div className="flex items-center gap-6 w-full mt-4">
              <button
                onClick={() => {
                  setSortModal(false);
                }}
                disabled={loadingDelete}
                className="w-full flex items-center justify-center text-red-500 outline outline-red-500 rounded-lg px-3 py-2 font-medium active:bg-red-100 md:hover:bg-red-100"
              >
                Sort List
              </button>
              <button
                onClick={() => {
                  setSortModal(false);
                  setSort(null);
                }}
                disabled={loadingDelete}
                className="w-full flex items-center justify-center text-neutral-500 outline outline-neutral-500 rounded-lg px-3 py-2 font-medium active:bg-neutral-100 md:hover:bg-neutral-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
