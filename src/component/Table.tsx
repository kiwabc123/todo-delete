import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { ListType } from '../interface/List'
import { Card } from './Card'
import { listEnum } from '../enum/List'

export const Table = (props: {
    items: ListType[],
    header: listEnum,
    onDelete: (item: ListType) => void
    autoDelete :boolean
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
        <Box sx={{
            height:'100%' , minHeight:'100%',
            borderRadius: '8px', border: `2px solid #789DBC`,
            bgcolor: props.header === listEnum.Fruit ? "rgba(120, 157, 188, 0.3)" : "rgba(201, 233, 210, 0.3)"
        }}>
            <h3 style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                backgroundColor: 'rgba(120, 157, 188, 0.2)',
                margin: '0px',
            }}>{props.header}</h3>
            {props.items.map((_item, idx) => {
                return (
                    <div onClick={() => {props.onDelete(_item) }}>
                        <Card autoDelete={props.autoDelete} idx={idx} image={images[_item.name] ?? undefined} item={_item} forceDelete={props.onDelete}>
                        </Card>
                    </div>
                )
            })}
        </Box>
    )
}
