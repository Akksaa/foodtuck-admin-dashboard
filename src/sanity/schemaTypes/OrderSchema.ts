import { defineType, defineField } from 'sanity'

export const OrderSchema =  defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    defineField({
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'customerId',
      title: 'Customer ID',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Processing', value: 'processing' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'product',
            title: 'Product',
            type: 'reference',
            to: [{ type: 'foodProduct' }],
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'quantity',
            title: 'Quantity',
            type: 'number',
            validation: Rule => Rule.required().min(1)
          }),
          defineField({
            name: 'unitPrice',
            title: 'Unit Price',
            type: 'number',
            validation: Rule => Rule.required().min(0)
          })
        ]
      }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'shippingInfo',
      title: 'Shipping Info',
      type: 'reference',
      to: [{ type: 'shipmentInfo' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paymentDetails',
      title: 'Payment Details',
      type: 'object',
      fields: [
        defineField({
          name: 'status',
          title: 'Payment Status',
          type: 'string',
          options: {
            list: [
              { title: 'Pending', value: 'pending' },
              { title: 'Completed', value: 'completed' },
              { title: 'Failed', value: 'failed' },
              { title: 'Refunded', value: 'refunded' }
            ]
          }
        }),
        defineField({
          name: 'totalAmount',
          title: 'Total Amount',
          type: 'number',
          validation: Rule => Rule.required().min(0)
        })
      ]
    }),
  ]
})