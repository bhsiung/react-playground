import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Tab } from './Tab'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Tab',
  component: Tab,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Tab>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tab> = (args) => <Tab {...args} />

export const Primary = Template.bind({})
Primary.args = {
  tabName: 'the sample tab 1',
  defaultTabIndex: 2,
  value: [
    {
      title: 'tab1',
      body: 'body1',
      disable: false,
    },
    {
      title: 'tab2',
      body: 'body2',
      disable: true,
    },
    {
      title: 'tab3',
      body: 'body3',
      disable: false,
    },
  ],
}

export const Secondary = Template.bind({})
Secondary.args = {
  tabName: 'the sample tab 2',
  value: [
    {
      title: (
        <>
          <b>the</b> tab1
        </>
      ),
      body: (
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id
          libero libero. Suspendisse ac congue est, ac sollicitudin dolor.
          Vivamus in tristique urna. Suspendisse elit enim, semper sit amet
          metus eu, rutrum elementum eros. Suspendisse nec augue blandit,
          dapibus enim eu, fringilla quam. Nam bibendum odio et tortor
          imperdiet, congue porttitor libero consequat. Vivamus finibus tempus
          elit, in tempor est dapibus id. Vestibulum vel lectus id ipsum viverra
          convallis a ac eros. Donec eleifend nisl libero, et fringilla mi
          commodo ut. Aenean ut cursus mauris, in accumsan sapien. Fusce
          ultricies metus quam, eget commodo erat elementum quis. Donec a luctus
          magna. Curabitur tristique est id vestibulum ultrices. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Mauris tempor augue
          a ante eleifend, ac vehicula erat lacinia. Suspendisse sit amet
          lobortis elit, aliquet dictum massa. Donec eget lorem ornare, maximus
          erat non, feugiat lacus. Aliquam eget vehicula velit. Vivamus volutpat
          luctus tellus a semper. Vivamus interdum aliquam urna ut ornare. Cras
          massa massa, posuere id lacinia egestas, ultrices pulvinar nunc.
          Mauris ipsum urna, pretium ac felis eu, feugiat fringilla felis.
          Aenean scelerisque elit et ipsum ultrices rhoncus. Proin mattis sem
          efficitur laoreet elementum. Pellentesque at aliquam metus, ut
          fermentum lectus. Maecenas a interdum lorem. Pellentesque ultricies
          bibendum pellentesque. Fusce sed velit nisi. Pellentesque habitant
          morbi tristique senectus et netus et malesuada fames ac turpis
          egestas. Mauris interdum sapien ut urna scelerisque, sed consectetur
          massa fringilla. Nunc pretium sit amet sem non condimentum. Nulla
          facilisi. Suspendisse pulvinar augue id justo fringilla ullamcorper.
          Vivamus non nibh sit amet arcu lacinia maximus. Nunc ultrices mauris
          dolor, id vulputate nisi blandit vitae. Proin hendrerit, ipsum a
          pellentesque tincidunt, tellus orci imperdiet est, in sodales nulla
          nunc scelerisque sem. Suspendisse lorem ex, egestas placerat mi ac,
          tempus imperdiet ipsum. Aenean pulvinar ullamcorper tristique. Fusce
          mattis enim fermentum, finibus ex vitae, aliquet augue. Aliquam erat
          volutpat. Cras nec velit egestas, consequat lectus sit amet,
          pellentesque leo. Fusce felis nisi, varius sit amet semper eu,
          fermentum in lacus. Nunc iaculis felis non efficitur aliquam. Duis id
          nunc convallis, faucibus erat eget, mattis orci. Aenean dictum sed
          ligula et viverra. Ut sed eleifend dolor. Vivamus eget lacus ultrices,
          congue sapien nec, tincidunt mauris. Integer at justo at metus dictum
          facilisis. Maecenas ut laoreet urna. Nullam urna tortor, consequat
          ullamcorper pretium sed, malesuada eget metus. Sed suscipit eget justo
          in viverra. Nunc vel enim a neque mattis facilisis a a mi.{' '}
          <p>Phasellus quis sollicitudin urna.</p>
        </div>
      ),
      disable: false,
    },
    {
      title: 'tab2',
      body: (
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in
          posuere magna, eget luctus mauris. t amet orci sed, facilisis
          hendrerit tortor.
          <ul>
            <li>Ut mauris ante, porttitor si</li>
          </ul>
          Nullam id feugiat eros, sed facilisis mi. Proin sit amet porta elit.
          In blandit mi elit, eget
          <p>
            faucibus arcu vulputate vestibulum. Sed id leo id eros consectetur
            tempus. Duis tincidunt scelerisque dapibus. Integer posuere
            vulputate purus, porttitor tincidunt dolor ultrices id. Vestibulum
            volutpat iaculis ante, id interdum quam vestibulum vitae.
          </p>
        </div>
      ),
      disable: false,
    },
  ],
}
