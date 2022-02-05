import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ImageList } from '../ImageSearchPage'

export default {
  title: 'Image search page',
  component: ImageList,
} as ComponentMeta<typeof ImageList>

const Template: ComponentStory<typeof ImageList> = (args) => (
  <ImageList {...args} />
)

export const EmptyList = Template.bind({})
EmptyList.args = {
  images: [],
}

export const FullList = Template.bind({})
FullList.args = {
  images: [
    {
      title: 'orangae fruits',
      user: {
        bio: "Former photographer, now a professional woodworker. I'll be posting some work from the archives here fore you to use.\r\n\r\nCheers,\r\nSiebe",
        webLink: 'https://unsplash.com/@devetpan',
        image:
          'https://images.unsplash.com/profile-1547139394232-fcb4dcdddad3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
        name: 'Siebe Warmoeskerken',
      },
      webLink: 'https://unsplash.com/photos/6d2I8i-qqpQ',
      imageStyle: {
        backgroundImage:
          'url(https://images.unsplash.com/photo-1545472956-099c7a1a53a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyOTY0OTd8MHwxfHNlYXJjaHwxMXx8ZHxlbnwwfDJ8fHwxNjQzOTI3ODEy&ixlib=rb-1.2.1&q=80&w=400)',
        backgroundColor: '#f3f3d9',
      },
    },
    {
      title: 'black metal sconce lantern',
      user: {
        bio: "Former photographer, now a professional woodworker. I'll be posting some work from the archives here fore you to use.\r\n\r\nCheers,\r\nSiebe",
        webLink: 'https://unsplash.com/@devetpan',
        image:
          'https://images.unsplash.com/profile-1547139394232-fcb4dcdddad3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
        name: 'Siebe Warmoeskerken',
      },
      webLink: 'https://unsplash.com/photos/Lm6qga9-PEo',
      imageStyle: {
        backgroundImage:
          'url(https://images.unsplash.com/photo-1545472956-f56fa92553ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyOTY0OTd8MHwxfHNlYXJjaHwxMnx8ZHxlbnwwfDJ8fHwxNjQzOTI3ODEy&ixlib=rb-1.2.1&q=80&w=400)',
        backgroundColor: '#f3f3f3',
      },
    },
  ],
}
