"use client";

import React, { useState, useCallback } from "react";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronUp,
  ChevronDown,
  Search,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Pizza,
  Tag,
  DollarSign,
  UtensilsCrossed,
  ClipboardList,
  Image as ImageIcon,
  Eye,
  Info,
  List,
  Coins,
} from "lucide-react";

interface DescriptionItem {
  _key: string;
  value: string;
}

interface Images {
  _key: string;
  url: string;
  alt: string;
}

interface FoodProduct {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description: DescriptionItem[];
  price: number;
  discountPrice?: number;
  isDiscounted: boolean;
  category: string;
  ingredients: string[];
  nutritionalInfo: {
    calories: number; // Calories in the product
    protein: number; // Protein in grams
    fat: number;
    carbs: number;
  };
  images: Images[];
}

// interface SortConfig {
//   key: keyof FoodProduct | "slug.current";
//   direction: "asc" | "desc";
// }

interface FoodTableProps {
  products: FoodProduct[];
  onEdit?: (product: FoodProduct) => void;
  onDelete?: (productId: string) => void;
  onBulkDelete?: (productIds: string[]) => void;
}

const ITEMS_PER_PAGE = 5;

const FoodProductTable: React.FC<FoodTableProps> = ({
  products,
  onDelete,
  onBulkDelete,
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const sortData = useCallback((key: SortConfig["key"]) => {
  //   setSortConfig((prev) => ({
  //     key,
  //     direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
  //   }));
  // }, []);

  // const getSortedData = useCallback((): FoodProduct[] => {
  //   return [...filteredProducts].sort((a, b) => {
  //     let aValue = a[sortConfig.key as keyof FoodProduct];
  //     let bValue= b[sortConfig.key as keyof FoodProduct];

  //     if (sortConfig.key === "slug.current") {
  //       aValue = a.slug.current;
  //       bValue = b.slug.current;
  //     }
  //     if (aValue && bValue) {
  //       if (aValue < bValue) {
  //         return sortConfig.direction === "asc" ? -1 : 1;
  //       }
  //       if (aValue > bValue) {
  //         return sortConfig.direction === "asc" ? 1 : -1;
  //       }
  //       return 0;
  //     }
  //   });
  // }, [filteredProducts, sortConfig]);
  interface FoodProduct {
    slug: {
      current: string;
      [key: string]: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  interface SortConfig {
    key: string;
    direction: "asc" | "desc";
  }

  const sortProducts = (
    products: FoodProduct[],
    sortConfig: SortConfig
  ): FoodProduct[] => {
    return [...products].sort((a: FoodProduct, b: FoodProduct) => {
      const aValue =
        sortConfig.key === "slug.current" ? a.slug.current : a[sortConfig.key];

      const bValue =
        sortConfig.key === "slug.current" ? b.slug.current : b[sortConfig.key];

      if (aValue == null || bValue == null) return 0;

      const comparison =
        typeof aValue === "string"
          ? aValue.localeCompare(bValue.toString())
          : Number(aValue) - Number(bValue);

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  };

  const getSortedData = (
    products: FoodProduct[],
    sortConfig: SortConfig
  ): FoodProduct[] => {
    return sortProducts(products, sortConfig);
  };
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  );
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  // const paginatedData = getSortedData().slice(
  //   (safeCurrentPage - 1) * ITEMS_PER_PAGE,
  //   safeCurrentPage * ITEMS_PER_PAGE
  // );
  const paginatedData = getSortedData(filteredProducts, sortConfig).slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  );
  const sortData = useCallback((key: SortConfig["key"]) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectedProducts((prev) =>
      prev.length === paginatedData.length
        ? []
        : paginatedData.map((product) => product._id)
    );
  }, [paginatedData]);

  const toggleSelectProduct = useCallback((productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const handleBulkDelete = useCallback(() => {
    if (selectedProducts.length > 0 && onBulkDelete) {
      onBulkDelete(selectedProducts);
      setSelectedProducts([]);
    }
  }, [selectedProducts, onBulkDelete]);

  const SortIcon: React.FC<{ columnKey: SortConfig["key"] }> = ({
    columnKey,
  }) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp className="w-4 h-4 inline ml-1" />
      ) : (
        <ChevronDown className="w-4 h-4 inline ml-1" />
      );
    }
    return null;
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">No products found</div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search products..."
              className="pl-8 outline-none "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {selectedProducts.length > 0 && onBulkDelete && (
          <Button
            variant="outline"
            size="sm"
            className="text-red-600"
            onClick={handleBulkDelete}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Selected ({selectedProducts.length})
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedProducts.length === paginatedData.length}
                  onChange={toggleSelectAll}
                />
              </th>
              {[
                { key: "name" as const, icon: Pizza, label: "Name" },
                { key: "slug.current" as const, icon: Tag, label: "Slug" },
                { key: "price" as const, icon: DollarSign, label: "Price" },
                {
                  key: "category" as const,
                  icon: ImageIcon,
                  label: "Category",
                },
              ].map(({ key, icon: Icon, label }) => (
                <th
                  key={key}
                  className="p-4 text-left text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => sortData(key)}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-primYellow" />
                    <span>{label}</span>
                    <SortIcon columnKey={key} />
                  </div>
                </th>
              ))}
              <th className="p-4 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((product) => (
              <tr key={product._id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => toggleSelectProduct(product._id)}
                  />
                </td>
                <td className="p-4 text-sm text-gray-900">{product.name}</td>
                <td className="p-4 text-sm text-gray-500">
                  {product.slug.current}
                </td>
                <td className="p-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span
                      className={
                        product.isDiscounted ? "line-through text-gray-400" : ""
                      }
                    >
                      ${product.price}
                    </span>
                    {product.isDiscounted && product.discountPrice && (
                      <span className="text-green-600">
                        ${product.discountPrice}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-sm">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {product.category}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Eye className="w-4 h-4 mr-1 text-primYellow" />
                      </DialogTrigger>

                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Info className="w-5 h-5 text-primYellow" /> Product
                            Details
                          </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4 text-sm">
                          {/* Product Name */}
                          <div className="flex items-center gap-2">
                            <UtensilsCrossed className="w-4 h-4 text-primYellow" />
                            <span>
                              <strong>Name:</strong>{" "}
                              <span className="text-gray-800">
                                {product.name}
                              </span>
                            </span>
                          </div>

                          {/* Slug */}
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-primYellow" />
                            <span>
                              <strong>Slug:</strong>{" "}
                              <span className="text-gray-800">
                                {product.slug.current}
                              </span>
                            </span>
                          </div>

                          {/* Price */}
                          <div className="flex items-center gap-2">
                            <Coins className="w-4 h-4 text-primYellow" />
                            <span>
                              <strong>Price:</strong>{" "}
                              <span className="text-gray-800 space-x-2">
                                <span
                                  className={
                                    product.isDiscounted
                                      ? "line-through text-gray-400"
                                      : ""
                                  }
                                >
                                  ${product.price}
                                </span>
                                {product.isDiscounted &&
                                  product.discountPrice && (
                                    <span className="text-green-600">
                                      ${product.discountPrice}
                                    </span>
                                  )}
                              </span>
                            </span>
                          </div>

                          {/* Category */}
                          <div className="flex items-center gap-2">
                            <List className="w-4 h-4 text-primYellow" />
                            <span>
                              <strong>Category:</strong>{" "}
                              <span className="text-gray-800">
                                {product.category}
                              </span>
                            </span>
                          </div>

                          {/* Ingredients */}
                          <div className="flex items-center gap-2">
                            <UtensilsCrossed className="w-4 h-4 text-primYellow" />
                            <span className="text-gray-800">
                              <strong className="text-gray-950">
                                Ingredients:
                              </strong>{" "}
                              {product.ingredients.join(", ")}
                            </span>
                          </div>

                          {/* Nutritional Info */}
                          <div>
                            <strong className="flex items-center gap-2">
                              <ClipboardList className="w-4 h-4 text-primYellow" />{" "}
                              Nutritional Info
                            </strong>
                            <div className="grid grid-cols-2 text-gray-800 gap-3 text-xs bg-gray-100 p-3 rounded-md">
                              <span>
                                Calories: {product.nutritionalInfo.calories}
                              </span>
                              <span>
                                Protein: {product.nutritionalInfo.protein}g
                              </span>
                              <span>Fats: {product.nutritionalInfo.fat}g</span>
                              <span>
                                Carbs: {product.nutritionalInfo.carbs}g
                              </span>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => onDelete(product._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min(safeCurrentPage * ITEMS_PER_PAGE, filteredProducts.length)}{" "}
          of {filteredProducts.length} products
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodProductTable;
