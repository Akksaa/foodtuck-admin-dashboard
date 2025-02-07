import { defineField, defineType } from "sanity";

export const ShipmentInfo = defineType({
    name:"shipmentInfo",
    title:"Shipment Info",
    type:"document",
    fields: [
        defineField({
            name:"userName",
            title:"Customer Name",
            type:"string",
            validation: Rule => Rule.required()
        }),
        defineField({
            name:"userId",
            title:"Customer ID",
            type:"string",
            validation: Rule => Rule.required()
        }),
        defineField({
            name:"userPhone",
            title:"Phone No.",
            type:"string",
            validation: Rule => Rule.required()
        }),
        defineField({
            name:"address",
            title:"Adress",
            type:"string",
            validation: Rule => Rule.required()
        }),
        defineField({
            name:"city",
            title:"City",
            type:"string",
            validation: Rule => Rule.required()
        }),
        defineField({
            name:"countryCode",
            title:"Country Code",
            type:"string",
            validation: Rule => Rule.required()
        }),
        defineField({
            name:"postalCode",
            title:"Postal code",
            type:"string",
            validation: Rule => Rule.required()
        }),
    ]
})