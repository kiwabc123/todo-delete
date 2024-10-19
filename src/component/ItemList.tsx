import { useEffect, useState } from 'react'
import { ListType } from '../interface/List'
import {Box } from '@mui/material'
import { Card } from './Card'

export const ItemList = (props: {
  items: ListType[],
  onClick: (item: ListType) => void
}) => {
  const [images, setImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = props.items.map(async (item) => {
        try {
          const image = await import(`../assets/${item.name.toLowerCase()}.png`);
          return { name: item.name, src: image.default }; // Use .default to get the image URL
        } catch (error) {
          console.error(`Error loading image for ${item.name}:`, error);
          return { name: item.name, src: null }; // Handle missing images
        }
      });
      const loadedImages = await Promise.all(imagePromises);
      const imagesObject = loadedImages.reduce((acc, { name, src }) => {
        acc[name] = src;
        return acc;
      }, {} as { [key: string]: string });
      setImages(imagesObject);
    };

    loadImages();
  }, [props.items]);

  return (
    <>
    <Box sx={{
      minHeight: '100%',
      borderRadius: '8px', border: "2px solid #789DBC",
      bgcolor: "rgba(120, 157, 188, 0.3)"
    }}>
      {props.items.map((_item, idx) => {
        return (
          <div onClick={() => { props.onClick(_item) }}>
            <Card idx={idx} image={images[_item.name] ?? undefined} item={_item}>
            </Card>
          </div>
        )
      })}
    </Box>
    </>
  )
}

