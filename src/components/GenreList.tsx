import {
  Button,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Genre, useGenres } from "../hooks/useGenres";
import { getCroppedImageUrl } from "../services/image-url";

interface Props {
  onSelectGenre: (genre: Genre) => void;
}

export const GenreList = ({ onSelectGenre }: Props) => {
  const { data, isLoading, error } = useGenres();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return null;
  }

  return (
    <List>
      {data.map((d) => (
        <ListItem key={d.id} paddingY="5px">
          <HStack>
            <Image
              boxSize="32px"
              borderRadius={8}
              src={getCroppedImageUrl(d.image_background)}
            />

            <Button
              onClick={() => onSelectGenre(d)}
              fontSize="large"
              variant="link"
            >
              {d.name}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};
