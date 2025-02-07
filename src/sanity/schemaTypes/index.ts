import { type SchemaTypeDefinition } from 'sanity'
import { OrderSchema } from './OrderSchema'
import { ShipmentInfo } from './ShipmentInfoSchema'
import { foodProductSchema } from './ProductSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [OrderSchema, ShipmentInfo, foodProductSchema],
}
