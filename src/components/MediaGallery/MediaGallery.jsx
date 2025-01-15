import PropTypes from "prop-types";
import useMediaGallery from "@src/hooks/useMediaGallery";
import Gallery from "@src/components/MediaGallery/Gallery";

const MediaGallery = ({
  title,
  fetchUrl,
  renderItem,
  mediaType,
  itemsPerRow = 5,
  spacing = 2,
  fetchMoreOnScroll = true,
}) => {
  const { mediaItems, loading, error, hasMore } = useMediaGallery(fetchUrl, fetchMoreOnScroll);

  return (
    <Gallery
      title={title}
      mediaItems={mediaItems}
      renderItem={renderItem}
      mediaType={mediaType}
      itemsPerRow={itemsPerRow}
      spacing={spacing}
      loading={loading}
      hasMore={hasMore}
      error={error}
    />
  );
};

MediaGallery.propTypes = {
  title: PropTypes.string.isRequired,
  fetchUrl: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
  mediaType: PropTypes.string.isRequired,
  itemsPerRow: PropTypes.number,
  spacing: PropTypes.number,
  fetchMoreOnScroll: PropTypes.bool,
};

export default MediaGallery;
