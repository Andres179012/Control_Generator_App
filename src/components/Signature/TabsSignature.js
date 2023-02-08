import { Tab } from '@headlessui/react'

function TabsSignature(props) {
    return (
        <Tab.Group>
          <Tab.List>
            <Tab className="text-blue-600 px-2">Personal Data</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel></Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      )
}

export default TabsSignature