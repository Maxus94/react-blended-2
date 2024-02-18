import { CardItem, Grid, GridItem } from 'components';

export const ImageGallery = ({ photos }) => {
  return (
    <Grid>
      {photos.map(({ id, avg_color, alt, src }) => (
        <GridItem key={id}>
          <CardItem color={avg_color}>
            <img src={src.large} alt={alt} />
          </CardItem>
        </GridItem>
      ))}
    </Grid>
  );
};
