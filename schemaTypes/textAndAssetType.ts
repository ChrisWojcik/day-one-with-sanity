import {defineField, defineType} from 'sanity'

export const textAndAssetType = defineType({
  name: 'textAndAsset',
  type: 'object',
  title: 'Text And Asset',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal link',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Reference',
                    to: [{type: 'artist'}, {type: 'venue'}, {type: 'event'}],
                  },
                ],
              },
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                  {
                    title: 'Open in new tab',
                    name: 'openInNewTab',
                    type: 'boolean',
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
  ],
})
