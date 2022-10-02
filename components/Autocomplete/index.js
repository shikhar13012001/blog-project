import { forwardRef } from 'react'
import { MultiSelect, Avatar, Group, Text } from '@mantine/core'

const data = [
    {
        image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
        label: 'Bender Bending Rodríguez',
        value: 'Bender Bending Rodríguez',
        description: 'Fascinated with cooking',
    },

    {
        image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
        label: 'Carol Miller',
        value: 'Carol Miller',
        description: 'One of the richest people on Earth',
    },
    {
        image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
        label: 'Homer Simpson',
        value: 'Homer Simpson',
        description: 'Overweight, lazy, and often ignorant',
    },
    {
        image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
        label: 'Spongebob Squarepants',
        value: 'Spongebob Squarepants',
        description: 'Not just a sponge',
    },
]

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef(
    ({ image, label, description, ...others }, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <Avatar src={image} />

                <div>
                    <Text>{label}</Text>
                    <Text size="xs" color="dimmed">
                        {description}
                    </Text>
                </div>
            </Group>
        </div>
    )
)

function Demo() {
    return (
        <MultiSelect
            label="Choose employees of the month"
            placeholder="Pick all you like"
            itemComponent={SelectItem}
            data={data}
            searchable
            nothingFound="Nobody here"
            style={{
                maxWidth: 400,
                height: 60,
                backgroundColor: 'black',
                color: 'white!important',
            }}
            maxDropdownHeight={400}
            limit={3}
            filter={(value, selected, item) =>
                !selected &&
                (item.label
                    .toLowerCase()
                    .includes(value.toLowerCase().trim()) ||
                    item.description
                        .toLowerCase()
                        .includes(value.toLowerCase().trim()))
            }
        />
    )
}

export default Demo
