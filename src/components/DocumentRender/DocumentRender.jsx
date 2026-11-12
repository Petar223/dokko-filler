import { CarDocumentIcon, IdProofLineIcon } from '~components/Icons';
import PlaceholderCard from '~components/PlaceholderCard/PlaceholderCard';
import { CARD_TYPE } from '~pages/GenerateDocumentPage/consts';
import LoadedCard from '~shared-components/LoadedCard/LoadedCard';

/**
 * A slot is "loaded" as soon as the reader returned a snapshot for it, even
 * if some fields are missing (LoadedCard shows a warning for those).
 */
const DocumentRender = ({
  card,
  snapshot,
  loading,
  disabled,
  onLoad,
  onRemove,
}) =>
  snapshot ? (
    <LoadedCard card={card} snapshot={snapshot} onRemove={onRemove} />
  ) : (
    <PlaceholderCard
      icon={card.type === CARD_TYPE.VEHICLE ? CarDocumentIcon : IdProofLineIcon}
      name={card.name}
      onClick={onLoad}
      loading={loading}
      disabled={disabled}
    />
  );

export default DocumentRender;
