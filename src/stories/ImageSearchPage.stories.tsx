import { ComponentStory, ComponentMeta } from '@storybook/react'

import ImageSearchPage from '../ImageSearchPage'

export default {
  title: 'Image search page',
  component: ImageSearchPage,
  argTypes: {},
} as ComponentMeta<typeof ImageSearchPage>

const Template: ComponentStory<typeof ImageSearchPage> = () => (
  <ImageSearchPage />
)

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
}
