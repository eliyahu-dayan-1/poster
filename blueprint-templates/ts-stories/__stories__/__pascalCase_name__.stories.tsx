import React from 'react';
import {{ pascalCase name }} from '../'
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Example/{{ pascalCase name }}',
    component: {{ pascalCase name }},
} as ComponentMeta<typeof {{ pascalCase name }}>;;

const Template = (args: any) => (
    < {{ pascalCase name }}
      {...args }
    />
)

export const Example: ComponentStory<typeof {{ pascalCase name }}> = Template.bind({});
Example.args = {};