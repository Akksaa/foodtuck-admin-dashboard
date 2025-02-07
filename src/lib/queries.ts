export const allProductsQuery = `*[ _type == "foodProduct"]{
    _id,
    name,
    slug,
    price,
    tags,
    inventory,
    "ingredients": ingredients[],
    nutritionalInfo,
    discountPrice,
    category,
    isDiscounted,
    "images": images[] { asset-> { _id, url } },
    description,
    
}`;

export const allOrdersQuery = `*[_type == "order" && shippingInfo != null && count(items) > 0 ] {
    orderId,
    _id,
    customerId,
    customerName,
    status,
    paymentDetails,
    orderDate,
    "shippingInfo": shippingInfo->{_id, userName, userPhone, userId, address, city, countryCode, postalCode},
    "items": items[]{
        _key,
        quantity,
        unitPrice,
        "product": product->{_id, name, category, price}
    }
}`;
