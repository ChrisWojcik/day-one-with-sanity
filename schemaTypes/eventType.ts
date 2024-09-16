import {defineArrayMember, defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

import {DoorsOpenInput} from './components/DoorsOpenInput'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    {name: 'details', title: 'Details'},
    {name: 'editorial', title: 'Editorial'},
  ],
  fieldsets: [{name: 'dateInfo', title: 'Date Info'}],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: ['details', 'editorial'],
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'details',
      options: {source: 'name'},
      validation: (rule) => rule.required().error('This field is required.'),
      hidden: ({document}) => !document?.name,
    }),
    defineField({
      name: 'eventType',
      type: 'string',
      group: 'details',
      options: {
        list: [
          {title: 'In-person', value: 'in-person'},
          {title: 'Virtual', value: 'virtual'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'date',
      type: 'object',
      group: 'details',
      fieldset: 'dateInfo',
      fields: [
        defineField({
          name: 'startTime',
          type: 'datetime',
        }),
        defineField({
          name: 'endTime',
          type: 'datetime',
        }),
      ],
    }),
    defineField({
      name: 'doorsOpen',
      type: 'number',
      group: 'details',
      fieldset: 'dateInfo',
      description: 'Number of minutes before the start time for admission',
      initialValue: 60,
      components: {
        input: DoorsOpenInput,
      },
    }),
    defineField({
      name: 'venue',
      type: 'reference',
      to: [{type: 'venue'}],
      group: 'details',
      readOnly: ({value, document}) => !value && document?.eventType === 'virtual',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (value && context?.document?.eventType === 'virtual') {
            return 'Only in-person events can have a venue'
          }

          return true
        }),
    }),
    defineField({
      name: 'headline',
      title: 'Headline Artist',
      type: 'reference',
      to: [{type: 'artist'}],
      group: 'details',
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'editorial',
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{type: 'block'}],
      group: 'editorial',
    }),
    defineField({
      name: 'tickets',
      type: 'url',
      group: 'details',
    }),
    defineField({
      name: 'leadContainer',
      title: 'Lead Container',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'hero',
          type: 'hero',
        }),
        defineArrayMember({
          name: 'textAndAsset',
          type: 'textAndAsset',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      venue: 'venue.name',
      artist: 'headline.name',
      date: 'date',
      image: 'image',
    },
    prepare({name, venue, artist, date, image}) {
      const nameFormatted = name || 'Untitled event'
      const dateFormatted = date.startTime
        ? new Date(date.startTime).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })
        : 'No date'

      return {
        title: artist ? `${nameFormatted} (${artist})` : nameFormatted,
        subtitle: venue ? `${dateFormatted} at ${venue}` : dateFormatted,
        media: image || CalendarIcon,
      }
    },
  },
})
