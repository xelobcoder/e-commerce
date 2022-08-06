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
                    <Tab className='add'>Add</Tab>
                    <Tab className='view'>view</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Add editstate={editstate} editid={editid}  edit/>
                    </TabPanel>
                    <TabPanel>
                        <ViewList handleEdit={(e) => editcategory(e)} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}