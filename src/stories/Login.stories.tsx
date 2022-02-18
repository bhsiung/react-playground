import { SignIn } from '../SignIn'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
  title: 'SignIn/SignIn',
  component: SignIn,
} as ComponentMeta<typeof SignIn>
const Template: ComponentStory<typeof SignIn> = () => <SignIn />

export const Default = Template.bind({})
Default.args = {}
