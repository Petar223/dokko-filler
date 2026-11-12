import { CarDocumentIcon, IdProofLineIcon } from '~ui/Icons';
import { CARD_TYPE } from './cardTypes';
import LoadedCard from './LoadedCard';
import PlaceholderCard from './PlaceholderCard';

/**
 * A slot is "loaded" as soon as the reader returned a snapshot for it, even
 * if some fields are missing (LoadedCard shows a warning for those).
 */
const CardSlot = ({ card, snapshot, loading, disabled, onLoad, onRemove }) =>
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

export default CardSlot;
