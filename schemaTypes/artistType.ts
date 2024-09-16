import {defineField, defineType} from 'sanity'

export const artistType = defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule.required().error('This field is required.'),
      hidden: ({document}) => !document?.name,
    }),
  ],
})
