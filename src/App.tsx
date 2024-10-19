import Grid2 from '@mui/material/Grid2';
import { ListType } from './interface/List';
import './index.css'
import React, { useState } from 'react';
import { ItemList } from './component/ItemList';
import { Table } from './component/Table';
import { listEnum } from './enum/List';
import { Checkbox, FormControlLabel } from '@mui/material';
const mockLists = [
  {
    type: 'Fruit',
    name: 'Apple',
  },
  {
    type: 'Vegetable',
    name: 'Broccoli',
  },
  {
    type: 'Vegetable',
    name: 'Mushroom',
  },
  {
    type: 'Fruit',
    name: 'Banana',
  },
  {
    type: 'Vegetable',
    name: 'Tomato',
  },
  {
    type: 'Fruit',
    name: 'Orange',
  },
  {
    type: 'Fruit',
    name: 'Mango',
  },
  {
    type: 'Fruit',
    name: 'Pineapple',
  },
  {
    type: 'Vegetable',
    name: 'Cucumber',
  },
  {
    type: 'Fruit',
    name: 'Watermelon',
  },
  {
    type: 'Vegetable',
    name: 'Carrot',
  },
]
function App() {
  const [items, setItems] = useState<ListType[]>(mockLists)
  const [itemsTodo, setItemsTodo] = useState<ListType[]>([])
  const handleDelete = (item: ListType) => {
    setItemsTodo((prev) => prev.filter((_item) => _item.name !== item.name))
    setItems((prev) => prev.concat(item))
  }

  const handleAdd = (item: ListType) => {
    if (itemsTodo.includes(item)) return
    setItemsTodo((prev) => prev.concat(item))
    setItems((prev) => prev.filter((_item) => _item.name !== item.name))
  };
  const [checked, setChecked] = React.useState(true);
  return (
    <>
      <div style={outerContainerStyle}>
        <div style={containerStyle}>
          <Grid2 container display={'flex'} justifyContent={"space-between"}>
            <h1 style={headerStyle}>To-Do List</h1>
            <FormControlLabel
              label="AutoDelete"
              control={
                <Checkbox sx={{...checkBoxStyle }}
                checked={checked}
                onChange={(e,check)=>setChecked(check)}
                />
              }
            /></Grid2>

          <Grid2 container spacing={2} paddingBottom={2} style={{ height: '80%', overflow: 'hidden' }}>
            <Grid2 size={4} sx={{ height: "100%", overflow: 'auto' }}>
              <ItemList items={items} onClick={handleAdd} />
            </Grid2>
            <Grid2 size={4} sx={{ height: "100%", overflow: 'auto' }}>
              <Table autoDelete={checked} items={itemsTodo.filter(todo => todo.type === listEnum.Fruit)} header={listEnum.Fruit} onDelete={handleDelete}></Table>
            </Grid2>
            <Grid2 size={4} sx={{ height: "100%", overflow: 'auto' }}>
              <Table autoDelete={checked} items={itemsTodo.filter(todo => todo.type === listEnum.Vegetable)} header={listEnum.Vegetable} onDelete={handleDelete}></Table>
            </Grid2>
          </Grid2>
        </div>
      </div>
    </>
  );
}
// Styles
const outerContainerStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};


const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '90vw',
  height: '80vh',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  overflow: 'hidden', 
};

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '20px',
  color: "#789DBC"
};

const checkBoxStyle: React.CSSProperties = {
  textAlign: 'center',
  color: "#789DBC",
};
export default App;
