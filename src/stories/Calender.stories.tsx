import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CalenderFormat, CalenderGrid, CalenderGridProps } from '../Calender'

export default {
  title: 'Calender/CalenderGrid',
  component: CalenderGrid,
} as ComponentMeta<typeof CalenderGrid>

const Template: ComponentStory<typeof CalenderGrid> = (
  args: CalenderGridProps
) => <CalenderGrid {...args} />

export const ThisWeek = Template.bind({})
ThisWeek.args = {
  start: new Date(),
  events: [],
  type: CalenderFormat.weekly,
}

export const Someday = Template.bind({})
Someday.args = {
  start: new Date('1983/09/12'),
  events: [
    {
      name: 'foo1',
      start: new Date('1983/09/13 13:00'),
      end: new Date('1983/09/13 15:00'),
    },
    {
      name: 'foo2',
      start: new Date('1983/09/13 9:00'),
      end: new Date('1983/09/13 10:00'),
    },
  ],
  type: CalenderFormat.weekly,
}

export const oneDay = Template.bind({})
oneDay.args = {
  start: new Date('1983-09-11T07:00:00.000Z'),
  events: [],
  type: CalenderFormat.daily,
}
export const SomeMonth = Template.bind({})
SomeMonth.args = {
  start: new Date('1983/09/12'),
  events: [],
  type: CalenderFormat.monthly,
}
