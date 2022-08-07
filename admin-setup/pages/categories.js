import ViewList from '../components/viewCat.js';
import { useState, useRef, useEffect } from 'react';
import Add from '../components/Addcat.js';
import axios from 'axios';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
export default function Categories() {
    const [editstate, setEditstate] = useState(false);
    const [editid, setEditid] = useState(0);
    const [data, setData] = useState([]);

    const editcategory = (e) => {
        document.querySelector(".add").click();
        let id = e.target.getAttribute('edit-id');
        setEditid(id);
        setEditstate(true);
    }

    return (
        <div style={{ marginLeft: '10vw', marginRight: '10vw' }}>
            <Tabs>
                <TabList>
                    <Tab className='view'>view</Tab>
                    <Tab className='add'>Add</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <ViewList handleEdit={(e) => editcategory(e)} />
                    </TabPanel>
                    <TabPanel>
                        <Add editstate={editstate} editid={editid}  edit/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}