import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { Platform, usePlatforms } from "../hooks/usePlatforms";

interface Props {
  onSelectPlatform: (platform: Platform) => void;
  selectedPlatform: Platform | null;
}

export const PlatformSelector = ({
  onSelectPlatform,
  selectedPlatform,
}: Props) => {
  const { data, error } = usePlatforms();

  if (error) {
    return null;
  }

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedPlatform?.name || "Platforms"}
      </MenuButton>
      <MenuList>
        {data.map((p) => (
          <MenuItem key={p.id} onClick={() => onSelectPlatform(p)}>
            {p.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
