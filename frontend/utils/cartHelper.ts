import { useCartStore } from "../stores/CartStore";
import { CartItem } from "../types/CartItem";

interface BackendProductDetail {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  productColor: string;
}

export async function fetchAndUpdateCartDetails() {
  const { items, updateItemDetails } = useCartStore.getState();

  if (items.length === 0) {
    console.log("Cart is empty, skipping backend update.");
    return;
  }

  const itemIds = items.map((item) => item.id);

  try {
    const response = await fetch("/api/products/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productIds: itemIds }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const backendProductDetails: BackendProductDetail[] = await response.json();

    const productDetailsMap = new Map(
      backendProductDetails.map((product) => [product.id, product]),
    );

    let changesMade = false;
    items.forEach((cartItem) => {
      const backendDetail = productDetailsMap.get(cartItem.id);

      if (backendDetail) {
        const detailsToUpdate: Partial<Omit<CartItem, "id" | "quantity">> = {};
        if (cartItem.name !== backendDetail.name) {
          detailsToUpdate.name = backendDetail.name;
        }
        if (cartItem.price !== backendDetail.price) {
          detailsToUpdate.price = backendDetail.price;
        }
        if (cartItem.imageUrl !== backendDetail.imageUrl) {
          detailsToUpdate.imageUrl = backendDetail.imageUrl;
        }

        if (Object.keys(detailsToUpdate).length > 0) {
          updateItemDetails(cartItem.id, detailsToUpdate);
          changesMade = true;
          console.log(
            `Updated details for item ID: ${cartItem.id}`,
            detailsToUpdate,
          );
        }
      } else {
        console.warn(
          `Item ID: ${cartItem.id} found in cart but not in backend response. Consider removing it.`,
        );
      }
    });

    if (!changesMade) {
      console.log("No cart item details needed updating.");
    }
  } catch (error) {
    console.error("Failed to fetch and update cart details:", error);
  }
}
