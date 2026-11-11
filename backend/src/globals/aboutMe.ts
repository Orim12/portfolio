import { GlobalConfig } from 'payload'

export const AboutMe: GlobalConfig = {
  slug: 'about-me',
  label: 'About Me',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroDescription',
      type: 'textarea',
      label: 'Hero description',
      required: true,
    },
    {
      name: 'rotatingSkills',
      type: 'array',
      label: 'Rotating skills',
      fields: [
        {
          name: 'skill',
          type: 'text',
          label: 'Skill',
          required: true,
        },
      ],
    },
    {
      name: 'aboutTitle',
      type: 'text',
      label: 'About title',
      required: true,
    },
    {
      name: 'aboutParagraphOne',
      type: 'textarea',
      label: 'About paragraph one',
      required: true,
    },
    {
      name: 'aboutParagraphTwo',
      type: 'textarea',
      label: 'About paragraph two',
      required: true,
    },
    {
      name: 'servicesTitle',
      type: 'text',
      label: 'Services title',
      required: true,
    },
    {
      name: 'services',
      type: 'array',
      label: 'services',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'logo',
        },
        {
          name: 'title',
          type: 'text',
          label: 'title',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
          required: true,
        },
      ],
    },
    // {
    //   name: 'webDevelopmentTitle',
    //   type: 'text',
    //   label: 'Web development title',
    //   required: true,
    // },
    // {
    //   name: 'webDevelopmentDescription',
    //   type: 'textarea',
    //   label: 'Web development description',
    //   required: true,
    // },
    // {
    //   name: 'gameDevelopmentTitle',
    //   type: 'text',
    //   label: 'Game development title',
    //   required: true,
    // },
    // {
    //   name: 'gameDevelopmentDescription',
    //   type: 'textarea',
    //   label: 'Game development description',
    //   required: true,
    // },
  ],
}

// Portfolio tips:
// * translate to English
// * show your projects more prominently, on the landing page preferably
// * demonstrate your proficiency by showing your work. Try to make it visual wherever possible/relevant.
// * provide context. Help the visitor understand your process.
