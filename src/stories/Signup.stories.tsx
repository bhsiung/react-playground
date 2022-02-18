import { SignUp } from '../SignIn'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
  title: 'SignIn/SignUp',
  component: SignUp,
} as ComponentMeta<typeof SignUp>
const Template: ComponentStory<typeof SignUp> = (args) => <SignUp {...args} />

export const Default = Template.bind({})
Default.args = {}
