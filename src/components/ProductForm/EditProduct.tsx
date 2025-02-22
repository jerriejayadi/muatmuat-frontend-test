"use client";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ImagePlus, LoaderCircle, X } from "lucide-react";
import { ProductsProps, useProductsProvider } from "@/context/ProductContext";
import { randomImage } from "@/lib/utils";
import Input from "../Input";
import * as Yup from "yup";

interface EditProductFormProps {
  open?: boolean;
  onClose: () => void;
  products: ProductsProps;
}

interface FormProps {
  id: string;
  name: string;
  price: string;
  image: string;
  stock: number;
}

export default function EditProductForm({
  products,
  onClose,
}: EditProductFormProps) {
  const { products: productsList, setProducts } = useProductsProvider();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<FormProps>({
    id: "",
    name: "",
    price: "",
    image: "",
    stock: 0,
  });

  const validationSchema = Yup.object({
    image: Yup.string().required("Image is required"),
    name: Yup.string().required("Product name is required"),
    price: Yup.string().required("Price is required"),
    stock: Yup.number().required("Stock is required"),
  });

  const formik = useFormik<FormProps>({
    initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
  });

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(URL.createObjectURL(e.target.files[0]));
      formik.setFieldValue("image", URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (values: FormProps) => {
    const selectedImage = randomImage();
    const payload = {
      ...values,
      image: selectedImage,
      price: Number(values.price.replaceAll(",", "")),
    };
    const index = productsList.findIndex(
      (product) => product.id === products.id
    );
    productsList[index] = payload;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setProducts([...productsList]);
      onClose();
    }, 1000);
  };

  useEffect(() => {
    setInitialValues({
      id: products.id,
      name: products.name,
      price: products.price?.toString() ?? "",
      image: products.image,
      stock: products.stock,
    });
    setImage(products.image);
  }, [products]);
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-screen min-h-screen flex flex-col items-center justify-end md:justify-center bg-black/20 backdrop-blur-md py-6"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="p-6 bg-white rounded-lg md:max-w-[700px] overflow-auto max-h-[500px] md:max-h-[700px] w-full"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Edit Products</h1>
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-6 flex flex-col gap-6"
        >
          <div className="flex flex-col justify-center w-full">
            <p>Product Image</p>
            <label htmlFor="image" className="mx-auto mt-6">
              <input
                onChange={handleImage}
                type="file"
                id="image"
                className="hidden"
              />
              {image ? (
                <Image
                  alt="Product Image"
                  className="size-32 object-cover rounded-lg"
                  src={image}
                  width={1000}
                  height={1000}
                />
              ) : (
                <>
                  <div className="w-32 h-32 bg-neutral-200 rounded-lg flex flex-col items-center justify-center text-neutral-500">
                    <ImagePlus className="size-10 text-neutral-500" />
                  </div>
                  {formik.errors.image && formik.touched.image && (
                    <p className="text-red-500 mt-2">{formik.errors.image}</p>
                  )}
                </>
              )}
            </label>
          </div>
          <Input
            label="Product Name"
            errorMessage={
              formik.errors.name &&
              formik.touched.name && <>{formik.errors.name}</>
            }
            placeholder="Nike Air Force LE1"
            {...formik.getFieldProps("name")}
          />
          <Input
            startAdornment="Rp"
            label="Price"
            placeholder="0"
            errorMessage={
              formik.errors.price &&
              formik.touched.price && <>{formik.errors.price}</>
            }
            {...formik.getFieldProps("price")}
          />
          <Input
            label="Stock"
            type="number"
            min={0}
            placeholder="0"
            errorMessage={
              formik.errors.stock &&
              formik.touched.stock && <>{formik.errors.stock}</>
            }
            {...formik.getFieldProps("stock")}
          />
          <div className="flex items-center justify-end">
            <button
              disabled={loading || !formik.isValid}
              className="flex items-center justify-center bg-blue-600 md:hover:bg-blue-700 active:bg-blue-700 w-full md:w-fit text-white font-medium px-3 py-2 rounded-lg min-w-40 disabled:bg-neutral-300 hover:disabled:bg-neutral-300 active:disabled:bg-neutral-300"
            >
              {loading ? (
                <LoaderCircle className="animate-spin size-6" />
              ) : (
                <>Edit Product</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
