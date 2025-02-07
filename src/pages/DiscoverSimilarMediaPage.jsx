import { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import RequestSimilarMedia from "@src/components/DiscoverSimilarMedia/RequestSimilarMedia";
import ShowDiscoveredMedia from "@src/components/DiscoverSimilarMedia/ShowDiscoveredMedia";
import VALID_FILTERS from "@src/components/DiscoverSimilarMedia/DiscoveryFilter";

const DiscoverSimilarMediaPage = () => {
  const [mediaType, setMediaType] = useState("");
  const [filters, setFilters] = useState(
    Object.keys(VALID_FILTERS).reduce((acc, key) => {
      acc[key] = VALID_FILTERS[key].defaultValue || "";
      return acc;
    }, {})
  );
  const [selectedActors, setSelectedActors] = useState([]);
  const [selectedDirectors, setSelectedDirectors] = useState([]);
  const [queryUrl, setQueryUrl] = useState("");

  return (
    <Box sx={{ padding: "24px" }}>
      <Paper elevation={3} sx={{ padding: "24px", borderRadius: "12px" }}>
        <Typography
          variant="h3"
          color="primary"
          align="center"
          paragraph
          gutterBottom
        >
          Discover Movies and TV Series
        </Typography>
        <RequestSimilarMedia
          mediaType={mediaType}
          setMediaType={setMediaType}
          filters={filters}
          setFilters={setFilters}
          selectedActors={selectedActors}
          setSelectedActors={setSelectedActors}
          selectedDirectors={selectedDirectors}
          setSelectedDirectors={setSelectedDirectors}
          setQueryUrl={setQueryUrl}
        />
      </Paper>

      {queryUrl && <ShowDiscoveredMedia queryUrl={queryUrl} mediaType={mediaType} />}
    </Box>
  );
};

export default DiscoverSimilarMediaPage;
