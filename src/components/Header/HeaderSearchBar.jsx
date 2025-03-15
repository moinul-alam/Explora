import { useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useSearch from '@src/hooks/useSearch';
import { useTheme, useMediaQuery } from '@mui/material';
import SearchBar from "@src/components/Common/SearchBar";


const HeaderSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const searchResults = useSearch(searchQuery);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSelect = (media) => {
    if (media) {
      const route =
        media.mediaType === 'person'
          ? `/person/${media.id}`
          : `/details/${media.mediaType}/${media.id}`;
      navigate(route);
      setOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <Box
      sx={{
        width: isMobile ? '100%' : '20rem',
        mx: isMobile ? 1 : 'auto',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <SearchBar onSelect={handleSelect} />
    </Box>
  );
};

export default HeaderSearchBar;
