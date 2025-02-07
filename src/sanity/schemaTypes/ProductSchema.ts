import { defineField, defineType } from 'sanity';

export const foodProductSchema = defineType({
  name: 'foodProduct',
  title: 'Food Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(50),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'description',
        title: 'Description',
        type: 'array',
        of: [{ type: 'block' }],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).precision(2),
    }),
    defineField({
      name: 'discountPrice',
      title: 'Discount Price',
      type: 'number',
      description: 'The discounted price of the product, if applicable.',
      validation: (Rule) =>
        Rule.min(0)
          .precision(2)
          .custom((discountPrice, context) => {
            const document = context.document as { price?: number }; // Cast the document
            if (discountPrice && document.price && discountPrice >= document.price) {
              return 'Discount price should be less than the original price.';
            }
            return true;
        }),
    }),
    defineField({
      name: 'isDiscounted',
      title: 'Is Discounted?',
      type: 'boolean',
      description: 'Indicates if the product has a discount applied.',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string'
    }),
    defineField({
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [
          {
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        ],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Tags for categorization (e.g., Best Seller, Popular, New)',
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'inventory',
      title: 'Inventory',
      type: 'number',
    }),
    defineField({
      name: 'nutritionalInfo',
      title: 'Nutritional Information',
      type: 'object',
      fields: [
        defineField({ name: 'calories', title: 'Calories', type: 'number' }),
        defineField({ name: 'protein', title: 'Protein (g)', type: 'number' }),
        defineField({ name: 'fat', title: 'Fat (g)', type: 'number' }),
        defineField({ name: 'carbs', title: 'Carbohydrates (g)', type: 'number' }),
      ],
    }),
    defineField({
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
