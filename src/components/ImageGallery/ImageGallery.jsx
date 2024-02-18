import { CardItem, Grid, GridItem } from 'components';

export const ImageGallery = ({ photos, onOpenModal }) => {
  return (
    <Grid>
      {photos.map(({ id, avg_color, alt, src }) => (
        <GridItem key={id}>
          <CardItem color={avg_color} onClick={() => onOpenModal({ modalImg: src.large, textAlt: alt })}>
            <img src={src.large} alt={alt} />
          </CardItem>
        </GridItem>
      ))}
    </Grid>
  );
};
